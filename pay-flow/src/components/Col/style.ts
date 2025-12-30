import styled, { css } from "styled-components";

interface StyledColProps {
  xs?: number;
  md?: number;
  lg?: number;
}

const getWidth = (size?: number) => {
  if (!size) return "100%";
  return `${(size / 12) * 100}%`;
};

export const StyledCol = styled.div<StyledColProps>`
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
