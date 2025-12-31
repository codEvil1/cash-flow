import styled from "styled-components";
import { colors } from "../../components/Style/theme";

interface PageProps {
  theme: "light" | "dark";
}

export const CardProduct = styled.div<PageProps>`
  display: flex;
  width: ;

  display: flex;
  flex-direction: column;

  background: ${({ theme }) =>
    theme === "dark" ? colors.darkBackground : colors.lightBackground};

  font-family: system-ui, -apple-system, BlinkMacSystemFont;
`;
