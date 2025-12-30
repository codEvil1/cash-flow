import type { ReactNode } from "react";
import { CardContainer, CardTitle, CardContent } from "./style";

interface CardProps {
  title?: string;
  theme?: "light" | "dark";
  children: ReactNode;
}

export function Card({ title, theme = "light", children }: CardProps) {
  return (
    <CardContainer theme={theme}>
      {title && <CardTitle theme={theme}>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}
