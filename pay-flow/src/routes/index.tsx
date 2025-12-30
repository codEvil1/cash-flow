import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import CreateAccount from "../pages/CreateAccount";
import Checkout from "../pages/Checkout";
import Product from "../pages/Product";
import Customer from "../pages/Customer";
import Promotions from "../pages/Promotions";
import Cashier from "../pages/Cashier";
import Payment from "../pages/Payment";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/product" element={<Product />} />
        <Route path="/checkout/customer" element={<Customer />} />
        <Route path="/checkout/promotions" element={<Promotions />} />
        <Route path="/checkout/attendant" element={<Cashier />} />
        <Route path="/checkout/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
