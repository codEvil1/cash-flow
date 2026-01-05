import {
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

export function formatPhoneInternational(
  phone: string,
  defaultCountry?: string
) {
  // transforma a string em CountryCode para TS
  const country: CountryCode | undefined = defaultCountry as
    | CountryCode
    | undefined;

  // parse
  const phoneNumber = parsePhoneNumberFromString(phone, {
    defaultCountry: country,
  });

  // se válido, retorna formato nacional, senão retorna número original
  return phoneNumber ? phoneNumber.format("NATIONAL") : phone;
}
