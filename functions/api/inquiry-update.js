function checkSession(request) {
  const cookie = request.headers.get("Cookie") || "";
  return cookie.includes("admin_session=");
}

export async function onRequestPost({ request, env }) {
  if (!checkSession(request)) return Response.json({ok:false,msg:"Unauthorized"},{status:401});
  const {id, status, remark} = await request.json();
  await env.DB.prepare(`UPDATE inquiries SET status=?, remark=? WHERE id=?`).bind(status,remark,id).run();
  return Response.json({ok:true});
}
