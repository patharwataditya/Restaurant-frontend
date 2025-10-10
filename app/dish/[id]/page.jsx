// app/dish/[id]/page.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { endpoints, MEDIA_BASE } from "@/lib/endpoints";
import { useCart } from "@/hooks/useCart";
import QuantitySelector from "@/components/QuantitySelector";
import { formatPrice } from "@/lib/format";

export default function DishDetail(){
  const { id } = useParams();
  const router = useRouter();
  const [dishes, setDishes] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();

  useEffect(() => { 
    api.get(endpoints.dishes())
      .then(setDishes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  
  const dish = useMemo(() => dishes.find(d => String(d.id) === String(id)), [dishes, id]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading dish...</p>
        </div>
      </div>
    );
  }
  
  if (!dish) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold mb-2">Dish not found</h2>
        <p className="text-zinc-400 mb-6">The dish you're looking for doesn't exist</p>
        <button className="btn" onClick={() => router.back()}>Go Back</button>
      </div>
    );
  }
  
  const img = dish.image_path ? `${MEDIA_BASE}/${dish.image_path}` : "/placeholder.png";

  return (
    <div className="space-y-6">
      <button 
        onClick={() => router.back()}
        className="link text-sm flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl aspect-square">
            <img src={img} className="w-full h-full object-cover" alt={dish.name} />
            {!dish.is_available && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{dish.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl font-bold text-emerald-400">{formatPrice(dish.price)}</div>
              {dish.category && (
                <span className="badge">{dish.category}</span>
              )}
            </div>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {dish.description || "A delicious dish prepared with the finest ingredients and utmost care."}
            </p>
          </div>

          {dish.tags && (
            <div>
              <div className="text-sm font-medium mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {dish.tags.split(',').map((tag, i) => (
                  <span key={i} className="badge text-xs">{tag.trim()}</span>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-zinc-800 pt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <QuantitySelector value={qty} onChange={setQty} />
            </div>
            
            <button 
              className="btn w-full text-lg py-4"
              onClick={() => {
                add(dish, qty);
                router.push('/cart');
              }}
              disabled={!dish.is_available}
            >
              <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to Cart • {formatPrice(dish.price * qty)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}