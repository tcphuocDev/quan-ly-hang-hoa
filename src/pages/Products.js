import React, { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("products") || "[]";
    setProducts(JSON.parse(raw));
  }, []);

  function saveAll(next) {
    setProducts(next);
    localStorage.setItem("products", JSON.stringify(next));
  }

  function onAdd() {
    const name = prompt("Tên sản phẩm mới:");
    if (!name) return;
    const next = [...products, { id: Date.now(), name }];
    saveAll(next);
  }

  function onDelete(id) {
    if (!confirm("Xoá sản phẩm?")) return;
    saveAll(products.filter((p) => p.id !== id));
  }

  return (
    <div>
      <h3>Danh sách sản phẩm</h3>
      <button className="btn btn-primary" onClick={onAdd}>
        Thêm sản phẩm
      </button>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name}{" "}
            <button className="btn" onClick={() => onDelete(p.id)}>
              Xoá
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
