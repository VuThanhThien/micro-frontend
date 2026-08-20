# vite-micro-frontends

Vite + Module Federation micro-frontend dashboard monorepo (PNPM workspace).

## Project Overview

A dashboard application composed of independently built/deployed front-end
apps that cooperate at runtime in the browser via Module Federation
(`@originjs/vite-plugin-federation`).

- **host-dashboard** (3000) — React 18 shell: routing, layout, composition.
- **remote-auth** (3001) — React 18 auth module (login/register/forgot password).
- **remote-components** (3002) — React 18 shared UI library + error pages + snackbar.
- **remote-vue** (3003) — Vue 3 widgets/dashboard (Pinia + Vue Router).
- **types** (`mf-app-types`) — compile-time declarations for federation boundaries.

## Tech Stack

- Host/remotes: React 18, TypeScript, Vite, React Router 7, TailwindCSS 4, MUI,
  React Query, i18next, axios (mock via axios-mock-adapter).
- remote-vue: Vue 3, Pinia, Vue Router 4, TailwindCSS 4, reka-ui/radix-vue,
  @unovis/vue charts.
- Monorepo: PNPM workspaces; Docker/nginx; ESLint + Prettier + Husky.

## Important Notes (agent guidance)

- **Commands**: `pnpm dev` (all apps), `pnpm build` (`tsc -b && vite build`),
  `pnpm preview`, `pnpm run setup-env`, `pnpm run format:all`.
- **Start remotes before the host** — the host lazy-loads each `remoteEntry.js`
  at runtime.
- **Ports are fixed**: 3000 host, 3001 auth, 3002 components, 3003 vue.
- **React Router**: import from `react-router-dom` (not `react-router`); both are
  in the federation `shared` list so the Router context is a single instance.
- **Cross-framework routing** (`remote-vue` embedded at `/admin/vue`):
  - The embedded Vue Router uses **memory history** (`createMemoryHistory`) — it
    never writes to `window.history`, so it does not conflict with the host's
    `BrowserRouter`. The host owns the URL.
  - `mount(el, options)` returns `{ unmount, setHostPath }`; the host's
    `VueWrapper.tsx` bridges React Router `useNavigate` → `onNavigate`
    (Vue→host) and `useLocation` → `setHostPath` (host→Vue).
  - Vue paths that are not in its own route table hit the `host-redirect`
    catch-all and are forwarded to the host via `onNavigate` (e.g.
    `router.push('/admin/dashboard')`).
  - Update `types/index.d.ts` (`remoteVue/pages`) only when the `mount`
    signature changes.
- **Dashboard tabs** in `remote-vue` are named Vue routes (`/`, `/analytics`,
  `/reports`, `/notifications`) sharing state via `stores/dashboard.store.ts`
  (Pinia). `Dashboard.vue` drives them with `useRoute`/`useRouter`.
- **Live check**: `pnpm dev`, then open `/admin/vue`; switch tabs and verify the
  host URL stays `/admin/vue` (tabs are internal memory history).

## Documentation

- Read `./README.md` for project context.
- Docs: `./docs/` (update with `/docs update`). Especially:
  - `docs/system-architecture.md` §2.3 — cross-framework router bridge.
  - `docs/code-standards.md` §4 — federation `shared` + bridging rules.
