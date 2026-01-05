import { createContext } from "react";

export interface ShippingContextData {
  type: string;
  deliveryTime: string;
  freight: number;
  setType: (type: string) => void;
  setDeliveryTime: (deliveryTime: string) => void;
  setFreight: (freight: number) => void;
}

export const ShippingContext = createContext<ShippingContextData>(
  {} as ShippingContextData
);
