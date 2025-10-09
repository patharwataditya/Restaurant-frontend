// components/DishCard.jsx
"use client";
import { MEDIA_BASE } from "@/lib/endpoints";
import { formatPrice } from "@/lib/format";
import QuantitySelector from "./QuantitySelector";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

export default function DishCard({ dish }){
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const img = dish.image_path ? `${MEDIA_BASE}/${dish.image_path}` : "/placeholder.png";
  
  return (
    <div className="card group hover:border-zinc-700 transition-all duration-200 h-full flex flex-col">
      <div className="relative overflow-hidden rounded-xl mb-3">
        <img 
          src={img} 
          alt={dish.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        {!dish.is_available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-sm font-semibold text-white">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg group-hover:text-emerald-400 transition-colors">
          {dish.name}
        </h3>
        <div className="text-emerald-400 font-bold text-lg whitespace-nowrap ml-2">
          {formatPrice(dish.price)}
        </div>
      </div>
      
      <p className="text-sm text-zinc-400 mb-4 flex-grow line-clamp-2">
        {dish.description || "A delicious dish prepared with love and care."}
      </p>
      
      <div className="space-y-3 mt-auto">
        <div className="flex items-center justify-between gap-2">
          <QuantitySelector value={qty} onChange={setQty} />
          <button 
            className="btn flex-1"
            onClick={() => add(dish, qty)}
            disabled={!dish.is_available}
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to Cart
          </button>
        </div>
        <Link className="link text-xs flex items-center justify-center" href={`/dish/${dish.id}`}>
          View details
          <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}