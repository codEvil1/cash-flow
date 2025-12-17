import { Arrow, Container, StyledSelect } from "./style";
import type { Options } from "./type";

interface SelectProps<T>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label: string;
  options: Options<T>[];
  theme?: "light" | "dark";
  onChange?: (value: T) => void;
}

function Select<T>({
  label,
  theme = "light",
  options,
  onChange,
  ...props
}: SelectProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = options.find(
      (opt) => String(opt.value) === e.target.value
    );
    if (selected) {
      onChange?.(selected.value);
    }
  };

  return (
    <Container>
      <label>{label}</label>
      <StyledSelect theme={theme} onChange={handleChange} {...props}>
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      <Arrow />
    </Container>
  );
}

export default Select;
