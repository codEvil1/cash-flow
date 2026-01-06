import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import {
  ArrowDown,
  Check,
  CreditCard,
  DollarSign,
  Repeat,
  Truck,
} from "lucide-react";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import { usePayment } from "../../contexts/Payment/usePayment";

export interface PaymentCardProps {
  data: {
    discount?: number;
    shipping?: number;
    paymentMethod: string;
    cardBrand?: string;
  };
}

function PaymentCard({ data }: PaymentCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { currency, locale } = useCurrency();
  const { subTotal, netTotal, installmentAmount, installmentCount } =
    usePayment();
  const navigate = useNavigate();

  return (
    <Card
      title={t("payment.payment")}
      onClick={() => navigate("/checkout/payment")}
    >
      <RowItem theme={theme}>
        <CreditCard size={16} />
        <Label>{t("payment.paymentMethod")}</Label>
        <Value>
          {data.paymentMethod
            ? data.paymentMethod === "card" && data.cardBrand
              ? `${data.paymentMethod} (${data.cardBrand})`
              : data.paymentMethod
            : "-"}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <DollarSign size={16} />
        <Label>{t("payment.value")}</Label>
        <Value>{formatCurrency(subTotal, locale, currency)}</Value>
      </RowItem>
      {data.discount && data.discount > 0 && (
        <RowItem theme={theme}>
          <ArrowDown size={16} />
          <Label>{t("discount.discount")}</Label>
          <Value>- {formatCurrency(data.discount, locale, currency)}</Value>
        </RowItem>
      )}
      {data.shipping && data.shipping > 0 && (
        <RowItem theme={theme}>
          <Truck size={16} />
          <Label>{t("shipping.shipping")}</Label>
          <Value>+ {formatCurrency(data.shipping, locale, currency)}</Value>
        </RowItem>
      )}
      <RowItem theme={theme}>
        <Check size={16} />
        <Label>{t("payment.total")}</Label>
        <Value>{formatCurrency(netTotal, locale, currency)}</Value>
      </RowItem>
      {data.paymentMethod === "card" && installmentAmount > 0 && (
        <RowItem theme={theme}>
          <Repeat size={16} />
          <Label>{t("payment.installments")}</Label>
          <Value>{`${installmentCount}x de ${formatCurrency(
            installmentAmount,
            locale,
            currency
          )}`}</Value>
        </RowItem>
      )}
    </Card>
  );
}

export default PaymentCard;
