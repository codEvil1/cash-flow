import { useState, type ReactNode } from "react";
import type { ProductFormData } from "../../components/ProductCard";
import { ProductListContext } from "./ProductListContext";

export interface ProductList {
  item: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  price: number;
}

export function ProductListProvider({ children }: { children: ReactNode }) {
  const [productList, setProductList] = useState<ProductList[]>([]);

  const addProduct = (product: ProductFormData) => {
    setProductList((prev) => {
      const exists = prev.some((p) => p.item === product.item);

      if (exists) {
        return prev.map((p) =>
          p.item === product.item
            ? {
                ...p,
                quantity: p.quantity + product.quantity,
                price: p.unitPrice * (p.quantity + product.quantity),
              }
            : p,
        );
      }

      return [...prev, product];
    });
  };

  const removeProduct = (product: ProductFormData) => {
    setProductList((prev) => prev.filter((item) => item.item !== product.item));
  };

  const updateProductQuantity = (product: string, quantity: number) => {
    setProductList((prev) =>
      prev.map((p) =>
        p.item === product
          ? {
              ...p,
              price: p.unitPrice * p.quantity,
              quantity,
            }
          : p,
      ),
    );
  };

  return (
    <ProductListContext.Provider
      value={{
        productList,
        addProduct,
        removeProduct,
        updateProductQuantity,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
}
