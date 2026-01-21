import { createContext } from "react";
import type { Customer } from "./CustomerProvider";

export interface CustomerContextData {
  loading: boolean;
  getCustomer: (identifier: string) => Promise<Customer | undefined>;
  confirmCustomer: (custumer: Customer) => void;
}

export const CustomerContext = createContext<CustomerContextData>(
  {} as CustomerContextData,
);
