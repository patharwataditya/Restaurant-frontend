//app/checkout/page.jsx
"use client";
import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import { useRouter } from "next/navigation";

export default function CheckoutPage(){
  const { token } = useAuth();
  const { items, total, clear } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({ line1:"", line2:"", city:"", state:"", zip:"", is_default:true });
  const [addressId, setAddressId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    api.get(endpoints.addresses(), token).then((list) => {
      setAddresses(list || []);
      if (list && list.length) setAddressId(list.find(a => a.is_default)?.id || list[0].id);
    }).catch(console.error);
  }, [token]);

  const addAddress = async (e) => {
    e.preventDefault();
    const a = await api.post(endpoints.addresses(), form, token);
    setAddresses((prev)=>[...prev, a]);
    setAddressId(a.id);
  };

  const placeOrder = async () => {
    if (!addressId) return alert("Please add/select an address");
    if (!items.length) return alert("Your cart is empty");
    const payload = { address_id: addressId, items: items.map(i => ({ dish_id: i.id, quantity: i.qty })) };
    await api.post(endpoints.createOrder(), payload, token);
    clear();
    router.push("/orders");
  };

  return (
    <Protected>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="font-semibold mb-3">Address</h2>
            {addresses.length ? (
              <div className="space-y-3">
                {addresses.map(a => (
                  <label key={a.id} className="flex items-center gap-3">
                    <input type="radio" name="addr" checked={addressId===a.id} onChange={()=>setAddressId(a.id)} />
                    <span>{a.line1}, {a.city}, {a.state} {a.zip}</span>
                    {a.is_default && <span className="badge ml-2">Default</span>}
                  </label>
                ))}
              </div>
            ) : (<div className="text-zinc-400 mb-3">No address yet. Add one:</div>)}
            <form onSubmit={addAddress} className="grid grid-cols-1 gap-3 mt-4">
              <input className="input" placeholder="Line 1" value={form.line1} onChange={e=>setForm({...form, line1:e.target.value})} required />
              <input className="input" placeholder="Line 2" value={form.line2} onChange={e=>setForm({...form, line2:e.target.value})} />
              <div className="grid grid-cols-2 gap-3">
                <input className="input" placeholder="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} required />
                <input className="input" placeholder="State" value={form.state} onChange={e=>setForm({...form, state:e.target.value})} required />
              </div>
              <input className="input" placeholder="ZIP" value={form.zip} onChange={e=>setForm({...form, zip:e.target.value})} required />
              <button className="btn w-full" type="submit">Add / Update Address</button>
            </form>
          </div>
          <div className="card">
            <h2 className="font-semibold mb-3">Order Summary</h2>
            <div className="text-lg">Total: <span className="text-emerald-400">{formatPrice(total)}</span></div>
            <button className="btn mt-4 w-full" onClick={placeOrder}>Place Order</button>
            <p className="text-xs text-zinc-500 mt-2">You must be logged in and have an address to place an order.</p>
          </div>
        </div>
      </div>
    </Protected>
  );
}
