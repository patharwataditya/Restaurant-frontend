// components/DashboardStats.jsx
"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice } from "@/lib/format";

export default function DashboardStats(){
  const { token } = useAuth();
  const [stats, setStats] = useState({ orders: 0, revenue: 0, dishes: 0 });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      try {
        const [orders, dishes] = await Promise.all([
          api.get(endpoints.ordersAdmin(), token),
          api.get(endpoints.dishes(), token),
        ]);
        const revenue = (orders || []).reduce((s, o) => s + (o.total_amount || 0), 0);
        setStats({ orders: orders.length, revenue, dishes: dishes.length });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const statItems = [
    { label: "Total Orders", value: stats.orders, icon: "📦", color: "emerald" },
    { label: "Revenue", value: formatPrice(stats.revenue), icon: "💰", color: "blue" },
    { label: "Menu Items", value: stats.dishes, icon: "🍽️", color: "purple" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statItems.map((stat, i) => (
        <div key={i} className="card hover:border-zinc-700 transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-zinc-400 text-sm mb-1">{stat.label}</div>
              <div className="text-3xl font-bold group-hover:text-emerald-400 transition-colors">
                {loading ? "..." : stat.value}
              </div>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}