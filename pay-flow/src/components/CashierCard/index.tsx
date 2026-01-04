import { useTranslation } from "react-i18next";
import { Card } from "../Card";
import { Label, RowItem, Value } from "./style";
import { RatingStars } from "../RatingStars";

export interface CashierCardCardProps {
  data: {
    id: string;
    name: string;
    role: string;
    rating: number;
    reviewsCount?: number;
  };
  theme: "light" | "dark";
}

function CashierCard({ data, theme = "light" }: CashierCardCardProps) {
  const { t } = useTranslation();

  return (
    <Card title={t("cashier.cashier")}>
      <RowItem theme={theme}>
        <Label>{t("cashier.id")}</Label>
        <Value>{data.id}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Label>{t("cashier.name")}</Label>
        <Value>{data.name}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Label>{t("cashier.rating")}</Label>
        <Value>
          <RatingStars value={data.rating} />
          {data.rating.toFixed(1)}
          {data.reviewsCount && <span>({data.reviewsCount})</span>}
        </Value>
      </RowItem>
    </Card>
  );
}

export default CashierCard;
