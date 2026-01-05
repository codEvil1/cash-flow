import { useContext } from "react";

export function usePayment() {
  return useContext(PaymentContext);
}
