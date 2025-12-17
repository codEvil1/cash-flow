import { Container, StyledInput } from "./style";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  theme?: "light" | "dark";
}

function Input({ label, theme = "light", ...props }: InputProps) {
  return (
    <Container>
      <label>{label}</label>
      <StyledInput theme={theme} {...props} />
    </Container>
  );
}

export default Input;
