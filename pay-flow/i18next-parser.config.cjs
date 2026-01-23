module.exports = {
  locales: ["pt", "en", "es"],
  output: "src/i18n/locales/$LOCALE/$NAMESPACE.json",
  input: ["src/**/*.{js,jsx,ts,tsx}"],
  defaultNamespace: "common",
  keySeparator: ".",
  namespaceSeparator: ":",
  sort: true,
};
