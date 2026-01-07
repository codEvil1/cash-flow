import { useState, type ReactNode } from "react";
import { CustomerContext } from "./CustomerContext";

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string>("");
  const [identifier, setIdentifier] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  return (
    <CustomerContext.Provider
      value={{
        name,
        identifier,
        phone,
        email,
        country,
        setName,
        setIdentifier,
        setPhone,
        setEmail,
        setCountry,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
