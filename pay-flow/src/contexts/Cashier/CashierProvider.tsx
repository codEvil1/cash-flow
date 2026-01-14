import { useState, type ReactNode } from "react";
import { CashierContext } from "./CashierContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export interface Cashier {
  id?: number;
  name?: string;
  ratings?: number[];
}

export function CashierProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  const [cashier, setCashier] = useState<Cashier>();
  const [loading, setLoading] = useState<boolean>(false);

  const getCashier = async (id: number): Promise<Cashier | undefined> => {
    try {
      // carrega o atendente pelo id
      // mock
      return {
        id,
        name: "Ana Silva",
        ratings: [5, 4.7, 4.8, 5],
      };
    } catch {
      toast.error(t("resetPassword.sentEmail"));
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CashierContext.Provider
      value={{
        cashier,
        loading,
        setCashier,
        getCashier,
      }}
    >
      {children}
    </CashierContext.Provider>
  );
}
