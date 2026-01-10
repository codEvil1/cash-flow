import type { ButtonHTMLAttributes, ElementType } from "react";
import { Content, IconWrapper, StyledButton } from "./style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: string;
  icon?: ElementType;
}

function Button({ children, icon, text, color, ...props }: ButtonProps) {
  const Icon = icon;

  return (
    <StyledButton title={text} color={color} {...props}>
      <Content>
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        {children && <span>{children}</span>}
      </Content>
    </StyledButton>
  );
}

export default Button;
