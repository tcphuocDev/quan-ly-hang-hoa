import React, { useState } from "react";
import { Form, Input, Button, Card, Upload, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function RegisterPage() {
  const { register } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const nav = useNavigate();

  const onFinish = async (values) => {
    try {
      await register({ ...values, avatar });
      message.success("Đăng ký thành công");
      nav("/dashboard");
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <Card style={{ width: 520 }}>
        <Title level={4}>Đăng ký</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Họ & Tên"
            rules={[{ required: true, message: "Nhập tên" }]}
          >
            <Input />
          </Form.Item>
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

          <Form.Item label="Ảnh đại diện (tùy chọn)">
            <Upload
              beforeUpload={async (file) => {
                const b64 = await getBase64(file);
                setAvatar(b64);
                return false; // prevent auto upload
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
            {avatar && (
              <div style={{ marginTop: 8 }}>
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ width: 80, borderRadius: 8 }}
                />
              </div>
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
