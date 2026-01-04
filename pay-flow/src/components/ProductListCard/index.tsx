import { useTranslation } from "react-i18next";
import { Card } from "../Card";
import { Row } from "../Row";
import { Col } from "../Col";
import Table, { type Column } from "../Table";
import type { ProductFormData } from "../ProductCard";
import { useTheme } from "../../contexts/theme/useTheme";

function ProductListCard() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const columns: Column<ProductFormData>[] = [
    {
      key: "item",
      label: t("checkout.product"),
      align: "center",
      width: "20%",
    },
    {
      key: "description",
      label: t("checkout.description"),
      width: "40%",
    },
    {
      key: "quantity",
      label: t("checkout.quantity"),
      align: "center",
      width: "20%",
    },
    {
      key: "price",
      label: t("checkout.price"),
      align: "center",
      width: "20%",
      render: (value) => `R$ ${Number(value).toFixed(2).replace(".", ",")}`,
    },
  ];

  const data: ProductFormData[] = Array.from({ length: 11 }).map(() => ({
    item: "24011108",
    description: "Café",
    quantity: 2,
    price: 12,
  }));

  return (
    <Card title={t("checkout.productList")}>
      <Row>
        <Col>
          <Table<ProductFormData>
            columns={columns}
            data={data}
            theme={theme}
            pageSize={10}
            emptyMessage={t("common.emptyList")}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default ProductListCard;
