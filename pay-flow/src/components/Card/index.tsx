import type { ReactNode, MouseEvent } from "react";
import { CardContainer, CardTitle, CardContent } from "./style";
import { useTheme } from "../../contexts/Theme/useTheme";

interface CardProps {
  title?: string;
  titlePadding?: number;
  onClick?: () => void;
  children: ReactNode;
}

function Card({ title, titlePadding, children, onClick }: CardProps) {
  const { theme } = useTheme();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const interactiveElements = [
      "INPUT",
      "BUTTON",
      "SELECT",
      "TEXTAREA",
      "A",
      "LABEL",
    ];
    if (interactiveElements.includes((event.target as HTMLElement).tagName)) {
      event.stopPropagation();
      return;
    }
    onClick?.();
  };

  return (
    <CardContainer theme={theme} onClick={handleClick} clickable={!!onClick}>
      {title && (
        <CardTitle theme={theme} titlePadding={titlePadding}>
          {title}
        </CardTitle>
      )}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}

export default Card;
