# Deployment Guide

This guide covers running and deploying the `vite-micro-frontends` apps
locally (dev/preview), together via Docker Compose, and notes for a
production-like deployment.

## 1. Prerequisites

- Node.js `v20.11.1` (see `.nvmrc`); use a version manager or `nvm use`.
- PNPM `^8` locally; the Docker build pins `pnpm@9.15.9`.
- Docker + Docker Compose for the containerized path.

## 2. Environment Setup

Each app reads `.env` / `.env.example` for:

| Variable            | Default                 | Used by                              |
| ------------------- | ----------------------- | ------------------------------------ |
| `VITE_APP_NAME`     | e.g. `Micro Front-end`  | host, remote-auth, remote-components |
| `VITE_BASE_API_URL` | `http://localhost:8080` | all apps                             |

Generate `.env` files from templates:

```bash
pnpm run setup-env     # or: make setup-env
```

## 3. Local Development

### 3.1 All apps at once

```bash
pnpm install
pnpm run setup-env
pnpm dev               # pnpm -r --parallel dev
```

Opens the host on <http://localhost:3000>.

### 3.2 Individually (recommended for debugging)

Start remotes first, then the host:

```bash
cd remote-components && pnpm dev   # 3002
cd remote-auth      && pnpm dev    # 3001
cd remote-vue       && pnpm dev    # 3003
cd host-dashboard   && pnpm dev    # 3000
```

> **Important**: remotes must be running before the host loads them (the host
> lazy-loads each `remoteEntry.js` at runtime). Ports 3000–3003 must be free.

## 4. Build & Preview Production Bundles

```bash
pnpm build            # tsc -b && vite build for each app
pnpm preview          # serve all built apps (parallel)
```

- `host-dashboard` preview runs on **3000**; remote-auth on **3001**,
  remote-components on **3002**, remote-vue on **3003** (from their
  `dist/` folders).
- The host's Module Federation config points at the same localhost URLs used in
  dev, so preview expects remotes on those ports.

Run a single app:

```bash
cd host-dashboard && pnpm build && pnpm preview
```

## 5. Docker Compose (recommended)

`docker-compose.yml` defines five services on the `micro-frontend-network`
bridge, with a shared `types-volume` mounted at `/app/types` in every app:

| Service             | Host port → container | Depends on                                        |
| ------------------- | --------------------- | ------------------------------------------------- |
| `types`             | — (volume provider)   | —                                                 |
| `remote-components` | `3002:80`             | types                                             |
| `remote-auth`       | `3001:80`             | types, remote-components                          |
| `remote-vue`        | `3003:80`             | types                                             |
| `host-dashboard`    | `3000:80`             | types, remote-components, remote-auth, remote-vue |

Start everything:

```bash
make docker-up
# or
COMPOSE_BAKE=true docker compose up --build
```

Stop and remove:

```bash
docker compose down
```

### Build args

`VITE_APP_NAME` and `VITE_BASE_API_URL` are passed as build arguments with
defaults (see `docker-compose.yml`), and each service also reads its own
`./<app>/.env`.

## 6. Docker Image Anatomy

Each app ships a two-stage `Dockerfile` + `nginx.conf`.

**Build stage** (`node:20.11.1-alpine`):

1. Installs pnpm + typescript, copies `pnpm-workspace.yaml` and all
   `package.json` files.
2. `pnpm install --frozen-lockfile`.
3. Copies source, then `pnpm install && pnpm build` in the app directory.

**Run stage** (`nginx:stable-alpine`):

1. Copies `<app>/dist` → `/usr/share/nginx/html`.
2. Applies `nginx.conf` and exposes port 80.

**nginx.conf** highlights:

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;

    location / {
        try_files $uri $uri/ /index.html;      # SPA fallback
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location /assets/ {
        expires 1y;                            # long-cache fingerprinted assets
        add_header Cache-Control "public, max-age=31536000";
    }

    # host only:
    location /service-worker.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
}
```

## 7. Verifying a Deployment

After starting, confirm each endpoint responds:

```bash
curl -I http://localhost:3000/index.html     # host
curl -I http://localhost:3001/assets/remoteEntry.js   # remote-auth
curl -I http://localhost:3002/assets/remoteEntry.js   # remote-components
curl -I http://localhost:3003/assets/remoteEntry.js   # remote-vue
```

Then in the browser:

1. Load <http://localhost:3000> — expect the host shell.
2. Navigate to `/login`, `/register` — expect `remote-auth` pages.
3. Visit `/admin/vue` — expect the Vue dashboard mounted (with router-driven
   tabs and shared Pinia state).
4. Visit a bad path — expect `/404` from `remote-components`.
5. Open DevTools → Network: confirm remote entries are fetched from 3001/3002/3003
   and that only **one** React instance loads (shared deps work).

## 8. Production / Scaling Considerations

- **Host vs. remote URL coupling**: in this demo the host hard-codes
  `http://localhost:<port>/assets/remoteEntry.js`. For production, source
  remote entry URLs from a manifest/config at runtime (see
  [Project Roadmap](project-roadmap.md) Phase 7).
- **Cross-origin**: remotes on the same host but different ports are
  cross-origin. Ensure CORS/`Access-Control-Allow-Origin` allows the host to
  fetch remote entries if hosts differ.
- **Deploy independently**: a remote can be rebuilt and redeployed without
  touching the host, as long as its exposed API stays compatible with
  `mf-app-types`.
- **Order**: bring up remotes before the host, or the host will show loader/
  error fallbacks while remotes are unreachable.

## 9. Troubleshooting

| Symptom                                | Likely cause / fix                                                                                 |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| White screen or loader hangs on host   | A remote isn't running or its URL is wrong; start it first.                                        |
| "Duplicate React" / weird hooks errors | Module Federation `shared` list misses a dep; align host & remote `shared`.                        |
| Port already in use                    | Another app/process holds 3000–3003; release the port (`--strictPort` will fail fast).             |
| `remoteEntry.js` 404                   | App not built (`pnpm build`) or asset path/nginx base mismatch.                                    |
| `vite preview` can't find remotes      | Preview uses the same localhost ports baked into `vite.config.ts`; ensure remotes are bound there. |
| Build fails on `tsc -b`                | Type mismatch against `mf-app-types`; update the shared types package.                             |
