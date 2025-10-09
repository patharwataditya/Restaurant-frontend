// components/Toast.jsx
"use client";
export default function Toast({ toasts=[] }){
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map(t => (
        <div 
          key={t.id} 
          className="card bg-emerald-600/20 border-emerald-600/40 backdrop-blur-sm animate-slide-in-right"
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{t.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}