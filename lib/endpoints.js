export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://13.232.209.179:8000/api/v1";
export const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "http://13.232.209.179:8000/media";

export const endpoints = {
  login: () => `${API_BASE}/auth/login`,
  register: () => `${API_BASE}/auth/register`,
  me: () => `${API_BASE}/users/me`,
  addresses: () => `${API_BASE}/users/me/addresses`,
  dishes: (params) => {
    const qs = new URLSearchParams();
    if (params?.limit != null) qs.set("limit", String(params.limit));
    if (params?.skip != null) qs.set("skip", String(params.skip));
    if (params?.category) qs.set("category", params.category);
    if (params?.q) qs.set("q", params.q);
    const s = qs.toString();
    return `${API_BASE}/dishes${s ? `?${s}` : ""}`;
  },
  dishImage: (id) => `${API_BASE}/dishes/${id}/image`,
  ordersMe: () => `${API_BASE}/orders/me`,
  ordersAdmin: () => `${API_BASE}/orders`,
  orderStatus: (id, status) => `${API_BASE}/orders/${id}/status?status=${encodeURIComponent(status)}`,
  createOrder: () => `${API_BASE}/orders`,
};
