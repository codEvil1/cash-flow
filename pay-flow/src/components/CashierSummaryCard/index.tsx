import { useTranslation } from "react-i18next";
import Card from "../Card";
import { Label, RowItem, Value } from "../DiscountCard/style";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Hash, User } from "lucide-react";
import { formatEmpty } from "../../utils/formatEmpty";
import type { Cashier } from "../../contexts/Cashier/CashierProvider";

interface CashierSummaryCardProps {
  cashier: Cashier | undefined;
}

function CashierSummaryCard({ cashier }: CashierSummaryCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Card>
      <RowItem theme={theme}>
        <Hash size={16} />
        <Label>{t("cashier.id")}</Label>
        <Value>{cashier?.id}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <User size={16} />
        <Label>{t("cashier.name")}</Label>
        <Value>{formatEmpty(cashier?.name)}</Value>
      </RowItem>
    </Card>
  );
}

export default CashierSummaryCard;
