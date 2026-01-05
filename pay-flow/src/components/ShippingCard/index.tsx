import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { Calendar, DollarSign, MapPin, Package } from "lucide-react";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCurrency } from "../../contexts/Currency/useCurrency";

export interface ShippingCardProps {
  data: {
    type: string;
    deliveryTime: string; // Ex: "3-5 dias úteis"
    cost: number;
    address: string; // Rua, número, bairro, cidade
  };
}

function ShippingCard({ data }: ShippingCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { currency, locale } = useCurrency();
  const navigate = useNavigate();

  return (
    <Card
      title={t("shipping.shipping")}
      onClick={() => navigate("/checkout/shipping")}
    >
      <RowItem theme={theme}>
        <Package size={16} />
        <Label>{t("shipping.type")}</Label>
        <Value>{data.type}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Calendar size={16} />
        <Label>{t("shipping.deliveryTime")}</Label>
        <Value>{data.deliveryTime}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <DollarSign size={16} />
        <Label>{t("shipping.cost")}</Label>
        <Value>{formatCurrency(data.cost, locale, currency)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <MapPin size={16} />
        <Label>{t("shipping.address")}</Label>
        <Value>{data.address}</Value>
      </RowItem>
    </Card>
  );
}

export default ShippingCard;
