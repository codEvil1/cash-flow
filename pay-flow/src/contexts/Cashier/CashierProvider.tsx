import { useState, type ReactNode } from "react";
import { CashierContext } from "./CashierContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCheckout } from "../Checkout/useCheckout";

export interface Cashier {
  id?: number;
  name?: string;
  ratings?: number[];
}

export function CashierProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { setCheckout } = useCheckout();

  const [loading, setLoading] = useState<boolean>(false);

  const getCashier = async (id: number): Promise<Cashier | undefined> => {
    try {
      // carrega o atendente pelo id
      // mock
      const cashier = {
        id,
        name: "Ana Silva",
        ratings: [5, 4.7, 4.8, 5],
      };
      return cashier;
    } catch {
      toast.error(t("cashier.errorGetCashier"));
    } finally {
      setLoading(false);
    }
  };

  const confirmCashier = async (cashier?: Cashier) => {
    setCheckout((prev) => ({
      ...prev,
      cashier,
    }));
  };

  return (
    <CashierContext.Provider
      value={{
        loading,
        getCashier,
        confirmCashier,
      }}
    >
      {children}
    </CashierContext.Provider>
  );
}
