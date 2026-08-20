# Codebase Structure & Code Standards

## 1. Monorepo Structure (PNPM Workspace)

```
vite-micro-frontends/
├── package.json                 # root scripts (dev, build, preview, clean, format:all)
├── pnpm-workspace.yaml          # packages: host-dashboard, remote-auth,
│                                #   remote-components, remote-vue, types
├── docker-compose.yml           # container orchestration for all apps
├── Makefile                     # task wrappers
├── scripts/
│   └── setup-env.sh             # .env.example → .env generator
├── .nvmrc                       # Node v20.11.1
├── .husky/                      # git hooks (pre-commit → lint-staged)
├── .lintstagedrc
├── .prettierrc / .prettierignore
├── host-dashboard/
├── remote-auth/
├── remote-components/
├── remote-vue/
├── types/                       # mf-app-types (shared declarations)
└── docs/                        # this documentation set
```

## 2. Application Structure Convention

Every app follows a consistent domain-first layout under `src/`:

```
src/
├── <domain>/              # e.g. admin, auth, users, landing, vue
│   ├── components/        # presentational components scoped to the domain
│   ├── config/            # domain configuration / constants
│   ├── contexts/          # React contexts
│   ├── hooks/             # custom hooks (data fetching, behaviors)
│   ├── pages/             # route-level pages
│   ├── types/             # domain TypeScript types/interfaces
│   └── widgets/           # (host) dashboard widget component
├── core/                  # cross-cutting, app-wide concerns
│   ├── components/
│   ├── config/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/               # non-React utilities (axios, authStorage)
│   ├── theme/
│   └── utils/
├── mocks/                 # axios-mock-adapter server + JSON fixtures
├── App.tsx
├── AppRoutes.tsx
└── main.tsx
```

**Naming rules**

- **Files**: PascalCase for components/pages (`UserManagement.tsx`),
  camelCase for hooks (`useLogin.ts`), configs, and utilities.
- **Folders**: lowercase (singular), e.g. `components`, `hooks`, `pages`.
- **Domains** are feature packages: `admin`, `auth`, `users`, `landing`,
  `vue`, `core` (shared plumbing).

## 3. TypeScript & Project References

Each app uses **TypeScript project references** via multiple `tsconfig`
variants:

```
tsconfig.json         # solution/references
tsconfig.app.json     # application source
tsconfig.node.json    # config/build tooling
```

Example npm script (host):

```jsonc
"build": "tsc -b && vite build"
```

- Build with `tsc -b` (project references / incremental builds, emits
  `*.tsbuildinfo`) before running Vite.
- remote-vue type-checks with `vue-tsc -b`.

## 4. Module Federation Standards

Federation is configured with `@originjs/vite-plugin-federation` in every app's
`vite.config.ts`:

**Host (`dashboard`)**

```ts
ModuleFederationPlugin({
  name: 'dashboard',
  remotes: {
    remoteComponents: 'http://localhost:3002/assets/remoteEntry.js',
    remoteAuth: 'http://localhost:3001/assets/remoteEntry.js',
    remoteVue: 'http://localhost:3003/assets/remoteEntry.js',
  },
  shared: [
    'react',
    'react-dom',
    'axios',
    'react-router-dom',
    'react-router',
    'i18next',
    'react-i18next',
    '@mui/material',
    '@mui/lab',
    'tailwindcss',
    'react-query',
    'formik',
  ],
});
```

**Remote (e.g. `remote-components`)**

```ts
ModuleFederationPlugin({
  name: 'remoteComponents',
  filename: 'remoteEntry.js',
  exposes: {
    './components': './src/components',
    './pages': './src/pages',
    './contexts': './src/contexts',
  },
  shared: ['react', 'react-dom' /* ... */],
});
```

Standards:

1. **Remote name ↔ import key must match** (e.g. `remoteComponents`).
2. **Remote filename** is `remoteEntry.js` and lives under `assets/`
   (Vite emits `assets/remoteEntry.js`).
3. **Ports must not conflict**: host 3000, auth 3001, components 3002, vue 3003.
4. **Shared dependencies** must enumerate all duplicated libraries
   (react, react-dom, axios, react-router-dom, react-router, i18next,
   react-i18next, MUI, react-query, formik) so only one instance loads.
   `react-router` is shared alongside `react-router-dom` so the React Router
   context is a single instance across host/remotes (both pinned at 7.4.0).
5. **Start remotes before the host** — the host lazy-loads them at runtime.
6. **Expose modules via the shared `types` package** to keep typings in sync.

### Cross-framework bridging (remote-vue)

Vue cannot expose React components, so `./pages` exposes a `mount` function
that returns an imperative handle. Because Vue Router and React Router both
own `window.history` (`pushState`/`popstate`), the embedded Vue router must
**not** use browser history — it uses `createMemoryHistory` and delegates
host-owned paths through a navigation bridge:

```ts
// './pages' → exposes: { './pages': './src/exposes/pages' }
export const mount = (
  el: HTMLElement,
  options?: {
    basename?: string; // e.g. '/admin/vue'
    onNavigate?: (path: string) => void; // Vue -> host (React Router navigate)
  }
) => {
  // createApp + install Pinia + install memory-history router
  return {
    unmount: () => {
      /* cleanup */
    },
    setHostPath: (path: string) => {
      /* host -> Vue sync */
    },
  };
};
```

Rules:

- **Vue Router uses memory history when embedded** (standalone mode keeps
  `createWebHistory`). The Vue router never writes to the browser URL.
- The **host owns the URL** — the host's `VueWrapper` injects React Router's
  `navigate` as `onNavigate` and calls `setHostPath` on location changes.
- In the Vue router, a `beforeEach` guard forwards paths Vue does not own (a
  `host-redirect` catch-all route) to `onNavigate` instead of navigating
  internally.
- Update `types/index.d.ts` (`remoteVue/pages`) whenever the `mount`
  signature changes.

## 5. Shared Modules Contract (`types` package)

Cross-app remote modules are typed in `types/index.d.ts`. Requirements:

- Every exposed module (`remoteComponents/*`, `remoteAuth/*`,
  `remoteVue/pages`) must have a matching `declare module` declaration.
- Update the `types` package whenever an exposed API changes; it is a
  `workspace:*` dev dependency of each app.
- Keep the runtime (`index.js`) and declarations (`index.d.ts`) in sync.

## 6. Linting, Formatting & Hooks

**ESLint** — per-app `eslint.config.js` using `typescript-eslint`:

```bash
pnpm lint        # within an app: eslint .
```

**Prettier** — shared `.prettierrc` at the root:

```jsonc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
}
```

Format everything:

```bash
pnpm run format:all
```

**Husky + lint-staged** — `.lintstagedrc` runs Prettier on staged
`*.{js,jsx,ts,tsx,json,md,css,scss,html}` before commit.

## 7. Dependency & Environment Conventions

- **Package manager**: PNPM (workspace). Use `pnpm` — do not mix npm/yarn.
- **Node**: `v20.11.1` (`.nvmrc`); the Docker build pins `pnpm@9.15.9`.
- **Environment**: every app has `.env` + `.env.example`. Generate via
  `pnpm run setup-env` or `make setup-env`.
  - `VITE_APP_NAME` — display name.
  - `VITE_BASE_API_URL` — API base URL (default `http://localhost:8080`).
- **Versioning**: production-ish packages (e.g. `mf-app-types`) carry explicit
  versions; app packages are `0.0.0`/private.

## 8. Routing & UI Conventions

- **Use `react-router-dom`, never `react-router`**, for DOM routing.
- Lazy-load heavy pages with `React.lazy` + `<Suspense fallback={<Loader/>}>`.
- Import shared components (Loader) from `core/components` locally; import
  remote UI (Title, Footer, error pages, snackbar/auth contexts) across the
  federation boundary.
- Use MUI (`@mui/material`) + TailwindCSS for styling; components use
  `tailwind-merge` + `clsx` for class composition in remote-components.

## 9. Git Workflow

- Conventional, atomic commits; run `format:all` and `pnpm lint` before
  committing (enforced for formatting by lint-staged).
- `pnpm build` should pass before pushing (verifies `tsc -b` + federation
  configs).
- Keep exposed module APIs backward-compatible; bump `mf-app-types` when the
  shared contract changes.
