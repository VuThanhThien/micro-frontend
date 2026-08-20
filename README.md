# Vite Micro Frontends

A **micro frontend dashboard application** demo built with **Vite + Module Federation**
([`@originjs/vite-plugin-federation`](https://github.com/originjs/vite-plugin-federation))
and managed as a **PNPM workspace** monorepo. Multiple independent apps share
functionality: user management, authentication, reusable UI components, and
Vue-based widgets — each deployed independently and composed at runtime.

## Apps

| App                   | Port | Role                                                        | Stack                                                                                                         |
| --------------------- | ---- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **host-dashboard**    | 3000 | Host shell + routing/layout                                 | React 18, TypeScript, Vite 6, TailwindCSS 4, MUI v6, React Router 7, React Query, MUI, i18next, recharts, PWA |
| **remote-auth**       | 3001 | Authentication (login, register, forgot password)           | React 18, TypeScript, Vite, TailwindCSS, MUI, React Router 7                                                  |
| **remote-components** | 3002 | Shared UI component library                                 | React 18, TypeScript, Vite 5, TailwindCSS, MUI                                                                |
| **remote-vue**        | 3003 | Vue-based widgets/dashboard                                 | Vue 3, TypeScript, Vite 6, Pinia, Vue Router 4, TailwindCSS 4, shadcn/ui                                      |
| **types**             | —    | Shared Module Federation type declarations (`mf-app-types`) | TypeScript declarations                                                                                       |

## Key Features

- **Micro frontend architecture** with Module Federation (lazy remote loading)
- **Independent deployments** — each remote is its own container/host
- **Shared state & types** between micro frontends (`types` package)
- **Modern UI** with TailwindCSS 4 + MUI + shadcn-style components
- **State/data fetching** with React Query, Pinia, and Vue Router
- **i18n** via i18next across the React remotes
- **Monorepo** management with PNPM Workspace
- **Code quality**: ESLint + Prettier + Husky git hooks + lint-staged

## System Requirements

- Node.js `v20.11.1` (see `.nvmrc`)
- PNPM `v9.15.9` (used in the Docker build; v8+ works locally)
- Docker + Docker Compose (optional, for containerized deployment)

## Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Generate .env files for every app from their .env.example
pnpm run setup-env

# 3. Run all dev servers simultaneously (parallel)
pnpm dev
```

Visit <http://localhost:3000> for the host dashboard (auth on 3001, components
on 3002, Vue on 3003).

> **Remote apps must be running before the host** — the host lazy-loads them at
> runtime through Module Federation.

## Available Scripts

| Command               | Description                                    |
| --------------------- | ---------------------------------------------- |
| `pnpm run setup-env`  | Copy `.env.example` → `.env` for every service |
| `pnpm dev`            | Run all apps in dev mode (parallel)            |
| `pnpm build`          | Type-check and build all apps                  |
| `pnpm preview`        | Preview all built apps (parallel)              |
| `pnpm clean`          | Remove all `dist/` artifacts                   |
| `pnpm run format:all` | Format the codebase with Prettier              |

A `Makefile` wraps the most common tasks (`make install`, `make build`,
`make docker-up`, `make format`, …).

### Running individually

```bash
# Start a remote first, then the host
cd remote-components && pnpm dev   # 3002
cd remote-auth      && pnpm dev    # 3001
cd remote-vue       && pnpm dev    # 3003
cd host-dashboard   && pnpm dev    # 3000
```

## Docker

```bash
make docker-up
# or
COMPOSE_BAKE=true docker compose up --build
```

See [docs/deployment-guide.md](docs/deployment-guide.md) for full details.

## Documentation

- [Project Overview & PDR](docs/project-overview-pdr.md)
- [Codebase Summary](docs/codebase-summary.md)
- [Code Standards](docs/code-standards.md)
- [System Architecture](docs/system-architecture.md)
- [Project Roadmap](docs/project-roadmap.md)
- [Deployment Guide](docs/deployment-guide.md)
- [Design Principles](docs/design-system/design-principles.md)

## Important Notes

- Use `react-router-dom`, not `react-router`.
- Remote apps must be started before the host.
- Ensure ports do not conflict (3000/3001/3002/3003).
- Module Federation configuration must match between host and remote.
