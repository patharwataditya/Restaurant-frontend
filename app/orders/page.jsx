//app/orders/page.jsx
"use client";
import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";
import OrdersTable from "@/components/OrdersTable";

export default function MyOrdersPage(){
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const load = async () => setOrders(await api.get(endpoints.ordersMe(), token));
  useEffect(() => { if (token) load().catch(console.error); }, [token]);
  return (
    <Protected>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">My Orders</h1>
        <div className="card"><OrdersTable orders={orders} /></div>
      </div>
    </Protected>
  );
}
