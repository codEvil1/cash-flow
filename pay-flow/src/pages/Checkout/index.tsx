import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { Body } from "./style";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import ProductCard, {
  type ProductFormData,
} from "../../components/ProductCard";
import ProductListCard from "../../components/ProductListCard";
import DiscountCard from "../../components/DiscountCard";
import CashierCard from "../../components/CashierCard";
import { formatCurrency } from "../../utils/formatCurrency";
import Input from "../../components/Input";
import { useCurrency } from "../../contexts/Currency/useCurrency";
import Button from "../../components/Button";
import { Trash } from "lucide-react";
import CustomerCard from "../../components/CustumerCard";
import PaymentCard from "../../components/PaymentCard";
import ShippingCard from "../../components/ShippingCard";
import { useProductList } from "../../contexts/ProductList/useProductList";

function Checkout() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { currency, locale } = useCurrency();
  const { productList, removeProduct } = useProductList();

  const handleRemove = (product: ProductFormData) => {
    removeProduct(product);
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[{ label: "checkout.checkout", path: "/checkout" }]}
      />
      <Body>
        <Row>
          <Col lg={9}>
            <Row>
              <ProductCard />
            </Row>
            <Row>
              <ProductListCard
                columns={[
                  {
                    key: "item",
                    label: t("checkout.product"),
                    align: "center",
                    width: "15%",
                  },
                  {
                    key: "description",
                    label: t("checkout.description"),
                    align: "center",
                    width: "37%",
                  },
                  {
                    key: "quantity",
                    label: t("checkout.quantity"),
                    align: "center",
                    width: "10%",
                    render: (value) => (
                      <Input
                        placeholder="aa"
                        text="aa"
                        // type="number"
                        value={value}
                        readOnly
                        center
                      />
                    ),
                  },
                  {
                    key: "unitPrice",
                    label: t("checkout.unitPrice"),
                    align: "center",
                    width: "15%",
                    render: (value, row) => {
                      return `${formatCurrency(
                        Number(value),
                        locale,
                        currency
                      )} (${row.quantity}x)`;
                    },
                  },
                  {
                    key: "price",
                    label: t("checkout.price"),
                    align: "center",
                    width: "15%",
                    render: (value) =>
                      formatCurrency(Number(value), locale, currency),
                  },
                  {
                    key: "item",
                    label: "",
                    align: "center",
                    width: "8%",
                    render: (_, row) => (
                      <Button
                        onClick={() => handleRemove(row)}
                        text={"checkout.removeProduct"}
                        icon={Trash}
                      ></Button>
                    ),
                  },
                ]}
                data={productList}
              />
            </Row>
          </Col>
          <Col lg={3}>
            <Row>
              <CashierCard
                data={{
                  id: "0421",
                  name: "João Silva",
                  role: "Atendente",
                  rating: 4.5,
                  reviewsCount: 128,
                }}
              />
            </Row>
            <Row>
              <CustomerCard
                data={{
                  name: "Bruno Paese",
                  identifier: "031.656.400-17",
                  phone: "54994057272",
                  email: "brunoviniciuspaese@gmail.com",
                  country: "BR",
                }}
              />
            </Row>
            <Row>
              <ShippingCard
                data={{
                  type: "Sedex",
                  deliveryTime: "12-15 Dias Úteis",
                  cost: 50,
                  address: "Andrea Pontin, 172, Centro, Carlos Barbosa",
                }}
              />
            </Row>
            <Row>
              <DiscountCard
                data={{
                  couponCode: "PROMO20",
                  percentage: 20,
                  originalTotal: 150,
                  discountValue: 30,
                  finalTotal: 120,
                }}
              />
            </Row>
            <Row>
              <PaymentCard
                data={{
                  paymentMethod: "card",
                  cardBrand: "Visa",
                  discount: 100,
                  shipping: 50,
                }}
              />
            </Row>
          </Col>
        </Row>
      </Body>
    </Page>
  );
}

export default Checkout;
