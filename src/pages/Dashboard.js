import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="app-container">
        <h2>Dashboard</h2>
        <div className="menu">
          <Link to="/dashboard/products">
            <button className="btn">Products</button>
          </Link>
          <Link to="/dashboard/categories">
            <button className="btn">Categories</button>
          </Link>
        </div>

        <div className="card">
          <Outlet />
          <p>Chọn menu bên trên để quản lý.</p>
        </div>
      </div>
    </div>
  );
}
