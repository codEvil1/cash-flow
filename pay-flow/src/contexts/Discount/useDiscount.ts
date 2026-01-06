import { useContext } from "react";
import { DiscountContext } from "./DiscountContext";

export function useDiscount() {
  return useContext(DiscountContext);
}
