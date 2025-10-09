//app/categories/[category]/page.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import DishCard from "@/components/DishCard";

export default function CategoryPage(){
  const { category } = useParams();
  const [dishes, setDishes] = useState([]);
  useEffect(() => { api.get(endpoints.dishes()).then(setDishes).catch(console.error); }, []);
  const filtered = useMemo(() => { if (category === "All") return dishes; return dishes.filter(d => (d.category || "Uncategorized") === category); }, [dishes, category]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Category: {category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(d => <DishCard key={d.id} dish={d} />)}
      </div>
    </div>
  );
}
