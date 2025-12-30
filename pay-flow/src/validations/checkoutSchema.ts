import type { TFunction } from "i18next";
import * as yup from "yup";

export const checkoutSchema = (t: TFunction) =>
  yup.object({
    product: yup
      .string()
      .trim()
      .lowercase()
      .required(t("validation.emailRequired")),
  });
