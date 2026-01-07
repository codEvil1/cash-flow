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

function Checkout() {
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
              <CashierCard />
            </Row>
            <Row>
              <CustomerCard />
            </Row>
            <Row>
              <ShippingCard />
            </Row>
            <Row>
              <DiscountCard />
            </Row>
            <Row>
              <PaymentCard />
            </Row>
          </Col>
        </Row>
      </Body>
    </Page>
  );
}

export default Checkout;
