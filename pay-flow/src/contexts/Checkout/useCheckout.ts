import { useContext } from "react";
import { CheckoutContext } from "./CheckoutContext";

export function useCheckout() {
  return useContext(CheckoutContext);
}
