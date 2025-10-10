// app/categories/[category]/page.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import DishCard from "@/components/DishCard";
import CategoryTabs from "@/components/CategoryTabs";

export default function CategoryPage(){
  const { category } = useParams();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { 
    api.get(endpoints.dishes())
      .then(setDishes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  
  const categories = useMemo(() => {
    const s = new Set(); 
    dishes.forEach(d => d.category && s.add(d.category)); 
    return Array.from(s);
  }, [dishes]);
  
  const filtered = useMemo(() => { 
    if (category === "All") return dishes; 
    return dishes.filter(d => (d.category || "Uncategorized") === decodeURIComponent(category)); 
  }, [dishes, category]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {decodeURIComponent(category)}
        </h1>
        <p className="text-zinc-400">{filtered.length} dishes available</p>
      </div>
      
      <CategoryTabs categories={categories} />
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="w-full h-48 bg-zinc-800 rounded-xl mb-3"></div>
              <div className="h-6 bg-zinc-800 rounded mb-2"></div>
              <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">No dishes in this category</h3>
          <p className="text-zinc-400">Check out other categories</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(d => <DishCard key={d.id} dish={d} />)}
        </div>
      )}
    </div>
  );
}