export function formatCurrency(
  value: number | undefined,
  locale: string,
  currency: string,
  sign: "none" | "minus" | "plus" = "none"
) {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(Math.abs(value || 0));

  if (value === 0) return formattedValue;
  if (sign === "minus") return `- ${formattedValue}`;
  if (sign === "plus") return `+ ${formattedValue}`;

  return formattedValue;
}
