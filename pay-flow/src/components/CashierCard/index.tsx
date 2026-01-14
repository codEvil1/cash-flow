import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { RatingStars } from "../RatingStars";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { Hash, Star, User } from "lucide-react";
import { calculateAverageRating } from "../../utils/rating";
import { useCashier } from "../../contexts/Cashier/useCashier";
import { formatEmpty } from "../../utils/formatEmpty";

function CashierCard() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { cashier } = useCashier();
  const navigate = useNavigate();

  return (
    <Card
      title={t("cashier.cashier")}
      onClick={() => navigate("/checkout/cashier")}
    >
      <RowItem theme={theme}>
        <Hash size={16} />
        <Label>{t("cashier.id")}</Label>
        <Value>{formatEmpty(cashier?.id)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <User size={16} />
        <Label>{t("cashier.name")}</Label>
        <Value>{formatEmpty(cashier?.name)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Star size={16} />
        <Label>{t("cashier.rating")}</Label>
        <Value>
          <RatingStars value={calculateAverageRating(cashier?.ratings)} />
          {calculateAverageRating(cashier?.ratings).toFixed(1)}
          <span>({cashier?.ratings?.length})</span>
        </Value>
      </RowItem>
    </Card>
  );
}

export default CashierCard;
