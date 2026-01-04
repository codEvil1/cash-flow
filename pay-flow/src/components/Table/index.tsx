import { useMemo, useState, type ReactNode } from "react";
import {
  TableWrapper,
  StyledTable,
  Th,
  Tr,
  Td,
  Empty,
  Pagination,
  PaginationControls,
  PaginationButton,
  PaginationInfo,
  HeaderContent,
} from "./style";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Inbox,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/Theme/useTheme";

export interface Column<T> {
  key: keyof T;
  label: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], row: T) => ReactNode;
}

type SortDirection = "asc" | "desc" | null;

interface SortState<T> {
  key: keyof T | null;
  direction: SortDirection;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  onRowClick?: (row: T) => void;
}

function Table<T>({ columns, data, pageSize = 10, onRowClick }: TableProps<T>) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState<T>>({
    key: null,
    direction: null,
  });

  const totalPages = Math.ceil(data.length / pageSize);

  function handleSort(key: keyof T) {
    setPage(1);

    setSort((prev) => {
      if (prev.key !== key) {
        return { key, direction: "asc" };
      }

      if (prev.direction === "asc") {
        return { key, direction: "desc" };
      }

      if (prev.direction === "desc") {
        return { key: null, direction: null };
      }

      return { key, direction: "asc" };
    });
  }

  const sortedData = useMemo(() => {
    if (!sort.key || !sort.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sort.key!];
      const bValue = b[sort.key!];

      if (aValue == null || bValue == null) return 0;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return sort.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, sort]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  if (!data.length) {
    return (
      <Empty theme={theme}>
        <Inbox size={20} />
        <span>{t("productList.emptyList")}</span>
      </Empty>
    );
  }

  return (
    <TableWrapper theme={theme}>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col) => {
              const isActive = sort.key === col.key;
              return (
                <Th
                  key={String(col.key)}
                  align={col.align}
                  width={col.width}
                  theme={theme}
                  onClick={() => handleSort(col.key)}
                >
                  <HeaderContent align={col.align}>
                    {col.label}
                    {col.label && (
                      <>
                        {!isActive && <ArrowUpDown size={14} />}
                        {isActive && sort.direction === "asc" && (
                          <ArrowUp size={14} />
                        )}
                        {isActive && sort.direction === "desc" && (
                          <ArrowDown size={14} />
                        )}
                      </>
                    )}
                  </HeaderContent>
                </Th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <Tr
              key={index}
              zebra={index % 2 === 0}
              theme={theme}
              clickable={!!onRowClick}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => {
                const value = row[col.key];

                return (
                  <Td key={String(col.key)} align={col.align} theme={theme}>
                    {col.render ? col.render(value, row) : String(value)}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </tbody>
      </StyledTable>
      {totalPages > 1 && (
        <Pagination>
          <PaginationInfo>{data.length} resultados</PaginationInfo>
          <PaginationControls>
            <PaginationButton
              disabled={page === 1}
              onClick={() => setPage(1)}
              theme={theme}
            >
              <ChevronsLeft size={16} />
            </PaginationButton>
            <PaginationButton
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              theme={theme}
            >
              <ChevronLeft size={16} />
            </PaginationButton>
            <span>
              {page} de {totalPages}
            </span>
            <PaginationButton
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              theme={theme}
            >
              <ChevronRight size={16} />
            </PaginationButton>
            <PaginationButton
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
              theme={theme}
            >
              <ChevronsRight size={16} />
            </PaginationButton>
          </PaginationControls>
        </Pagination>
      )}
    </TableWrapper>
  );
}

export default Table;
