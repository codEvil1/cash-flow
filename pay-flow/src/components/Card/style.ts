import styled from "styled-components";
import { colors } from "../Style/theme";

interface CardStyleProps {
  theme: "light" | "dark";
}

export const CardContainer = styled.div<CardStyleProps>`
  width: 100%;

  background: ${({ theme }) =>
    theme === "dark" ? colors.darkComponentBg : colors.lightComponentBg};

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  border-radius: 16px;

  border: 1px solid
    ${({ theme }) =>
      theme === "dark" ? colors.darkBorder : colors.lightBorder};

  box-shadow: ${({ theme }) =>
    theme === "dark"
      ? "0 12px 32px rgba(0,0,0,0.45)"
      : "0 12px 32px rgba(0,0,0,0.12)"};

  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h3`
  margin: 0;
  padding: 16px 16px 0 16px;

  text-align: center;

  font-size: 16px;
  font-weight: 600;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;

  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};
`;

export const CardContent = styled.div`
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
