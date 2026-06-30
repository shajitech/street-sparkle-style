import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function Login() {
  const { login, signup, user } = useAuth();
  const { push } = useToast();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from || "/account";

  if (user) {
    nav(from, { replace: true });
    return null;
  }

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const res = mode === "login" ? login(form) : signup(form);
    if (res.ok) {
      push(mode === "login" ? "Welcome back" : "Account created", "success");
      nav(from, { replace: true });
    } else {
      push(res.error, "error");
    }
  };

  return (
    <div className="container fade-up">
      <div className="auth-shell">
        <span className="eyebrow">— {mode === "login" ? "Welcome back" : "Join us"}</span>
        <h1>{mode === "login" ? "Login" : "Sign up"}</h1>
        <p>{mode === "login" ? "Pick up where you left off." : "Get drops in your inbox first."}</p>
        <div className="auth-tabs">
          <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Login</button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Sign up</button>
        </div>
        <form className="form" onSubmit={submit}>
          {mode === "signup" && (
            <div className="form-row">
              <label>Name</label>
              <input required value={form.name} onChange={update("name")} />
            </div>
          )}
          <div className="form-row">
            <label>Email</label>
            <input required type="email" value={form.email} onChange={update("email")} />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input required type="password" value={form.password} onChange={update("password")} />
          </div>
          <button className="btn btn-primary btn-block">{mode === "login" ? "Login" : "Create account"}</button>
        </form>
        <p style={{ fontSize: "0.85rem", color: "var(--forest-soft)", marginTop: 16, textAlign: "center" }}>
          Demo admin: <code>admin@demo</code> / <code>admin</code>
        </p>
      </div>
    </div>
  );
}
