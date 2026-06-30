import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import QuantityStepper from "../components/QuantityStepper.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Cart() {
  const { detailed, subtotal, count, updateQty, remove } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 12;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  if (count === 0) {
    return (
      <div className="container section empty fade-up">
        <h2>Your cart is empty</h2>
        <p>Go fill it with something loud.</p>
        <Link to="/shop" className="btn btn-primary">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="container fade-up">
      <span className="eyebrow">— Bag</span>
      <h1 className="h-big" style={{ color: "var(--forest)", marginTop: 8, marginBottom: 24 }}>
        Your cart ({count})
      </h1>
      <div className="cart-grid">
        <div>
          {detailed.map((item) => (
            <div key={item.productId + item.size} className="cart-item">
              <Link to={`/product/${item.productId}`} className="cart-item__img">
                <img src={item.product.images[0]} alt={item.product.name} />
              </Link>
              <div>
                <Link to={`/product/${item.productId}`} className="cart-item__name">{item.product.name}</Link>
                <div className="cart-item__meta">Size {item.size}</div>
                <div style={{ marginTop: 8, display: "flex", gap: 12, alignItems: "center" }}>
                  <QuantityStepper
                    value={item.qty}
                    onChange={(q) => updateQty(item.productId, item.size, q)}
                    max={item.product.stock[item.size] || 1}
                  />
                  <button className="btn-ghost btn-sm" onClick={() => remove(item.productId, item.size)}>Remove</button>
                </div>
              </div>
              <div className="cart-item__price">${item.lineTotal}</div>
            </div>
          ))}
        </div>
        <aside className="summary-card">
          <h3>Order summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>${subtotal}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
          <div className="summary-row"><span>Tax</span><span>${tax}</span></div>
          <div className="summary-row total"><span>Total</span><span className="amount">${total}</span></div>
          <button className="btn btn-coral btn-block" style={{ marginTop: 20 }} onClick={() => nav(user ? "/checkout" : "/login")}>
            {user ? "Checkout" : "Login to checkout"}
          </button>
          <Link to="/shop" className="btn-ghost" style={{ display: "block", textAlign: "center", marginTop: 12, color: "var(--cream)", opacity: 0.85 }}>
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
