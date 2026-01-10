import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";
import { toast } from "react-toastify";
import { Body, Footer, Page } from "../Login/style";
import HeaderControls from "../../components/HeaderControls";
import { APP_VERSION } from "../../domain/constants";
import Input from "../../components/Input";

interface CashierFormData {
  product: string;
}

function Cashier() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CashierFormData>({
    // resolver: yupResolver(checkoutSchema(t)),
  });

  const onSubmit = (data: CashierFormData) => {
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
          { label: "cashier.cashier", path: "/checkout/cashier" },
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

export default Cashier;
