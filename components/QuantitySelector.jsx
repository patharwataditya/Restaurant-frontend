// components/QuantitySelector.jsx
"use client";
export default function QuantitySelector({ value=1, onChange }){
  return (
    <div className="inline-flex items-center border border-zinc-700 rounded-lg overflow-hidden hover:border-zinc-600 transition-colors">
      <button 
        className="px-3 py-2 hover:bg-zinc-800 transition-colors text-lg font-semibold" 
        onClick={() => onChange(Math.max(1, value-1))}
      >
        -
      </button>
      <div className="px-4 py-2 border-x border-zinc-700 min-w-[3rem] text-center font-medium">
        {value}
      </div>
      <button 
        className="px-3 py-2 hover:bg-zinc-800 transition-colors text-lg font-semibold" 
        onClick={() => onChange(value+1)}
      >
        +
      </button>
    </div>
  );
}