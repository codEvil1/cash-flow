import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { CreditCard, Mail, Phone, User } from "lucide-react";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { formatPhoneInternational } from "../../utils/phone";
import { useCustomer } from "../../contexts/Customer/useCustomer";
import { formatEmpty } from "../../utils/formatEmpty";
import type { Customer } from "../../contexts/Customer/CustomerProvider";

interface CustomerCardProps {
  previewCustomer?: Customer;
  title?: string;
}

function CustomerCard({ previewCustomer, title }: CustomerCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { customer } = useCustomer();
  const navigate = useNavigate();

  const activeCustumer = previewCustomer ?? customer;

  return (
    <Card title={title} onClick={() => navigate("/checkout/customer")}>
      <RowItem theme={theme}>
        <User size={16} />
        <Label>{t("customer.name")}</Label>
        <Value>{formatEmpty(activeCustumer?.name)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <CreditCard size={16} />
        <Label>{t("customer.identifier")}</Label>
        <Value>{formatEmpty(activeCustumer?.identifier)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Phone size={16} />
        <Label>{t("customer.phone")}</Label>
        <Value>
          {formatPhoneInternational(
            activeCustumer?.phone,
            activeCustumer?.country,
          )}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <Mail size={16} />
        <Label>{t("customer.email")}</Label>
        <Value>{formatEmpty(activeCustumer?.email)}</Value>
      </RowItem>
    </Card>
  );
}

export default CustomerCard;
