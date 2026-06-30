import { useState } from "react";
import { useInventory } from "../../context/InventoryContext.jsx";
import { useOrders } from "../../context/OrdersContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

export default function AdminDashboard() {
  const { products, updateProduct, updateStock, removeProduct, resetInventory } = useInventory();
  const { orders, updateStatus } = useOrders();
  const { push } = useToast();
  const [tab, setTab] = useState("inventory");

  return (
    <div className="container fade-up">
      <span className="eyebrow">— Backstage</span>
      <h1 className="h-big" style={{ color: "var(--forest)", marginTop: 8, marginBottom: 24 }}>Admin</h1>
      <div className="auth-tabs" style={{ maxWidth: 360, marginBottom: 24 }}>
        <button className={tab === "inventory" ? "active" : ""} onClick={() => setTab("inventory")}>Inventory</button>
        <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>Orders</button>
      </div>

      {tab === "inventory" && (
        <div className="account-card">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h2>Products ({products.length})</h2>
            <button className="btn btn-outline btn-sm" onClick={() => { resetInventory(); push("Inventory reset", "success"); }}>
              Reset to seed
            </button>
          </div>
          <table className="admin-table">
            <thead>
              <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const totalStock = Object.values(p.stock).reduce((a, b) => a + b, 0);
                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <img src={p.images[0]} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover" }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{p.name}</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--forest-soft)" }}>{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{p.category}</td>
                    <td>
                      <input
                        type="number"
                        defaultValue={p.price}
                        onBlur={(e) => updateProduct(p.id, { price: +e.target.value })}
                      />
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {p.sizes.map((s) => (
                          <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <small style={{ color: "var(--forest-soft)" }}>{s}</small>
                            <input
                              type="number"
                              defaultValue={p.stock[s] || 0}
                              style={{ width: 60 }}
                              onBlur={(e) => updateStock(p.id, s, +e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                      <small style={{ color: totalStock === 0 ? "var(--coral)" : "var(--forest-soft)" }}>
                        Total: {totalStock}
                      </small>
                    </td>
                    <td>
                      <button className="btn-ghost btn-sm" onClick={() => { if (confirm("Delete this product?")) removeProduct(p.id); }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === "orders" && (
        <div className="account-card">
          <h2>Orders ({orders.length})</h2>
          {orders.length === 0 ? <p style={{ color: "var(--forest-soft)" }}>No orders yet.</p> : (
            orders.map((o) => (
              <div key={o.id} className="order-row">
                <div>
                  <div className="order-row__id">{o.id}</div>
                  <div className="order-row__date">{o.shipping.name} • {new Date(o.createdAt).toLocaleDateString()}</div>
                </div>
                <div>{o.items.length} items</div>
                <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid rgba(31,58,46,0.2)" }}>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--coral)" }}>${o.total}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
