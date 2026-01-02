import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/theme/useTheme";
import { Footer, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { APP_VERSION } from "../../config/app";
import { Card } from "../../components/Card";
import { Body } from "./style";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import ProductCard from "../../components/ProductCard";

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
            <ProductCard />
          </Col>
          <Col lg={3}>
            <Card title={t("checkout.discount")}>a</Card>
            <Card title={t("checkout.cashier")}>a</Card>
            <Card title={t("checkout.custumer")}>a</Card>
            <Card title={t("checkout.payment")}>a</Card>
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
