import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="navbar">
      <strong>Quản lý Hàng hoá</strong>
      <div style={{ flex: 1 }} />
      {user ? (
        <>
          <span>Xin chào, {user.name}</span>
          <button className="btn" onClick={() => nav("/dashboard")}>
            Dashboard
          </button>
          <button
            className="btn"
            onClick={() => {
              logout();
              nav("/login");
            }}
          >
            Đăng xuất
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="btn">Đăng nhập</button>
          </Link>
          <Link to="/register">
            <button className="btn">Đăng ký</button>
          </Link>
        </>
      )}
    </div>
  );
}
