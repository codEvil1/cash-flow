import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalStyle } from "./components/Style/style.ts";
import "./i18n";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/index.tsx";
import { ThemeProvider } from "./contexts/Theme/ThemeProvider.tsx";
import { CurrencyProvider } from "./contexts/Currency/CurrencyProvider";
import { ProductListProvider } from "./contexts/ProductList/ProductListProvider.tsx";
import { PaymentProvider } from "./contexts/Payment/PaymentProvider.tsx";
import { ShippingProvider } from "./contexts/Shipping/ShippingProvider.tsx";
import { DiscountProvider } from "./contexts/Discount/ShippingProvider.tsx";

// TODO: alterar tema do toast conforme seleção

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CurrencyProvider>
      <ThemeProvider>
        <ProductListProvider>
          <PaymentProvider>
            <ShippingProvider>
              <DiscountProvider>
                <GlobalStyle />
                <AppRoutes />
                <ToastContainer
                  position="bottom-right"
                  autoClose={3000}
                  closeOnClick
                  pauseOnHover
                  draggable
                  theme="dark"
                />
              </DiscountProvider>
            </ShippingProvider>
          </PaymentProvider>
        </ProductListProvider>
      </ThemeProvider>
    </CurrencyProvider>
  </StrictMode>
);
