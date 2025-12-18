import Button from "../Button";
import Input from "../Input";
import { Page, RightContainer, StyledLink } from "./style";
import logoDark from "../../assets/logo_dark.png";
import logoLight from "../../assets/logo_light.png";
import Select from "../Select";
import type { Options } from "../Select/type";
import { useState } from "react";

type ThemeMode = "light" | "dark";

function Login() {
  const getLanguageOptions = (): Options[] => {
    return [
      { value: "pt", label: "Português (Brasil)" },
      { value: "en", label: "Inglês" },
      { value: "es", label: "Espanhol" },
    ];
  };

  const getThemeOptions = (): Options[] => {
    return [
      { value: "light", label: "Claro" },
      { value: "dark", label: "Escuro" },
    ];
  };

  const getSystemTheme = (): ThemeMode => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState<ThemeMode>(getSystemTheme);

  return (
    <Page theme={theme}>
      <div className="login-card">
        <img
          src={theme === "dark" ? logoDark : logoLight}
          width={300}
          height={300}
          alt="Logo do sistema"
          className="login-logo"
        />
        <Input label="Email" type="email" theme={theme} />
        <Input label="Password" type="password" theme={theme} />
        <RightContainer theme={theme}>
          <StyledLink href="/reset-password" theme={theme}>
            Forgot Password?
          </StyledLink>
        </RightContainer>
        <Button theme={theme}>Login</Button>
        <RightContainer theme={theme}>
          <StyledLink href="/create-account" theme={theme}>
            Create Account
          </StyledLink>
        </RightContainer>
        <Select theme={theme} options={getLanguageOptions()} />
        <Select
          theme={theme}
          options={getThemeOptions()}
          onChange={(value) => setTheme(value as ThemeMode)}
          value={theme}
        />
      </div>
    </Page>
  );
}

export default Login;
