import { createContext } from "react";
import type { SupportedCurrency } from "./currency.config";

interface CurrencyContextData {
  currency: SupportedCurrency;
  locale: string;
  setCurrency: (currency: SupportedCurrency) => void;
}

export const CurrencyContext = createContext<CurrencyContextData>(
  {} as CurrencyContextData
);
