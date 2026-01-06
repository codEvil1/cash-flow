import { useContext } from "react";
import { PaymentContext } from "./PaymentContext";

export function usePayment() {
  return useContext(PaymentContext);
}
