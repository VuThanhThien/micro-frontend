import { createRouter, createWebHistory, createMemoryHistory, type Router } from 'vue-router';
import { routes } from './routes';

export interface AppRouterOptions {
  /**
   * - `standalone`: the Vue app owns the browser URL (`createWebHistory`).
   * - `embedded`: the Vue app runs inside the React host and must not touch
   *   `window.history`, so it uses an in-memory history and delegates any path
   *   it does not own back to the host router via `onNavigate`.
   */
  mode?: 'standalone' | 'embedded';
  /** Called when the Vue app navigates to a path it does not own (a host route). */
  onNavigate?: (path: string) => void;
}

/** Route name used to catch paths that belong to the host, not to this Vue app. */
export const HOST_REDIRECT_ROUTE_NAME = 'host-redirect';

const defaultNavigate = (path: string) => window.location.assign(path);

/**
 * Creates the Vue Router with a history mode appropriate to the context.
 *
 * The conflict between Vue Router and React Router comes from both libraries
 * owning `window.history` (`pushState`/`popstate`). In embedded mode we use
 * `createMemoryHistory` so the Vue router never writes to the browser URL, and
 * we forward unmatched (host-owned) paths to the host's router instead.
 */
export const createAppRouter = (options: AppRouterOptions = {}): Router => {
  const { mode = 'standalone', onNavigate = defaultNavigate } = options;

  const history =
    mode === 'embedded' ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL);

  const router = createRouter({
    history,
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
  });

  // Catch-all so host-owned paths do not trigger a "No match found" warning;
  // the guard below forwards them to the host router.
  router.addRoute({
    path: '/:pathMatch(.*)*',
    name: HOST_REDIRECT_ROUTE_NAME,
    component: { render: () => null },
  });

  // Only forward *user-initiated* navigations to the host. Forwarding the very
  // first navigation (the router resolving the initial URL) would cause a
  // reload loop when a standalone deep link hits an unknown path.
  let initialized = false;
  void router.isReady().then(
    () => {
      initialized = true;
    },
    () => {
      initialized = true;
    }
  );

  router.beforeEach(to => {
    if (to.name === HOST_REDIRECT_ROUTE_NAME) {
      if (initialized) {
        // `to.fullPath` is the originally-typed (host-absolute) path, so the
        // host's React Router navigate receives it unchanged.
        onNavigate(to.fullPath);
        return false;
      }
      // Initial deep link to an unknown path: fall back to the Vue home route.
      return { path: '/' };
    }
    return true;
  });

  return router;
};

export default createAppRouter;
