import AccountLayout from "./AccountLayout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useOrders } from "../../context/OrdersContext.jsx";
import { Link } from "react-router-dom";

export default function AccountHome() {
  const { user } = useAuth();
  const { userOrders } = useOrders();
  return (
    <AccountLayout>
      <span className="eyebrow">— Hey {user.name}</span>
      <h1 className="h-big" style={{ color: "var(--forest)", marginTop: 8, marginBottom: 24 }}>Account</h1>
      <div className="account-card">
        <h2>Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member since:</strong> {new Date().toLocaleDateString()}</p>
      </div>
      <div className="account-card">
        <h2>Recent orders</h2>
        {userOrders.length === 0 ? (
          <>
            <p style={{ color: "var(--forest-soft)" }}>No orders yet.</p>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: 12 }}>Start shopping</Link>
          </>
        ) : (
          <>
            {userOrders.slice(0, 3).map((o) => (
              <Link key={o.id} to={`/account/orders/${o.id}`} className="order-row" style={{ textDecoration: "none" }}>
                <div>
                  <div className="order-row__id">{o.id}</div>
                  <div className="order-row__date">{new Date(o.createdAt).toLocaleDateString()}</div>
                </div>
                <div>{o.items.length} item{o.items.length > 1 ? "s" : ""}</div>
                <div className={`status-pill status-${o.status}`}>{o.status}</div>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--coral)" }}>${o.total}</div>
              </Link>
            ))}
            <Link to="/account/orders" className="btn-ghost btn-sm" style={{ marginTop: 8, display: "inline-block" }}>
              View all →
            </Link>
          </>
        )}
      </div>
    </AccountLayout>
  );
}
