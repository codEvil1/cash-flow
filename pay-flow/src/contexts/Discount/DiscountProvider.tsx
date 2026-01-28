import { useMemo, useState, type ReactNode } from "react";
import { DiscountContext } from "./DiscountContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  calculateDiscountValue,
  calculateTotalWithDiscount,
} from "../../utils/saleCalculations";
import { useCheckout } from "../Checkout/useCheckout";

export interface Discount {
  couponCode?: string;
  discountPercentage?: number;
  discountValue?: number;
  totalWithDiscount?: number;
}

export function DiscountProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { checkout, setCheckout } = useCheckout();

  const [loading, setLoading] = useState<boolean>(false);

  const discountValue = useMemo(() => {
    console.log(
      calculateDiscountValue(
        checkout?.payment?.subTotal,
        checkout?.discount?.discountPercentage,
      ),
    );
    return calculateDiscountValue(
      checkout?.payment?.subTotal,
      checkout?.discount?.discountPercentage,
    );
  }, [checkout?.discount?.discountPercentage, checkout?.payment?.subTotal]);

  const totalWithDiscount = useMemo(() => {
    console.log(
      calculateTotalWithDiscount(
        checkout?.payment?.subTotal,
        checkout?.discount?.discountValue,
      ),
    );
    return calculateTotalWithDiscount(
      checkout?.payment?.subTotal,
      checkout?.discount?.discountValue,
    );
  }, [checkout?.discount?.discountValue, checkout?.payment?.subTotal]);

  const getDiscount = async (
    couponCode: string,
  ): Promise<Discount | undefined> => {
    try {
      // mock
      //TODO: inicializar subTotal zero
      const discountPercentage = 10;
      const discount = {
        couponCode,
        discountPercentage,
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
    toast.success(t("discount.submitDiscount"));
  };

  return (
    <DiscountContext.Provider
      value={{
        loading,
        getDiscount,
        discountValue,
        totalWithDiscount,
        confirmDiscount,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
}
