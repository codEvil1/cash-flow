import { useState, type ReactNode } from "react";
import { CashierContext } from "./CashierContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export interface Cashier {
  id: number;
  name: string;
  ratings: number[];
}

export function CashierProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  const [id, setId] = useState<number | undefined>(undefined);
  const [cashier, setCashier] = useState<Cashier>();
  const [loading, setLoading] = useState<boolean>(false);

  const getCashier = async () => {
    try {
      setCashier({ id: 666, name: "Ana Silva", ratings: [5, 4.7, 4.8, 5] });
    } catch {
      toast.error(t("resetPassword.sentEmail"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <CashierContext.Provider
      value={{
        id,
        cashier,
        loading,
        setId,
        setCashier,
        getCashier,
      }}
    >
      {children}
    </CashierContext.Provider>
  );
}
