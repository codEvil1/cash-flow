import { useContext } from "react";
import { CashierContext } from "./CashierContext";

export function useCashier() {
  return useContext(CashierContext);
}
