# Design Principles

This document defines the design principles and design-system intentions for
the `vite-micro-frontends` dashboard. It is the source of truth for visual
consistency across the React remotes (MUI + TailwindCSS) and the Vue remote
(shadcn-style kit).

> **Status**: These principles are a living reference. Where explicit tokens
> don't yet exist, use these principles to make consistent choices. See the
> [Project Roadmap](../project-roadmap.md) (Phase 3) for the plan to formalize
> a token set.

## 1. Core Principles

### 1.1 Consistency across frameworks

The dashboard is rendered by React (MUI + Tailwind) and Vue (shadcn/ui). Both
must feel like **one product**:

- Use the same color palette, spacing scale, and typography rhythm in MUI
  themes and Tailwind config.
- Components that appear in both stacks (buttons, cards, inputs, tables,
  charts) should match in density, radius, and shadow.
- Internationalize every user-facing string through i18next.

### 1.2 Density for a data dashboard

Dashboards are information-dense by nature:

- Optimize for reading data at a glance (compact tables, clear hierarchy,
  effective white space — not maximal whitespace).
- Prefer small-to-medium spacing for dense widget grids; reserve generous
  spacing for landing/empty/editorial pages.

### 1.3 Clarity and hierarchy

- One clear primary action per view; secondary actions visually subdued.
- Typography scale provides obvious hierarchy: page titles (`xl`), section
  titles (`lg`), body/caption (`base`). The shared `Title` component encodes
  these sizes (`xl | lg | base`).
- Color conveys meaning (status, severity) — never as the only signal
  (pair with icons/text).

### 1.4 Data visualization with honesty

Charts (recharts in React; @unovis/vue in Vue) must communicate truthfully:

- Start axes at zero when the story is magnitude; use appropriate baselines
  for rate comparisons.
- Use a single, consistent palette for categorical series.
- Always label or tooltip data; avoid 3D/gratuitous decoration.

### 1.5 Accessibility and resilience

- Accessible controls (ARIA, focus states, keyboard navigation) — shadcn/ui
  (Radix) and MUI provide accessible primitives by default; preserve them.
- Provide meaningful **loading / empty / error** states: the app ships
  `Loader`, `Result`, `QueryWrapper` (remote-components) and error pages
  (`Forbidden`, `NotFound`, `UnderConstructions`).
- Never rely on color alone for status.

## 2. Proposed Design Tokens

> Reference values to be formalized in Phase 3. Adjust to taste, then encode
> them in MUI theme + Tailwind config.

### 2.1 Color

| Role               | Suggested base                         | Notes                                      |
| ------------------ | -------------------------------------- | ------------------------------------------ |
| Primary / brand    | Indigo/blue (e.g. `#6366f1`–`#3b82f6`) | Buttons, links, active nav, charts primary |
| Background         | White / neutral-50                     | App surfaces                               |
| Surface / card     | White / neutral-100                    | Cards, tables, widgets                     |
| Text primary       | Neutral-900                            | Headings, body                             |
| Text secondary     | Neutral-500                            | Captions, meta                             |
| Success / positive | Green                                  |                                            |
| Warning            | Amber                                  |                                            |
| Danger             | Red                                    |                                            |
| Info / neutral     | Blue / slate                           |                                            |

### 2.2 Spacing & radius

- Base unit **4px**; scale: `4, 8, 12, 16, 24, 32, 48`.
- Card radius ~`12px`; small controls ~`8px`; pills/pagination ~`9999px`.
- Grid gutters: `16–24px` for dashboards; `32px+` for marketing/landing views.

### 2.3 Typography

- UI font: Inter or system stack.
- Scale: `xs (12)`, `sm (14)`, `base (16)`, `lg (18)`, `xl (24)`, `2xl (30+)`.
- Numeric data: use tabular figures (monospaced digits) in tables/charts.

### 2.4 Elevation

- Subtle borders + low shadows on cards; shadows for menus/popovers/modals only.
- Avoid heavy drop shadows in dense data views.

## 3. Component & Layout Guidance

- **Cards/widgets** (see `host-dashboard/src/admin/widgets/*`): consistent
  header (title + meta), consistent padding, optional action link in top-right.
- **Status pages** (`Forbidden`, `NotFound`, `UnderConstructions`): centered,
  illustrative, with one primary action back to a safe route.
- **Forms** (remote-auth): MUI fields + Formik; clear labels, inline errors,
  consistent validation messages via yup + i18n.
- **Navigation**: AdminDrawer groups related pages; active state uses the
  primary color; user menu in AdminAppBar.
- **Settings-driven theming**: `SettingsProvider` already enables app-wide
  settings (e.g. dark mode) — keep new surfaces reading from those settings
  rather than hard-coded values.

## 4. Responsive Behavior

- Desktop-first dashboard; collapse to a drawer on narrow viewports.
- Widget grids reflow 1→2→4 columns with breakpoints.
- Charts scale to container width; provide horizontal scroll for dense tables
  on small screens.
- Touch targets ≥ ~40px on interactive controls for mobile.

## 5. Conventions for New Work

1. **Reuse before building**: check `remote-components` (Title, Footer, Loader,
   Result, QueryWrapper) and remote-vue `ui/` kit before hand-rolling a
   control.
2. **Tokens over literals**: prefer design tokens over inline hex/pixel values.
3. **Accessibility by default**: use accessible primitives (MUI / Radix);
   add focus-visible styles; test with keyboard.
4. **Match the neighbor stack**: a new widget must look identical whether
   rendered by React or Vue.
5. **Document deviations**: if a screen must break a principle, note why in the
   PR/commit.

## 6. Review Checklist

- [ ] Uses existing shared component instead of a duplicate.
- [ ] Palette/spacing/typography match the tokens above.
- [ ] One primary action per view; clear hierarchy.
- [ ] Loading/empty/error states present.
- [ ] Color is not the only status signal.
- [ ] Runs under both light and dark settings (settings-driven).
- [ ] Keyboard accessible; focus states visible.
- [ ] Labels/tooltips on charts; truthful axes.
