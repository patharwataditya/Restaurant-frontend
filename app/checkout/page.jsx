// app/checkout/page.jsx
"use client";
import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import { useRouter } from "next/navigation";
import { MEDIA_BASE } from "@/lib/endpoints";

export default function CheckoutPage(){
  const { token } = useAuth();
  const { items, total, clear } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({ line1:"", line2:"", city:"", state:"", zip:"", is_default:true });
  const [addressId, setAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    api.get(endpoints.addresses(), token).then((list) => {
      setAddresses(list || []);
      if (list && list.length) {
        setAddressId(list.find(a => a.is_default)?.id || list[0].id);
      } else {
        setShowAddressForm(true);
      }
    }).catch(console.error);
  }, [token]);

  const addAddress = async (e) => {
    e.preventDefault();
    const a = await api.post(endpoints.addresses(), form, token);
    setAddresses((prev)=>[...prev, a]);
    setAddressId(a.id);
    setShowAddressForm(false);
    setForm({ line1:"", line2:"", city:"", state:"", zip:"", is_default:true });
  };

  const placeOrder = async () => {
    if (!addressId) return alert("Please add/select an address");
    if (!items.length) return alert("Your cart is empty");
    
    setLoading(true);
    try {
      const payload = { 
        address_id: addressId, 
        items: items.map(i => ({ dish_id: i.id, quantity: i.qty })) 
      };
      await api.post(endpoints.createOrder(), payload, token);
      clear();
      router.push("/orders");
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-zinc-400">Review your order and delivery details</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Delivery Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Delivery Address
              </h2>
              
              {addresses.length > 0 && !showAddressForm ? (
                <div className="space-y-3">
                  {addresses.map(a => (
                    <label 
                      key={a.id} 
                      className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        addressId === a.id 
                          ? 'border-emerald-500 bg-emerald-500/5' 
                          : 'border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="addr" 
                        checked={addressId===a.id} 
                        onChange={()=>setAddressId(a.id)}
                        className="mt-1" 
                      />
                      <div className="flex-1">
                        <div className="font-medium mb-1">{a.line1}</div>
                        {a.line2 && <div className="text-sm text-zinc-400">{a.line2}</div>}
                        <div className="text-sm text-zinc-400">{a.city}, {a.state} {a.zip}</div>
                        {a.is_default && (
                          <span className="inline-block mt-2 badge bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
                            Default
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                  <button 
                    className="btn-outline w-full" 
                    onClick={() => setShowAddressForm(true)}
                  >
                    + Add New Address
                  </button>
                </div>
              ) : (
                <form onSubmit={addAddress} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Address Line 1 *</label>
                    <input 
                      className="input" 
                      placeholder="Street address" 
                      value={form.line1} 
                      onChange={e=>setForm({...form, line1:e.target.value})} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Address Line 2</label>
                    <input 
                      className="input" 
                      placeholder="Apartment, suite (optional)" 
                      value={form.line2} 
                      onChange={e=>setForm({...form, line2:e.target.value})} 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input 
                        className="input" 
                        placeholder="City" 
                        value={form.city} 
                        onChange={e=>setForm({...form, city:e.target.value})} 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <input 
                        className="input" 
                        placeholder="State" 
                        value={form.state} 
                        onChange={e=>setForm({...form, state:e.target.value})} 
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                    <input 
                      className="input" 
                      placeholder="ZIP" 
                      value={form.zip} 
                      onChange={e=>setForm({...form, zip:e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="flex gap-3">
                    <button className="btn flex-1" type="submit">Save Address</button>
                    {addresses.length > 0 && (
                      <button 
                        type="button"
                        className="btn-outline" 
                        onClick={() => setShowAddressForm(false)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Order Items */}
            <div className="card">
              <h2 className="font-semibold text-lg mb-4">Order Items</h2>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 pb-3 border-b border-zinc-800 last:border-0">
                    <img 
                      src={item.image_path ? `${MEDIA_BASE}/${item.image_path}` : "/placeholder.png"}
                      className="w-16 h-16 object-cover rounded-lg"
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-zinc-400">Qty: {item.qty}</div>
                    </div>
                    <div className="font-semibold">{formatPrice(item.price * item.qty)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="card">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Delivery Fee</span>
                  <span className="text-emerald-400">FREE</span>
                </div>
                <div className="border-t border-zinc-800 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-emerald-400">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              <button 
                className="btn w-full" 
                onClick={placeOrder}
                disabled={loading || !addressId || items.length === 0}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
              <p className="text-xs text-zinc-500 mt-3 text-center">
                By placing an order you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
}