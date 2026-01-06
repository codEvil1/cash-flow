import { useState, type ReactNode } from "react";
import { CashierContext } from "./CashierContext";

export function CashierProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [ratings, setRatings] = useState<number[]>([]);

  return (
    <CashierContext.Provider
      value={{
        id,
        name,
        ratings,
        setId,
        setName,
        setRatings,
      }}
    >
      {children}
    </CashierContext.Provider>
  );
}
