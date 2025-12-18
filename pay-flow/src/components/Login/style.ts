import styled from "styled-components";

interface PageProps {
  theme: "light" | "dark";
}

const darkBackground = "linear-gradient(135deg, #0a0a0a, #1c1c1e)";
const lightBackground = "linear-gradient(135deg, #f2f2f7, #e5e5ea)";

const darkText = "rgba(255, 255, 255, 0.9)";
const lightText = "rgba(0, 0, 0, 0.88)";

export const Page = styled.div<PageProps>`
  min-height: 100vh;
  background: ${({ theme }) =>
    theme === "dark" ? darkBackground : lightBackground};

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: system-ui, -apple-system, BlinkMacSystemFont;
  color: ${({ theme }) => (theme === "dark" ? darkText : lightText)};
`;

export const StyledLink = styled.a<PageProps>`
  text-decoration: none;
  color: ${({ theme }) => (theme === "dark" ? darkText : lightText)};

  &:hover {
    text-decoration: underline;
  }
`;

export const RightContainer = styled.div<PageProps>`
  display: flex;
  justify-content: flex-end;
`;
