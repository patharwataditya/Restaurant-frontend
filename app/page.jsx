// app/page.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import DishCard from "@/components/DishCard";
import CategoryTabs from "@/components/CategoryTabs";

export default function HomePage(){
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
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

  const filteredDishes = useMemo(() => {
    if (!searchQuery) return dishes;
    return dishes.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [dishes, searchQuery]);
  
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 p-8 md:p-12">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Welcome to <span className="text-emerald-400">EazyEat</span>
          </h1>
          <p className="text-zinc-400 text-lg mb-6 max-w-2xl">
            Discover delicious meals delivered right to your doorstep. Fresh ingredients, amazing flavors.
          </p>
          <div className="relative max-w-xl">
            <input 
              type="text"
              placeholder="            Search for dishes..."
              className="input pl-11 pr-4 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-5 h-5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
        <CategoryTabs categories={categories} />
      </div>

      {/* Dishes Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {searchQuery ? `Search Results (${filteredDishes.length})` : 'All Dishes'}
          </h2>
          <span className="text-sm text-zinc-400">{filteredDishes.length} dishes available</span>
        </div>
        
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
        ) : filteredDishes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No dishes found</h3>
            <p className="text-zinc-400">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map(d => <DishCard key={d.id} dish={d} />)}
          </div>
        )}
      </div>
    </div>
  );
}