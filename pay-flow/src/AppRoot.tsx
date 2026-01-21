import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import { GlobalStyle } from "./components/Style/style";
import { useTheme } from "./contexts/Theme/useTheme";

export function AppRoot() {
  const { theme } = useTheme();

  return (
    <>
      <GlobalStyle />
      <AppRoutes />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        theme={theme}
      />
    </>
  );
}
