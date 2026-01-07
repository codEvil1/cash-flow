import { createContext } from "react";

export interface ShippingContextData {
  type: string;
  deliveryTime: string;
  freight: number;
  adress: string;
  setType: (type: string) => void;
  setDeliveryTime: (deliveryTime: string) => void;
  setFreight: (freight: number) => void;
  setAdress: (adress: string) => void;
}

export const ShippingContext = createContext<ShippingContextData>(
  {} as ShippingContextData
);
