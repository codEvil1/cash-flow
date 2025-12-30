import type { ReactNode } from "react";
import { StyledRow } from "./style";

export interface RowProps {
  gap?: number;
  children: ReactNode;
}

export function Row({ children, gap }: RowProps) {
  return <StyledRow gap={gap}>{children}</StyledRow>;
}
