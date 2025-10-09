// components/AdminGuard.jsx
"use client";
import Protected from "./Protected";
import { useAuth } from "@/hooks/useAuth";

export default function AdminGuard({ children }){
  const { user } = useAuth();
  return (
    <Protected>
      {user?.role === "admin" ? children : (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="card max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-zinc-400">You are not authorized to access this page.</p>
          </div>
        </div>
      )}
    </Protected>
  );
}