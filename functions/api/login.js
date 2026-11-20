export async function onRequestPost({ request, env }) {
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "admin123";
  const body = await request.json();
  const { username, password } = body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const sessionId = crypto.randomUUID();
    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `admin_session=${sessionId}; Path=/; HttpOnly; SameSite=Strict`
      }
    })
  }
  return Response.json({ ok: false, msg: "Wrong username or password" });
}
