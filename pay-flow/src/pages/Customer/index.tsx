import { useForm, useWatch } from "react-hook-form";
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
import type { Customer } from "../../contexts/Customer/CustomerProvider";
import CustomerCard from "../../components/CustomerCard";

interface CustomerFormData {
  identifier: string;
}

function Customer() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { customer, getCustomer, setCustomer } = useCustomer();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: yupResolver(customerSchema(t)),
    defaultValues: {
      identifier: customer?.identifier,
    },
  });

  const inputIdentifier = useWatch({
    control,
    name: "identifier",
  });

  const [previewCustomer, setPreviewCustomer] = useState<Customer | undefined>(
    customer,
  );

  const onSubmit = (data: CustomerFormData) => {
    setCustomer({
      identifier: data.identifier,
      name: previewCustomer?.name,
      phone: previewCustomer?.phone,
      email: previewCustomer?.email,
      country: previewCustomer?.country,
      lastPurchase: previewCustomer?.lastPurchase,
      adress: previewCustomer?.adress,
    });
    toast.success("Sucesso");
    navigate("/checkout");
  };

  const handleGetCustomer = async () => {
    if (!inputIdentifier) return;
    const result = await getCustomer(inputIdentifier);
    setPreviewCustomer(result);
  };

  const handleChangeCustomer = (value: string) => {
    const masked = maskCpfCnpj(value);
    setValue("identifier", masked);
    setPreviewCustomer(undefined);
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
                  onClick={handleGetCustomer}
                  {...register("identifier", {
                    onChange: (event) =>
                      handleChangeCustomer(event.target.value),
                  })}
                />
              </Col>
            </Row>
            {previewCustomer && (
              <Row>
                <Col>
                  <CustomerCard previewCustomer={previewCustomer} />
                </Col>
              </Row>
            )}
            <Row>
              <Col xs={10}>
                <Button
                  text={t("customer.confirmCustomer")}
                  icon={CheckCircle}
                  type="submit"
                  disabled={!previewCustomer}
                  onClick={(event) => event.stopPropagation()}
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
