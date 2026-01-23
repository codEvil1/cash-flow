import { useState, type ReactNode } from "react";
import { DiscountContext } from "./DiscountContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { calculateDiscountValue } from "../../utils/saleCalculations";
import { useCheckout } from "../Checkout/useCheckout";

export interface Discount {
  couponCode?: string;
  discountPercentage?: number;
  discountValue?: number;
}

export function DiscountProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { checkout, setCheckout } = useCheckout();

  const [loading, setLoading] = useState<boolean>(false);

  const getDiscount = async (
    couponCode: string,
  ): Promise<Discount | undefined> => {
    try {
      // mock
      //TODO: inicialiizar subTotal zero
      const discountPercentage = 10;
      const discountValue = calculateDiscountValue(
        checkout?.payment?.subTotal ?? 0,
        discountPercentage,
      );
      const discount = {
        couponCode,
        discountPercentage,
        discountValue,
      };
      return discount;
    } catch {
      toast.error(t("discount.errorGetDiscount"));
    } finally {
      setLoading(false);
    }
  };

  const confirmDiscount = async (discount?: Discount) => {
    setCheckout((prev) => ({
      ...prev,
      discount,
    }));
  };

  return (
    <DiscountContext.Provider
      value={{
        loading,
        getDiscount,
        confirmDiscount,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
}
