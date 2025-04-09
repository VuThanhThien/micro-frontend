import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { SWRConfig } from "swr";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ revalidateIfStale: false }}>
      <NextUIProvider>
        <main className="dark text-foreground bg-background min-h-screen flex flex-col items-center justify-center py-4">
          <App />
        </main>
      </NextUIProvider>
    </SWRConfig>
  </StrictMode>
);
