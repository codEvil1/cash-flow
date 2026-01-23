import { useState, type ReactNode } from "react";
import { ShippingContext } from "./ShippingContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCheckout } from "../Checkout/useCheckout";

export interface Shipping {
  hasShipping: boolean;
  type?: string;
  deliveryTime?: string;
  freight?: number;
}

export function ShippingProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { setCheckout } = useCheckout();

  const [loading, setLoading] = useState<boolean>(false);

  const getShipping = async (
    identifier?: string,
  ): Promise<Shipping | undefined> => {
    try {
      // carrega o frete pelo identificador do cliente
      console.log(identifier);
      // mock
      const shipping = {
        hasShipping: true,
        type: "Sedex",
        deliveryTime: "7 dias Úteis",
        freight: 39.9,
      };
      return shipping;
    } catch {
      toast.error(t("shipping.errorGetShipping"));
    } finally {
      setLoading(false);
    }
  };

  const confirmShipping = async (shipping: Shipping) => {
    setCheckout((prev) => ({
      ...prev,
      shipping,
    }));
    toast.success(t("shipping.submitShipping"));
  };

  return (
    <ShippingContext.Provider
      value={{
        loading,
        getShipping,
        confirmShipping,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
}
