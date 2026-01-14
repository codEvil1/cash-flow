import { useState, type ReactNode } from "react";
import { ShippingContext } from "./ShippingContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCustomer } from "../Customer/useCustomer";

export interface Shipping {
  type: string;
  deliveryTime: string;
  freight: number;
}

export function ShippingProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { customer } = useCustomer();

  const [shipping, setShipping] = useState<Shipping>();
  const [loading, setLoading] = useState<boolean>(false);

  const getShipping = async () => {
    try {
      console.log(customer);
      setShipping({
        type: "Sedex",
        deliveryTime: "7 dias Úteis",
        freight: 39.9,
      });
    } catch {
      toast.error(t("resetPassword.sentEmail"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ShippingContext.Provider
      value={{
        shipping,
        loading,
        setShipping,
        getShipping,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
}
