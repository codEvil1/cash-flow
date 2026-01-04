import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { Percent, Tag } from "lucide-react";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import { formatCurrency } from "../../utils/formatCurrency";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { useNavigate } from "react-router-dom";

export interface DiscountCardProps {
  data: {
    couponCode?: string;
    percentage?: number;
    discountValue: number;
    originalTotal: number;
    finalTotal: number;
  };
}

function DiscountCard({ data }: DiscountCardProps) {
  const { t } = useTranslation();
  const { currency, locale } = useCurrency();
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      title={t("discount.discount")}
      onClick={() => navigate("/checkout/promotions")}
    >
      {data.couponCode && (
        <RowItem theme={theme}>
          <Tag size={16} />
          <Label>{t("discount.cupom")}</Label>
          <Value>{data.couponCode}</Value>
        </RowItem>
      )}
      {data.percentage && (
        <RowItem theme={theme}>
          <Percent size={16} />
          <Label>{t("discount.discount")}</Label>
          <Value>{data.percentage}%</Value>
        </RowItem>
      )}
      <RowItem theme={theme}>
        <Label>{t("discount.originalValue")}</Label>
        <Value>{formatCurrency(data.originalTotal, locale, currency)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Label>{t("discount.economy")}</Label>
        <Value>-{formatCurrency(data.discountValue, locale, currency)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Label>{t("discount.total")}</Label>
        <Value>{formatCurrency(data.finalTotal, locale, currency)}</Value>
      </RowItem>
    </Card>
  );
}

export default DiscountCard;
