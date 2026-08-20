import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Dashboard from '@/components/Dashboard.vue';
import { createAppRouter, HOST_REDIRECT_ROUTE_NAME } from '@/router';

export interface VueMountOptions {
  /**
   * Base path under which the Vue app is mounted in the host (e.g. `/admin/vue`).
   * Used to map host locations back to Vue-internal routes.
   */
  basename?: string;
  /** Forwards Vue-initiated navigation to the host router (React Router). */
  onNavigate?: (path: string) => void;
}

/**
 * The Vue micro-frontend inherits the theme of the parent host app.
 *
 * The host (host-dashboard) persists its theme mode ('light' | 'dark') to
 * localStorage under the key `mode` (JSON-encoded, default 'light') and may also
 * toggle a Tailwind `dark` class on <html>. We scope the Tailwind v4 `.dark`
 * class plus the Vue project's own base typography tokens to this container so
 * host <body>/:root styles don't leak into the Vue subtree, while still
 * following the host's chosen light/dark mode.
 */
const readHostIsDark = (): boolean => {
  const htmlDark = document.documentElement.classList.contains('dark');
  let storedDark = false;
  try {
    storedDark = JSON.parse(window.localStorage.getItem('mode') ?? 'null') === 'dark';
  } catch {
    /* ignore malformed value */
  }
  return htmlDark || storedDark;
};

/** Maps a host path to a Vue-internal path, or returns `null` when outside the Vue base. */
const stripBasename = (path: string, basename?: string): string | null => {
  const base = basename ?? '/';
  if (base === '/' || base === '') {
    return path === '' ? '/' : path;
  }
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  if (path === normalizedBase) return '/';
  if (path.startsWith(`${normalizedBase}/`)) {
    return path.slice(normalizedBase.length) || '/';
  }
  return null;
};

export const mount = (el: HTMLElement, options: VueMountOptions = {}) => {
  const { basename = '/', onNavigate } = options;

  // Base typography/background resolved from the container's design tokens
  // (these adapt automatically when the `dark` class below is toggled).
  el.style.color = 'var(--foreground)';
  el.style.backgroundColor = 'var(--background)';

  const applyTheme = (isDark: boolean) => {
    el.classList.toggle('dark', isDark);
  };
  applyTheme(readHostIsDark());

  // Stay in sync with host theme changes.
  const syncTheme = () => applyTheme(readHostIsDark());
  const onStorage = (e: StorageEvent) => {
    if (e.key === 'mode') syncTheme();
  };
  window.addEventListener('storage', onStorage);

  // Same-tab localStorage writes don't emit a `storage` event, so also observe
  // document class changes (e.g. if the host toggles a Tailwind `dark` class).
  const observer = new MutationObserver(syncTheme);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  // Embedded mode uses memory history so the Vue router never fights the host's
  // React Router over `window.history`. Host-owned paths are delegated via
  // `onNavigate` (the host's React Router navigate).
  const router = createAppRouter({ mode: 'embedded', onNavigate });

  const app = createApp(Dashboard);
  const pinia = createPinia();
  app.use(pinia);
  app.use(router);
  app.mount(el);

  const setHostPath = (path: string) => {
    const vuePath = stripBasename(path, basename);
    if (vuePath === null) {
      // Host navigated outside the Vue app; nothing to sync.
      return;
    }
    const resolved = router.resolve(vuePath);
    if (resolved.name !== HOST_REDIRECT_ROUTE_NAME) {
      void router.replace(vuePath).catch(() => {});
    }
    // Else: the path is under the Vue base but not a real Vue route. Intentionally
    // dropped (never re-enters the guard), which keeps host->Vue sync loop-free.
  };

  return {
    unmount: () => {
      app.unmount();
      window.removeEventListener('storage', onStorage);
      observer.disconnect();
    },
    setHostPath,
  };
};
