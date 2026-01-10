import type { TFunction } from "i18next";
import { PaymentMethod } from "./enum";

export function getPaymentMethodLabel(
  method: PaymentMethod | undefined,
  t: TFunction
): string {
  if (!method) {
    return "-";
  }

  const map: Record<PaymentMethod, string> = {
    [PaymentMethod.CREDIT]: t("payment.credit"),
    [PaymentMethod.DEBIT]: t("payment.debit"),
    [PaymentMethod.CASH]: t("payment.cash"),
    [PaymentMethod.PIX]: t("payment.pix"),
  };

  return map[method] ?? "-";
}
