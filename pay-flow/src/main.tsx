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
import { CustomerProvider } from "./contexts/Customer/CustomerProvider.tsx";
import { CashierProvider } from "./contexts/Cashier/CashierProvider.tsx";

// TODO: alterar tema do toast conforme seleção

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CurrencyProvider>
      <ThemeProvider>
        <ProductListProvider>
          <PaymentProvider>
            <ShippingProvider>
              <DiscountProvider>
                <CustomerProvider>
                  <CashierProvider>
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
                  </CashierProvider>
                </CustomerProvider>
              </DiscountProvider>
            </ShippingProvider>
          </PaymentProvider>
        </ProductListProvider>
      </ThemeProvider>
    </CurrencyProvider>
  </StrictMode>
);
