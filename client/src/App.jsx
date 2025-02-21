import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/AdminComponents/Register";
import Login from "./components/AdminComponents/Login";
import Dashboard from "./components/AdminComponents/Dashboard";
import Products from "./components/AdminComponents/Products";
import Customers from "./components/AdminComponents/Customers";
import Orders from "./components/AdminComponents/Orders";
import Reports from "./components/AdminComponents/Reports";
import AddProducts from "./components/AdminComponents/AddProducts";
import EditProducts from "./components/AdminComponents/EditProducts";
import Error404 from "./components/Error404";
import Home from "./components/UserComponents/Home";
import Shop from "./components/UserComponents/Shop";
import Cart from "./components/UserComponents/Cart";
import MyOrders from "./components/AdminComponents/Orders";

function App() {
  return (
    <div className="container">
      <div className="row">
        <Routes>
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />}>
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="reports" element={<Reports />} />
            <Route path="addproducts" element={<AddProducts />} />
            <Route path="edit-product/:id" element={<EditProducts />} />
            <Route path="*" element={<Error404 />} />
          </Route>
          <Route path="/" element={<Home />}>
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<MyOrders />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
