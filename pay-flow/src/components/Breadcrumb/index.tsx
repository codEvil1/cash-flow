import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Container, CrumbLink, Item } from "./style";
import type { InputHTMLAttributes } from "react";

interface BreadcrumbProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: "light" | "dark";
}

const routeNameMap: Record<string, string> = {
  login: "login.login",
  "reset-password": "resetPassword.titleEmail",
  "create-account": "login.createAccount",
};

function Breadcrumb({ theme = "light", ...props }: BreadcrumbProps) {
  const location = useLocation();
  const { t } = useTranslation();

  const pathnames = location.pathname.split("/").filter((x) => x.length > 0);

  return (
    <Container theme={theme} {...props}>
      <CrumbLink to="/">{t("login.login")}</CrumbLink>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const labelKey = routeNameMap[value] || value;
        const isLast = index === pathnames.length - 1;
        return (
          <Item key={to}>
            <ChevronRight size={14} />
            {isLast ? (
              <span>{t(labelKey)}</span>
            ) : (
              <Link to={to}>{t(labelKey)}</Link>
            )}
          </Item>
        );
      })}
    </Container>
  );
}

export default Breadcrumb;
