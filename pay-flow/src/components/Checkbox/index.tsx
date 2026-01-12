import type { InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { useTheme } from "../../contexts/Theme/useTheme";
import { Container, HiddenCheckbox, Label, StyledCheckbox } from "./style";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  text: string;
}

function Checkbox({ text, ...props }: CheckboxProps) {
  const { theme } = useTheme();

  return (
    <Container>
      <Label theme={theme}>
        <HiddenCheckbox type="checkbox" {...props} />
        <StyledCheckbox theme={theme}>
          <Check size={14} strokeWidth={3} />
        </StyledCheckbox>
        <span>{text}</span>
      </Label>
    </Container>
  );
}

export default Checkbox;
