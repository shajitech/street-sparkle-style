import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useInventory } from "./InventoryContext.jsx";
import { useToast } from "./ToastContext.jsx";

const CartContext = createContext(null);
const KEY = "wg_cart_v1";

function lineKey(productId, size) {
  return `${productId}::${size}`;
}

export function CartProvider({ children }) {
  const { getProduct } = useInventory();
  const { push } = useToast();
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback(
    (productId, size, qty = 1) => {
      const product = getProduct(productId);
      if (!product) return;
      const available = product.stock[size] || 0;
      setItems((prev) => {
        const k = lineKey(productId, size);
        const existing = prev.find((i) => lineKey(i.productId, i.size) === k);
        const currentQty = existing ? existing.qty : 0;
        if (currentQty + qty > available) {
          push(`Only ${available} left in size ${size}`, "error");
          return prev;
        }
        push(`Added ${product.name} (${size}) to cart`, "success");
        if (existing) {
          return prev.map((i) =>
            lineKey(i.productId, i.size) === k ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [...prev, { productId, size, qty }];
      });
    },
    [getProduct, push]
  );

  const remove = useCallback((productId, size) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size))
    );
  }, []);

  const updateQty = useCallback(
    (productId, size, qty) => {
      const product = getProduct(productId);
      const available = product ? product.stock[size] || 0 : 0;
      const next = Math.min(Math.max(1, qty), available);
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size === size ? { ...i, qty: next } : i
        )
      );
    },
    [getProduct]
  );

  const clear = useCallback(() => setItems([]), []);

  const detailed = items
    .map((it) => {
      const p = getProduct(it.productId);
      if (!p) return null;
      return { ...it, product: p, lineTotal: p.price * it.qty };
    })
    .filter(Boolean);

  const subtotal = detailed.reduce((s, x) => s + x.lineTotal, 0);
  const count = detailed.reduce((s, x) => s + x.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, detailed, subtotal, count, add, remove, updateQty, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
