import { Controller, useForm, useWatch } from "react-hook-form";
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

interface PaymentFormData {
  teste: number;
  installments?: number;
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

  const { control, handleSubmit } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentSchema(t)),
  });

  const inputPaymentMethod = useWatch({
    control,
    name: "teste",
  });

  const onSubmit = (payment: PaymentFormData) => {
    setPaymentMethod(payment.teste);
    if (payment.installments) setInstallmentCount(payment.installments);
    navigate("/checkout");
  };

  const paymentSummary: string = useMemo(() => {
    if (paymentMethod === PaymentMethod.CASH && netTotal) {
      return `À vista: ${formatCurrency(netTotal, locale, currency)}`;
    }
    if (paymentMethod === PaymentMethod.CREDIT && installmentCount) {
      return `${installmentCount}x de ${formatCurrency(
        installmentAmount,
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
  ]);

  const paymentMethods = useMemo(
    () => [
      {
        label: t("payment.cash"),
        value: PaymentMethod.CASH,
        icon: null,
      },
      {
        label: t("payment.credit"),
        value: PaymentMethod.CREDIT,
        icon: null,
      },
      {
        label: t("payment.debit"),
        value: PaymentMethod.DEBIT,
        icon: null,
      },
      {
        label: t("payment.pix"),
        value: PaymentMethod.PIX,
        icon: null,
      },
    ],
    [t]
  );

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
                <Controller
                  name="teste"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label={t("payment.paymentMethod")}
                      text={t("payment.paymentMethod")}
                      value={paymentMethod}
                      onChange={field.onChange}
                      options={paymentMethods}
                    />
                  )}
                />
              </Col>
            </Row>
            {inputPaymentMethod === PaymentMethod.CREDIT && (
              <Row>
                <Col>
                  <Controller
                    name="installments"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label={t("payment.installments")}
                        text={t("payment.installments")}
                        value={installmentCount}
                        onChange={field.onChange}
                        options={[
                          { label: "1x", value: 1, icon: null },
                          { label: "2x", value: 2, icon: null },
                          { label: "3x", value: 3, icon: null },
                          { label: "5x", value: 5, icon: null },
                        ]}
                      />
                    )}
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
