// app/addresses/page.jsx
"use client";
import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";

const blankForm = { line1: "", line2: "", city: "", state: "", zip: "", is_default: false };

export default function AddressesPage() {
  const { token } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(blankForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAddresses = async () => {
    if (!token) return;
    try {
      const list = await api.get(endpoints.addresses(), token);
      setAddresses(list || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load addresses");
    }
  };

  useEffect(() => {
    loadAddresses().catch(console.error);
  }, [token]);

  const addAddress = async (event) => {
    event.preventDefault();
    if (!token || loading) return;
    setLoading(true);
    setError(null);
    try {
      await api.post(endpoints.addresses(), form, token);
      setForm(blankForm);
      await loadAddresses();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  const removeAddress = async (id) => {
    if (!token) return;
    const confirmed = typeof window === "undefined" ? true : window.confirm("Delete this address?");
    if (!confirmed) return;
    try {
      await api.delete(`${endpoints.addresses()}/${id}`, token);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete address");
    }
  };

  return (
    <Protected>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Saved Addresses</h1>
          <p className="text-zinc-400">Manage your delivery locations for faster checkout.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="card space-y-4">
          <h2 className="font-semibold text-lg">Your Addresses</h2>
          {addresses.length === 0 ? (
            <p className="text-sm text-zinc-400">You have not added any addresses yet.</p>
          ) : (
            <div className="space-y-3">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="p-4 border border-zinc-800 rounded-lg bg-zinc-900/40 flex flex-col gap-3"
                >
                  <div>
                    <div className="font-medium">{address.line1}</div>
                    {address.line2 && <div className="text-sm text-zinc-400">{address.line2}</div>}
                    <div className="text-sm text-zinc-400">
                      {address.city}, {address.state} {address.zip}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    {address.is_default ? (
                      <span className="badge bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
                        Default
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-500 uppercase tracking-wide">Secondary</span>
                    )}
                    <button
                      type="button"
                      className="text-sm text-red-400 hover:text-red-300"
                      onClick={() => removeAddress(address.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="font-semibold text-lg mb-4">Add New Address</h2>
          <form onSubmit={addAddress} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Address Line 1 *</label>
              <input
                className="input"
                placeholder="Street address"
                value={form.line1}
                onChange={(e) => setForm({ ...form, line1: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address Line 2</label>
              <input
                className="input"
                placeholder="Apartment, suite (optional)"
                value={form.line2}
                onChange={(e) => setForm({ ...form, line2: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input
                  className="input"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State *</label>
                <input
                  className="input"
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
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
                onChange={(e) => setForm({ ...form, zip: e.target.value })}
                required
              />
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_default}
                onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
                className="w-4 h-4 rounded border-zinc-700"
              />
              Make this my default address
            </label>
            <button className="btn w-full" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Address"}
            </button>
          </form>
        </div>
      </div>
    </Protected>
  );
}
