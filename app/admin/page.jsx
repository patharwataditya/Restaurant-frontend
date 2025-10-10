// app/admin/page.jsx
"use client";
import AdminGuard from "@/components/AdminGuard";
import DashboardStats from "@/components/DashboardStats";
import Link from "next/link";

export default function AdminDashboard(){
  return (
    <AdminGuard>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-zinc-400">Manage your restaurant operations</p>
        </div>
        
        <DashboardStats />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/dishes" className="card hover:border-emerald-500/50 transition-all duration-200 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Manage Dishes</div>
                <div className="text-sm text-zinc-400">Add, edit, or remove menu items</div>
              </div>
            </div>
          </Link>

          <Link href="/admin/orders" className="card hover:border-blue-500/50 transition-all duration-200 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">View Orders</div>
                <div className="text-sm text-zinc-400">Track and manage customer orders</div>
              </div>
            </div>
          </Link>

          <Link href="/admin/dishes/new" className="card hover:border-purple-500/50 transition-all duration-200 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Add New Dish</div>
                <div className="text-sm text-zinc-400">Create a new menu item</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminGuard>
  );
}
