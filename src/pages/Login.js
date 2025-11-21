import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    try {
      login({ email, password });
      navigate("/dashboard");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="app-container">
      <h2>Đăng nhập</h2>
      <form className="form" onSubmit={onSubmit}>
        {err && <div style={{ color: "red" }}>{err}</div>}
        <div className="field">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Đăng nhập
        </button>
      </form>
      <div style={{ marginTop: 12 }}>
        <Link to="/forgot">Quên mật khẩu?</Link> ·{" "}
        <Link to="/register">Đăng ký</Link>
      </div>
    </div>
  );
}
