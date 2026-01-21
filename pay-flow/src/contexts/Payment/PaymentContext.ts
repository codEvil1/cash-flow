import { createContext } from "react";
import type { PaymentMethod } from "../../domain/enum";
import type { Installment } from "./PaymentProvider";

export interface PaymentContextData {
  paymentMethod: PaymentMethod;
  subTotal: number;
  netTotal: number;
  installment: Installment;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  setInstallmentCount: (installmentCount: number) => void;
}

export const PaymentContext = createContext<PaymentContextData>(
  {} as PaymentContextData,
);
