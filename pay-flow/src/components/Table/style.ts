import styled from "styled-components";
import { colors } from "../Style/theme";

interface TableStyleProps {
  theme: "light" | "dark";
  align?: "left" | "center" | "right";
  width?: number | string;
  zebra?: boolean;
  clickable?: boolean;
}

export const TableWrapper = styled.div<TableStyleProps>`
  width: 100%;
  overflow-x: auto;

  background: ${({ theme }) =>
    theme === "dark" ? colors.darkComponentBg : colors.lightComponentBg};

  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);

  border: 1px solid
    ${({ theme }) =>
      theme === "dark" ? colors.darkBorder : colors.lightBorder};

  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th<TableStyleProps>`
  padding: 14px 16px;
  width: ${({ width }) => width || "auto"};
  text-align: ${({ align }) => align || "left"};

  font-weight: 600;
  font-size: 0.875rem;

  border-bottom: 1px solid
    ${({ theme }) =>
      theme === "dark" ? colors.darkBorder : colors.lightBorder};
`;

export const Tr = styled.tr<TableStyleProps>`
  background: ${({ zebra, theme }) =>
    zebra
      ? theme === "dark"
        ? "rgba(255, 255, 255, 0.04)"
        : "rgba(0, 0, 0, 0.03)"
      : "transparent"};

  transition: background 0.2s ease;

  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};

  &:hover {
    background: ${({ theme }) =>
      theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"};
  }
`;

export const Td = styled.td<TableStyleProps>`
  padding: 12px 16px;
  text-align: ${({ align }) => align || "left"};
  font-size: 0.875rem;

  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};

  border-bottom: 1px solid
    ${({ theme }) =>
      theme === "dark" ? colors.darkBorder : colors.lightBorder};
`;

export const Empty = styled.div`
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`;

export const PaginationInfo = styled.span`
  font-size: 0.875rem;
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 0.875rem;
    min-width: 70px;
    text-align: center;
  }
`;

export const PaginationButton = styled.button<TableStyleProps>`
  width: 28px;
  height: 28px;
  border-radius: 6px;

  background: transparent;
  border: none;

  cursor: pointer;
  color: ${({ theme }) =>
    theme === "dark" ? colors.darkText : colors.lightText};

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export const HeaderContent = styled.span<TableStyleProps>`
  display: flex;
  align-items: center;
  gap: 6px;

  justify-content: ${({ align }) => {
    if (align === "center") return "center";
    if (align === "right") return "flex-end";
    return "flex-start";
  }};
`;
