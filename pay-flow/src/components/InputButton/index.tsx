import { type LucideIcon } from "lucide-react";
import { ActionButton, InputWrapper } from "./style";
import Input from "../Input";
import { useTheme } from "../../contexts/theme/useTheme";

export interface InputButtonProps {
  value: string;
  placeholder: string;
  text: string;
  error?: string;
  icon: LucideIcon;
  onClick: () => void;
}

function InputButton({
  value,
  placeholder,
  text,
  error,
  icon: Icon,
  onClick,
}: InputButtonProps) {
  const { theme } = useTheme();

  return (
    <InputWrapper>
      <Input
        placeholder={placeholder}
        text={text}
        error={error}
        value={value}
      />
      <ActionButton type="button" onClick={onClick} theme={theme}>
        <Icon size={16} />
      </ActionButton>
    </InputWrapper>
  );
}

export default InputButton;
