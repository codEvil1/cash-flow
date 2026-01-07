import { useTranslation } from "react-i18next";
import { Row } from "../Row";
import { Col } from "../Col";
import Table, { type Column } from "../Table";
import type { ProductFormData } from "../ProductCard";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../Button";
import { Trash } from "lucide-react";
import { useProductList } from "../../contexts/ProductList/useProductList";
import { useCurrency } from "../../contexts/Currency/useCurrency";

function ProductListCard() {
  const { t } = useTranslation();
  const { currency, locale } = useCurrency();
  const { productList, removeProduct } = useProductList();

  const navigate = useNavigate();

  const handleRemove = (product: ProductFormData) => {
    removeProduct(product);
  };

  const columns: Column<ProductFormData>[] = [
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
        return `${formatCurrency(Number(value), locale, currency)} (${
          row.quantity
        }x)`;
      },
    },
    {
      key: "price",
      label: t("checkout.price"),
      align: "center",
      width: "15%",
      render: (value) => formatCurrency(Number(value), locale, currency),
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
        />
      ),
    },
  ];

  return (
    <Card title={t("checkout.productList")}>
      <Row>
        <Col>
          <Table<ProductFormData>
            columns={columns}
            data={productList}
            pageSize={10}
            onRowClick={(row) => navigate(`/checkout/product/${row.item}`)}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default ProductListCard;
