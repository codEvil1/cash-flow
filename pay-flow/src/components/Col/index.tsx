import type { ReactNode } from "react";
import { StyledCol } from "./style";

export interface ColProps {
  xs?: number;
  md?: number;
  lg?: number;
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?: "flex-start" | "center" | "flex-end" | "space-between";
  children: ReactNode;
}

export function Col({
  xs,
  md,
  lg,
  align = "stretch",
  justify = "flex-start",
  children,
}: ColProps) {
  return (
    <StyledCol xs={xs} md={md} lg={lg} align={align} justify={justify}>
      {children}
    </StyledCol>
  );
}
