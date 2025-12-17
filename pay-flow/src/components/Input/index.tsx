import { Container, StyledInput } from "./style";
import type { InputHTMLAttributes } from "react";

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  theme?: "light" | "dark";
}

function Input({ label, theme = "light", ...props }: GlassInputProps) {
  return (
    <Container>
      <label>{label}</label>
      <StyledInput theme={theme} {...props} />
    </Container>
  );
}

export default Input;
