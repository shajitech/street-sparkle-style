import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-dot" />
          WILDGROWN
        </Link>
        <nav className={`nav ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/shop" onClick={close}>Shop</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          {user?.role === "admin" && <NavLink to="/admin" onClick={close}>Admin</NavLink>}
          {user ? (
            <>
              <NavLink to="/account" onClick={close}>Account</NavLink>
              <button className="btn-ghost" onClick={() => { logout(); close(); nav("/"); }}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" onClick={close}>Login</NavLink>
          )}
        </nav>
        <div className="nav-actions">
          <Link to="/cart" className="icon-btn" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
          <button className="icon-btn mobile-toggle" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
