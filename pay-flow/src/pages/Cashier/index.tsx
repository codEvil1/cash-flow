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
import InputButton from "../../components/InputButton";
import { useCashier } from "../../contexts/Cashier/useCashier";
import { cashierSchema } from "../../validations/cashierSchema";
import { useState } from "react";
import type { Cashier } from "../../contexts/Cashier/CashierProvider";
import CashierCard from "../../components/CashierCard";

interface CashierFormData {
  id: number;
}

function Cashier() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { cashier, getCashier, setCashier } = useCashier();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CashierFormData>({
    resolver: yupResolver(cashierSchema(t)),
    defaultValues: { id: cashier?.id },
  });

  const [previewCashier, setPreviewCashier] = useState<Cashier | undefined>(
    cashier,
  );

  const inputId = useWatch({
    control,
    name: "id",
  });

  const onSubmit = (data: CashierFormData) => {
    setCashier({
      id: data.id,
      name: previewCashier?.name,
      ratings: previewCashier?.ratings,
    });
    toast.success("Sucesso");
    navigate("/checkout");
  };

  const handleGetCashier = async () => {
    if (!inputId) return;
    const result = await getCashier(inputId);
    setPreviewCashier(result);
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: "checkout.checkout", path: "/checkout" },
          { label: "cashier.cashier", path: "/checkout/cashier" },
        ]}
      />
      <Body>
        <Card title={t("cashier.cashier")} titlePadding={16}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <InputButton
                  text={t("cashier.id")}
                  placeholder={t("cashier.id")}
                  error={errors.id?.message}
                  value={inputId}
                  maxLength={3}
                  icon={Search}
                  onClick={handleGetCashier}
                  {...register("id", {
                    onChange: () => setPreviewCashier(undefined),
                  })}
                />
              </Col>
            </Row>
            {previewCashier && (
              <Row>
                <Col>
                  <CashierCard previewCashier={previewCashier} />
                </Col>
              </Row>
            )}
            <Row>
              <Col xs={10}>
                <Button
                  text={t("cashier.confirmCashier")}
                  icon={CheckCircle}
                  type="submit"
                  disabled={!previewCashier}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    event.stopPropagation()
                  }
                >
                  {t("cashier.confirmCashier")}
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

export default Cashier;
