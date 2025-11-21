import React, { useEffect, useState } from "react";
import { List, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setCats(JSON.parse(localStorage.getItem("categories") || "[]"));
  }, []);

  function saveAll(next) {
    setCats(next);
    localStorage.setItem("categories", JSON.stringify(next));
  }

  function onAdd() {
    setOpen(true);
    form.resetFields();
  }

  const onFinish = (values) => {
    saveAll([...cats, { id: Date.now(), name: values.name }]);
    setOpen(false);
    message.success("Đã thêm danh mục");
  };

  const onDelete = (id) => {
    saveAll(cats.filter((c) => c.id !== id));
    message.success("Đã xóa");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <h3>Danh mục</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Thêm danh mục
        </Button>
      </div>

      <List
        bordered
        dataSource={cats}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Popconfirm
                key="del"
                title="Xóa danh mục?"
                onConfirm={() => onDelete(item.id)}
              >
                <Button danger> Xoá </Button>
              </Popconfirm>,
            ]}
          >
            {item.name}
          </List.Item>
        )}
      />

      <Modal
        title="Thêm danh mục"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
