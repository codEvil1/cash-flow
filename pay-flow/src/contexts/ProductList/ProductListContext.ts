import { createContext } from "react";
import type { ProductFormData } from "../../components/ProductCard";

interface ProductListProviderContextData {
  productList: ProductFormData[];
  setProductList: (products: ProductFormData[]) => void;
}

export const ProductListContext = createContext<ProductListProviderContextData>(
  {} as ProductListProviderContextData
);
