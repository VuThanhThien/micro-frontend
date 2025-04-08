import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { SWRConfig } from "swr";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig
      value={{
        revalidateIfStale: false,
      }}
    >
      <main className="bg-black min-h-screen flex flex-col items-center justify-center py-4">
        <App />
      </main>
    </SWRConfig>
  </StrictMode>
);
