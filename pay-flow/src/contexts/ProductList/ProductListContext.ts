import { createContext } from "react";
import type { ProductFormData } from "../../components/ProductCard";

interface ProductListProviderContextData {
  productList: ProductFormData[];
  addProduct: (products: ProductFormData) => void;
  removeProduct: (products: ProductFormData) => void;
}

export const ProductListContext = createContext<ProductListProviderContextData>(
  {} as ProductListProviderContextData
);
