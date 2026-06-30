import AccountLayout from "./AccountLayout.jsx";
import { useOrders } from "../../context/OrdersContext.jsx";
import { Link } from "react-router-dom";

export default function Orders() {
  const { userOrders } = useOrders();
  return (
    <AccountLayout>
      <span className="eyebrow">— Your history</span>
      <h1 className="h-big" style={{ color: "var(--forest)", marginTop: 8, marginBottom: 24 }}>Orders</h1>
      {userOrders.length === 0 ? (
        <div className="empty"><h2>No orders yet</h2><Link to="/shop" className="btn btn-primary">Shop now</Link></div>
      ) : (
        userOrders.map((o) => (
          <Link key={o.id} to={`/account/orders/${o.id}`} className="order-row" style={{ textDecoration: "none" }}>
            <div>
              <div className="order-row__id">{o.id}</div>
              <div className="order-row__date">{new Date(o.createdAt).toLocaleDateString()}</div>
            </div>
            <div>{o.items.length} item{o.items.length > 1 ? "s" : ""}</div>
            <div className={`status-pill status-${o.status}`}>{o.status}</div>
            <div style={{ fontFamily: "var(--font-display)", color: "var(--coral)" }}>${o.total}</div>
          </Link>
        ))
      )}
    </AccountLayout>
  );
}
