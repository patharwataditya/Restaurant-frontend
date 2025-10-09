//app/profile/page.jsx
"use client";
import Protected from "@/components/Protected";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

export default function ProfilePage(){
  const { user, token, setUser } = useAuth();
  const [form, setForm] = useState({ name:"", phone:"" });
  useEffect(() => { if (user) setForm({ name: user.name || "", phone: user.phone || "" }); }, [user]);
  const save = async (e) => { e.preventDefault(); const updated = await api.put(endpoints.me(), form, token); setUser(updated); };
  return (
    <Protected>
      <div className="max-w-md card mx-auto">
        <h1 className="text-xl font-semibold mb-3">Profile</h1>
        <form onSubmit={save} className="space-y-3">
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
          <button className="btn w-full" type="submit">Save</button>
        </form>
      </div>
    </Protected>
  );
}
