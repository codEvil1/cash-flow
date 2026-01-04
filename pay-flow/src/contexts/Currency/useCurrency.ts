import { useContext } from "react";
import { CurrencyContext } from "./CurrencyContext";

export function useCurrency() {
  return useContext(CurrencyContext);
}
