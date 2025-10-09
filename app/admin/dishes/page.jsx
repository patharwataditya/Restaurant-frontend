//app/admin/dishes/new/page.jsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";
import DishesTable from "@/components/DishesTable";

export default function AdminDishes(){
  const { token } = useAuth();
  const [dishes, setDishes] = useState([]);
  const load = async () => setDishes(await api.get(endpoints.dishes(), token));
  const del = async (id) => { await api.delete(`${endpoints.dishes()}/${id}`, token); load(); };
  useEffect(() => { if (token) load().catch(console.error); }, [token]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dishes</h1>
        <Link href="/admin/dishes/new" className="btn">New Dish</Link>
      </div>
      <div className="card">
        <DishesTable dishes={dishes} onDelete={del} />
      </div>
    </div>
  );
}
