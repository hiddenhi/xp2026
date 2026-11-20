function checkSession(request) {
  const cookie = request.headers.get("Cookie") || "";
  return cookie.includes("admin_session=");
}

export async function onRequestGet({ request, env }) {
  if (!checkSession(request)) return Response.json({ok:false,msg:"Unauthorized"},{status:401});
  const { results } = await env.DB.prepare(`SELECT * FROM inquiries ORDER BY created_at DESC`).all();
  const header = ["ID","Category","Product","Name","Email","Whatsapp","Country","Quantity","Message","Status","Remark","Time"];
  const lines = [header.join(",")];
  for (const r of results) {
    const row = [
      r.id, r.category, r.product, r.name, r.email, r.whatsapp, r.country, r.quantity,
      `"${(r.message||"").replace(/"/g,'""')}"`, r.status, `"${(r.remark||"").replace(/"/g,'""')}"`, r.created_at
    ]
    lines.push(row.join(","));
  }
  const csv = lines.join("\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv;charset=utf-8",
      "Content-Disposition": "attachment; filename=inquiries.csv"
    }
  })
}
