import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useInventory } from "../context/InventoryContext.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  const { products } = useInventory();
  const featured = products.slice(0, 6);
  const thrift = products.filter((p) => p.category === "thrift").slice(0, 3);

  return (
    <div className="fade-up">
      <Hero />
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">— Featured</span>
            <h2 className="h-big">This week's drop</h2>
          </div>
          <p>Hand-picked, heavyweight, and made to outlive the trend cycle.</p>
        </div>
        <div className="broken-grid">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to="/shop" className="btn btn-primary">See everything</Link>
        </div>
      </section>
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">— 1 of 1</span>
            <h2 className="h-big">Thrift you can't replace</h2>
          </div>
          <p>Single-piece thrift, hunted and patched. When it's gone, it's gone.</p>
        </div>
        <div className="product-grid">
          {thrift.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
