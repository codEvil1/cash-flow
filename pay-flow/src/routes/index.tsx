import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import CreateAccount from "../pages/CreateAccount";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
