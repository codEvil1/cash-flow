import { useState, type ReactNode } from "react";
import { DiscountContext } from "./DiscountContext";
import { usePayment } from "../Payment/usePayment";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { calculateDiscountValue } from "../../utils/saleCalculations";

export interface Discount {
  couponCode?: string;
  discountPercentage?: number;
  discountValue?: number;
}

export function DiscountProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { netTotal } = usePayment();

  const [discount, setDiscount] = useState<Discount>();
  const [loading, setLoading] = useState<boolean>(false);

  const getDiscount = async (
    couponCode?: string
  ): Promise<Discount | undefined> => {
    try {
      // mock
      const discountPercentage = 10;
      const discountValue = calculateDiscountValue(
        netTotal,
        discountPercentage
      );
      return {
        couponCode,
        discountPercentage,
        discountValue,
      };
    } catch {
      toast.error(t("resetPassword.sentEmail"));
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DiscountContext.Provider
      value={{
        discount,
        loading,
        setDiscount,
        getDiscount,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
}
