import { createApp } from 'vue';
import Dashboard from '@/components/Dashboard.vue';

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

export const mount = (el: HTMLElement) => {
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

  const app = createApp(Dashboard);
  app.mount(el);

  return {
    unmount: () => {
      app.unmount();
      window.removeEventListener('storage', onStorage);
      observer.disconnect();
    },
  };
};
