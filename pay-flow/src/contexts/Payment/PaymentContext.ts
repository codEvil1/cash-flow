import { createContext } from "react";
import type { PaymentMethod } from "../../config/enum";

export interface PaymentContextData {
  subTotal: number;
  netTotal: number;
  paymentMethod: PaymentMethod | undefined;
  brand: string;
  installmentCount: number;
  installmentAmount: number;
  setPaymentMethod: (paymentMethod: PaymentMethod | undefined) => void;
  setBrand: (brand: string) => void;
  setInstallmentCount: (installmentCount: number) => void;
}

export const PaymentContext = createContext<PaymentContextData>(
  {} as PaymentContextData
);
