//app/admin/new/page.jsx
"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function NewDish(){
  const { token } = useAuth();
  const [form, setForm] = useState({ name:"", description:"", price:"", is_available:true, category:"", tags:"" });
  const [file, setFile] = useState(null);
  const router = useRouter();
  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: parseFloat(form.price || "0") };
    const dish = await api.post(endpoints.dishes(), payload, token);
    if (file) await api.upload(endpoints.dishImage(dish.id), file, token);
    router.push("/admin/dishes");
  };
  return (
    <div className="max-w-xl card">
      <h1 className="text-xl font-semibold mb-4">Create Dish</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <textarea className="input h-24" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input className="input" type="number" step="0.01" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required />
        <input className="input" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
        <input className="input" placeholder="Tags (comma separated)" value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_available} onChange={e=>setForm({...form, is_available:e.target.checked})} />Available</label>
        <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
        <button className="btn w-full" type="submit">Create</button>
      </form>
    </div>
  );
}
