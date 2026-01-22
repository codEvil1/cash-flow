import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Body, Footer, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import Select from "../../components/Select";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import Card from "../../components/Card";
import { formatCurrency } from "../../utils/formatCurrency";
import { usePayment } from "../../contexts/Payment/usePayment";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import { SummaryLabel } from "./style";
import { useMemo } from "react";
import { PaymentMethod } from "../../domain/enum";
import { APP_VERSION } from "../../domain/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "../../validations/paymentSchema";
import { useNavigate } from "react-router-dom";
import { getPaymentMethodLabel } from "../../domain/mappers";
import { useCheckout } from "../../contexts/Checkout/useCheckout";
import { ActionFooter } from "../../components/ActionFooter";

export interface PaymentFormData {
  paymentMethod: PaymentMethod;
  installmentsCount?: number;
}

function Payment() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { checkout } = useCheckout();
  const { currency, locale } = useCurrency();
  const { setPaymentMethod, setInstallmentCount } = usePayment();

  const payment = checkout?.payment;

  const { handleSubmit, setValue, reset } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentSchema(t)),
  });

  const onSubmit = (payment: PaymentFormData) => {
    setPaymentMethod(payment.paymentMethod);
    if (payment.installmentsCount)
      setInstallmentCount(payment.installmentsCount);
    navigate("/checkout");
  };

  const paymentSummary = useMemo(() => {
    if (
      payment?.paymentMethod === PaymentMethod.CREDIT &&
      payment.installment?.value
    ) {
      return `${payment.installment.count}x de ${formatCurrency(
        payment.installment.value,
        locale,
        currency,
      )}`;
    }
    if (payment?.netTotal) {
      return `${t("payment.onTime")}: ${formatCurrency(
        payment.netTotal,
        locale,
        currency,
      )}`;
    }
    return "";
  }, [payment, currency, locale, t]);

  const paymentMethods = useMemo(
    () => [
      {
        label: getPaymentMethodLabel(PaymentMethod.CASH, t),
        value: PaymentMethod.CASH,
        icon: null,
      },
      {
        label: getPaymentMethodLabel(PaymentMethod.CREDIT, t),
        value: PaymentMethod.CREDIT,
        icon: null,
      },
      {
        label: getPaymentMethodLabel(PaymentMethod.DEBIT, t),
        value: PaymentMethod.DEBIT,
        icon: null,
      },
      {
        label: getPaymentMethodLabel(PaymentMethod.PIX, t),
        value: PaymentMethod.PIX,
        icon: null,
      },
    ],
    [t],
  );

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value);
    setValue("paymentMethod", value);
  };

  const handleInstallmentCountChange = (value: number) => {
    setInstallmentCount(value);
    setValue("installmentsCount", value);
  };

  const handleClear = () => {
    reset();
    // setPreviewPayment(undefined);
    // confirmPayment(undefined);
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: "checkout.checkout", path: "/checkout" },
          { label: "payment.payment", path: "/checkout/payment" },
        ]}
      />
      <Body>
        <Card title={t("payment.payment")} titlePadding={16}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Select
                  label={t("payment.paymentMethod")}
                  text={t("payment.paymentMethod")}
                  value={payment?.paymentMethod}
                  onChange={(value) => handlePaymentMethodChange(value)}
                  options={paymentMethods}
                />
              </Col>
            </Row>
            {payment?.paymentMethod === PaymentMethod.CREDIT && (
              <Row>
                <Col>
                  <Select
                    label={t("payment.installments")}
                    text={t("payment.installments")}
                    value={payment.installment.count}
                    onChange={(value) => handleInstallmentCountChange(value)}
                    options={[
                      { label: "1x", value: 1, icon: null },
                      { label: "2x", value: 2, icon: null },
                      { label: "3x", value: 3, icon: null },
                      { label: "5x", value: 5, icon: null },
                    ]}
                  />
                </Col>
              </Row>
            )}
            {paymentSummary && (
              <Row>
                <Col>
                  <SummaryLabel theme={theme}>{paymentSummary}</SummaryLabel>
                </Col>
              </Row>
            )}
            <ActionFooter
              confirmText={t("payment.confirmPayment")}
              onClear={handleClear}
            />
          </form>
        </Card>
      </Body>
      <Footer theme={theme}>
        {t("app.version")} v{APP_VERSION}
      </Footer>
    </Page>
  );
}

export default Payment;
