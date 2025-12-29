import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import CreateAccount from "../pages/CreateAccount";
import Checkout from "../pages/Checkout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
