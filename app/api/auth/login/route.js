export async function POST(req){
  const body = await req.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const text = await res.text();
  return new Response(text, { status: res.status, headers: { "Content-Type": res.headers.get("content-type") || "application/json" } });
}
