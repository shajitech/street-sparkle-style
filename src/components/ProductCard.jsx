import { Link } from "react-router-dom";

function totalStock(stock) {
  return Object.values(stock || {}).reduce((s, n) => s + n, 0);
}

export default function ProductCard({ product }) {
  const out = totalStock(product.stock) === 0;
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__media">
        {product.badge && (
          <span className={`sticker product-card__badge ${product.badge === "1 OF 1" ? "" : "sticker-forest"}`}>
            {product.badge}
          </span>
        )}
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        {out && <div className="product-card__sold">SOLD OUT</div>}
      </div>
      <div className="product-card__body">
        <div>
          <div className="product-card__name">{product.name}</div>
          <div className="product-card__meta">
            {product.category === "thrift" ? "One of one" : "Streetwear"}
          </div>
        </div>
        <div className="product-card__price">${product.price}</div>
      </div>
    </Link>
  );
}
