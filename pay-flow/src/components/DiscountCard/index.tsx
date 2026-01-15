import { useTranslation } from "react-i18next";
import { Label, RowItem, Value } from "./style";
import { ArrowDown, Check, DollarSign, Percent, Tag } from "lucide-react";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import { formatCurrency } from "../../utils/formatCurrency";
import { useTheme } from "../../contexts/Theme/useTheme";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { useDiscount } from "../../contexts/Discount/useDiscount";
import { usePayment } from "../../contexts/Payment/usePayment";
import { formatEmpty } from "../../utils/formatEmpty";
import { calculateTotalWithDiscount } from "../../utils/saleCalculations";
import { useMemo } from "react";
import type { Discount } from "../../contexts/Discount/DiscountProvider";

interface DiscountCardProps {
  previewDiscount?: Discount;
}

function DiscountCard({ previewDiscount }: DiscountCardProps) {
  const { t } = useTranslation();
  const { currency, locale } = useCurrency();
  const { theme } = useTheme();
  const { discount } = useDiscount();
  const { subTotal, netTotal } = usePayment();
  const navigate = useNavigate();

  const handleCalculateTotalWithDiscount = useMemo(() => {
    const totalWithDiscount = calculateTotalWithDiscount(
      netTotal,
      discount?.discountValue
    );
    return formatCurrency(totalWithDiscount, locale, currency);
  }, [currency, discount?.discountValue, locale, netTotal]);

  return (
    <Card
      title={t("discount.discount")}
      onClick={() => navigate("/checkout/discount")}
    >
      <RowItem theme={theme}>
        <Tag size={16} />
        <Label>{t("discount.cupom")}</Label>
        <Value>
          {previewDiscount?.couponCode ?? formatEmpty(discount?.couponCode)}
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <Percent size={16} />
        <Label>{t("discount.discount")}</Label>
        <Value>
          {previewDiscount?.discountPercentage ?? discount?.discountPercentage}%
        </Value>
      </RowItem>
      <RowItem theme={theme}>
        <DollarSign size={16} />
        <Label>{t("discount.originalValue")}</Label>
        <Value>{formatCurrency(subTotal, locale, currency)}</Value>
      </RowItem>
      <RowItem theme={theme}>
        <ArrowDown size={16} />
        <Label>{t("discount.economy")}</Label>
        <Value>
          {formatCurrency(
            previewDiscount?.discountValue,
            locale,
            currency,
            "minus"
          ) ??
            formatCurrency(discount?.discountValue, locale, currency, "minus")}
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
