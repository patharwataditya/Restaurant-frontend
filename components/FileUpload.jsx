// components/FileUpload.jsx
"use client";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function FileUpload({ dishId, onUploaded }){
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  
  const onChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const res = await api.upload(endpoints.dishImage(dishId), file, token);
      onUploaded && onUploaded(res);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="relative">
      <input 
        type="file" 
        accept="image/*" 
        onChange={onChange}
        disabled={uploading}
        className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 file:cursor-pointer cursor-pointer disabled:opacity-50"
      />
      {uploading && (
        <div className="absolute inset-0 bg-zinc-900/80 flex items-center justify-center rounded-lg">
          <div className="text-sm">Uploading...</div>
        </div>
      )}
    </div>
  );
}