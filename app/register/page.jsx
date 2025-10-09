//app/register/page.jsx
"use client";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage(){
  const { register } = useAuth();
  const [form, setForm] = useState({ name:"", email:"", phone:"", password:"" });
  const router = useRouter();
  const submit = async (e) => { e.preventDefault(); await register(form); router.push("/"); };
  return (
    <div className="max-w-md mx-auto card">
      <h1 className="text-xl font-semibold mb-4">Create account</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        <button className="btn w-full" type="submit">Register</button>
      </form>
    </div>
  );
}
