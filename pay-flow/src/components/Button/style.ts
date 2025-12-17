import styled from "styled-components";

interface ButtonStyleProps {
  theme: "light" | "dark";
}

export const StyledButton = styled.button<ButtonStyleProps>`
  width: 100%;
  height: 48px;

  border-radius: 16px;
  border: 1px solid
    ${({ theme }) =>
      theme === "dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.1)"};

  background: ${({ theme }) =>
    theme === "dark" ? "rgba(28,28,30,0.7)" : "rgba(255,255,255,0.65)"};

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  font-size: 15px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;

  color: ${({ theme }) =>
    theme === "dark" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)"};

  cursor: pointer;
  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.25s ease;

  &:hover {
    background: ${({ theme }) =>
      theme === "dark" ? "rgba(40,40,42,0.8)" : "rgba(255,255,255,0.8)"};
  }

  &:active {
    transform: scale(0.97);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
  }
`;
