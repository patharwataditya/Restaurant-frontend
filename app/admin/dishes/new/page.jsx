// app/admin/dishes/new/page.jsx
"use client";
import AdminGuard from "@/components/AdminGuard";
import { useState } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function NewDish(){
  const { token } = useAuth();
  const [form, setForm] = useState({ 
    name:"", 
    description:"", 
    price:"", 
    is_available:true, 
    category:"", 
    tags:"" 
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };
  
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, price: parseFloat(form.price || "0") };
      const dish = await api.post(endpoints.dishes(), payload, token);
      if (file) await api.upload(endpoints.dishImage(dish.id), file, token);
      router.push("/admin/dishes");
    } catch (error) {
      console.error(error);
      alert("Failed to create dish");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AdminGuard>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Create New Dish</h1>
          <p className="text-zinc-400">Add a new item to your menu</p>
        </div>
        
        <div className="card">
          <form onSubmit={submit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Dish Image</label>
              <div className="space-y-3">
                {preview && (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 file:cursor-pointer cursor-pointer"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Dish Name *</label>
                <input 
                  className="input" 
                  placeholder="e.g. Margherita Pizza" 
                  value={form.name} 
                  onChange={e=>setForm({...form, name:e.target.value})} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price *</label>
                <input 
                  className="input" 
                  type="number" 
                  step="0.01" 
                  placeholder="0.00" 
                  value={form.price} 
                  onChange={e=>setForm({...form, price:e.target.value})} 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea 
                className="input min-h-[100px] resize-none" 
                placeholder="Describe your dish..." 
                value={form.description} 
                onChange={e=>setForm({...form, description:e.target.value})} 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input 
                  className="input" 
                  placeholder="e.g. Pizza, Pasta, Dessert" 
                  value={form.category} 
                  onChange={e=>setForm({...form, category:e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <input 
                  className="input" 
                  placeholder="vegetarian, spicy, gluten-free" 
                  value={form.tags} 
                  onChange={e=>setForm({...form, tags:e.target.value})} 
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input 
                type="checkbox" 
                checked={form.is_available} 
                onChange={e=>setForm({...form, is_available:e.target.checked})}
                className="w-4 h-4 rounded border-zinc-700"
              />
              Available for order
            </label>

            <div className="flex gap-3 pt-4">
              <button 
                className="btn flex-1" 
                type="submit" 
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Dish"}
              </button>
              <button 
                type="button"
                className="btn-outline" 
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}