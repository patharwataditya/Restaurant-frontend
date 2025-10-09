//app/page.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import DishCard from "@/components/DishCard";
import CategoryTabs from "@/components/CategoryTabs";

export default function HomePage(){
  const [dishes, setDishes] = useState([]);
  useEffect(() => { api.get(endpoints.dishes()).then(setDishes).catch(console.error); }, []);
  const categories = useMemo(() => {
    const s = new Set(); dishes.forEach(d => d.category && s.add(d.category)); return Array.from(s);
  }, [dishes]);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-semibold">All Dishes</h1></div>
      <CategoryTabs categories={categories} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dishes.map(d => <DishCard key={d.id} dish={d} />)}
      </div>
    </div>
  );
}
