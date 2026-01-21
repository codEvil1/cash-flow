import { createContext } from "react";
import type { Discount } from "./DiscountProvider";

export interface DiscountContextData {
  loading: boolean;
  getDiscount: (couponCode: string) => Promise<Discount | undefined>;
  confirmDiscount: (discount: Discount) => void;
}

export const DiscountContext = createContext<DiscountContextData>(
  {} as DiscountContextData,
);
