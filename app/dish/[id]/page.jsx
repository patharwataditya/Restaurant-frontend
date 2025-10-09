//app/dish/[id]/page.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { endpoints, MEDIA_BASE } from "@/lib/endpoints";
import { useCart } from "@/hooks/useCart";
import QuantitySelector from "@/components/QuantitySelector";
import { formatPrice } from "@/lib/format";

export default function DishDetail(){
  const { id } = useParams();
  const [dishes, setDishes] = useState([]);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  useEffect(() => { api.get(endpoints.dishes()).then(setDishes).catch(console.error); }, []);
  const dish = useMemo(() => dishes.find(d => String(d.id) === String(id)), [dishes, id]);
  if (!dish) return <div>Loading...</div>;
  const img = dish.image_path ? `${MEDIA_BASE}/${dish.image_path}` : "/placeholder.png";

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={img} className="rounded-2xl w-full h-72 object-cover" />
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">{dish.name}</h1>
        <div className="text-emerald-400 text-lg">{formatPrice(dish.price)}</div>
        <p className="text-zinc-400">{dish.description || "Delicious!"}</p>
        <QuantitySelector value={qty} onChange={setQty} />
        <button className="btn" onClick={() => add(dish, qty)}>Add to cart</button>
      </div>
    </div>
  );
}
