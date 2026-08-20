# Codebase Summary

This document summarizes the layout and responsibilities of every package in
the `vite-micro-frontends` monorepo. It is an orientation guide — see
[System Architecture](system-architecture.md) for the runtime model and
[Code Standards](code-standards.md) for conventions.

## Repository Root

| Path                                                                       | Purpose                                                                                                                                    |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `package.json`                                                             | Workspace root (`vite-micro-frontends` v1.0.0); scripts: `setup-env`, `dev`, `build`, `preview`, `clean`, `format:all`, `prepare` (husky). |
| `pnpm-workspace.yaml`                                                      | Declares packages: `host-dashboard`, `remote-auth`, `remote-components`, `remote-vue`, `types`.                                            |
| `docker-compose.yml`                                                       | Orchestrates all services on `micro-frontend-network` with a shared `types-volume`.                                                        |
| `Makefile`                                                                 | Wraps common tasks (`docker-up`, `install`, `setup-env`, `build`, `clean`, `preview`, `format`).                                           |
| `scripts/setup-env.sh`                                                     | Copies each app's `.env.example` → `.env`.                                                                                                 |
| `.nvmrc`                                                                   | Node `v20.11.1`.                                                                                                                           |
| `.husky/`, `.lintstagedrc`, `.prettierrc`, `.prettierignore`, `.gitignore` | Git hooks + Prettier/lint-staged setup.                                                                                                    |
| `CLAUDE.md`                                                                | Agent/CLI project notes.                                                                                                                   |

### Root scripts

```jsonc
{
  "setup-env": "sh scripts/setup-env.sh",
  "dev": "pnpm setup && pnpm -r --parallel dev",
  "build": "pnpm setup && pnpm -r build",
  "preview": "pnpm -r --parallel preview",
  "clean": "pnpm -r clean",
  "format:all": "prettier --write ...",
  "prepare": "husky install",
}
```

## Package: `host-dashboard` (port 3000, host)

React 18 shell. Consumes `remoteComponents`, `remoteAuth`, `remoteVue`.

**Module Federation**: name `dashboard`, remotes → `http://localhost:3002|3001|3003/assets/remoteEntry.js`.

### `src/` layout

| Path            | Contents                                                                                                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `main.tsx`      | Entry: StrictMode + `createRoot`, imports i18n config, mocks/server, service worker setup, nprogress, reportWebVitals.                                                                 |
| `AppRoutes.tsx` | All routes (see below). Uses `React.lazy` + `Suspense` for lazy pages; imports error/auth pages from remotes.                                                                          |
| `admin/`        | `components/` (AdminAppBar, AdminDrawer, AdminToolbar, RecentNotifications), `config/`, `hooks/`, `pages/` (Admin, Dashboard, Faq, HelpCenter, Home, Profile\*), `types/`, `widgets/`. |
| `auth/`         | `hooks/` (useLogin, useLogout, useRegister, useForgotPassword, useForgotPasswordSubmit, useUpdatePassword, useUserInfo), `types/`.                                                     |
| `core/`         | `components/`, `config/` (i18n.ts, layout.ts), `contexts/` (SettingsProvider, SnackbarProvider), `hooks/`, `lib/` (authStorage.ts, axios.ts), `theme/`, `utils/`.                      |
| `landing/`      | `components/`, `pages/` (Landing).                                                                                                                                                     |
| `mocks/`        | `server.ts` + JSON fixtures: `activityLogs.json`, `events.json`, `notifications.json`, `profileInfo.json`, `userInfo.json`, `users.json`.                                              |
| `users/`        | `components/`, `hooks/`, `pages/` (UserManagement), `types/`.                                                                                                                          |
| `vue/`          | `components/`, `pages/` (Dashboard wrapper around `remoteVue/pages`).                                                                                                                  |

### Routes (`AppRoutes.tsx`)

| Path                                                                 | Page                                                                                                                                                              |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                                                  | Landing                                                                                                                                                           |
| `/admin`                                                             | Admin layout → index Home; `dashboard`, `faq`, `help`, `profile` (+ `information`, `password`, `activity`), `projects` → `/under-construction`, `user-management` |
| `/login`, `/register`, `/forgot-password`, `/forgot-password-submit` | Remote auth pages                                                                                                                                                 |
| `/vue`                                                               | VueDashboard (Vue remote)                                                                                                                                         |
| `/under-construction`, `/403`, `/404`                                | Remote component pages                                                                                                                                            |
| `*`                                                                  | Redirect → `/404`                                                                                                                                                 |

**Env**: `VITE_APP_NAME="Micro Front-end"`, `VITE_BASE_API_URL=http://localhost:8080`.

## Package: `remote-auth` (port 3001, remote)

React 18 authentication module. Exposes `./pages` (auth/pages) and
`./contexts` (auth/contexts). Consumes `remoteComponents`.

### `src/` layout

| Path                                   | Contents                                                                                                                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auth/`                                | `contexts/` (AuthContext: `hasRole`, `isLoggingIn`, `isLoggingOut`, `login`, `logout`, `userInfo`), `hooks/`, `pages/` (Login, Register, ForgotPassword, ForgotPasswordSubmit). |
| `core/`                                | `components/`, `config/`, `contexts/`, `hooks/`, `lib/`, `theme/`, `utils/` (mirrors host conventions).                                                                         |
| `App.tsx`, `AppRoutes.tsx`, `main.tsx` | Standalone runnable app.                                                                                                                                                        |
| `mocks/`                               | Mock API fixtures.                                                                                                                                                              |

**Env**: `VITE_APP_NAME="Auth Service"`, `VITE_BASE_API_URL=http://localhost:8080`.

## Package: `remote-components` (port 3002, remote)

Reusable React UI component library (Vite 5). Exposes `./components`,
`./pages`, `./contexts`. Uses TailwindCSS with `tailwind.config.js`,
`tailwind-merge`, and `clsx`.

### Exposed modules

| Module       | Exports                                              |
| ------------ | ---------------------------------------------------- |
| `components` | `Title` (`size: xl \| lg \| base`), `Footer`         |
| `pages`      | `Forbidden`, `NotFound`, `UnderConstructions`        |
| `contexts`   | `SnackbarContext`, `SnackbarProvider`, `useSnackbar` |

### `src/` layout

`components/` (Footer, Loader, QueryWrapper, Result, SvgContainer, Title),
`config/`, `contexts/`, `hooks/`, `lib/`, `pages/`, `theme/`, `utils/`,
`App.tsx`, `AppRoutes.tsx`, `main.tsx`.

**Env**: `VITE_APP_NAME="Components Library"`, `VITE_BASE_API_URL=http://localhost:8080`.

## Package: `remote-vue` (port 3003, remote)

Vue 3 module. Exposes `./pages` → `src/exposes/pages` via a `mount`
function (`{ mount: (el) => ({ unmount }) }`) for cross-framework micro
frontends. Uses Pinia, Vue Router 4, TailwindCSS 4, reka-ui/radix-vue,
lucide-vue-next, @vueuse/core, @unovis/vue charts, class-variance-authority,
tailwind-merge, @iconify/vue, and `rollup-plugin-visualizer` (emits
`stats.html`).

### `src/` layout

`assets/`, `components/` (Dashboard, Layout, LayoutConfigurator, `ui/`
shadcn-style), `exposes/` (pages), `layouts/` (partials), `lib/`, `router/`,
`stores/`, `views/`, `App.vue`, `main.ts` (createApp + Pinia + router),
`style.css`, `components.json`.

**Env**: `VITE_BASE_API_URL=http://localhost:8080`.

## Package: `types` (`mf-app-types` v1.0.1)

Type declarations for the shared Module Federation modules consumed across
apps. `index.d.ts` declares modules:

- `remoteComponents/components`
- `remoteComponents/pages`
- `remoteComponents/contexts`
- `remoteAuth/pages`
- `remoteAuth/contexts`
- `remoteVue/pages`

It also defines `UserInfo`:

```ts
interface UserInfo {
  id: string;
  avatar?: string;
  email: string;
  firstName: string;
  job: string;
  lastName: string;
  progress: number;
  role: string;
}
```

Dependency: `@types/react`. It is a `workspace:*` dev dependency of every app.

## Code Volume & Structure (first orientation)

- All apps follow a domain-folder convention under `src/` (`admin`, `auth`,
  `core`, `landing`, `users`, `vue`) with feature slices (`components`,
  `hooks`, `pages`, `types`, `config`).
- The host is the largest package; remotes are deliberately small and focused.
- `types` contains only declarations (the runtime is `index.js`).
