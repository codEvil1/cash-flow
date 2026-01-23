import { ChevronRight } from "lucide-react";
import { Container, CrumbLink, Item } from "./style";
import type { InputHTMLAttributes } from "react";
import { useTheme } from "../../contexts/Theme/useTheme";

interface BreadcrumbProps extends InputHTMLAttributes<HTMLInputElement> {
  items: { label: string; path: string }[];
}

function Breadcrumb({ items, ...props }: BreadcrumbProps) {
  const { theme } = useTheme();

  return (
    <Container theme={theme} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Item key={item.path}>
            {index > 0 && <ChevronRight size={14} />}
            {isLast ? (
              <span>{item.label}</span>
            ) : (
              <CrumbLink to={item.path}>{item.label}</CrumbLink>
            )}
          </Item>
        );
      })}
    </Container>
  );
}

export default Breadcrumb;
