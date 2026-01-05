import { useTranslation } from "react-i18next";
import { PackagePlus } from "lucide-react";
import { Row } from "../Row";
import { Col } from "../Col";
import { ImageProduct } from "../../pages/Checkout/style";
import noImage from "../../assets/noImage.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../validations/productSchema";
import Input from "../Input";
import Button from "../Button";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { useProductList } from "../../contexts/ProductList/useProductList";

export interface ProductFormData {
  item: string;
  description?: string;
  quantity: number;
  price?: number;
}

function ProductCard() {
  const { t } = useTranslation();
  const { productList, setProductList } = useProductList();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema(t)),
  });

  const addProduct = (product: ProductFormData) => {
    const exists = productList.some((p) => p.item === product.item);
    if (exists) {
      setProductList(
        productList.map((p) =>
          p.item === product.item
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        )
      );
    } else {
      setProductList([...productList, product]);
    }
    reset();
  };

  return (
    <Card
      title={t("checkout.product")}
      onClick={() => navigate("/checkout/product")}
    >
      <form onSubmit={handleSubmit(addProduct)}>
        <Row align="center">
          <Col lg={3}>
            <ImageProduct src={noImage} alt={t("checkout.noImage")} />
          </Col>
          <Col lg={9}>
            <Row>
              <Col lg={3} align="center" justify="center">
                <Input
                  text={t("checkout.enterProduct")}
                  placeholder={t("checkout.product")}
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
            <Row>
              <Col>
                <Button
                  icon={PackagePlus}
                  text={t("productList.addProduct")}
                  type="submit"
                >
                  {t("productList.addProduct")}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </form>
    </Card>
  );
}

export default ProductCard;
