export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/v1";
export const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "http://127.0.0.1:8000/media";

export const endpoints = {
  login: () => `${API_BASE}/auth/login`,
  register: () => `${API_BASE}/auth/register`,
  me: () => `${API_BASE}/users/me`,
  addresses: () => `${API_BASE}/users/me/addresses`,
  dishes: () => `${API_BASE}/dishes`,
  dishImage: (id) => `${API_BASE}/dishes/${id}/image`,
  ordersMe: () => `${API_BASE}/orders/me`,
  ordersAdmin: () => `${API_BASE}/orders`,
  orderStatus: (id, status) => `${API_BASE}/orders/${id}/status?status=${encodeURIComponent(status)}`,
  createOrder: () => `${API_BASE}/orders`,
};
