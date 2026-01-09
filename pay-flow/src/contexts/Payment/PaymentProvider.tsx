import { useMemo, useState, type ReactNode } from "react";
import { PaymentContext } from "./PaymentContext";
import {
  calculateInstallments,
  calculateNetTotal,
  calculateSubTotal,
} from "../../utils/saleCalculations";
import { useProductList } from "../ProductList/useProductList";
import { useShipping } from "../Shipping/useShipping";
import { useDiscount } from "../Discount/useDiscount";
import { PaymentMethod } from "../../config/enum";

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<string>("");
  const [installmentCount, setInstallmentCount] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(
    undefined
  );

  const { productList } = useProductList();
  const { freight } = useShipping();
  const { discountValue } = useDiscount();

  const subTotal = useMemo(() => calculateSubTotal(productList), [productList]);
  const netTotal = useMemo(
    () => calculateNetTotal(productList, freight, discountValue),
    [discountValue, freight, productList]
  );
  const installmentAmount = useMemo(
    () => calculateInstallments(netTotal, installmentCount),
    [installmentCount, netTotal]
  );

  return (
    <PaymentContext.Provider
      value={{
        subTotal,
        netTotal,
        paymentMethod,
        brand,
        installmentCount,
        installmentAmount,
        setPaymentMethod,
        setBrand,
        setInstallmentCount,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
