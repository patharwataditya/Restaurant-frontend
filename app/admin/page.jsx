//app/admin/page.jsx
"use client";
import DashboardStats from "@/components/DashboardStats";
import Link from "next/link";
export default function AdminDashboard(){
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <DashboardStats />
      <div className="flex gap-4">
        <Link className="btn" href="/admin/dishes">Manage Dishes</Link>
        <Link className="btn-outline" href="/admin/orders">View Orders</Link>
      </div>
    </div>
  );
}
