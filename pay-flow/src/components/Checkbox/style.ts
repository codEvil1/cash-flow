import styled from "styled-components";
import { colors } from "../Style/theme";

interface CheckboxStyleProps {
  theme: "light" | "dark";
}

export const Container = styled.div`
  width: 100%;
`;

export const Label = styled.label<CheckboxStyleProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;

  span {
    font-size: 14px;
    color: ${({ theme }) =>
      theme === "dark" ? colors.darkText : colors.lightText};
  }
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const StyledCheckbox = styled.div<CheckboxStyleProps>`
  width: 22px;
  height: 22px;
  border-radius: 7px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) =>
    theme === "dark" ? colors.darkComponentBg : colors.lightComponentBg};

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  border: 1px solid
    ${({ theme }) =>
      theme === "dark" ? colors.darkBorder : colors.lightBorder};

  transition: all 0.25s ease;

  svg {
    opacity: 0;
    color: ${({ theme }) =>
      theme === "dark" ? colors.darkText : colors.lightText};
    transition: opacity 0.2s ease;
  }

  ${HiddenCheckbox}:checked + & {
    svg {
      opacity: 1;
    }
  }

  ${HiddenCheckbox}:focus + & {
    box-shadow: ${({ theme }) =>
      theme === "dark"
        ? "0 0 0 4px rgba(255,255,255,0.06)"
        : "0 0 0 4px rgba(0,0,0,0.05)"};
  }
`;
