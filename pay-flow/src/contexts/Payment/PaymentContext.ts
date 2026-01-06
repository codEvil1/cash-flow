import { createContext } from "react";

export interface PaymentContextData {
  subTotal: number;
  netTotal: number;
  paymentMethod: string;
  brand: string;
  installmentCount: number;
  installmentAmount: number;
  setPaymentMethod: (paymentMethod: string) => void;
  setBrand: (brand: string) => void;
  setInstallmentCount: (installmentCount: number) => void;
}

export const PaymentContext = createContext<PaymentContextData>(
  {} as PaymentContextData
);
