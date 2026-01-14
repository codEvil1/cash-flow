import { useTranslation } from "react-i18next";
import Card from "../Card";
import { Label, RowItem, Value } from "../DiscountCard/style";
import { useTheme } from "../../contexts/Theme/useTheme";
import { History, User } from "lucide-react";
import { formatDate, formatEmpty } from "../../utils/formatEmpty";
import type { Customer } from "../../contexts/Customer/CustomerProvider";

interface CustomerSummaryCardProps {
  customer: Customer;
}

function CustomerSummaryCard({ customer }: CustomerSummaryCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Card>
      <RowItem theme={theme}>
        <User size={16} />
        <Label>{t("customer.name")}</Label>
        <Value>{formatEmpty(customer?.name)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <History size={16} />
        <Label>{t("customer.lastPurchase")}</Label>
        <Value>{formatDate(customer?.lastPurchase)}</Value>
      </RowItem>
    </Card>
  );
}

export default CustomerSummaryCard;
