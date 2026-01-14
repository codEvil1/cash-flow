import { createContext } from "react";
import type { Cashier } from "./CashierProvider";

export interface CashierContextData {
  cashier?: Cashier;
  loading: boolean;
  getCashier: (id: number) => Promise<Cashier | undefined>;
  setCashier: (cashier?: Cashier) => void;
}

export const CashierContext = createContext<CashierContextData>(
  {} as CashierContextData
);
