"use client";
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => { const s = localStorage.getItem("cart"); if (s) setItems(JSON.parse(s)); }, []);
  useEffect(() => { localStorage.setItem("cart", JSON.stringify(items)); }, [items]);

  const add = useCallback((dish, qty=1) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.id === dish.id);
      if (i >= 0) { const cp = [...prev]; cp[i] = { ...cp[i], qty: cp[i].qty + qty }; return cp; }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, image_path: dish.image_path, qty }];
    });
  }, []);

  const updateQty = useCallback((id, qty) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i)), []);
  const remove = useCallback((id) => setItems(prev => prev.filter(i => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const total = useMemo(() => items.reduce((s,i)=>s+i.price*i.qty,0), [items]);
  const count = useMemo(() => items.reduce((s,i)=>s+i.qty,0), [items]);

  return <CartCtx.Provider value={{ items, add, updateQty, remove, clear, total, count }}>{children}</CartCtx.Provider>;
}
export function useCartCtx(){ return useContext(CartCtx); }
