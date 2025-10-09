// components/DishesTable.jsx
"use client";
import Link from "next/link";
import { MEDIA_BASE } from "@/lib/endpoints";
import { formatPrice } from "@/lib/format";

export default function DishesTable({ dishes=[], onDelete }){
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th className="w-20">Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th className="text-center">Available</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map(d => (
            <tr key={d.id} className="hover:bg-zinc-800/50 transition-colors">
              <td>
                <img 
                  src={d.image_path ? `${MEDIA_BASE}/${d.image_path}` : "/placeholder.png"} 
                  className="w-14 h-14 object-cover rounded-lg" 
                  alt={d.name}
                />
              </td>
              <td className="font-medium">{d.name}</td>
              <td className="text-emerald-400 font-medium">{formatPrice(d.price)}</td>
              <td>
                <span className="badge text-xs">{d.category || "Uncategorized"}</span>
              </td>
              <td className="text-center">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  d.is_available 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {d.is_available ? "Yes" : "No"}
                </span>
              </td>
              <td className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link 
                    className="link hover:text-emerald-400 transition-colors" 
                    href={`/admin/dishes/${d.id}/edit`}
                  >
                    Edit
                  </Link>
                  <button 
                    className="link text-red-400 hover:text-red-300 transition-colors" 
                    onClick={() => onDelete(d.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}