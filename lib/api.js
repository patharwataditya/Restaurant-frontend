export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("token");
}

export async function apiFetch(url, { method = "GET", data, token, isFormData } = {}) {
  const headers = {};
  const auth = token || getToken();
  if (auth) headers["Authorization"] = `Bearer ${auth}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(url, {
    method,
    headers,
    body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
  });
  let body = null;
  const text = await res.text();
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }

  if (!res.ok) {
    const msg = (body && (body.detail || body.message)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return body;
}

export const api = {
  get: (url, token) => apiFetch(url, { method: "GET", token }),
  post: (url, data, token) => apiFetch(url, { method: "POST", data, token }),
  put: (url, data, token) => apiFetch(url, { method: "PUT", data, token }),
  delete: (url, token) => apiFetch(url, { method: "DELETE", token }),
  upload: (url, file, token) => {
    const fd = new FormData();
    fd.append("file", file);
    return apiFetch(url, { method: "POST", data: fd, token, isFormData: true });
  },
};
