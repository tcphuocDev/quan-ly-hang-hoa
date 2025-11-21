import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Dropdown, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../AuthContext";

const { Header } = Layout;

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const userMenu = (
    <Menu selectable={false}>
      <Menu.Item key="profile" onClick={() => nav("/dashboard")}> 
        Hồ sơ
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={() => {
          logout();
          nav("/login");
        }}
      >
        <Space>
          <LogoutOutlined /> Đăng xuất
        </Space>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Use public/assets path for static files placed in public/ */}
          <img
            src="/assets/Logo.jpg"
            alt="Logo"
            style={{ height: 36, objectFit: "contain" }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/product-placeholder.jpg";
            }}
          />
          <span style={{ fontWeight: 600, color: "#111" }}>Quản lý Hàng hoá</span>
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {user ? (
          <Dropdown overlay={userMenu} placement="bottomRight" trigger={["click"]}>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Avatar src={user.avatar} icon={!user.avatar ? <UserOutlined /> : null} />
              <span style={{ color: "#111" }}>{user.name}</span>
            </div>
          </Dropdown>
        ) : (
          <>
            <Link to="/login">
              <Button>Đăng nhập</Button>
            </Link>
            <Link to="/register">
              <Button type="primary">Đăng ký</Button>
            </Link>
          </>
        )}
      </div>
    </Header>
  );
}
