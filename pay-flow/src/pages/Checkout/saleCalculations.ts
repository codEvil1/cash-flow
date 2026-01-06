import type { ProductFormData } from "../../components/ProductCard";
import { INTEREST_RATE } from "../../config/constants";

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

export function calculateInstallments(
  netTotal: number,
  installmentCount: number
): number {
  if (netTotal <= 0) return 0;
  const totalWithInterest = netTotal * (1 + INTEREST_RATE);
  return totalWithInterest / installmentCount;
}
