import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useTheme } from "../../contexts/Theme/useTheme";
import HeaderControls from "../../components/HeaderControls";
import { Footer, Page } from "../Login/style";
import { Body } from "../Checkout/style";
import Input from "../../components/Input";
import { APP_VERSION } from "../../config/constants";

interface ShippingFormData {
  product: string;
}

function Shipping() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    // resolver: yupResolver(checkoutSchema(t)),
  });

  const onSubmit = (data: ShippingFormData) => {
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

export default Shipping;
