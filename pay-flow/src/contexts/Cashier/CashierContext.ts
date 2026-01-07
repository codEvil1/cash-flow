import { createContext } from "react";

export interface CashierContextData {
  id: number;
  name: string;
  ratings: number[];
  setId: (id: number) => void;
  setName: (name: string) => void;
  setRatings: (ratings: number[]) => void;
}

export const CashierContext = createContext<CashierContextData>(
  {} as CashierContextData
);
