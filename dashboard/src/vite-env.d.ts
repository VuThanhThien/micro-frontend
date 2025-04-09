/// <reference types="vite/client" />
/// <reference types="mf-app-types" />

interface ImportMetaEnv {
  readonly VITE_LASTFM_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
