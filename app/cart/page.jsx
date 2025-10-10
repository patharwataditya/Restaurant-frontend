// app/cart/page.jsx
"use client";
import CartSummary from "@/components/CartSummary";
import Link from "next/link";

export default function CartPage(){
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Your Cart</h1>
        <Link href="/categories/All" className="link text-sm">
          Continue Shopping →
        </Link>
      </div>
      <CartSummary />
    </div>
  );
}