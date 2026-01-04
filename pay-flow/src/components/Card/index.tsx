import type { ReactNode } from "react";
import { CardContainer, CardTitle, CardContent } from "./style";
import { useTheme } from "../../contexts/Theme/useTheme";

interface CardProps {
  title?: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  const { theme } = useTheme();

  return (
    <CardContainer theme={theme}>
      {title && <CardTitle theme={theme}>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}
