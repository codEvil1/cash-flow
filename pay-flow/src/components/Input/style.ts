import styled from "styled-components";

interface InputStyleProps {
  theme: "light" | "dark";
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.75);
  }
`;

export const StyledInput = styled.input<InputStyleProps>`
  width: 100%;
  height: 48px;

  padding: 0 16px;
  border-radius: 14px;

  font-size: 15px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;

  background: ${({ theme }) =>
    theme === "dark" ? "rgba(28,28,30,0.65)" : "rgba(255,255,255,0.6)"};

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  border: 1px solid
    ${({ theme }) =>
      theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"};

  color: ${({ theme }) =>
    theme === "dark" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)"};

  outline: none;
  transition: all 0.25s ease;

  &::placeholder {
    color: ${({ theme }) =>
      theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)"};
  }

  &:focus {
    border-color: ${({ theme }) =>
      theme === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)"};

    box-shadow: ${({ theme }) =>
      theme === "dark"
        ? "0 0 0 4px rgba(255,255,255,0.06)"
        : "0 0 0 4px rgba(0,0,0,0.05)"};
  }
`;
