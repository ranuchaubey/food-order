import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Topbar from "./components/Topbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import NewProduct from "./pages/NewProduct";
import Productpage from "./pages/Productpage";
import Categorypage from "./pages/Categorypage";
import ScrollToTop from "./components/ScrollToTop";
import Cartpage from "./pages/Cartpage";
import Orderspage from "./pages/Orderspage";
import AdminDashboard from "./pages/AdminDashboard";
import EditProductpage from "./pages/EditProductpage";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Topbar />
        <Routes>
          <Route index element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {user && (
            <>
              <Route path="/cart" element={<Cartpage />} />
              <Route path="/orders" element={<Orderspage />} />
            </>
          )}
          {user && user.isAdmin && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route
                exact
                path="/product/:id/edit"
                element={<EditProductpage />}
              />
            </>
          )}
          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/category/:category" element={<Categorypage />} />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
