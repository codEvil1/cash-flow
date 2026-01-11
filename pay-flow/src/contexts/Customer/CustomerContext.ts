import { createContext } from "react";
import type { Customer } from "./CustomerProvider";

export interface CustomerContextData {
  identifier?: string;
  customer?: Customer;
  loading: boolean;
  setIdentifier: (identifier?: string) => void;
  getCustomer: () => void;
  setCustomer: (custumer?: Customer) => void;
}

export const CustomerContext = createContext<CustomerContextData>(
  {} as CustomerContextData
);
