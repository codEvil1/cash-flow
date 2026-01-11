import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { toast } from "react-toastify";
import { Body, Footer, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { APP_VERSION } from "../../domain/constants";
import Card from "../../components/Card";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import Button from "../../components/Button";
import { CheckCircle, Search, XCircle } from "lucide-react";
import { colors } from "../../components/Style/theme";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerSchema } from "../../validations/customerSchema";
import { maskCpfCnpj } from "../../utils/mask";
import { useCustomer } from "../../contexts/Customer/useCustomer";
import { useState } from "react";
import InputButton from "../../components/InputButton";
import CustomerSummaryCard from "../../components/CustomerSummaryCard";

interface CustomerFormData {
  identifier: string;
}

function Customer() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { identifier, customer, setIdentifier, getCustomer, setCustomer } =
    useCustomer();
  const navigate = useNavigate();

  const [inputIdentifier, setInputIdentifier] = useState<string>(
    identifier ?? ""
  );

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: yupResolver(customerSchema(t)),
  });

  const onSubmit = (data: CustomerFormData) => {
    setIdentifier(data.identifier);
    toast.success("Sucesso");
    navigate("/checkout");
  };

  const handleChangeIdentifier = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const masked = maskCpfCnpj(event.target.value);
    setInputIdentifier(masked);
    setValue("identifier", masked);
    setCustomer(undefined);
    setIdentifier(undefined);
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: "checkout.checkout", path: "/checkout" },
          { label: "customer.customer", path: "/checkout/customer" },
        ]}
      />
      <Body>
        <Card title={t("customer.customer")} titlePadding={16}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <InputButton
                  text={t("customer.identifier")}
                  placeholder={t("customer.identifier")}
                  error={errors.identifier?.message}
                  value={inputIdentifier}
                  maxLength={18}
                  icon={Search}
                  onClick={getCustomer}
                  onChange={(event) => {
                    handleChangeIdentifier(event);
                  }}
                />
              </Col>
            </Row>
            {customer && (
              <Row>
                <Col>
                  <CustomerSummaryCard />
                </Col>
              </Row>
            )}
            <Row>
              <Col xs={10}>
                <Button
                  text={t("customer.confirmCustomer")}
                  icon={CheckCircle}
                  type="submit"
                  disabled={!customer}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    event.stopPropagation()
                  }
                >
                  {t("customer.confirmCustomer")}
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

export default Customer;
