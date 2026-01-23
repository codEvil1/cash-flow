import type { TFunction } from "i18next";
import * as yup from "yup";

export const cashierSchema = (t: TFunction) =>
  yup.object({
    id: yup.number().required(t("cashier.idRequired")),
  });
