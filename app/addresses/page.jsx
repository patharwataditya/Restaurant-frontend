//app/addresses/page.jsx
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

  const load = async () => { const list = await api.get(endpoints.addresses(), token); setAddresses(list || []); };
  useEffect(() => { if (token) load().catch(console.error); }, [token]);

  const add = async (e) => { e.preventDefault(); await api.post(endpoints.addresses(), form, token); setForm({ line1:"", line2:"", city:"", state:"", zip:"", is_default:false }); load(); };
  const del = async (id) => { await api.delete(`${endpoints.addresses()}/${id}`, token); load(); };

  return (
    <Protected>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold mb-3">Your Addresses</h2>
          <div className="space-y-3">
            {addresses.map(a => (
              <div key={a.id} className="border border-zinc-800 rounded-lg p-3">
                <div>{a.line1}{a.line2 ? `, ${a.line2}` : ""}</div>
                <div>{a.city}, {a.state} {a.zip}</div>
                {a.is_default && <span className="badge mt-1">Default</span>}
                <div className="mt-2"><button className="btn-outline" onClick={()=>del(a.id)}>Delete</button></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-3">Add Address</h2>
          <form onSubmit={add} className="space-y-3">
            <input className="input" placeholder="Line 1" value={form.line1} onChange={e=>setForm({...form, line1:e.target.value})} required />
            <input className="input" placeholder="Line 2" value={form.line2} onChange={e=>setForm({...form, line2:e.target.value})} />
            <div className="grid grid-cols-2 gap-3">
              <input className="input" placeholder="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} required />
              <input className="input" placeholder="State" value={form.state} onChange={e=>setForm({...form, state:e.target.value})} required />
            </div>
            <input className="input" placeholder="ZIP" value={form.zip} onChange={e=>setForm({...form, zip:e.target.value})} required />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_default} onChange={e=>setForm({...form, is_default:e.target.checked})} />Make default</label>
            <button className="btn w-full" type="submit">Save Address</button>
          </form>
        </div>
      </div>
    </Protected>
  );
}
