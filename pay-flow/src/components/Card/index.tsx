import type { ReactNode } from "react";
import { CardContainer, CardTitle, CardContent } from "./style";
import { useTheme } from "../../contexts/Theme/useTheme";

interface CardProps {
  title?: string;
  onClick?: () => void;
  children: ReactNode;
}

function Card({ title, children, onClick }: CardProps) {
  const { theme } = useTheme();

  return (
    <CardContainer theme={theme} onClick={onClick} clickable={!!onClick}>
      {title && <CardTitle theme={theme}>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}

export default Card;
