import type { TFunction } from "i18next";
import * as yup from "yup";

export const paymentSchema = (t: TFunction) =>
  yup.object({
    paymentMethod: yup.number().required(t("validation.paymentMethodRequired")),
  });
