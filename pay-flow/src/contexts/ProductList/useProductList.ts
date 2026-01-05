import { useContext } from "react";
import { ProductListContext } from "./ProductListContext";

export function useProductList() {
  return useContext(ProductListContext);
}
