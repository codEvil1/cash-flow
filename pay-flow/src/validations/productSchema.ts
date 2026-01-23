import type { TFunction } from "i18next";
import * as yup from "yup";

export const productSchema = (t: TFunction) =>
  yup.object({
    item: yup.string().required(t("product.productRequired")),
    quantity: yup
      .number()
      .required(t("product.quantityRequired"))
      .min(1, t("product.minQuantity")),
  });
