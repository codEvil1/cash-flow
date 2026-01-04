import { useTranslation } from "react-i18next";
import { Card } from "../Card";
import { Label, RowItem, Value } from "./style";
import { Percent, Tag } from "lucide-react";

export interface DiscountCardProps {
  data: {
    couponCode?: string;
    percentage?: number;
    discountValue: number;
    originalTotal: number;
    finalTotal: number;
  };
  theme: "light" | "dark";
}

function DiscountCard({ data, theme = "light" }: DiscountCardProps) {
  const { t } = useTranslation();

  return (
    <Card title={t("discount.discount")}>
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
        <Value>R$ {data.originalTotal.toFixed(2)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Label>{t("discount.economy")}</Label>
        <Value>- R$ {data.discountValue.toFixed(2)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Label>{t("discount.total")}</Label>
        <Value>R$ {data.finalTotal.toFixed(2)}</Value>
      </RowItem>
    </Card>
  );
}

export default DiscountCard;
