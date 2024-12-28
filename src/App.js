import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import User from "./pages/User";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Test from "./pages/test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='orders' element={<Orders />} />
          <Route path='products' element={<Products />} />
          <Route path='users' element={<User />} />
          <Route path='profile' element={<Profile />} />
          <Route path='categories' element={<Categories />} />
          <Route path='test' element={<Test />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
