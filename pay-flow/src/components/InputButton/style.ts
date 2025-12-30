import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 44px 10px 12px;
`;

export const ActionButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
