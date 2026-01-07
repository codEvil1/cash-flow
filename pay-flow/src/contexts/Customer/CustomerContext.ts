import { createContext } from "react";

export interface CustomerContextData {
  name: string;
  identifier: string;
  phone: string;
  email: string;
  country: string;
  setName: (name: string) => void;
  setIdentifier: (identifier: string) => void;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
  setCountry: (country: string) => void;
}

export const CustomerContext = createContext<CustomerContextData>(
  {} as CustomerContextData
);
