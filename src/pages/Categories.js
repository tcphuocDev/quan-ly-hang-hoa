import React, { useState, useEffect } from "react";

export default function Categories() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    setCats(JSON.parse(localStorage.getItem("categories") || "[]"));
  }, []);
  function saveAll(next) {
    setCats(next);
    localStorage.setItem("categories", JSON.stringify(next));
  }
  function onAdd() {
    const name = prompt("Tên danh mục mới:");
    if (!name) return;
    saveAll([...cats, { id: Date.now(), name }]);
  }
  function onDelete(id) {
    if (!confirm("Xoá danh mục?")) return;
    saveAll(cats.filter((c) => c.id !== id));
  }
  return (
    <div>
      <h3>Danh mục</h3>
      <button className="btn btn-primary" onClick={onAdd}>
        Thêm danh mục
      </button>
      <ul>
        {cats.map((c) => (
          <li key={c.id}>
            {c.name}{" "}
            <button className="btn" onClick={() => onDelete(c.id)}>
              Xoá
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
