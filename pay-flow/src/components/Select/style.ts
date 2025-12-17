import styled from "styled-components";

interface SelectStyleProps {
  theme: "light" | "dark";
}

export const Container = styled.div`
  width: 100%;
  position: relative;

  label {
    font-size: 13px;
    margin-bottom: 6px;
    display: block;
    color: rgba(255, 255, 255, 0.75);
  }
`;

export const StyledSelect = styled.select<SelectStyleProps>`
  width: 100%;
  height: 48px;

  padding: 0 44px 0 16px;
  border-radius: 14px;

  font-size: 15px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

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

  &:focus {
    border-color: ${({ theme }) =>
      theme === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)"};

    box-shadow: ${({ theme }) =>
      theme === "dark"
        ? "0 0 0 4px rgba(255,255,255,0.06)"
        : "0 0 0 4px rgba(0,0,0,0.05)"};
  }

  option {
    color: #000; /* dropdown nativo */
  }
`;

export const Arrow = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;

  width: 0;
  height: 0;

  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(255, 255, 255, 0.7);
`;
