import type { ReactNode } from "react";
import { StyledCol } from "./style";

export interface ColProps {
  xs?: number;
  md?: number;
  lg?: number;
  children: ReactNode;
}

export function Col({ xs, md, lg, children }: ColProps) {
  return (
    <StyledCol xs={xs} md={md} lg={lg}>
      {children}
    </StyledCol>
  );
}
