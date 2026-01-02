import styled, { css } from "styled-components";

interface StyledColProps {
  xs?: number;
  md?: number;
  lg?: number;
  align: string;
  justify: string;
}

const getWidth = (size?: number) => {
  if (!size) return "100%";
  return `${(size / 12) * 100}%`;
};

export const StyledCol = styled.div<StyledColProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  padding-left: 8px;
  padding-right: 8px;

  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};

  flex: 0 0 ${({ xs }) => getWidth(xs)};
  max-width: ${({ xs }) => getWidth(xs)};

  ${({ md }) =>
    md &&
    css`
      @media (min-width: 768px) {
        flex: 0 0 ${getWidth(md)};
        max-width: ${getWidth(md)};
      }
    `}

  ${({ lg }) =>
    lg &&
    css`
      @media (min-width: 1200px) {
        flex: 0 0 ${getWidth(lg)};
        max-width: ${getWidth(lg)};
      }
    `}
`;
