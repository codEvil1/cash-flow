import { useState, type ReactNode } from "react";
import { CustomerContext } from "./CustomerContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export interface Customer {
  name: string;
  phone: string;
  email: string;
  country: string;
  lastPurchase: Date;
}

export function CustomerProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  const [identifier, setIdentifier] = useState<string| undefined>("");
  const [customer, setCustomer] = useState<Customer>();
  const [loading, setLoading] = useState<boolean>(false);

  const getCustomer = async () => {
    try {
      setCustomer({
        name: "Bruno Paese",
        phone: "54994057272",
        email: "brunoviniciuspaese@gmail.com",
        country: "BR",
        lastPurchase: new Date("2024-11-22"),
      });
    } catch {
      toast.error(t("resetPassword.sentEmail"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        identifier,
        customer,
        loading,
        setIdentifier,
        getCustomer,
        setCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
