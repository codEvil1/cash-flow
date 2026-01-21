import { createContext } from "react";
import type { Cashier } from "./CashierProvider";

export interface CashierContextData {
  loading: boolean;
  getCashier: (id: number) => Promise<Cashier | undefined>;
  confirmCashier: (cashier: Cashier) => void;
}

export const CashierContext = createContext<CashierContextData>(
  {} as CashierContextData,
);
