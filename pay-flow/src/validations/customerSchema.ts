import type { TFunction } from "i18next";
import * as yup from "yup";

export const customerSchema = (t: TFunction) =>
  yup.object({
    identifier: yup
      .string()
      .required(t("customer.identifierRequired"))
      .test("cpf-cnpj", t("customer.identifierInvalid"), (value) => {
        if (!value) return false;

        const digits = value.replace(/\D/g, "");

        return digits.length === 11 || digits.length === 14;
      }),
  });
