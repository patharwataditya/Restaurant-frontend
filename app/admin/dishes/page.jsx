// app/admin/dishes/page.jsx
"use client";
import AdminGuard from "@/components/AdminGuard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";
import DishesTable from "@/components/DishesTable";

export default function AdminDishes(){
  const { token } = useAuth();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const load = async () => {
    setLoading(true);
    try {
      const data = await api.get(endpoints.dishes(), token);
      setDishes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const del = async (id) => { 
    if (!confirm("Delete this dish?")) return;
    await api.delete(`${endpoints.dishes()}/${id}`, token); 
    load(); 
  };
  
  useEffect(() => { 
    if (token) load(); 
  }, [token]);
  
  return (
    <AdminGuard>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Manage Dishes</h1>
            <p className="text-zinc-400">{dishes.length} dishes in menu</p>
          </div>
          <Link href="/admin/dishes/new" className="btn w-full sm:w-auto">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Dish
          </Link>
        </div>
        
        <div className="card">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-zinc-400">Loading dishes...</p>
            </div>
          ) : dishes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400 mb-4">No dishes yet</p>
              <Link href="/admin/dishes/new" className="btn">Add Your First Dish</Link>
            </div>
          ) : (
            <DishesTable dishes={dishes} onDelete={del} />
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
