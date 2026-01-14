import type { ProductFormData } from "../components/ProductCard";
import { INTEREST_RATE } from "../domain/constants";

export function calculateSubTotal(products: ProductFormData[]): number {
  return products.reduce((total, item) => total + item.price, 0);
}

export function calculateInterest(
  baseTotal: number,
  installmentCount: number
): number {
  if (baseTotal <= 0 || installmentCount <= 1) return 0;
  return baseTotal * INTEREST_RATE;
}

export function calculateNetTotal(
  products: ProductFormData[],
  freight: number | undefined,
  discount: number,
  installmentCount: number
): number {
  const baseTotal = calculateSubTotal(products) + (freight ?? 0) - discount;
  const interest = installmentCount > 1 ? baseTotal * INTEREST_RATE : 0;
  return baseTotal + interest;
}

export function calculateInstallments(
  netTotal: number,
  installmentCount: number
): number {
  if (installmentCount <= 0) return 0;
  return netTotal / installmentCount;
}
