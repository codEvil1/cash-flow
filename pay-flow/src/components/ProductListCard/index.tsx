import { useTranslation } from "react-i18next";
import { Card } from "../Card";
import { Row } from "../Row";
import { Col } from "../Col";
import type { ProductFormData } from "../ProductCard";

interface ProductListCardFormData {
  items: ProductFormData[];
}

function ProductListCard({ items }: ProductListCardFormData) {
  const { t } = useTranslation();

  return (
    <Card title={t("checkout.productList")}>
      <Row align="center">
        <Col>
          <Table items={items}></Table>
        </Col>
      </Row>
    </Card>
  );
}

export default ProductListCard;
