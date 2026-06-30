import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useOrders } from "../context/OrdersContext.jsx";
import { useInventory } from "../context/InventoryContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export default function Checkout() {
  const { user } = useAuth();
  const { detailed, subtotal, clear, count } = useCart();
  const { createOrder } = useOrders();
  const { decrementStock } = useInventory();
  const { push } = useToast();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
  });
  const [placing, setPlacing] = useState(false);

  if (count === 0) {
    return (
      <div className="container section empty fade-up">
        <h2>Nothing to check out</h2>
        <Link to="/shop" className="btn btn-primary">Shop now</Link>
      </div>
    );
  }

  const shipping = subtotal > 120 ? 0 : 12;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const placeOrder = (e) => {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      const items = detailed.map((d) => ({
        productId: d.productId,
        size: d.size,
        qty: d.qty,
        name: d.product.name,
        price: d.product.price,
        image: d.product.images[0],
      }));
      const order = createOrder({
        userId: user.id,
        items,
        shipping: form,
        subtotal,
        shippingCost: shipping,
        tax,
        total,
      });
      decrementStock(items.map((i) => ({ productId: i.productId, size: i.size, qty: i.qty })));
      clear();
      push("Order placed!", "success");
      nav(`/order-confirmation/${order.id}`);
    }, 800);
  };

  return (
    <div className="container fade-up">
      <span className="eyebrow">— Checkout</span>
      <h1 className="h-big" style={{ color: "var(--forest)", marginTop: 8, marginBottom: 24 }}>Almost yours</h1>
      <div className="cart-grid">
        <form className="form" onSubmit={placeOrder}>
          <h3 style={{ color: "var(--forest)" }}>Shipping</h3>
          <div className="form-grid-2">
            <div className="form-row">
              <label>Full name</label>
              <input required value={form.name} onChange={update("name")} />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input required type="email" value={form.email} onChange={update("email")} />
            </div>
          </div>
          <div className="form-row">
            <label>Address</label>
            <input required value={form.address} onChange={update("address")} />
          </div>
          <div className="form-grid-2">
            <div className="form-row">
              <label>City</label>
              <input required value={form.city} onChange={update("city")} />
            </div>
            <div className="form-row">
              <label>ZIP</label>
              <input required value={form.zip} onChange={update("zip")} />
            </div>
          </div>
          <div className="form-row">
            <label>Country</label>
            <select value={form.country} onChange={update("country")}>
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Germany</option>
              <option>Japan</option>
            </select>
          </div>
          <h3 style={{ color: "var(--forest)", marginTop: 16 }}>Payment</h3>
          <p style={{ color: "var(--forest-soft)", fontSize: "0.9rem", marginTop: -8 }}>
            Demo only — no card is charged.
          </p>
          <div className="form-row">
            <label>Card number</label>
            <input placeholder="4242 4242 4242 4242" defaultValue="4242 4242 4242 4242" />
          </div>
          <button className="btn btn-coral btn-block" disabled={placing}>
            {placing ? "Placing order…" : `Place order — $${total}`}
          </button>
        </form>
        <aside className="summary-card">
          <h3>Summary</h3>
          {detailed.map((d) => (
            <div key={d.productId + d.size} style={{ display: "flex", gap: 10, padding: "8px 0", fontSize: "0.9rem" }}>
              <div style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                <img src={d.product.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{d.product.name}</div>
                <div style={{ opacity: 0.7 }}>{d.size} × {d.qty}</div>
              </div>
              <div>${d.lineTotal}</div>
            </div>
          ))}
          <div className="summary-row" style={{ marginTop: 12 }}><span>Subtotal</span><span>${subtotal}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
          <div className="summary-row"><span>Tax</span><span>${tax}</span></div>
          <div className="summary-row total"><span>Total</span><span className="amount">${total}</span></div>
        </aside>
      </div>
    </div>
  );
}
