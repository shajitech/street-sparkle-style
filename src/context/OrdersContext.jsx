import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext.jsx";

const OrdersContext = createContext(null);
const KEY = "wg_orders_v1";

function loadOrders() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function OrdersProvider({ children }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState(() => loadOrders());

  const save = useCallback((next) => {
    setOrders(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }, []);

  const createOrder = useCallback(
    ({ userId, items, shipping, subtotal, shippingCost, tax, total }) => {
      const id = "WG-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      const order = {
        id,
        userId,
        items,
        shipping,
        subtotal,
        shippingCost,
        tax,
        total,
        status: "processing",
        createdAt: Date.now(),
      };
      save([order, ...orders]);
      return order;
    },
    [orders, save]
  );

  const updateStatus = useCallback(
    (id, status) => {
      save(orders.map((o) => (o.id === id ? { ...o, status } : o)));
    },
    [orders, save]
  );

  const userOrders = user ? orders.filter((o) => o.userId === user.id) : [];
  const getOrder = useCallback((id) => orders.find((o) => o.id === id), [orders]);

  return (
    <OrdersContext.Provider
      value={{ orders, userOrders, createOrder, updateStatus, getOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be inside OrdersProvider");
  return ctx;
}
