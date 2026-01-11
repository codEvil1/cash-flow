import type { TFunction } from "i18next";
import * as yup from "yup";

export const productListSchema = (t: TFunction) =>
  yup.object({
    quantity: yup
      .number()
      .required(t("validation.required"))
      .min(1, t("validation.minQuantity")),
  });
