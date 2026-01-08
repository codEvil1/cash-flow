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
    if (!paymentMethod) return "";

    if (paymentMethod === "cash" && netTotal) {
      return `À vista: ${formatCurrency(netTotal, currency, locale)}`;
    }

    if (paymentMethod === "credit" && installmentCount) {
      return `${installmentCount}x de ${formatCurrency(
        installmentAmount,
        currency,
        locale
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
          <Card title={t("payment.payment")}>
            <Row>
              <Col>
                <Select
                  label={t("payment.paymentMethod")}
                  text={t("payment.paymentMethod")}
                  value={paymentMethod}
                  onChange={(value) => setPaymentMethod(String(value))}
                  options={[
                    { label: t("payment.cash"), value: "cash", icon: null },
                    { label: t("payment.credit"), value: "credit", icon: null },
                  ]}
                />
              </Col>
            </Row>
            {paymentMethod === "credit" && (
              <Row>
                <Col>
                  <Select
                    label={t("payment.installments")}
                    text={t("payment.installments")}
                    value={installmentCount}
                    onChange={(value) => setInstallmentCount(Number(value))}
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
            <Row>
              <Col>
                <SummaryLabel>{paymentSummary}</SummaryLabel>
              </Col>
            </Row>
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
