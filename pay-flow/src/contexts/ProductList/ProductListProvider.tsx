import { useState, type ReactNode } from "react";
import type { ProductFormData } from "../../components/ProductCard";
import { ProductListContext } from "./ProductListContext";

export function ProductListProvider({ children }: { children: ReactNode }) {
  const [productList, setProductList] = useState<ProductFormData[]>([]);

  const addProduct = (product: ProductFormData) => {
    const exists = productList.some((p) => p.item === product.item);
    if (exists) {
      setProductList(
        productList.map((product) =>
          product.item === product.item
            ? { ...product, quantity: product.quantity + product.quantity }
            : product
        )
      );
    } else {
      setProductList((prev) => [...prev, product]);
    }
  };

  const removeProduct = (product: ProductFormData) => {
    setProductList((prev) => prev.filter((item) => item.item !== product.item));
  };

  return (
    <ProductListContext.Provider
      value={{
        productList,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
}
