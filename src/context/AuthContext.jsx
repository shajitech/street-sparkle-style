import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);
const USERS_KEY = "wg_users_v1";
const SESSION_KEY = "wg_session_v1";

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // Seed admin
  const seeded = [
    {
      id: "u-admin",
      email: "admin@demo",
      name: "Admin",
      password: "admin",
      role: "admin",
      createdAt: Date.now(),
    },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
  return seeded;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUsers();
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const persistSession = (u) => {
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else localStorage.removeItem(SESSION_KEY);
    setUser(u);
  };

  const signup = useCallback(({ email, name, password }) => {
    const users = loadUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "Email already registered." };
    }
    const u = {
      id: "u-" + Math.random().toString(36).slice(2, 10),
      email,
      name,
      password,
      role: "customer",
      createdAt: Date.now(),
    };
    users.push(u);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const session = { id: u.id, email: u.email, name: u.name, role: u.role };
    persistSession(session);
    return { ok: true, user: session };
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = loadUsers();
    const u = users.find(
      (x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password
    );
    if (!u) return { ok: false, error: "Invalid email or password." };
    const session = { id: u.id, email: u.email, name: u.name, role: u.role };
    persistSession(session);
    return { ok: true, user: session };
  }, []);

  const logout = useCallback(() => persistSession(null), []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
