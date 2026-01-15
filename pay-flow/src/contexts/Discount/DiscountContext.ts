import { createContext } from "react";
import type { Discount } from "./DiscountProvider";

export interface DiscountContextData {
  discount?: Discount;
  loading: boolean;
  setDiscount: (discount: Discount) => void;
  getDiscount: (couponCode?: string) => Promise<Discount | undefined>;
}

export const DiscountContext = createContext<DiscountContextData>(
  {} as DiscountContextData
);
