//app/cart/page.jsx
"use client";
import CartSummary from "@/components/CartSummary";
export default function CartPage(){
  return (<div className="space-y-6"><h1 className="text-2xl font-semibold">Your Cart</h1><CartSummary /></div>);
}
