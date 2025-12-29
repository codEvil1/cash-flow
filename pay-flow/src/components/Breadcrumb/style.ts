import styled from "styled-components";
import { colors } from "../Style/theme";
import { Link } from "react-router-dom";

interface BreadcrumbStyleProps {
  theme: "light" | "dark";
}

export const CrumbLink = styled(Link)`
  all: unset;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Container = styled.nav<BreadcrumbStyleProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    font-weight: 500;
  }
`;
