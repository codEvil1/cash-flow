import type { ButtonHTMLAttributes, ElementType } from "react";
import { Content, IconWrapper, StyledButton } from "./style";
import { useTheme } from "../../contexts/Theme/useTheme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: ElementType;
}

function Button({ children, icon, text, ...props }: ButtonProps) {
  const { theme } = useTheme();

  const Icon = icon;

  return (
    <StyledButton theme={theme} title={text} {...props}>
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
