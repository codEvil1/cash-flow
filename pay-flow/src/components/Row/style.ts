import styled from "styled-components";
import type { RowProps } from ".";

export const StyledRow = styled.div<RowProps>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: ${({ gap = 0 }) => `${gap}px`};
`;
