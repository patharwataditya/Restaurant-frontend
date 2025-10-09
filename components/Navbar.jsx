// components/Navbar.jsx
"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

export default function Navbar(){
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="border-b border-zinc-800 sticky top-0 bg-zinc-900/95 backdrop-blur-sm z-40">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold flex items-center gap-2 hover:text-emerald-400 transition-colors">
            🍽️ <span>EazyEat</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <Link className="link" href="/">Home</Link>
            <Link className="link" href="/categories/All">Menu</Link>
            <Link className="link relative" href="/cart">
              Cart
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {count}
                </span>
              )}
            </Link>
            {user ? (
              <>
                {user.role === "admin" && <Link className="link" href="/admin">Admin</Link>}
                <Link className="link" href="/orders">Orders</Link>
                <Link className="link" href="/addresses">Addresses</Link>
                <Link className="link" href="/profile">Profile</Link>
                <button className="btn-outline" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="btn" href="/login">Login</Link>
                <Link className="btn-outline" href="/register">Register</Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-800 py-4">
            <nav className="flex flex-col gap-3">
              <Link className="link py-2" href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link className="link py-2" href="/categories/All" onClick={() => setMobileMenuOpen(false)}>Menu</Link>
              <Link className="link py-2 flex items-center" href="/cart" onClick={() => setMobileMenuOpen(false)}>
                Cart {count > 0 && <span className="badge ml-2">{count}</span>}
              </Link>
              {user ? (
                <>
                  {user.role === "admin" && <Link className="link py-2" href="/admin" onClick={() => setMobileMenuOpen(false)}>Admin</Link>}
                  <Link className="link py-2" href="/orders" onClick={() => setMobileMenuOpen(false)}>Orders</Link>
                  <Link className="link py-2" href="/addresses" onClick={() => setMobileMenuOpen(false)}>Addresses</Link>
                  <Link className="link py-2" href="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                  <button className="btn-outline text-left" onClick={() => { logout(); setMobileMenuOpen(false); }}>Logout</button>
                </>
              ) : (
                <>
                  <Link className="btn text-center" href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                  <Link className="btn-outline text-center" href="/register" onClick={() => setMobileMenuOpen(false)}>Register</Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}