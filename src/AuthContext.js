import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem("users") || "[]");
  } catch {
    return [];
  }
}

function seedDefaultUsersIfEmpty() {
  const existing = loadUsers();
  if (existing.length === 0) {
    const defaults = [
      {
        id: 1,
        name: "Admin",
        email: "admin@example.com",
        password: "Admin123",
        avatar: "/assets/logo.png",
        role: "admin",
      },
      {
        id: 2,
        name: "Manager",
        email: "manager@example.com",
        password: "Manager123!",
        avatar: "/assets/product-placeholder.jpg",
        role: "manager",
      },
      {
        id: 3,
        name: "User",
        email: "user@example.com",
        password: "User123!",
        avatar: "",
        role: "user",
      },
    ];
    localStorage.setItem("users", JSON.stringify(defaults));
    console.log("Seeded default test users to localStorage.users");
    return defaults;
  }
  return existing;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Seed default users if none exist (only for dev/demo)
    seedDefaultUsersIfEmpty();

    const s = localStorage.getItem("logged_in_user");
    if (s) setUser(JSON.parse(s));
  }, []);

  function register({ name, email, password, avatar }) {
    const users = loadUsers();
    if (users.find((u) => u.email === email)) {
      throw new Error("Email đã tồn tại");
    }
    const newUser = { id: Date.now(), name, email, password, avatar };
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
