import type { ButtonHTMLAttributes, ElementType } from "react";
import { Content, IconWrapper, StyledButton } from "./style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "light" | "dark";
  icon?: ElementType;
}

function Button({ children, theme = "light", icon, ...props }: ButtonProps) {
  const Icon = icon;

  return (
    <StyledButton theme={theme} {...props}>
      <Content>
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        <span>{children}</span>
      </Content>
    </StyledButton>
  );
}

export default Button;
