import { useTheme } from "../../contexts/Theme/useTheme";
import { Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { Body } from "./style";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import ProductCard from "../../components/ProductCard";
import ProductListCard from "../../components/ProductListCard";
import DiscountCard from "../../components/DiscountCard";
import CashierCard from "../../components/CashierCard";
import CustomerCard from "../../components/CustomerCard";
import PaymentCard from "../../components/PaymentCard";
import ShippingCard from "../../components/ShippingCard";
import { useTranslation } from "react-i18next";

function Checkout() {
  const { t } = useTranslation();
  const { theme } = useTheme();

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
              <ProductListCard />
            </Row>
          </Col>
          <Col lg={3}>
            <Row>
              <CashierCard title={t("cashier.cashier")} />
            </Row>
            <Row>
              <CustomerCard title={t("customer.customer")} />
            </Row>
            <Row>
              <ShippingCard title={t("shipping.shipping")} />
            </Row>
            <Row>
              <DiscountCard title={t("discount.discount")} />
            </Row>
            <Row>
              <PaymentCard title={t("payment.payment")} />
            </Row>
          </Col>
        </Row>
      </Body>''
    </Page>
  );
}

export default Checkout;
