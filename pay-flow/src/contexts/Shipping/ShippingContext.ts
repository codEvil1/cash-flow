import { createContext } from "react";
import type { Shipping } from "./ShippingProvider";

export interface ShippingContextData {
  loading: boolean;
  getShipping: (identifier?: string) => Promise<Shipping | undefined>;
  confirmShipping: (shipping: Shipping) => void;
}

export const ShippingContext = createContext<ShippingContextData>(
  {} as ShippingContextData,
);
