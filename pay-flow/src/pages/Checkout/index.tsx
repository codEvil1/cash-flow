import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Footer, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { APP_VERSION } from "../../config/app";
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
import { useState } from "react";
import Card from "../../components/Card";

function Checkout() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { currency, locale } = useCurrency();

  const [products, setProducts] = useState<ProductFormData[]>([]);

  function handleRemove(item: string) {
    // event.stopPropagation();
    setProducts((prev) => prev.filter((product) => product.item !== item));
  }

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
                    width: "20%",
                  },
                  {
                    key: "description",
                    label: t("checkout.description"),
                    align: "center",
                    width: "40%",
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
                    key: "price",
                    label: t("checkout.price"),
                    align: "center",
                    width: "20%",
                    render: (value) =>
                      formatCurrency(Number(value), locale, currency),
                  },
                  {
                    key: "item",
                    label: "",
                    align: "center",
                    width: "10%",
                    render: (_, row) => (
                      <Button
                        onClick={() => handleRemove(row.item)}
                        text={""}
                        icon={Trash}
                      ></Button>
                    ),
                  },
                ]}
                data={[
                  {
                    item: "24011112",
                    description: "Produto X",
                    quantity: 2,
                    price: 50,
                  },
                  {
                    item: "24011113",
                    description: "Produto Y",
                    quantity: 1,
                    price: 50,
                  },
                  {
                    item: "24011110",
                    description: "Produto Z",
                    quantity: 3,
                    price: 25,
                  },
                ]}
              />
            </Row>
          </Col>
          <Col lg={3}>
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
              <Card title={t("checkout.custumer")}>a</Card>
            </Row>
            <Row>
              <Card title={t("checkout.payment")}>a</Card>
            </Row>
          </Col>
        </Row>
      </Body>
      <Footer theme={theme}>
        {t("app.version")} v{APP_VERSION}
      </Footer>
    </Page>
  );
}

export default Checkout;
