import { createContext } from "react";
import type { Cashier } from "./CashierProvider";

export interface CashierContextData {
  id?: number;
  cashier?: Cashier;
  loading: boolean;
  setId: (id?: number) => void;
  getCashier: () => void;
  setCashier: (cashier?: Cashier) => void;
}

export const CashierContext = createContext<CashierContextData>(
  {} as CashierContextData
);
