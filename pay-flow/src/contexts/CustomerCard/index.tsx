import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { CreditCard, Mail, Phone, User } from "lucide-react";
import { useTheme } from "../../contexts/Theme/useTheme";
import { useNavigate } from "react-router-dom";
import { formatPhoneInternational } from "../../utils/phone";
import Card from "../../components/Card";

export interface CustomerCardProps {
  data: {
    name: string;
    identifier: string;
    phone: string;
    email: string;
    country: string;
  };
}

function CustomerCard({ data }: CustomerCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      title={t("customer.customer")}
      onClick={() => navigate("/checkout/customer")}
    >
      <RowItem theme={theme}>
        <User size={16} />
        <Label>{t("customer.name")}</Label>
        <Value>{data.name}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <CreditCard size={16} />
        <Label>{t("customer.identifier")}</Label>
        <Value>{data.identifier}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Phone size={16} />
        <Label>{t("customer.phone")}</Label>
        <Value>{formatPhoneInternational(data.phone, data.country)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Mail size={16} />
        <Label>{t("customer.email")}</Label>
        <Value>{data.email}</Value>
      </RowItem>
    </Card>
  );
}

export default CustomerCard;
