import { useTranslation } from "react-i18next";
import { APP_VERSION } from "../../config/app";
import { Body, Footer, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { useTheme } from "../../contexts/theme/useTheme";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAccountSchema } from "../../validations/createAccountSchema";
import { GridButton, Title } from "../ResetPassword/style";
import { useState } from "react";
import Button from "../../components/Button";
import { ArrowLeft, Mail, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import { VerificationCode } from "../../components/VerificationCode";

type CreateAccountStep = "email" | "create";

interface LoginFormData {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
}

function CreateAccount() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [step, setStep] = useState<CreateAccountStep>("email");
  const [code, setCode] = useState("");

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(createAccountSchema(t)),
    mode: "onTouched",
  });

  const goToNextStep = async () => {
    const isValid = await trigger("email");
    if (!isValid) return;
    // API envio do código
    toast.success(t("resetPassword.sentEmail"));
    setStep("create");
  };

  const handleResetPassword = async () => {
    const isValid = await trigger(["code", "password", "confirmPassword"]);
    if (!isValid) return;
    console.log(code);
    // API validar código
    // API criar conta
    toast.success(t("resetPassword.passwordChanged"));
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: "login.login", path: "/" },
          { label: "login.createAccount", path: "/create-account" },
        ]}
      />
      <Body>
        <Title theme={theme}>
          {step === "email"
            ? t("createAccount.titleEmail")
            : t("createAccount.titleCreate")}
        </Title>
        {step === "email" && (
          <>
            <Input
              placeholder={t("login.email")}
              theme={theme}
              error={errors.email?.message}
              {...register("email")}
            />
            <Button
              type="button"
              icon={Mail}
              text={t("resetPassword.sendCode")}
              onClick={goToNextStep}
            >
              {t("resetPassword.sendCode")}
            </Button>
          </>
        )}
        {step === "create" && (
          <>
            <VerificationCode
              label={t("createAccount.verificationCode")}
              theme={theme}
              onComplete={(value) => setCode(value)}
              error={errors.code?.message}
              {...register("code")}
            />
            <Input
              type="password"
              placeholder={t("login.password")}
              theme={theme}
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              type="password"
              placeholder={t("resetPassword.confirmPassword")}
              theme={theme}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            <GridButton>
              <Button
                type="button"
                icon={ArrowLeft}
                text={t("common.back")}
                onClick={() => setStep("email")}
              >
                {t("common.back")}
              </Button>
              <Button
                type="button"
                icon={UserPlus}
                text={t("createAccount.createAccount")}
                onClick={handleResetPassword}
              >
                {t("createAccount.createAccount")}
              </Button>
            </GridButton>
          </>
        )}
      </Body>
      <Footer theme={theme}>
        {t("app.version")} v{APP_VERSION}
      </Footer>
    </Page>
  );
}

export default CreateAccount;
