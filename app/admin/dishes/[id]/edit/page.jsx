//app/admin/dishes/[id]/edit/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { endpoints, MEDIA_BASE } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";

export default function EditDish(){
  const { id } = useParams();
  const { token } = useAuth();
  const [form, setForm] = useState(null);
  const [file, setFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const list = await api.get(endpoints.dishes(), token);
      const d = list.find(x => String(x.id) === String(id));
      setForm({ ...d });
    })().catch(console.error);
  }, [id, token]);

  if (!form) return <div>Loading...</div>;

  const submit = async (e) => {
    e.preventDefault();
    const payload = { name: form.name, description: form.description, price: form.price, is_available: form.is_available, category: form.category, tags: form.tags };
    await api.put(`${endpoints.dishes()}/${id}`, payload, token);
    if (file) await api.upload(endpoints.dishImage(id), file, token);
    router.push("/admin/dishes");
  };

  return (
    <div className="max-w-xl card">
      <h1 className="text-xl font-semibold mb-4">Edit Dish</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Name" value={form.name || ""} onChange={e=>setForm({...form, name:e.target.value})} required />
        <textarea className="input h-24" placeholder="Description" value={form.description || ""} onChange={e=>setForm({...form, description:e.target.value})} />
        <input className="input" type="number" step="0.01" placeholder="Price" value={form.price || 0} onChange={e=>setForm({...form, price: parseFloat(e.target.value || "0")})} required />
        <input className="input" placeholder="Category" value={form.category || ""} onChange={e=>setForm({...form, category:e.target.value})} />
        <input className="input" placeholder="Tags" value={form.tags || ""} onChange={e=>setForm({...form, tags:e.target.value})} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.is_available} onChange={e=>setForm({...form, is_available:e.target.checked})} />Available</label>
        <div className="text-sm text-zinc-400">Current image:</div>
        {form.image_path ? <img src={`${MEDIA_BASE}/${form.image_path}`} className="w-40 h-28 object-cover rounded" /> : <div className="badge">No image</div>}
        <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
        <button className="btn w-full" type="submit">Save</button>
      </form>
    </div>
  );
}
