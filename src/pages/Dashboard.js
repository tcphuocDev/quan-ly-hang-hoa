import React, { useEffect, useState } from "react";
import { Layout, Menu, Card, Row, Col, Statistic, Table, Button } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);
import LogoImg from "../assets/Logo.jpg";

const { Content, Sider } = Layout;

export default function Dashboard() {
  const location = useLocation();
  const nav = useNavigate();
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    if (!stored || stored.length === 0) {
      const sample = [
        {
          id: Date.now() + 1,
          name: "Sản phẩm A",
          image: "/assets/product-placeholder.jpg",
        },
        {
          id: Date.now() + 2,
          name: "Sản phẩm B",
          image: "/assets/product-placeholder.jpg",
        },
        {
          id: Date.now() + 3,
          name: "Sản phẩm C",
          image: "/assets/product-placeholder.jpg",
        },
      ];
      localStorage.setItem("products", JSON.stringify(sample));
    }

    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    setStats({
      users: users.length,
      products: products.length,
      orders: Math.floor(Math.random() * 200) + 20,
    });

    const labels = [];
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      labels.push(d.toLocaleDateString());
      data.push(Math.floor(Math.random() * 200) + 20);
    }
    setSalesData({
      labels,
      datasets: [
        {
          label: "Doanh thu (đơn vị giả)",
          data,
          fill: true,
          backgroundColor: "rgba(24,144,255,0.12)",
          borderColor: "rgba(24,144,255,0.9)",
          tension: 0.3,
        },
      ],
    });

    setRecentProducts(products.slice(0, 5));
  }, []);

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 120,
      render: (img) => (
        <img src={img} alt="" style={{ width: 80, borderRadius: 6 }} />
      ),
    },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => nav("/dashboard/products")}>Chi tiết</Button>
      ),
    },
  ];

  // Layout: Sider + (Header inside nested Layout) + Content
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={220} style={{ background: "#fff", paddingTop: 16 }}>
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            to="/"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <img src={LogoImg} alt="Logo" style={{ height: 34 }} />
          </Link>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[
            location.pathname.includes("/dashboard/categories")
              ? "categories"
              : "products",
          ]}
        >
          <Menu.Item key="products">
            <Link to="/dashboard/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="categories">
            <Link to="/dashboard/categories">Categories</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        {/* Navbar placed here so Header width matches content area (not full window) */}
        {/* <Navbar /> */}

        <Content style={{ padding: 24 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="Người dùng" value={stats.users} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="Số sản phẩm" value={stats.products} />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="Đơn hàng (fake)" value={stats.orders} />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} lg={14}>
              <Card title="Biểu đồ doanh thu (7 ngày gần nhất)">
                <Line data={salesData} />
              </Card>
            </Col>

            <Col xs={24} lg={10}>
              <Card title="Sản phẩm gần đây">
                <Table
                  dataSource={recentProducts}
                  columns={columns}
                  rowKey="id"
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: 18 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
