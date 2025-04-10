/// <reference types="vite/client" />
/// <reference types="mf-app-types" />

interface ImportMetaEnv {
    readonly VITE_LASTFM_API_KEY: string;
    readonly VITE_BASE_API_URL: string;
    readonly VITE_APP_NAME: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  