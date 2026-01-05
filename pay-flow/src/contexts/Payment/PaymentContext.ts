import { createContext } from "react";

export interface Installments {
  number: number;
  amount: number;
}

export interface PaymentContextData {
  subTotal: number;
  netTotal: number;
  paymentMethod: string;
  brand: string;
  installments: Installments[];
  setPaymentMethod: (paymentMethod: string) => void;
  setBrand: (brand: string) => void;
  setInstallments: (installments: Installments[]) => void;
}

export const PaymentContext = createContext<PaymentContextData>(
  {} as PaymentContextData
);
