import type { TFunction } from "i18next";
import * as yup from "yup";

export const loginSchema = (t: TFunction) =>
  yup.object({
    email: yup
      .string()
      .trim()
      .lowercase()
      .email(t("login.emailInvalid"))
      .required(t("login.emailRequired")),

    password: yup
      .string()
      .min(12, t("login.passwordMin"))
      .matches(/^\S+$/, t("login.passwordNoSpaces"))
      .required(t("login.passwordRequired")),
  });
