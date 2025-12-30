import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/theme/useTheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Body, Footer, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { APP_VERSION } from "../../config/app";
import { checkoutSchema } from "../../validations/checkoutSchema";
import Input from "../../components/Input";

interface PromotionsFormData {
  product: string;
}

function Promotions() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PromotionsFormData>({
    resolver: yupResolver(checkoutSchema(t)),
  });

  const onSubmit = (data: PromotionsFormData) => {
    // chamada login backend
    toast.success("Sucesso");
    toast.error("Erro");
    toast.warning("Atenção");
    console.log(data);
    // navigate("/dashboard");
  };

  return (
    <Page theme={theme}>
      <HeaderControls
        breadcrumbs={[
          { label: "checkout.checkout", path: "/checkout" },
          { label: "checkout.promotions", path: "/checkout/promotions" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <Input
            placeholder={t("checkout.product")}
            theme={theme}
            text={t("checkout.enterProduct")}
            error={errors.product?.message}
            {...register("product")}
          />
        </Body>
      </form>
      <Footer theme={theme}>
        {t("app.version")} v{APP_VERSION}
      </Footer>
    </Page>
  );
}

export default Promotions;
