import type { ReactNode } from "react";
import { StyledRow } from "./style";

export interface RowProps {
  children: ReactNode;
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?: "flex-start" | "center" | "flex-end" | "space-between";
}

export function Row({
  children,
  align = "stretch",
  justify = "flex-start",
}: RowProps) {
  return (
    <StyledRow align={align} justify={justify}>
      {children}
    </StyledRow>
  );
}
