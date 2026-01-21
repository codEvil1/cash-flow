import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { ArrowDown, Check, DollarSign, Percent, Tag } from "lucide-react";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import { formatCurrency } from "../../utils/formatCurrency";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { formatEmpty, formatValueEmpty } from "../../utils/formatEmpty";
import { calculateTotalWithDiscount } from "../../utils/saleCalculations";
import { useMemo } from "react";
import type { Discount } from "../../contexts/Discount/DiscountProvider";
import { useCheckout } from "../../contexts/Checkout/useCheckout";

interface DiscountCardProps {
  previewDiscount?: Discount;
  title?: string;
}

function DiscountCard({ previewDiscount, title }: DiscountCardProps) {
  const { t } = useTranslation();
  const { currency, locale } = useCurrency();
  const { theme } = useTheme();
  const { checkout } = useCheckout();
  const navigate = useNavigate();

  const activeDiscount = previewDiscount ?? checkout?.discount;

  //TODO: inicializar subtotal com zero
  const handleCalculateTotalWithDiscount = useMemo(() => {
    const totalWithDiscount = calculateTotalWithDiscount(
      checkout?.payment?.subTotal ?? 0,
      activeDiscount?.discountValue,
    );
    return formatCurrency(totalWithDiscount, locale, currency);
  }, [
    activeDiscount?.discountValue,
    checkout?.payment?.subTotal,
    currency,
    locale,
  ]);

  return (
    <Card title={title} onClick={() => navigate("/checkout/discount")}>
      <RowItem theme={theme}>
        <Tag size={16} />
        <Label>{t("discount.cupom")}</Label>
        <Value>{formatEmpty(activeDiscount?.couponCode)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <Percent size={16} />
        <Label>{t("discount.discount")}</Label>
        <Value>{formatValueEmpty(activeDiscount?.discountPercentage)}%</Value>
      </RowItem>
      <RowItem theme={theme}>
        <DollarSign size={16} />
        <Label>{t("discount.originalValue")}</Label>
        <Value>
          {formatCurrency(checkout?.payment?.subTotal, locale, currency)}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <ArrowDown size={16} />
        <Label>{t("discount.economy")}</Label>
        <Value>
          {formatCurrency(
            activeDiscount?.discountValue,
            locale,
            currency,
            "minus",
          )}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <Check size={16} />
        <Label>{t("discount.total")}</Label>
        <Value>{handleCalculateTotalWithDiscount}</Value>
      </RowItem>
    </Card>
  );
}

export default DiscountCard;
