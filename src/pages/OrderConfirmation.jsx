import { Link, useParams } from "react-router-dom";
import { useOrders } from "../context/OrdersContext.jsx";

export default function OrderConfirmation() {
  const { id } = useParams();
  const { getOrder } = useOrders();
  const order = getOrder(id);
  if (!order) {
    return (
      <div className="container empty fade-up"><h2>Order not found</h2><Link to="/" className="btn btn-primary">Home</Link></div>
    );
  }
  return (
    <div className="container fade-up">
      <div className="confirm-hero">
        <div className="check">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <span className="eyebrow">— Order confirmed</span>
        <h1 className="h-mega" style={{ color: "var(--forest)", marginTop: 8 }}>Thank you</h1>
        <p style={{ color: "var(--forest-soft)", marginTop: 12 }}>
          Order <strong>{order.id}</strong> is on its way. We sent the details to {order.shipping.email}.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <Link to={`/account/orders/${order.id}`} className="btn btn-primary">View order</Link>
          <Link to="/shop" className="btn btn-outline">Keep shopping</Link>
        </div>
      </div>
    </div>
  );
}
