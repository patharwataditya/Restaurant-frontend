"use client";
import { useState, useCallback } from "react";
export function useToast(){ const [toasts, setToasts] = useState([]); const show = useCallback((m)=>{ const id=Math.random().toString(36).slice(2); setToasts(t=>[...t,{id,message:m}]); setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),2000); },[]); return {toasts,show}; }
