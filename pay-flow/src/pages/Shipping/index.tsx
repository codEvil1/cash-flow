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
import { useNavigate } from "react-router-dom";
import type { Shipping } from "../../contexts/Shipping/ShippingProvider";
import { useCheckout } from "../../contexts/Checkout/useCheckout";
import { ActionFooter } from "../../components/ActionFooter";

interface ShippingFormData {
  hasShipping: boolean;
}

function Shipping() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { getShipping, confirmShipping } = useShipping();
  const { checkout } = useCheckout();
  const { handleSubmit, register, control } = useForm<ShippingFormData>({
    defaultValues: {
      hasShipping: checkout?.shipping?.hasShipping,
    },
  });

  const navigate = useNavigate();

  const [previewShipping, setPreviewShipping] = useState<Shipping | undefined>(
    checkout?.shipping,
  );

  const hasShipping = useWatch({
    control,
    name: "hasShipping",
  });

  const onSubmit = async () => {
    confirmShipping({
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
    const result = await getShipping(checkout?.customer?.identifier);
    setPreviewShipping(result);
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: t("checkout.checkout"), path: "/checkout" },
          { label: t("shipping.shipping"), path: "/checkout/shipping" },
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
            <ActionFooter
              confirmText={t("shipping.confirmShipping")}
              onClear={handleChangeFreight}
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

export default Shipping;
