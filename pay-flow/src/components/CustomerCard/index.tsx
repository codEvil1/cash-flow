import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { CreditCard, Mail, Phone, User } from "lucide-react";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { formatPhoneInternational } from "../../utils/phone";
import { useCustomer } from "../../contexts/Customer/useCustomer";
import { formatEmpty } from "../../utils/formatEmpty";

function CustomerCard() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { customer } = useCustomer();
  const navigate = useNavigate();

  return (
    <Card
      title={t("customer.customer")}
      onClick={() => navigate("/checkout/customer")}
    >
      <RowItem theme={theme}>
        <User size={16} />
        <Label>{t("customer.name")}</Label>
        <Value>{formatEmpty(customer?.name)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <CreditCard size={16} />
        <Label>{t("customer.identifier")}</Label>
        <Value>{formatEmpty(customer?.identifier)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Phone size={16} />
        <Label>{t("customer.phone")}</Label>
        <Value>
          {formatPhoneInternational(customer?.phone, customer?.country)}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <Mail size={16} />
        <Label>{t("customer.email")}</Label>
        <Value>{formatEmpty(customer?.email)}</Value>
      </RowItem>
    </Card>
  );
}

export default CustomerCard;
