import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Container, CrumbLink, Item } from "./style";
import type { InputHTMLAttributes } from "react";
import { useTheme } from "../../contexts/theme/useTheme";

interface BreadcrumbProps extends InputHTMLAttributes<HTMLInputElement> {
  items: { label: string; path: string }[];
}

function Breadcrumb({ items, ...props }: BreadcrumbProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

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
