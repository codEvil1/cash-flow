import { useState, type ReactNode } from "react";
import { DiscountContext } from "./DiscountContext";

export function DiscountProvider({ children }: { children: ReactNode }) {
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<number>(0);

  return (
    <DiscountContext.Provider
      value={{
        couponCode,
        discountPercentage,
        discountValue,
        setDiscountPercentage,
        setCouponCode,
        setDiscountValue,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
}
