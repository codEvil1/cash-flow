import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { RatingStars } from "../RatingStars";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { useNavigate } from "react-router-dom";

export interface CashierCardCardProps {
  data: {
    id: string;
    name: string;
    role: string;
    rating: number;
    reviewsCount?: number;
  };
}

function CashierCard({ data }: CashierCardCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      title={t("cashier.cashier")}
      onClick={() => navigate("/checkout/cashier")}
    >
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
