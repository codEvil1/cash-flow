export function formatEmpty(value?: string | number, fallback = "–"): string {
  value = value?.toString().trim();
  if (!value) return fallback;

  return value;
}

export function formatDate(value?: Date | null, fallback = "–"): string {
  if (!value) return fallback;
  return value.toLocaleDateString();
}
