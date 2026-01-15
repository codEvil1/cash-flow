import type { TFunction } from "i18next";
import * as yup from "yup";

export const discountSchema = (t: TFunction) =>
  yup.object({
    couponCode: yup.string().trim().required(t("validation.required")),
  });
