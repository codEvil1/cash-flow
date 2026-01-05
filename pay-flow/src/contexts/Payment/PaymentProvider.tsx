import { useState, type ReactNode } from "react";
import { PaymentContext } from "./PaymentContext";

export function ProductListProvider({ children }: { children: ReactNode }) {
  const [subtotal, setSubtotal] = useState<number>(0);
  const [netTotal, setNetTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [cardBrand, setCardBrand] = useState<string>('');
  const [installments, setInstallments] = useState<number>(0);
  const [installmentValue, setInstallmentValue] = useState<number>(0);

  return (
    <PaymentContext.Provider
      value={{
        subtotal,
        netTotal,
        discount,
        shipping,
        paymentMethod,
        cardBrand,
        installments,
        installmentValue,
        setSubtotal,
        setNetTotal,
        setDiscount,
        setShipping,
        setPaymentMethod,
        setCardBrand,
        setInstallments,
        setInstallmentValue,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
