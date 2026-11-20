function checkSession(request) {
  const cookie = request.headers.get("Cookie") || "";
  return cookie.includes("admin_session=");
}

export async function onRequestGet({ request, env }) {
  if (!checkSession(request)) return Response.json({ok:false,msg:"Unauthorized"},{status:401});
  const { results } = await env.DB.prepare(`SELECT * FROM inquiries ORDER BY created_at DESC`).all();
  return Response.json({ok:true,data:results});
}
