import { type LucideIcon } from "lucide-react";
import { ActionButton, InputWrapper } from "./style";
import Input from "../Input";

export interface InputButtonProps {
  value: string;
  placeholder: string;
  text: string;
  theme?: "light" | "dark";
  error?: string;
  icon: LucideIcon;
  onClick: () => void;
}

function InputButton({
  value,
  placeholder,
  text,
  theme = "light",
  error,
  icon: Icon,
  onClick,
}: InputButtonProps) {
  return (
    <InputWrapper>
      <Input
        placeholder={placeholder}
        text={text}
        theme={theme}
        error={error}
        value={value}
      />
      <ActionButton type="button" onClick={onClick}>
        <Icon size={16} />
      </ActionButton>
    </InputWrapper>
  );
}

export default InputButton;
