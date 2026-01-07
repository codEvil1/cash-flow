import {
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
export function formatPhoneInternational(
  phone?: string | null,
  defaultCountry?: string,
  fallback = "–"
) {
  phone = phone?.trim();
  if (!phone) return fallback;

  const country = defaultCountry as CountryCode | undefined;

  const phoneNumber = parsePhoneNumberFromString(phone, {
    defaultCountry: country,
  });

  return phoneNumber ? phoneNumber.format("NATIONAL") : phone;
}
