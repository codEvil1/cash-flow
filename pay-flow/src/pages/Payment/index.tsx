import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { toast } from "react-toastify";
import { Body, Footer, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { APP_VERSION } from "../../config/constants";
import Select from "../../components/Select";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import Card from "../../components/Card";
import { formatCurrency } from "../../utils/formatCurrency";
import { usePayment } from "../../contexts/Payment/usePayment";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import { SummaryLabel } from "./style";
import { useMemo } from "react";
import { PaymentMethod } from "../../config/enum";

interface PaymentFormData {
  paymentMethod: string;
  installments: number;
}

function Payment() {
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

  const {
    handleSubmit,
    // formState: { errors },
  } = useForm<PaymentFormData>({
    // resolver: yupResolver(checkoutSchema(t)),
  });

  const onSubmit = (data: PaymentFormData) => {
    // chamada login backend
    toast.success("Sucesso");
    toast.error("Erro");
    toast.warning("Atenção");
    console.log(data);
    // navigate("/dashboard");
  };

  const paymentSummary: string = useMemo(() => {
    console.log(installmentCount);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <Card title={t("payment.payment")} titlePadding={16}>
            <Row>
              <Col>
                <Select
                  label={t("payment.paymentMethod")}
                  text={t("payment.paymentMethod")}
                  value={paymentMethod}
                  onChange={(value) => setPaymentMethod(value)}
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
                    onChange={(value) => setInstallmentCount(value)}
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
          </Card>
        </Body>
      </form>
      <Footer theme={theme}>
        {t("app.version")} v{APP_VERSION}
      </Footer>
    </Page>
  );
}

export default Payment;
