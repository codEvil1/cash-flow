import { createContext } from "react";
import type { PaymentMethod } from "../../domain/enum";

export interface PaymentContextData {
  subTotal: number;
  netTotal: number;
  paymentMethod: PaymentMethod | undefined;
  installmentCount: number;
  installmentAmount: number;
  setPaymentMethod: (paymentMethod: PaymentMethod | undefined) => void;
  setInstallmentCount: (installmentCount: number) => void;
}

export const PaymentContext = createContext<PaymentContextData>(
  {} as PaymentContextData
);
