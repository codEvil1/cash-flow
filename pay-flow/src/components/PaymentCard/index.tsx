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
import { useDiscount } from "../../contexts/Discount/useDiscount";
import { useShipping } from "../../contexts/Shipping/useShipping";
import { PaymentMethod } from "../../domain/enum";
import { getPaymentMethodLabel } from "../../domain/mappers";

function PaymentCard() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { currency, locale } = useCurrency();
  const { discountValue } = useDiscount();
  const { freight } = useShipping();
  const {
    subTotal,
    netTotal,
    installmentAmount,
    installmentCount,
    paymentMethod,
  } = usePayment();
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
          {paymentMethod
            ? paymentMethod === PaymentMethod.CREDIT
              ? `${getPaymentMethodLabel(paymentMethod, t)}`
              : paymentMethod
            : "-"}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <DollarSign size={16} />
        <Label>{t("payment.value")}</Label>
        <Value>{formatCurrency(subTotal, locale, currency)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <ArrowDown size={16} />
        <Label>{t("discount.discount")}</Label>
        <Value>
          {formatCurrency(discountValue, locale, currency, "minus")}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <Truck size={16} />
        <Label>{t("shipping.shipping")}</Label>
        <Value>{formatCurrency(freight, locale, currency, "plus")}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Check size={16} />
        <Label>{t("payment.total")}</Label>
        <Value>{formatCurrency(netTotal, locale, currency)}</Value>
      </RowItem>
      {paymentMethod === PaymentMethod.CREDIT && (
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
