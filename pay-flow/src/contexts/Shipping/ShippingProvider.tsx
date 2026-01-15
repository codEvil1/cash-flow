import { useState, type ReactNode } from "react";
import { ShippingContext } from "./ShippingContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export interface Shipping {
  hasShipping: boolean;
  type?: string;
  deliveryTime?: string;
  freight?: number;
}

export function ShippingProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  const [shipping, setShipping] = useState<Shipping>();
  const [loading, setLoading] = useState<boolean>(false);

  const getShipping = async (
    identifier?: string
  ): Promise<Shipping | undefined> => {
    try {
      // carrega o frete pelo identificador do cliente
      console.log(identifier);
      // mock
      return {
        hasShipping: true,
        type: "Sedex",
        deliveryTime: "7 dias Úteis",
        freight: 39.9,
      };
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
