import { NavLink, Outlet } from "react-router-dom";

export default function AccountLayout({ children }) {
  return (
    <div className="container fade-up">
      <div className="account-shell">
        <aside className="account-sidebar">
          <NavLink to="/account" end>Overview</NavLink>
          <NavLink to="/account/orders">Orders</NavLink>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
