import AccountLayout from "./AccountLayout.jsx";
import { useOrders } from "../../context/OrdersContext.jsx";
import { useParams, Link } from "react-router-dom";

export default function OrderDetail() {
  const { id } = useParams();
  const { getOrder } = useOrders();
  const o = getOrder(id);
  if (!o) {
    return (
      <AccountLayout>
        <div className="empty"><h2>Order not found</h2><Link to="/account/orders" className="btn btn-primary">Back</Link></div>
      </AccountLayout>
    );
  }
  return (
    <AccountLayout>
      <Link to="/account/orders" className="btn-ghost btn-sm">← All orders</Link>
      <h1 className="h-big" style={{ color: "var(--forest)", marginTop: 12, marginBottom: 24 }}>{o.id}</h1>
      <div className="account-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ color: "var(--forest-soft)", fontSize: "0.9rem" }}>Placed {new Date(o.createdAt).toLocaleString()}</div>
          </div>
          <span className={`status-pill status-${o.status}`}>{o.status}</span>
        </div>
        {o.items.map((it) => (
          <div key={it.productId + it.size} className="cart-item">
            <div className="cart-item__img"><img src={it.image} alt="" /></div>
            <div>
              <div className="cart-item__name">{it.name}</div>
              <div className="cart-item__meta">Size {it.size} × {it.qty}</div>
            </div>
            <div className="cart-item__price">${it.price * it.qty}</div>
          </div>
        ))}
      </div>
      <div className="account-card">
        <h2>Shipping</h2>
        <p>{o.shipping.name}</p>
        <p>{o.shipping.address}</p>
        <p>{o.shipping.city}, {o.shipping.zip}</p>
        <p>{o.shipping.country}</p>
        <p style={{ marginTop: 8 }}>{o.shipping.email}</p>
      </div>
      <div className="account-card">
        <h2>Totals</h2>
        <div className="summary-row" style={{ color: "var(--ink)" }}><span>Subtotal</span><span>${o.subtotal}</span></div>
        <div className="summary-row" style={{ color: "var(--ink)" }}><span>Shipping</span><span>{o.shippingCost === 0 ? "Free" : `$${o.shippingCost}`}</span></div>
        <div className="summary-row" style={{ color: "var(--ink)" }}><span>Tax</span><span>${o.tax}</span></div>
        <div className="summary-row total" style={{ color: "var(--ink)" }}><span>Total</span><span style={{ color: "var(--coral)" }}>${o.total}</span></div>
      </div>
    </AccountLayout>
  );
}
