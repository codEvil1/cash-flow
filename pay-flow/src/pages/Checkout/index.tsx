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
import noImage from "../../assets/noImage.png";
import { ImageProduct } from "./style";
import Input from "../../components/Input";
import { useState } from "react";

interface CheckoutFormData {
  product: string;
  description?: string;
  quantity: number;
  price?: number;
}

function Login() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [disabledAddProduct, setDisabledAddProduct] = useState(false);

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
    setDisabledAddProduct(true);
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
          <Card title={t("checkout.checkout")}>
            <ImageProduct src={noImage} alt={t("checkout.noImage")} />
            <InputButton
              value={teste()}
              icon={Search}
              onClick={() => console.log("click")}
              placeholder={t("checkout.product")}
              text={t("checkout.enterProduct")}
              error={errors.product?.message}
              {...register("product")}
            />
            <Input
              text={t("checkout.description")}
              placeholder={t("checkout.description")}
              {...register("description")}
            />
            <Input
              text={t("checkout.quantity")}
              placeholder={t("checkout.quantity")}
              type="number"
              disabled={disabledAddProduct}
              {...register("quantity")}
            />
            <Input
              text={t("checkout.price")}
              placeholder={t("checkout.price")}
              {...register("price")}
            />
          </Card>
          <Card title={t("checkout.checkout")}>a</Card>
        </Body>
      </form>
      <Footer theme={theme}>
        {t("app.version")} v{APP_VERSION}
      </Footer>
    </Page>
  );
}

export default Login;
