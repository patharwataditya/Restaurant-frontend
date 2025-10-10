// app/addresses/page.jsx
"use client";
import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";

export default function AddressesPage(){
  const { token } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({ line1:"", line2:"", city:"", state:"", zip:"", is_default:false });
  const [loading, setLoading] = useState(false);

  const load = async () => { 
    const list = await api.get(endpoints.addresses(), token); 
    setAddresses(list || []); 
  };
  
  useEffect(() => { 
    if (token) load().catch(console.error); 
  }, [token]);

  const add = async (e) => { 
    e.preventDefault(); 
    setLoading(true);
    try {
      await api.post(endpoints.addresses(), form, token); 
      setForm({ line1:"", line2:"", city:"", state:"", zip:"", is_default:false });
      await load();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Edit Dish</h1>
          <p className="text-zinc-400">Update menu item details</p>
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
                  placeholder="Name" 
                  value={form.name || ""} 
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
                  placeholder="Price" 
                  value={form.price || 0} 
                  onChange={e=>setForm({...form, price: parseFloat(e.target.value || "0")})} 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea 
                className="input min-h-[100px] resize-none" 
                placeholder="Description" 
                value={form.description || ""} 
                onChange={e=>setForm({...form, description:e.target.value})} 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input 
                  className="input" 
                  placeholder="Category" 
                  value={form.category || ""} 
                  onChange={e=>setForm({...form, category:e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <input 
                  className="input" 
                  placeholder="Tags" 
                  value={form.tags || ""} 
                  onChange={e=>setForm({...form, tags:e.target.value})} 
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input 
                type="checkbox" 
                checked={!!form.is_available} 
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
                {loading ? "Saving..." : "Save Changes"}
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
