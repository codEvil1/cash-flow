import { useState, type ReactNode } from "react";
import { ShippingContext } from "./ShippingContext";

export function ShippingProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<string>("");
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [freight, setFreight] = useState<number>(0);
  const [adress, setAdress] = useState<string>("");

  return (
    <ShippingContext.Provider
      value={{
        type,
        deliveryTime,
        freight,
        adress,
        setType,
        setDeliveryTime,
        setFreight,
        setAdress,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
}
