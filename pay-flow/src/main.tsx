import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./contexts/Providers";
import { AppRoot } from "./AppRoot";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <AppRoot />
    </Providers>
  </StrictMode>,
);
