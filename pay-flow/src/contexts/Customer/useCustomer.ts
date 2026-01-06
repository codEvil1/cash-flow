import { useContext } from "react";
import { CustomerContext } from "./CustomerContext";

export function useCustomer() {
  return useContext(CustomerContext);
}
