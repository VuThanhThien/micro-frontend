import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import './core/config/i18n';
import './mocks/server';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <App />
  </StrictMode>
);
