import { createContext } from "react";
import type { Checkout } from "./CheckoutProvider";

export interface CheckoutContext {
  checkout?: Checkout;
  setCheckout: (checkout: Checkout) => void;
}

export const CheckoutContext = createContext<CheckoutContext>(
  {} as CheckoutContext,
);
