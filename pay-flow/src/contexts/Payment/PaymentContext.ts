import { createContext } from "react";
import type { PaymentMethod } from "../../domain/enum";

export interface PaymentContextData {
  subTotal: number;
  netTotal: number;
  paymentMethod: PaymentMethod;
  installmentCount: number;
  installmentAmount: number;
  interest: number;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  setInstallmentCount: (installmentCount: number) => void;
}

export const PaymentContext = createContext<PaymentContextData>(
  {} as PaymentContextData
);
