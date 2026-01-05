import type { ProductFormData } from "../../components/ProductCard";

export function calculateSubTotal(products: ProductFormData[]): number {
  return products.reduce((total, item) => total + item.price, 0);
}

export function calculateNetTotal(
  products: ProductFormData[],
  freight: number,
  discount: number
): number {
  return calculateSubTotal(products) + freight - discount;
}
