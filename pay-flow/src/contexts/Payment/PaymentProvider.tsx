import { useEffect, useMemo, useState, type ReactNode } from "react";
import { PaymentContext } from "./PaymentContext";
import {
  calculateInstallments,
  calculateInterest,
  calculateNetTotal,
  calculateSubTotal,
} from "../../utils/saleCalculations";
import { useProductList } from "../ProductList/useProductList";
import { PaymentMethod } from "../../domain/enum";
import { useCheckout } from "../Checkout/useCheckout";

export interface Installment {
  count: number;
  value?: number;
  interest?: number;
}

export interface Payment {
  paymentMethod?: number;
  installment: Installment;
  subTotal?: number;
  netTotal: number;
}

export function PaymentProvider({ children }: { children: ReactNode }) {
  const { productList } = useProductList();
  const { checkout, setCheckout } = useCheckout();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH,
  );

  const [installment, setInstallment] = useState<Installment>({
    count: 1,
  });

  const subTotal = useMemo(() => calculateSubTotal(productList), [productList]);

  const baseTotal = useMemo(
    () =>
      calculateNetTotal(
        productList,
        checkout?.shipping?.freight,
        checkout?.discount?.discountValue,
      ),
    [
      checkout?.discount?.discountValue,
      checkout?.shipping?.freight,
      productList,
    ],
  );

  const interest = useMemo(
    () => calculateInterest(baseTotal, installment.count),
    [baseTotal, installment.count],
  );

  const netTotal = useMemo(() => baseTotal + interest, [baseTotal, interest]);

  const installmentAmount = useMemo(
    () => calculateInstallments(netTotal, installment.count),
    [netTotal, installment.count],
  );

  useEffect(() => {
    setCheckout((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        payment: {
          paymentMethod,
          installment: {
            count: installment.count,
            value: installmentAmount,
            interest,
          },
          subTotal,
          netTotal,
        },
      };
    });
  }, [
    installment.count,
    installmentAmount,
    interest,
    netTotal,
    paymentMethod,
    setCheckout,
    subTotal,
  ]);

  const setInstallmentCount = (count: number) => {
    setInstallment((prev) => ({ ...prev, count }));
  };

  return (
    <PaymentContext.Provider
      value={{
        paymentMethod,
        subTotal,
        netTotal,
        installment,
        setPaymentMethod,
        setInstallmentCount,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
