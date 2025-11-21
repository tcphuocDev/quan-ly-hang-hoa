import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

const { Title } = Typography;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values) => {
    try {
      login(values);
      message.success("Đăng nhập thành công");
      navigate("/dashboard");
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <Card style={{ width: 420 }}>
        <Title level={4}>Đăng nhập</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Nhập email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/forgot">Quên mật khẩu?</Link>
          <Link to="/register">Đăng ký</Link>
        </div>
      </Card>
    </div>
  );
}
