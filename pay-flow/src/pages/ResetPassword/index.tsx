import Input from "../../components/Input";
import { useState } from "react";
import { KeyRound, ArrowLeft, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { APP_VERSION } from "../../config/app";
import { Body, Footer, Page } from "../Login/style";
import Button from "../../components/Button";
import { VerificationCode } from "../../components/VerificationCode";
import { GridButton, Title } from "./style";
import HeaderControls from "../../components/HeaderControls";
import { useTheme } from "../../contexts/Theme/useTheme";
import { resetPasswordSchema } from "../../validations/resetPasswordSchema";

type ResetPasswordStep = "email" | "reset";

interface ResetPasswordFormData {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

function ResetPassword() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema(t)),
    mode: "onTouched",
  });

  const [step, setStep] = useState<ResetPasswordStep>("email");
  const [code, setCode] = useState("");

  const goToNextStep = async () => {
    const isValid = await trigger("email");
    if (!isValid) return;
    // API envio do código
    toast.success(t("resetPassword.sentEmail"));
    setStep("reset");
  };

  const handleResetPassword = async () => {
    const isValid = await trigger(["code", "password", "confirmPassword"]);
    if (!isValid) return;
    console.log(code);
    // API validar código
    // API redefinir senha
    toast.success(t("resetPassword.passwordChanged"));
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: "login.login", path: "/" },
          { label: "login.resetPassword", path: "/reset-password" },
        ]}
      />
      <Body>
        <Title theme={theme}>
          {step === "email"
            ? t("resetPassword.titleEmail")
            : t("resetPassword.titleReset")}
        </Title>
        {step === "email" && (
          <>
            <Input
              placeholder={t("login.email")}
              error={errors.email?.message}
              text={t("login.enterEmail")}
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
        {step === "reset" && (
          <>
            <VerificationCode
              label={t("resetPassword.recoveryCode")}
              onComplete={(value) => setCode(value)}
              error={errors.code?.message}
              {...register("code")}
            />
            <Input
              type="password"
              placeholder={t("login.password")}
              text={t("login.enterPassword")}
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              type="password"
              placeholder={t("resetPassword.confirmPassword")}
              text={t("login.confirmaPassword")}
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
                icon={KeyRound}
                text={t("resetPassword.changePassword")}
                onClick={handleResetPassword}
              >
                {t("resetPassword.changePassword")}
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

export default ResetPassword;
