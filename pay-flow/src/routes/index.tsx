import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ResetPassword from "../pages/Shipping";
import CreateAccount from "../pages/CreateAccount";
import Checkout from "../pages/Checkout";
import Product from "../pages/Product";
import Promotions from "../pages/Promotions";
import Payment from "../pages/Payment";
import Shipping from "../pages/Shipping";
import Cashier from "../pages/Cashier";
import Customer from "../pages/Customer";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/product" element={<Product />} />
        <Route path="/checkout/cashier" element={<Cashier />} />
        <Route path="/checkout/customer" element={<Customer />} />
        <Route path="/checkout/shipping" element={<Shipping />} />
        <Route path="/checkout/promotions" element={<Promotions />} />
        <Route path="/checkout/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
