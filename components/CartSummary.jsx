// components/CartSummary.jsx
"use client";
import { MEDIA_BASE } from "@/lib/endpoints";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

export default function CartSummary(){
  const { items, updateQty, remove, total } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
        <p className="text-zinc-400 mb-6">Add some delicious items to get started</p>
        <Link href="/categories/All" className="btn">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {items.map(i => (
          <div key={i.id} className="card hover:border-zinc-700 transition-all duration-200">
            <div className="flex items-center gap-4">
              <img 
                src={i.image_path ? `${MEDIA_BASE}/${i.image_path}` : "/placeholder.png"} 
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0" 
                alt={i.name}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{i.name}</div>
                <div className="text-emerald-400 text-sm font-medium mt-1">{formatPrice(i.price)}</div>
              </div>
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                <div className="flex items-center border border-zinc-700 rounded-lg overflow-hidden">
                  <button 
                    className="px-3 py-1.5 hover:bg-zinc-800 transition-colors" 
                    onClick={() => updateQty(i.id, Math.max(1, i.qty-1))}
                  >
                    -
                  </button>
                  <div className="px-4 py-1.5 border-x border-zinc-700 min-w-[3rem] text-center">{i.qty}</div>
                  <button 
                    className="px-3 py-1.5 hover:bg-zinc-800 transition-colors" 
                    onClick={() => updateQty(i.id, i.qty+1)}
                  >
                    +
                  </button>
                </div>
                <div className="font-semibold min-w-[4rem] text-right">{formatPrice(i.qty * i.price)}</div>
                <button 
                  className="text-red-400 hover:text-red-300 transition-colors text-sm"
                  onClick={() => remove(i.id)}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card bg-zinc-800/50 border-zinc-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-lg">
            <span className="text-zinc-400">Total:</span>
            <span className="text-emerald-400 font-bold text-2xl ml-3">{formatPrice(total)}</span>
          </div>
          <Link href="/checkout" className="btn w-full sm:w-auto text-center">
            Proceed to Checkout
            <svg className="w-5 h-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}