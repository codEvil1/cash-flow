import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { Calendar, DollarSign, MapPin, Package } from "lucide-react";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import { useShipping } from "../../contexts/Shipping/useShipping";
import { formatEmpty } from "../../utils/formatEmpty";
import { useCustomer } from "../../contexts/Customer/useCustomer";

interface ShippingCardProps {
  title?: string;
}

function ShippingCard({ title }: ShippingCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { currency, locale } = useCurrency();
  const { shipping } = useShipping();
  const { customer } = useCustomer();
  const navigate = useNavigate();

  return (
    <Card title={title} onClick={() => navigate("/checkout/shipping")}>
      <RowItem theme={theme}>
        <Package size={16} />
        <Label>{t("shipping.type")}</Label>
        <Value>{formatEmpty(shipping?.type)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Calendar size={16} />
        <Label>{t("shipping.deliveryTime")}</Label>
        <Value>{formatEmpty(shipping?.deliveryTime)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <DollarSign size={16} />
        <Label>{t("shipping.cost")}</Label>
        <Value>
          {formatCurrency(shipping?.freight ?? 0, locale, currency)}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <MapPin size={16} />
        <Label>{t("shipping.address")}</Label>
        <Value>{formatEmpty(customer?.adress)}</Value>
      </RowItem>
    </Card>
  );
}

export default ShippingCard;
