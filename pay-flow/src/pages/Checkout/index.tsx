import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Footer, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { APP_VERSION } from "../../config/app";
import { Card } from "../../components/Card";
import { Body } from "./style";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import ProductCard from "../../components/ProductCard";
import ProductListCard from "../../components/ProductListCard";
import DiscountCard from "../../components/DiscountCard";

function Login() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // const navigate = useNavigate();

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
              <DiscountCard
                data={{
                  couponCode: "PROMO20",
                  percentage: 20,
                  originalTotal: 150,
                  discountValue: 30,
                  finalTotal: 120,
                }}
                theme={theme}
              ></DiscountCard>
            </Row>
            <Row>
              <Card title={t("checkout.cashier")}>a</Card>
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

export default Login;
