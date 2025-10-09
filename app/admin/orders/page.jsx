//app/admin/orders/page.jsx
"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";
import OrdersTable from "@/components/OrdersTable";

export default function AdminOrders(){
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const load = async () => setOrders(await api.get(endpoints.ordersAdmin(), token));
  useEffect(() => { if (token) load().catch(console.error); }, [token]);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <div className="card"><OrdersTable orders={orders} admin={true} onChange={load} /></div>
    </div>
  );
}
