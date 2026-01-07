import { createContext } from "react";

export interface DiscountContextData {
  couponCode: string;
  discountPercentage: number;
  discountValue: number;
  totalWithDiscount: number;
  setCouponCode: (cuponCode: string) => void;
  setDiscountPercentage: (discountPercentage: number) => void;
  setDiscountValue: (discountValue: number) => void;
}

export const DiscountContext = createContext<DiscountContextData>(
  {} as DiscountContextData
);
