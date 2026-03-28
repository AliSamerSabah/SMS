import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes";
import "./index.css";
import AppProviders from "./AppProviders";

const root = document.getElementById("root") as HTMLDivElement;

createRoot(root).render(
  <StrictMode>
    <AppProviders>
        <AppRouter />
    </AppProviders>
  </StrictMode>,
);
