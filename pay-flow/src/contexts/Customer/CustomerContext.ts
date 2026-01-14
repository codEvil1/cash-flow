import { createContext } from "react";
import type { Customer } from "./CustomerProvider";

export interface CustomerContextData {
  customer?: Customer;
  loading: boolean;
  getCustomer: (identifier: string) => Promise<Customer | undefined>;
  setCustomer: (custumer?: Customer) => void;
}

export const CustomerContext = createContext<CustomerContextData>(
  {} as CustomerContextData
);
