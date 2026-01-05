import { useMemo, useState, type ReactNode } from "react";
import { PaymentContext, type Installments } from "./PaymentContext";
import {
  calculateNetTotal,
  calculateSubTotal,
} from "../../pages/Checkout/saleCalculations";
import { useProductList } from "../ProductList/useProductList";
import { useShipping } from "../Shipping/useShipping";

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [installments, setInstallments] = useState<Installments[]>([]);

  const { productList } = useProductList();
  const { freight } = useShipping();

  const subTotal = useMemo(() => calculateSubTotal(productList), [productList]);
  const netTotal = useMemo(
    () => calculateNetTotal(productList, freight),
    [freight, productList]
  );

  return (
    <PaymentContext.Provider
      value={{
        subTotal,
        netTotal,
        paymentMethod,
        brand,
        installments,
        setPaymentMethod,
        setBrand,
        setInstallments,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
