import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { SEED_PRODUCTS } from "../data/products.seed.js";

const InventoryContext = createContext(null);
const KEY = "wg_inventory_v1";

function loadInventory() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(KEY, JSON.stringify(SEED_PRODUCTS));
  return SEED_PRODUCTS;
}

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState(() => loadInventory());

  const save = useCallback((next) => {
    setProducts(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }, []);

  const getProduct = useCallback(
    (id) => products.find((p) => p.id === id),
    [products]
  );

  const decrementStock = useCallback(
    (items) => {
      // items: [{ productId, size, qty }]
      const next = products.map((p) => {
        const matches = items.filter((it) => it.productId === p.id);
        if (!matches.length) return p;
        const newStock = { ...p.stock };
        matches.forEach((m) => {
          newStock[m.size] = Math.max(0, (newStock[m.size] || 0) - m.qty);
        });
        return { ...p, stock: newStock };
      });
      save(next);
    },
    [products, save]
  );

  const updateProduct = useCallback(
    (id, patch) => {
      const next = products.map((p) => (p.id === id ? { ...p, ...patch } : p));
      save(next);
    },
    [products, save]
  );

  const updateStock = useCallback(
    (id, size, qty) => {
      const next = products.map((p) => {
        if (p.id !== id) return p;
        return { ...p, stock: { ...p.stock, [size]: Math.max(0, qty) } };
      });
      save(next);
    },
    [products, save]
  );

  const addProduct = useCallback(
    (product) => {
      const next = [...products, product];
      save(next);
    },
    [products, save]
  );

  const removeProduct = useCallback(
    (id) => {
      save(products.filter((p) => p.id !== id));
    },
    [products, save]
  );

  const resetInventory = useCallback(() => {
    save(SEED_PRODUCTS);
  }, [save]);

  return (
    <InventoryContext.Provider
      value={{
        products,
        getProduct,
        decrementStock,
        updateProduct,
        updateStock,
        addProduct,
        removeProduct,
        resetInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error("useInventory must be inside InventoryProvider");
  return ctx;
}
