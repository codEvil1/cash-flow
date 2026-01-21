import { createContext } from "react";
import type { Checkout } from "./CheckoutProvider";

export interface CheckoutContext {
  checkout?: Checkout;
  setCheckout: React.Dispatch<React.SetStateAction<Checkout>>;
}

export const CheckoutContext = createContext<CheckoutContext>(
  {} as CheckoutContext,
);
