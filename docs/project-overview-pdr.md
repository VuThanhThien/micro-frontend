# Project Overview & Product Development Requirements (PDR)

## 1. Project Overview

**Vite Micro Frontends** is a demonstration/showcase of a **micro frontend
architecture** implemented with **Vite + Module Federation**
(`@originjs/vite-plugin-federation`). The result is a full dashboard application
composed of several independently built, deployed, and versioned front-end
applications that cooperate at runtime in the browser.

The project is a **PNPM workspace monorepo** containing:

- A **host** application (shell) responsible for routing, layout, and composing
  remote modules.
- Three **remote** applications (auth, components, Vue widgets) that expose
  modules consumed by the host.
- A shared **types** package providing type declarations for the cross-app
  Module Federation boundaries.

### Goals

- Demonstrate how independent, separately-owned front-end teams can ship to the
  same product surface without a coordinated monolith release.
- Show a realistic **dashboard** (user management, authentication, reusable UI,
  Vue-based widgets) as the shared product surface.
- Establish a reusable pattern (config, shared deps, types, Docker/nginx
  deployment) that can be lifted into a production system.

### Non-Goals (for this demo)

- Production-scale authentication, authorization, or real backend integration.
- End-to-end API integration — data is served by in-browser mocks
  (`axios-mock-adapter`). `VITE_BASE_API_URL` points at `http://localhost:8080`
  but is intended for a future/optional backend.
- Cross-team build/git workflow automation.

## 2. Stakeholders & Audience

| Stakeholder             | Interest                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------ |
| Front-end engineers     | Learn the micro-frontend + Module Federation pattern, code and folder conventions.   |
| Architects / Tech leads | Evaluate the architecture (host/remote boundaries, shared deps, types) for adoption. |
| DevOps / Platform       | Understand the containerized build and deployment topology.                          |
| Product owners          | See the product surface (dashboard features) the demo delivers.                      |

## 3. Product Requirements

### 3.1 Functional Requirements

| ID    | Requirement            | Detail                                                                                                                                                      | App                           |
| ----- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| FR-01 | Host shell & routing   | Serve the landing page, guarded admin area, and wildcard/404 handling.                                                                                      | host-dashboard                |
| FR-02 | Authentication flow    | Login, register, forgot password (submit/reset), session/logout.                                                                                            | remote-auth (exposed to host) |
| FR-03 | User management        | Admin page for managing users.                                                                                                                              | host-dashboard                |
| FR-04 | Profile management     | Profile overview, activity, information, password update.                                                                                                   | host-dashboard                |
| FR-05 | Dashboard widgets      | Charts, budgets, activity, sales, notifications, calendar.                                                                                                  | host-dashboard + remote-vue   |
| FR-06 | Reusable UI components | Title/Footer, app status pages (404/403/under construction), snackbar/toast context.                                                                        | remote-components             |
| FR-07 | Vue widgets            | A Vue 3 dashboard composition integrated into the host shell, with Vue-Router tab pages and Pinia state, embedded via a memory-history + navigation bridge. | remote-vue                    |
| FR-08 | Error & empty states   | Forbidden (403), Not Found (404), Under Construction pages.                                                                                                 | remote-components             |
| FR-09 | Localization (i18n)    | Label/message translation via i18next across React remotes.                                                                                                 | host + React remotes          |
| FR-10 | Mocked data            | Realistic mock API via axios-mock-adapter (users, notifications, activity logs, profile, events).                                                           | host-dashboard (mocks)        |

### 3.2 Non-Functional Requirements

| ID     | Requirement      | Target / Notes                                                                                                                                                      |
| ------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-01 | Performance      | Lazy-load remote modules and heavy pages via `React.lazy` + `Suspense`; Minify disabled, CSS code-splitting off (kept simple for the demo).                         |
| NFR-02 | Availability     | Remotes must be reachable before the host loads them; otherwise the host shows its fallback loader.                                                                 |
| NFR-03 | Consistency      | Shared dependencies (react, react-dom, react-router(-dom), MUI, axios, i18next, …) are declared `shared` in Module Federation to avoid duplicate runtime instances. |
| NFR-04 | Type safety      | Cross-app modules typed through the shared `types` package (`mf-app-types`).                                                                                        |
| NFR-05 | Code quality     | ESLint (`typescript-eslint`), Prettier (`format:all`), Husky + lint-staged on commit.                                                                               |
| NFR-06 | Deployability    | Each app containerized (Dockerfile + nginx.conf) and served on its own port; orchestrated by `docker-compose`.                                                      |
| NFR-07 | SEO/PWA          | host-dashboard ships a service worker + PWA manifest via `vite-plugin-pwa`.                                                                                         |
| NFR-08 | Security headers | nginx configuration adds X-Frame-Options, X-XSS-Protection, X-Content-Type-Options.                                                                                 |

## 4. Business Context

This is a **technical showcase**, not a shipped product. It demonstrates that a
feature-rich dashboard can be decomposed into independently deployable
front-end services. The primary "customers" are engineers evaluating the
pattern for real teams; secondary is demonstrating a cohesive product surface
(a real-feeling dashboard) despite the architecture.

## 5. Scope & Boundaries

**In scope** for v1 (current baseline):

- Monorepo workspace with five packages.
- Module Federation host/remote wiring.
- Mocked dashboard + authentication + shared component scenarios.
- Containerized build & local orchestration.

**Out of scope** (future — see [Project Roadmap](project-roadmap.md)):

- Real backend/API and true JWT authentication flow.
- CI/CD automation and automated testing.
- Migrating host pages into additional remotes.
- Observability, error tracking, and serious PWA caching strategy.

## 6. Success Metrics

For a demo/showcase the primary metrics are:

- **Architecture clarity** — new engineers can identify the host/remote
  boundaries, shared deps, and types contract within one session.
- **Independent build/deploy** — each app can be built and served standalone.
- **Runtime composition** — the host renders all remotes correctly
  (no duplicate React instances, correct lazy loading).
