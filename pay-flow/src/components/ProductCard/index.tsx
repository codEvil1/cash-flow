import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Card } from "../Card";
import { Row } from "../Row";
import { Col } from "../Col";
import { ImageProduct } from "../../pages/Checkout/style";
import InputButton from "../InputButton";
import noImage from "../../assets/noImage.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../validations/productSchema";
import Input from "../Input";

export interface ProductFormData {
  item: string;
  description?: string;
  quantity: number;
  price?: number;
}

function ProductCard() {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema(t)),
  });

  const teste = () => {
    return "teste";
  };

  return (
    <Card title={t("checkout.product")}>
      <Row align="center">
        <Col lg={3}>
          <ImageProduct src={noImage} alt={t("checkout.noImage")} />
        </Col>
        <Col lg={9}>
          <Row>
            <Col lg={3} align="center" justify="center">
              <InputButton
                value={teste()}
                icon={Search}
                onClick={() => console.log("click")}
                placeholder={t("checkout.product")}
                text={t("checkout.enterProduct")}
                error={errors.item?.message}
                {...register("item")}
              />
            </Col>
            <Col lg={9}>
              <Input
                text={t("checkout.description")}
                placeholder={t("checkout.description")}
                {...register("description")}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <Input
                text={t("checkout.quantity")}
                placeholder={t("checkout.quantity")}
                type="number"
                error={errors.quantity?.message}
                {...register("quantity")}
              />
            </Col>
            <Col lg={3}>
              <Input
                text={t("checkout.price")}
                placeholder={t("checkout.price")}
                {...register("price")}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default ProductCard;
