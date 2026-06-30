import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct } = useInventory();
  const { add } = useCart();
  const nav = useNavigate();
  const product = getProduct(id);
  const [size, setSize] = useState(product ? product.sizes[0] : null);

  if (!product) {
    return (
      <div className="container section empty">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary">Back to shop</Link>
      </div>
    );
  }

  const stockForSize = product.stock[size] || 0;
  const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);
  const lowStock = stockForSize > 0 && stockForSize <= 3;

  return (
    <div className="container fade-up">
      <div className="pdp">
        <div className="pdp__media">
          {product.badge && (
            <span className="sticker product-card__badge" style={{ transform: "rotate(-6deg)" }}>
              {product.badge}
            </span>
          )}
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="pdp__info">
          <span className="eyebrow">— {product.category === "thrift" ? "One of one" : "Streetwear"}</span>
          <h1>{product.name}</h1>
          <div className="pdp__price">${product.price}</div>

          <div className={`stock-pill ${stockForSize === 0 ? "out" : lowStock ? "low" : ""}`}>
            <span className="dot" />
            {stockForSize === 0
              ? "Out of stock in this size"
              : lowStock
              ? `Only ${stockForSize} left`
              : `${stockForSize} in stock`}
          </div>

          <p className="pdp__desc">{product.description}</p>

          <div>
            <label style={{ fontFamily: "var(--font-display)", letterSpacing: "0.12em", color: "var(--forest)" }}>
              Size
            </label>
            <div className="size-row">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  disabled={(product.stock[s] || 0) === 0}
                  className={`size-chip ${size === s ? "active" : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn btn-coral btn-block"
            disabled={totalStock === 0 || stockForSize === 0}
            onClick={() => {
              add(product.id, size, 1);
            }}
          >
            {stockForSize === 0 ? "Sold out" : "Add to cart"}
          </button>
          <button
            className="btn btn-outline btn-block"
            style={{ marginTop: 12 }}
            disabled={stockForSize === 0}
            onClick={() => { add(product.id, size, 1); nav("/cart"); }}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
