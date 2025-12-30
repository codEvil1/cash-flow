import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Container, CrumbLink, Item } from "./style";
import type { InputHTMLAttributes } from "react";

interface BreadcrumbProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: "light" | "dark";
  items: { label: string; path: string }[];
}

function Breadcrumb({ theme = "light", items, ...props }: BreadcrumbProps) {
  const { t } = useTranslation();

  return (
    <Container theme={theme} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Item key={item.path}>
            {index > 0 && <ChevronRight size={14} />}
            {isLast ? (
              <span>{t(item.label)}</span>
            ) : (
              <CrumbLink to={item.path}>{t(item.label)}</CrumbLink>
            )}
          </Item>
        );
      })}
    </Container>
  );
}

export default Breadcrumb;
