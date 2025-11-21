import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function HomeRedirect() {
  return <Navigate to="/dashboard" replace />;
}

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<div className="card">Chào mừng đến Dashboard</div>}
          />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
        </Route>

        <Route
          path="*"
          element={
            <div className="app-container">
              <h3>404 - Không tìm thấy</h3>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
