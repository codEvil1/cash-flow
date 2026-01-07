import { useMemo, useState, type ReactNode } from "react";
import { DiscountContext } from "./DiscountContext";
import { usePayment } from "../Payment/usePayment";

export function DiscountProvider({ children }: { children: ReactNode }) {
  const { netTotal } = usePayment();

  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<number>(0);

  const totalWithDiscount = useMemo(() => {
    return Math.max(netTotal - discountValue, 0);
  }, [netTotal, discountValue]);

  return (
    <DiscountContext.Provider
      value={{
        couponCode,
        discountPercentage,
        discountValue,
        totalWithDiscount,
        setDiscountPercentage,
        setCouponCode,
        setDiscountValue,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
}
