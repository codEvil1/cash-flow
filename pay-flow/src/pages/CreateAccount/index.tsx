import { useTranslation } from "react-i18next";
import { APP_VERSION } from "../../config/app";
import { Body, Footer, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { useTheme } from "../../contexts/theme/useTheme";

interface LoginFormData {
  email: string;
  password: string;
}

function CreateAccount() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={() => onSubmit}>
      <Page theme={theme}>
        <HeaderControls />
        <Body></Body>
        <Footer theme={theme}>
          {t("app.version")} v{APP_VERSION}
        </Footer>
      </Page>
    </form>
  );
}

export default CreateAccount;
