import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Image,
  Popconfirm,
  message,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("products") || "[]");
    if (!raw || raw.length === 0) {
      const sample = [
        {
          id: Date.now() + 1,
          name: "Sản phẩm mẫu 1",
          image: "/assets/product-placeholder.jpg",
        },
        {
          id: Date.now() + 2,
          name: "Sản phẩm mẫu 2",
          image: "/assets/product-placeholder.jpg",
        },
        {
          id: Date.now() + 3,
          name: "Sản phẩm mẫu 3",
          image: "/assets/product-placeholder.jpg",
        },
      ];
      localStorage.setItem("products", JSON.stringify(sample));
      setProducts(sample);
      return;
    }
    setProducts(raw);
  }, []);

  function saveAll(next) {
    setProducts(next);
    localStorage.setItem("products", JSON.stringify(next));
  }

  function onAdd() {
    setOpen(true);
    form.resetFields();
  }

  const onFinish = async (values) => {
    const image =
      values.image && values.image.file
        ? await getBase64(values.image.file)
        : "/assets/product-placeholder.jpg";
    const next = [...products, { id: Date.now(), name: values.name, image }];
    saveAll(next);
    setOpen(false);
    message.success("Thêm sản phẩm thành công");
  };

  const onDelete = (id) => {
    saveAll(products.filter((p) => p.id !== id));
    message.success("Đã xóa");
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 120,
      render: (img) => <Image src={img} alt="img" width={80} />,
    },
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Hành động",
      key: "action",
      width: 180,
      render: (_, record) => (
        <Popconfirm title="Xóa sản phẩm?" onConfirm={() => onDelete(record.id)}>
          <Button danger> Xoá </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <h3>Danh sách sản phẩm</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Thêm sản phẩm
        </Button>
      </div>

      <Table dataSource={products} columns={columns} rowKey="id" />

      <Modal
        title="Thêm sản phẩm"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Ảnh sản phẩm" valuePropName="file">
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
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
