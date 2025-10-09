// components/OrdersTable.jsx
"use client";
import { formatPrice } from "@/lib/format";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";

const statuses = ["pending","preparing","out_for_delivery","delivered","cancelled"];

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-400",
  preparing: "bg-blue-500/20 text-blue-400",
  out_for_delivery: "bg-purple-500/20 text-purple-400",
  delivered: "bg-emerald-500/20 text-emerald-400",
  cancelled: "bg-red-500/20 text-red-400",
};

export default function OrdersTable({ orders=[], admin=false, onChange }){
  const { token } = useAuth();
  
  const updateStatus = async (id, status) => {
    await api.put(endpoints.orderStatus(id, status), null, token);
    onChange && onChange();
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Total</th>
            <th>Items</th>
            {admin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="hover:bg-zinc-800/50 transition-colors">
              <td className="font-mono text-sm">#{o.id}</td>
              <td>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[o.status] || 'bg-zinc-700 text-zinc-300'}`}>
                  {o.status.replace(/_/g, ' ')}
                </span>
              </td>
              <td className="font-semibold text-emerald-400">{formatPrice(o.total_amount)}</td>
              <td>
                <span className="badge">{o.items?.reduce((s,i)=>s+i.quantity,0)} items</span>
              </td>
              {admin && (
                <td>
                  <select 
                    className="input !py-1.5 text-sm" 
                    defaultValue={o.status} 
                    onChange={(e)=>updateStatus(o.id,e.target.value)}
                  >
                    {statuses.map(s => (
                      <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}