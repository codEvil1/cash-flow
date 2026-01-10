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
import Button from "../../components/Button";
import { PaymentMethod } from "../../domain/enum";
import { APP_VERSION } from "../../domain/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "../../validations/paymentSchema";
import { CheckCircle, XCircle } from "lucide-react";
import { colors } from "../../components/Style/theme";
import { useNavigate } from "react-router-dom";
import { getPaymentMethodLabel } from "../../domain/mappers";

interface PaymentFormData {
  paymentMethod: number;
  installmentsCount?: number;
}

function Payment() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { currency, locale } = useCurrency();
  const {
    netTotal,
    paymentMethod,
    installmentCount,
    installmentAmount,
    setPaymentMethod,
    setInstallmentCount,
  } = usePayment();

  const { handleSubmit, setValue } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentSchema(t)),
  });

  const onSubmit = (payment: PaymentFormData) => {
    setPaymentMethod(payment.paymentMethod);
    if (payment.installmentsCount)
      setInstallmentCount(payment.installmentsCount);
    navigate("/checkout");
  };

  const paymentSummary: string = useMemo(() => {
    if (paymentMethod === PaymentMethod.CREDIT && installmentCount) {
      return `${installmentCount}x de ${formatCurrency(
        installmentAmount,
        locale,
        currency
      )}`;
    }
    if (netTotal) {
      return `${t("payment.onTime")}: ${formatCurrency(
        netTotal,
        locale,
        currency
      )}`;
    }
    return "";
  }, [
    currency,
    installmentAmount,
    installmentCount,
    locale,
    netTotal,
    paymentMethod,
    t,
  ]);

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
    [t]
  );

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value);
    setValue("paymentMethod", value);
    setInstallmentCount(1);
  };

  const handleInstallmentCountChange = (value: number) => {
    setInstallmentCount(value);
    setValue("installmentsCount", value);
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
        <Card
          title={t("payment.payment")}
          titlePadding={16}
          onClick={() => console.log("aaaaaaaaaaaaaaa")}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Select
                  label={t("payment.paymentMethod")}
                  text={t("payment.paymentMethod")}
                  value={paymentMethod}
                  onChange={(value) => handlePaymentMethodChange(value)}
                  options={paymentMethods}
                />
              </Col>
            </Row>
            {paymentMethod === PaymentMethod.CREDIT && (
              <Row>
                <Col>
                  <Select
                    label={t("payment.installments")}
                    text={t("payment.installments")}
                    value={installmentCount}
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
            <Row>
              <Col xs={10}>
                <Button
                  text={t("payment.confirmPayment")}
                  icon={CheckCircle}
                  type="submit"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    event.stopPropagation()
                  }
                >
                  {t("payment.confirmPayment")}
                </Button>
              </Col>
              <Col xs={2}>
                <Button
                  text={t("utils.cancel")}
                  icon={XCircle}
                  color={colors.red}
                  onClick={() => navigate("/checkout")}
                />
              </Col>
            </Row>
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
