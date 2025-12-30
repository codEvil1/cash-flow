import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/theme/useTheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Body, Footer, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { APP_VERSION } from "../../config/app";
import { checkoutSchema } from "../../validations/checkoutSchema";
import InputButton from "../../components/InputButton";
import { Search } from "lucide-react";
import { Card } from "../../components/Card";

interface CheckoutFormData {
  product: string;
}

function Login() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutSchema(t)),
  });

  const onSubmit = (data: CheckoutFormData) => {
    // chamada login backend
    toast.success("Sucesso");
    toast.error("Erro");
    toast.warning("Atenção");
    console.log(data);
    // navigate("/dashboard");
  };

  const teste = () => {
    return "teste";
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[{ label: "checkout.checkout", path: "/checkout" }]}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <Card theme={theme} title={t("checkout.checkout")}>
            <InputButton
              value={teste()}
              icon={Search}
              onClick={() => console.log("click")}
              placeholder={t("checkout.product")}
              theme={theme}
              text={t("checkout.enterProduct")}
              error={errors.product?.message}
              {...register("product")}
            />
          </Card>
        </Body>
      </form>
      <Footer theme={theme}>
        {t("app.version")} v{APP_VERSION}
      </Footer>
    </Page>
  );
}

export default Login;
