import { useState, type ReactNode } from "react";
import { CustomerContext } from "./CustomerContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export interface Customer {
  identifier: string;
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  lastPurchase?: Date;
  adress?: string;
}

export function CustomerProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  const [customer, setCustomer] = useState<Customer>();
  const [loading, setLoading] = useState<boolean>(false);

  const getCustomer = async (
    identifier: string
  ): Promise<Customer | undefined> => {
    try {
      // carrega o cliente pelo identificador
      // mock
      return {
        identifier,
        name: "Bruno Paese",
        phone: "54999999999",
        email: "bruno@gmail.com",
        country: "BR",
        lastPurchase: new Date("2024-11-22"),
        adress: "Faria Lima, 999, Pinheiros, São Paulo",
      };
    } catch {
      toast.error(t("resetPassword.sentEmail"));
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        loading,
        getCustomer,
        setCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
