import { useState, type ReactNode } from "react";
import type { ProductFormData } from "../../components/ProductCard";
import { ProductListContext } from "./ProductListContext";

export function ProductListProvider({ children }: { children: ReactNode }) {
  const [productList, setProductList] = useState<ProductFormData[]>([]);

  return (
    <ProductListContext.Provider
      value={{
        productList,
        setProductList,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
}
