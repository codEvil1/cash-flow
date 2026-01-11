export function formatEmpty(value?: string, fallback = "–"): string {
  value = value?.trim();
  if (!value) return fallback;

  return value;
}

export function formatDate(value?: Date | null, fallback = "–"): string {
  if (!value) return fallback;
  return value.toLocaleDateString();
}
