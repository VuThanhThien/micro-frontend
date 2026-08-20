# Project Roadmap

This roadmap captures the **current baseline** (already in the repository) and a
sensible **next set of phases** for maturing the micro frontend showcase into a
production-ready system. Items are intentionally ordered to de-risk the
architecture before adding breadth.

## Phase 0 — Baseline (DONE ✅)

The repository already delivers:

- [x] PNPM workspace monorepo with 5 packages.
- [x] Module Federation host (`dashboard`) + three remotes (`auth`,
      `components`, `vue`).
- [x] React 18 dashboard shell with routing/admin/landing/users/vue pages.
- [x] Authentication flow (login, register, forgot password) in `remote-auth`.
- [x] Reusable UI library + error pages + snackbar context in
      `remote-components`.
- [x] Vue 3 widgets exposed via a `mount` bridge.
- [x] Shared `mf-app-types` declarations for the federation boundary.
- [x] Browser mock API (`axios-mock-adapter` + JSON fixtures).
- [x] Containerized build/nginx per app + `docker-compose.yml`.
- [x] Tooling: ESLint + Prettier + Husky + lint-staged.
- [x] Starter documentation (`.docs/` set).

## Phase 1 — Architecture Hardening

De-risk the foundation before scaling.

- [ ] **Version + auto-publish the `types` contract.** Convert `mf-app-types`
      usage to a strict, hand-maintained contract with an explicit upgrade
      guide; add a small `scripts/verify-contract` check in CI.
- [ ] **Remove monolith-era duplication.** `@material-ui/core@4` and
      `@mui/*@6` coexist; consolidate on MUI v6 and remove legacy deps.
- [ ] **Strict shared-dependency audit.** Freeze the `shared` lists; add a
      test that asserts no double-loaded React/MUI instances.
- [ ] **Startup-order enforcement.** Add a preflight script that probes each
      remote `remoteEntry.js` before the host boots, with clear error messages.
- [ ] **Error boundary + federation failure UX.** Wrap remote loads in
      `ErrorBoundary`; surface a friendly "module failed to load" state.

## Phase 2 — Migrate Host Pages into Remotes

Shrink the host shell by pushing domain pages to remotes (the natural micro
frontend direction).

- [ ] **Move admin/user-management into a remote** (e.g. `remote-admin`) so
      teams own features end-to-end.
- [ ] **Move landing into a remote** (or its own `remote-landing`).
- [ ] **Move authentication-related host hooks** (useLogin, useRegister, …)
      fully into `remote-auth` and consume them through the federation boundary.
- [ ] Keep only routing, shell/layout, and cross-cutting providers in the host.
- [ ] Update `mf-app-types` and this architectural documentation as boundaries
      move.

## Phase 3 — Design System & Consistency

- [ ] Promote `docs/design-system/design-principles.md` into a formal token
      set (color, spacing, typography) applied consistently across MUI themes
      and Tailwind config.
- [ ] Consolidate the shadcn/ui set in `remote-vue` with the MUI components in
      React remotes so widgets look like one product.
- [ ] Add dark-mode + theming across all apps (the host `SettingsProvider`
      already hints at settings-driven theming).
- [ ] i18n coverage audit — ensure every user-facing string in all remotes is
      keyed through i18next.

## Phase 4 — Automation & CI/CD

- [ ] **CI pipeline** (GitHub Actions or equivalent): install → lint →
      type-check (`tsc -b`) → build each app → publish Docker images with
      immutable tags.
- [ ] **Per-app independent deploys.** Script/automate deploying a single
      remote without rebuilding the host.
- [ ] **Contract regression gate.** Fail CI on a `remoteEntry.js` shape change
      that breaks the host's declared remotes.
- [ ] Add `pnpm lint ` + `pnpm typecheck` scripts across `-r` for one-command
      verification.
- [ ] Enforce Prettier/lint in CI, not just at commit time.

## Phase 5 — Testing

- [ ] **Unit tests** (Vitest) for core utilities (`authStorage`, axios client,
      mock server).
- [ ] **Component tests** for remote-components (Title, Footer, error pages)
      and remote-vue UI kit.
- [ ] **Integration test** that mounts the host with a mocked federation
      boundary and asserts routes render.
- [ ] **E2E** (Playwright): boot remotes + host, verify login flow, dashboard
      navigation, and the Vue dashboard mount/unmount.
- [ ] **Visual regression** for the design system after Phase 3 lands.

## Phase 6 — Real Backend & Auth

- [ ] Replace browser mocks with a real API behind `VITE_BASE_API_URL`.
- [ ] True JWT auth integration (`jwt-decode` is already a dependency) and
      route guards using `useAuth`.
- [ ] Centralized authorization via `hasRole` across remotes.
- [ ] Service-worker/PWA strategy review for production caching of assets and
      remote entries.

## Phase 7 — Scale & Observability

- [ ] **Multi-team workflow**: per-team remotes with owned repositories and
      versioned releases (contract-first via `mf-app-types`).
- [ ] **Observability**: Sentry is already a dependency — wire error + performance
      monitoring across remotes.
- [ ] **Module-version strategy**: decide between build-time pinned remote URLs
      vs. a dynamic manifest/CDN for remote entries.
- [ ] **Automatic scaling** of container orchestration (beyond the local
      `docker-compose` demo).

## Suggested Sequencing

```
Phase 0 (done) → Phase 1 → Phase 2 → Phase 3
                         ↘ Phase 4 ⇄ Phase 5 → Phase 6 → Phase 7
```

Phases 1, 4, and 5 are largely **parallel-safe** after Phase 1's shared-dependency
freeze; Phases 2 and 3 benefit from doing 1 first. Phase 6 depends on Phase 5's
test safety net. Phase 7 is continuous improvement.
