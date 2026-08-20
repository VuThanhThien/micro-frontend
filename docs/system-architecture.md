# System Architecture

This document describes the runtime architecture of the `vite-micro-frontends`
application: the **host/remote Module Federation model**, **data/state flow**,
and the role of the **shared types package**.

## 1. High-Level Model

The system is a collection of independently built and served web applications
composed in the browser at runtime via **Module Federation**
(`@originjs/vite-plugin-federation`).

- The **host** (`host-dashboard`) owns the application shell, routing, layout,
  and page composition. It loads remote modules **lazily**.
- **Remotes** (`remote-auth`, `remote-components`, `remote-vue`) expose
  self-contained modules. Each is also independently runnable.
- The **types** package provides compile-time contracts for the federation
  boundary (no runtime coupling).

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BROWSER                                      │
│                                                                     │
│   ┌────────────────────────── HOST: host-dashboard (3000) ──────┐  │
│   │  Shell: main.tsx → AppRoutes.tsx (React Router 7)           │  │
│   │  ● /            Landing                                     │  │
│   │  ● /admin       Admin layout + pages (Home, Dashboard,      │  │
│   │                 Faq, Help, Profile*, UserManagement)        │  │
│   │  ● /vue         Vue dashboard wrapper                       │  │
│   │  ● /login, /register, /forgot-password, /forgot-password-   │  │
│   │    submit                                                    │  │
│   │  ● /403,/404,/under-construction                            │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                    │  lazy-load / shared deps                      │
│        ┌───────────┴────────────┬──────────────────┐               │
│        ▼                        ▼                  ▼               │
│  ┌─────────────────┐   ┌─────────────────┐  ┌──────────────────┐   │
│  │ REMOTE:         │   │ REMOTE:         │  │ REMOTE:          │   │
│  │ remote-auth     │   │ remote-         │  │ remote-vue       │   │
│  │ (3001)          │   │ components      │  │ (3003)           │   │
│  │ exposes:        │   │ (3002)          │  │ exposes:         │   │
│  │  ./pages        │   │ exposes:        │  │  ./pages         │   │
│  │  ./contexts     │   │  ./components   │  │  (mount fn)      │   │
│  │ Auth flows      │   │  ./pages        │  │ Vue 3 widgets    │   │
│  │                 │   │  ./contexts     │  └──────────────────┘   │
│  └─────────────────┘   │ UI library      │                         │
│            │           └─────────────────┘                         │
│            └──────────────► REMOTE: remote-components (3002)       │
│                                 (remote-auth also consumes it)      │
│                                                                     │
│   ┌────────────────────────────────────────────────────────────┐   │
│   │  SHARED: react, react-dom, axios, react-router-dom,        │   │
│   │  i18next, react-i18next, @mui/material, @mui/lab,          │   │
│   │  tailwindcss, react-query, formik                          │   │
│   │  (+ vue, vue-router, pinia, @vueuse/core for remote-vue)   │   │
│   └────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                     │  compile-time
                                     ▼
   ┌──────────────────────────────────────────────────────────────────┐
   │  TYPES PACKAGE (mf-app-types) — no runtime code                   │
   │  declares: remoteComponents/*, remoteAuth/*, remoteVue/pages,     │
   │            UserInfo                                                │
   └──────────────────────────────────────────────────────────────────┘
```

## 2. Module Federation Boundary

### 2.1 Exposed modules

| Remote              | Exposed path   | What it provides                                              |
| ------------------- | -------------- | ------------------------------------------------------------- |
| `remote-auth`       | `./pages`      | `Login`, `Register`, `ForgotPassword`, `ForgotPasswordSubmit` |
| `remote-auth`       | `./contexts`   | `AuthContext`, `AuthProvider`, `useAuth`                      |
| `remote-components` | `./components` | `Title`, `Footer`                                             |
| `remote-components` | `./pages`      | `Forbidden`, `NotFound`, `UnderConstructions`                 |
| `remote-components` | `./contexts`   | `SnackbarContext`, `SnackbarProvider`, `useSnackbar`          |
| `remote-vue`        | `./pages`      | `mount(el) → { unmount }`                                     |

### 2.2 Consumption & shared dependencies

The **host** declares remotes in `vite.config.ts`:

```ts
remotes: {
  remoteComponents: 'http://localhost:3002/assets/remoteEntry.js',
  remoteAuth: 'http://localhost:3001/assets/remoteEntry.js',
  remoteVue: 'http://localhost:3003/assets/remoteEntry.js',
},
```

`shared` lists the libraries that must appear only once in the browser.
When multiple apps load, Module Federation picks one instance of each shared
dependency and hands it to consumers. This prevents the classic
"two Reacts" bug.

Example consumption in the host:

```ts
import { Forbidden, NotFound, UnderConstructions } from 'remoteComponents/pages';
import { ForgotPassword, Login, Register } from 'remoteAuth/pages';
```

### 2.3 Cross-framework bridge

`remote-vue` cannot expose React components; instead it exposes a mount
function. The host's `vue/pages/Dashboard` wrapper obtains an element and calls
`mount`, retaining the `unmount` handle for cleanup:

```ts
import { mount } from 'remoteVue/pages';

const app = mount(container, {
  basename: '/admin/vue',
  onNavigate: path => navigate(path),
});
app.setHostPath(location.pathname); // host -> Vue sync
// on unmount: app.unmount();
```

Because the Vue app runs inside a React Router host, the embedded Vue Router
uses **memory history** (`createMemoryHistory`) so the two routers never fight
over `window.history`. Navigation is bridged in both directions:

- **Vue → host:** the Vue router's global guard forwards paths it does not own
  to `onNavigate` (the host's React Router `navigate`).
- **host → Vue:** the wrapper calls `setHostPath(path)` whenever the host URL
  changes; the path is mapped (basename stripped) and applied to the Vue memory
  router only when it matches a real Vue route.

## 3. Data Flow

### 3.1 Mock API layer

All HTTP is mocked in the browser via `axios-mock-adapter`
(`host-dashboard/src/mocks/server.ts` + JSON fixtures). The axios instance in
`core/lib/axios.ts` is configured from `VITE_BASE_API_URL`. Because axios is a
shared dependency, remote apps can also rely on it.

```
Component (React Query / custom hook)
        │  data-fetching hook (e.g. useNotifications, useLogin)
        ▼
   axios instance (core/lib/axios.ts)
        │
        ▼
   axios-mock-adapter (mocks/server.ts)
        │  matches route patterns
        ▼
   JSON fixtures (users.json, notifications.json, …)
```

### 3.2 State & cross-remote communication

- **Server state**: React Query (`react-query` 3) in React remotes;
  remote-vue uses Pinia stores.
- **Cross-remote contexts**: `AuthContext` and `SnackbarContext` are exposed
  as federation modules so the provider defined in one app can be consumed
  by others (e.g. the host renders `AuthProvider`/`SnackbarProvider`, and any
  app uses `useAuth`/`useSnackbar`).
- **Shared types**: `UserInfo` and the interface contracts flow through the
  `types` package, keeping each app's view of cross-app data in sync at
  compile time.

### 3.3 Routing flow

- The **host owns all routes** (`AppRoutes.tsx`).
- Non-lazy admin/auth/common pages are statically imported;
  heavy or seldom-used pages use `React.lazy`.
- Remote **pages** (`Login`, `Register`, error pages) are imported directly
  from remote modules and rendered inside host routes; navigation stays within
  the host's React Router instance (shared `react-router-dom` and `react-router`).
- The **Vue remote** is embedded with a memory-history Vue Router and a
  bidirectional bridge (see §2.3), so the host remains the single source of
  truth for the URL and no `pushState`/`popstate` conflict occurs.

## 4. Deployment Topology

Each app is containerized (Dockerfile + nginx serving `dist`) and sized to its
own port. `docker-compose.yml` wires them together on a shared
`micro-frontend-network` and mounts a shared `types-volume`.

```
┌────────────── docker compose ─────────────────────────────┐
│  types  (volume provider, types-volume)                    │
│  remote-components :3002   remote-auth :3001               │
│  remote-vue       :3003   host-dashboard :3000             │
│                micro-frontend-network                      │
└────────────────────────────────────────────────────────────┘
```

- Host `depends_on` all remotes + types; auth depends on components.
- Build args inject `VITE_APP_NAME` and `VITE_BASE_API_URL`.
- nginx serves the SPA (`try_files … /index.html`) with a long cache on
  `/assets/` and a no-cache policy for the service worker + index.

See [Deployment Guide](deployment-guide.md) for commands.

## 5. Shared Types Package

`types/` (`mf-app-types`) is a **compile-time-only** package:

- `index.d.ts` declares the remote modules and `UserInfo`.
- `index.js` is a stub so the package resolves at runtime.
- It is a `workspace:*` dev dependency of each app.

```
┌──────────────┬──────────────────────────────────────────────┐
│  App         │  Uses declaration from mf-app-types          │
├──────────────┼──────────────────────────────────────────────┤
│  host        │  remoteComponents/* remoteAuth/* remoteVue/* │
│  remote-auth │  remoteComponents/*                          │
│  remotes     │  (own exposed modules' consumption patterns) │
└──────────────┴──────────────────────────────────────────────┘
```

## 6. Key Architectural Decisions

| Decision                      | Rationale                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| Host owns routing             | A single entry keeps navigation coherent; remotes ship pages + contexts, not routes. |
| Shared dependency declaration | Prevents duplicate React/Router/MUI instances.                                       |
| Mock API in browser           | Lets the demo run fully offline with realistic data; swap for real backend later.    |
| Expose contexts as remotes    | Enables cross-app state (auth/snackbar) without duplicated instances.                |
| Vue `mount` bridge            | Standard way to embed a second framework in a Module Federation host.                |
| Contract via `types` package  | Compile-time safety across independent codebases.                                    |
