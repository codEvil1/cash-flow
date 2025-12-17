import Button from "../Button";
import Input from "../Input";
import { Page } from "./style";
import logoDark from "../../assets/logo_dark.png";
import Select from "../Select";
import type { Options } from "../Select/type";
import { useState } from "react";

type ThemeMode = "light" | "dark";

function Login() {
  const getLanguageOptions = (): Options[] => {
    return [
      { value: "pt", label: "Português" },
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
          src={logoDark}
          width={300}
          height={300}
          alt="Logo do sistema"
          className="login-logo"
        />
        <Input label="E-mail" type="email" theme={theme} />
        <Input label="Senha" type="password" theme={theme} />
        <Button theme={theme}>teste</Button>
        <Select label="Idioma" theme={theme} options={getLanguageOptions()} />
        <Select
          label="Tema"
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
