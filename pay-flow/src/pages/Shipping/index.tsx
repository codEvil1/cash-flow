import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useTheme } from "../../contexts/Theme/useTheme";
import HeaderControls from "../../components/HeaderControls";
import { Body, Footer, Page } from "../Login/style";
import { APP_VERSION } from "../../domain/constants";
import Card from "../../components/Card";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import Checkbox from "../../components/Checkbox";
import ShippingCard from "../../components/ShippingCard";
import { useState } from "react";
import { useShipping } from "../../contexts/Shipping/useShipping";
import Button from "../../components/Button";
import { CheckCircle, XCircle } from "lucide-react";
import { colors } from "../../components/Style/theme";
import { useNavigate } from "react-router-dom";
import type { Shipping } from "../../contexts/Shipping/ShippingProvider";
import { useCustomer } from "../../contexts/Customer/useCustomer";

interface ShippingFormData {
  hasShipping: boolean;
}

function Shipping() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { shipping, setShipping, getShipping } = useShipping();
  const { customer } = useCustomer();
  const { handleSubmit, register, control } = useForm<ShippingFormData>({
    defaultValues: {
      hasShipping: shipping?.hasShipping,
    },
  });

  const navigate = useNavigate();

  const [previewShipping, setPreviewShipping] = useState<Shipping | undefined>(
    shipping
  );

  const hasShipping = useWatch({
    control,
    name: "hasShipping",
  });

  const onSubmit = async () => {
    setShipping({
      hasShipping,
      type: previewShipping?.type,
      freight: previewShipping?.freight,
      deliveryTime: previewShipping?.deliveryTime,
    });
    toast.success("Sucesso");
    navigate("/checkout");
  };

  const handleChangeFreight = async () => {
    if (hasShipping) {
      setPreviewShipping(undefined);
      return;
    }
    const result = await getShipping(customer?.identifier);
    console.log(result);
    setPreviewShipping(result);
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: "checkout.checkout", path: "/checkout" },
          { label: "checkout.shipping", path: "/checkout/shipping" },
        ]}
      />
      <Body>
        <Card title={t("shipping.shipping")} titlePadding={16}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Checkbox
                  text={t("shipping.shipping")}
                  onClick={handleChangeFreight}
                  checked={hasShipping}
                  {...register("hasShipping")}
                />
              </Col>
            </Row>
            {hasShipping && previewShipping && (
              <Row>
                <Col>
                  <ShippingCard previewShipping={previewShipping} />
                </Col>
              </Row>
            )}
            <Row>
              <Col xs={10}>
                <Button
                  text={t("shipping.confirmShipping")}
                  icon={CheckCircle}
                  type="submit"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    event.stopPropagation()
                  }
                >
                  {t("shipping.confirmShipping")}
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

export default Shipping;
