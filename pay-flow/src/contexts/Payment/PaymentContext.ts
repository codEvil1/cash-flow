import { createContext } from "react";

export interface PaymentContextData {
  subtotal: number;
  netTotal: number;
  discount: number;
  shipping: number;
  paymentMethod: string;
  cardBrand: string;
  installments: number;
  installmentValue: number;
  setSubtotal: (subtotal: number) => void;
  setNetTotal: (netTotal: number) => void;
  setDiscount: (discount: number) => void;
  setShipping: (shipping: number) => void;
  setPaymentMethod: (paymentMethod: string) => void;
  setCardBrand: (cardBrand: string) => void;
  setInstallments: (installments: number) => void;
  setInstallmentValue: (installmentValue: number) => void;
}

export const PaymentContext = createContext<PaymentContextData>(
  {} as PaymentContextData
);
