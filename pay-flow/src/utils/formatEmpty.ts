export function formatEmpty(value: string, fallback = "–"): string {
  value = value.trim();
  if (!value) return fallback;

  return value;
}
