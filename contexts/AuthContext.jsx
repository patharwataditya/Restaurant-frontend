"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!token) { setUser(null); return; }
    (async () => {
      try { setUser(await api.get(endpoints.me(), token)); }
      catch { setUser(null); }
    })();
  }, [token]);

  const login = useCallback(async (email, password) => {
    const res = await api.post(endpoints.login(), { email, password });
    localStorage.setItem("token", res.access_token);
    setToken(res.access_token);
    return res;
  }, []);

  const register = useCallback(async (payload) => {
    const res = await api.post(endpoints.register(), payload);
    await login(payload.email, payload.password);
    return res;
  }, [login]);

  const logout = useCallback(() => { localStorage.removeItem("token"); setToken(null); setUser(null); }, []);

  return <AuthCtx.Provider value={{ token, user, loading, login, register, logout, setUser }}>{children}</AuthCtx.Provider>;
}

export function useAuthCtx(){ return useContext(AuthCtx); }
