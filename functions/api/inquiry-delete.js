function checkSession(request) {
  const cookie = request.headers.get("Cookie") || "";
  return cookie.includes("admin_session=");
}

export async function onRequestPost({ request, env }) {
  if (!checkSession(request)) return Response.json({ok:false,msg:"Unauthorized"},{status:401});
  const {id} = await request.json();
  await env.DB.prepare(`DELETE FROM inquiries WHERE id=?`).bind(id).run();
  return Response.json({ok:true});
}
