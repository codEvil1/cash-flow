import type { TFunction } from "i18next";
import * as yup from "yup";

export const productSchema = (t: TFunction) =>
  yup.object({
    item: yup.string().required(t("validation.required")),
    quantity: yup
      .number()
      .required(t("validation.required"))
      .min(1, t("validation.minQuantity")),
    price: yup.number().required(t("validation.required")),
  });
