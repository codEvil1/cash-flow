import { createContext } from "react";
import type { Shipping } from "./ShippingProvider";

export interface ShippingContextData {
  shipping?: Shipping;
  loading: boolean;
  setShipping: (shipping?: Shipping) => void;
  getShipping: () => void;
}

export const ShippingContext = createContext<ShippingContextData>(
  {} as ShippingContextData
);
