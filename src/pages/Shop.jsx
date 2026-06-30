import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useInventory } from "../context/InventoryContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import FilterBar from "../components/FilterBar.jsx";

export default function Shop() {
  const { products } = useInventory();
  const [params, setParams] = useSearchParams();
  const initial = params.get("cat") || "all";
  const [filter, setFilter] = useState(initial);

  useEffect(() => {
    if (filter === "all") params.delete("cat");
    else params.set("cat", filter);
    setParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const list = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [products, filter]
  );

  return (
    <div className="container section fade-up">
      <span className="eyebrow">— Catalog</span>
      <h1 className="h-mega" style={{ color: "var(--forest)", marginTop: 8 }}>Shop</h1>
      <FilterBar value={filter} onChange={setFilter} />
      {list.length === 0 ? (
        <div className="empty"><h2>Nothing here</h2><p>Try a different filter.</p></div>
      ) : (
        <div className="product-grid">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
