export const currencyByLocale = {
  "pt-BR": "BRL",
  "en-US": "USD",
  "es-ES": "EUR",
} as const;

export type SupportedLocale = keyof typeof currencyByLocale;
export type SupportedCurrency = (typeof currencyByLocale)[SupportedLocale];
