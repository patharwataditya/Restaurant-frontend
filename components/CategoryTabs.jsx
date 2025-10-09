// components/CategoryTabs.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryTabs({ categories=[] }){
  const pathname = usePathname();
  return (
    <div className="flex gap-2 flex-wrap pb-4 overflow-x-auto">
      {["All", ...categories].map((c) => {
        const isActive = pathname?.includes(`/categories/${c}`);
        return (
          <Link key={c} href={`/categories/${encodeURIComponent(c)}`}>
            <span className={`badge transition-all duration-200 whitespace-nowrap ${
              isActive 
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' 
                : 'hover:border-zinc-600'
            }`}>
              {c}
            </span>
          </Link>
        );
      })}
    </div>
  );
}