import { createContext } from "react";
import type { Shipping } from "./ShippingProvider";

export interface ShippingContextData {
  shipping?: Shipping;
  loading: boolean;
  setShipping: (shipping: Shipping) => void;
  getShipping: (identifier?: string) => Promise<Shipping | undefined>;
}

export const ShippingContext = createContext<ShippingContextData>(
  {} as ShippingContextData
);
