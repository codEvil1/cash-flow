import { useContext } from "react";
import { ShippingContext } from "./ShippingContext";

export function useShipping() {
  return useContext(ShippingContext);
}
