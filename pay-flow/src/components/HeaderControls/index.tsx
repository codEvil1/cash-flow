import Select from "../../components/Select";
import type { Options } from "../../components/Select/type";
import Toggle from "../../components/Toggle";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/theme/useTheme";
import { Header } from "./style";
import i18n from "../../i18n";
import { useState } from "react";

export type Language = "pt" | "en" | "es";

function HeaderControls() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  function getInitialLanguage(): Language {
    const stored = localStorage.getItem("language");
    if (!stored) return stored as Language;
    return (i18n.language.split("-")[0] as Language) || "pt";
  }

  const [language, setLanguage] = useState<Language>(() =>
    getInitialLanguage()
  );

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    setLanguage(language);
  };

  const getLanguageOptions = (): Options[] => {
    return [
      { value: "pt", label: "Português", icon: null },
      { value: "en", label: "English", icon: null },
      { value: "es", label: "Español", icon: null },
    ];
  };

  const getThemeOptions = (): Options[] => {
    return [
      {
        value: "light",
        label: t("theme.light"),
        icon: <Sun size={18} strokeWidth={1.8} />,
      },
      {
        value: "dark",
        label: t("theme.dark"),
        icon: <Moon size={18} strokeWidth={1.8} />,
      },
    ];
  };

  return (
    <Header>
      <Select
        theme={theme}
        options={getLanguageOptions()}
        value={language}
        text={t("login.selectTheme")}
        onChange={(value) => {
          changeLanguage(value as Language);
        }}
      />
      <Toggle
        value={theme}
        options={getThemeOptions()}
        text={t("theme.selectTheme")}
        onChange={toggleTheme}
      />
    </Header>
  );
}

export default HeaderControls;
