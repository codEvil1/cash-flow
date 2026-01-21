import { useMemo, useState, type ReactNode } from "react";
import { PaymentContext } from "./PaymentContext";
import {
  calculateInstallments,
  calculateInterest,
  calculateNetTotal,
  calculateSubTotal,
} from "../../utils/saleCalculations";
import { useProductList } from "../ProductList/useProductList";
import { useDiscount } from "../Discount/useDiscount";
import { PaymentMethod } from "../../domain/enum";
import { useCheckout } from "../Checkout/useCheckout";

export function PaymentProvider({ children }: { children: ReactNode }) {
  const { productList } = useProductList();
  const { checkout } = useCheckout();
  const { discount } = useDiscount();

  const [installmentCount, setInstallmentCount] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH,
  );

  const subTotal = useMemo(() => calculateSubTotal(productList), [productList]);

  const netTotal = useMemo(
    () =>
      calculateNetTotal(
        productList,
        checkout?.shipping?.freight,
        discount?.discountValue,
        installmentCount,
      ),
    [
      checkout?.shipping?.freight,
      discount?.discountValue,
      installmentCount,
      productList,
    ],
  );

  const installmentAmount = useMemo(
    () => calculateInstallments(netTotal, installmentCount),
    [installmentCount, netTotal],
  );

  const interest = useMemo(
    () => calculateInterest(subTotal, installmentCount),
    [installmentCount, subTotal],
  );

  return (
    <PaymentContext.Provider
      value={{
        subTotal,
        netTotal,
        paymentMethod,
        installmentCount,
        installmentAmount,
        interest,
        setPaymentMethod,
        setInstallmentCount,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
