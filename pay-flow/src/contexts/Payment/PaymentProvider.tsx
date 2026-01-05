import { useMemo, type ReactNode } from "react";
import { PaymentContext } from "./PaymentContext";
import { calculateSubTotal } from "../../pages/Checkout/saleCalculations";
import { useProductList } from "../ProductList/useProductList";

export function PaymentProvider({ children }: { children: ReactNode }) {
  // const [netTotal, setNetTotal] = useState<number>(0);
  // const [discount, setDiscount] = useState<number>(0);
  // const [shipping, setShipping] = useState<number>(0);
  // const [paymentMethod, setPaymentMethod] = useState<string>("");
  // const [cardBrand, setCardBrand] = useState<string>("");
  // const [installments, setInstallments] = useState<number>(0);
  // const [installmentValue, setInstallmentValue] = useState<number>(0);

  const { productList } = useProductList();

  const subTotal = useMemo(() => calculateSubTotal(productList), [productList]);

  return (
    <PaymentContext.Provider
      value={{
        subTotal,
        // netTotal,
        // discount,
        // shipping,
        // paymentMethod,
        // cardBrand,
        // installments,
        // installmentValue,
        // setNetTotal,
        // setDiscount,
        // setShipping,
        // setPaymentMethod,
        // setCardBrand,
        // setInstallments,
        // setInstallmentValue,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
