import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    try {
      resetPassword(email);
      setMsg(
        "Yêu cầu đặt lại mật khẩu đã được ghi nhận (demo). Kiểm tra console."
      );
      setErr("");
    } catch (e) {
      setErr(e.message);
      setMsg("");
    }
  }

  return (
    <div className="app-container">
      <h2>Quên mật khẩu</h2>
      <form className="form" onSubmit={onSubmit}>
        {msg && <div style={{ color: "green" }}>{msg}</div>}
        {err && <div style={{ color: "red" }}>{err}</div>}
        <div className="field">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">
          Gửi yêu cầu
        </button>
      </form>
      <div style={{ marginTop: 12 }}>
        <Link to="/login">Quay lại Đăng nhập</Link>
      </div>
    </div>
  );
}
