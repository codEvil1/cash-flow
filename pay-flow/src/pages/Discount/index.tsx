import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { toast } from "react-toastify";
import { Body, Footer, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { APP_VERSION } from "../../domain/constants";
import { useDiscount } from "../../contexts/Discount/useDiscount";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { discountSchema } from "../../validations/discountSchema";
import Card from "../../components/Card";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import InputButton from "../../components/InputButton";
import { CheckCircle, Search, XCircle } from "lucide-react";
import Button from "../../components/Button";
import { colors } from "../../components/Style/theme";
import type { Discount } from "../../contexts/Discount/DiscountProvider";
import DiscountCard from "../../components/DiscountCard";

interface DiscountFormData {
  couponCode: string;
}

function Discount() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { discount, setDiscount, getDiscount } = useDiscount();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DiscountFormData>({
    resolver: yupResolver(discountSchema(t)),
    defaultValues: { couponCode: discount?.couponCode },
  });

  const [previewDiscount, setPreviewDiscount] = useState<Discount | undefined>(
    discount,
  );

  const couponCode = useWatch({
    control,
    name: "couponCode",
  });

  const onSubmit = (data: DiscountFormData) => {
    setDiscount({
      couponCode: data.couponCode,
      discountPercentage: previewDiscount?.discountPercentage,
      discountValue: previewDiscount?.discountValue,
    });
    toast.success("Sucesso");
    navigate("/checkout");
  };

  const handleGetDiscount = async () => {
    if (!couponCode) return;
    const result = await getDiscount(couponCode);
    setPreviewDiscount(result);
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: "checkout.checkout", path: "/checkout" },
          { label: "discount.discount", path: "/checkout/discount" },
        ]}
      />
      <Body>
        <Card title={t("discount.discount")} titlePadding={16}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <InputButton
                  text={t("discount.cupom")}
                  placeholder={t("discount.cupom")}
                  error={errors.couponCode?.message}
                  value={couponCode}
                  icon={Search}
                  onClick={handleGetDiscount}
                  {...register("couponCode", {
                    onChange: () => setPreviewDiscount(undefined),
                  })}
                />
              </Col>
            </Row>
            {previewDiscount && (
              <Row>
                <Col>
                  <DiscountCard previewDiscount={previewDiscount} />
                </Col>
              </Row>
            )}
            <Row>
              <Col xs={10}>
                <Button
                  text={t("cashier.confirmCashier")}
                  icon={CheckCircle}
                  type="submit"
                  disabled={!previewDiscount}
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

export default Discount;
