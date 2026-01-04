import { useState } from "react";
import { CurrencyContext } from "./CurrencyContext";
import { currencyByLocale } from "./currency.config";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const systemLocale = new Intl.NumberFormat().resolvedOptions().locale;

  const defaultCurrency =
    currencyByLocale[systemLocale as keyof typeof currencyByLocale] ?? "USD";

  const [currency, setCurrency] = useState(defaultCurrency);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        locale: systemLocale,
        setCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}
