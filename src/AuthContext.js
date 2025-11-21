import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem("users") || "[]");
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const s = localStorage.getItem("logged_in_user");
    if (s) setUser(JSON.parse(s));
  }, []);

  function register({ name, email, password }) {
    const users = loadUsers();
    if (users.find((u) => u.email === email)) {
      throw new Error("Email đã tồn tại");
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("logged_in_user", JSON.stringify(newUser));
    setUser(newUser);
  }

  function login({ email, password }) {
    const users = loadUsers();
    const u = users.find((x) => x.email === email && x.password === password);
    if (!u) throw new Error("Email hoặc mật khẩu không đúng");
    localStorage.setItem("logged_in_user", JSON.stringify(u));
    setUser(u);
  }

  function logout() {
    localStorage.removeItem("logged_in_user");
    setUser(null);
  }

  function resetPassword(email) {
    const users = loadUsers();
    const u = users.find((x) => x.email === email);
    if (!u) throw new Error("Không tìm thấy email");
    // Demo: in ra console, production thì gửi email
    console.log(`Yêu cầu đặt lại mật khẩu cho ${email}. (Demo)`);
    return true;
  }

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
