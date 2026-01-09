import styled from "styled-components";
import { colors } from "../../components/Style/theme";

interface PageProps {
  theme: "light" | "dark";
}

export const SummaryLabel = styled.label<PageProps>`
  margin-top: 12px;
  padding: 14px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};
`;
