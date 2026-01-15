import { useMemo, useState, type ReactNode } from "react";
import { PaymentContext } from "./PaymentContext";
import {
  calculateInstallments,
  calculateInterest,
  calculateNetTotal,
  calculateSubTotal,
} from "../../utils/saleCalculations";
import { useProductList } from "../ProductList/useProductList";
import { useShipping } from "../Shipping/useShipping";
import { useDiscount } from "../Discount/useDiscount";
import { PaymentMethod } from "../../domain/enum";

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [installmentCount, setInstallmentCount] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH
  );

  const { productList } = useProductList();
  const { shipping } = useShipping();
  const { discount } = useDiscount();

  const subTotal = useMemo(() => calculateSubTotal(productList), [productList]);

  const netTotal = useMemo(
    () =>
      calculateNetTotal(
        productList,
        shipping?.freight,
        discount?.discountValue,
        installmentCount
      ),
    [discount?.discountValue, installmentCount, productList, shipping?.freight]
  );

  const installmentAmount = useMemo(
    () => calculateInstallments(netTotal, installmentCount),
    [installmentCount, netTotal]
  );

  const interest = useMemo(
    () => calculateInterest(subTotal, installmentCount),
    [installmentCount, subTotal]
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
