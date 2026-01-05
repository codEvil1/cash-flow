import type { ProductFormData } from "../../components/ProductCard";

export function calculateSubTotal(items: ProductFormData[]): number {
  return items.reduce((total, item) => total + item.price, 0);
}
