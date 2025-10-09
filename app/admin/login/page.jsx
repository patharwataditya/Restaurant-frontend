//app/admin/login/page.jsx
"use client";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function AdminLogin(){
  const { login, user } = useAuth();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => { if (user?.role === "admin") router.replace("/admin"); }, [user, router]);
  const submit = async (e) => { e.preventDefault(); await login(email, password); router.push("/admin"); };
  return (
    <div className="max-w-md mx-auto card">
      <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn w-full" type="submit">Login</button>
      </form>
    </div>
  );
}
