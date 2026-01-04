import { useTranslation } from "react-i18next";
import { Row } from "../Row";
import { Col } from "../Col";
import Table, { type Column } from "../Table";
import type { ProductFormData } from "../ProductCard";
import Card from "../Card";
import { useNavigate } from "react-router-dom";

export interface ProductListCardProps {
  columns: Column<ProductFormData>[];
  data: ProductFormData[];
}

function ProductListCard({ columns, data }: ProductListCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card title={t("checkout.productList")}>
      <Row>
        <Col>
          <Table<ProductFormData>
            columns={columns}
            data={data}
            pageSize={10}
            onRowClick={(row) => navigate(`/checkout/product/${row.item}`)}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default ProductListCard;
