export async function onRequestPost({ request, env }) {
  const { category, product, name, email, whatsapp, country, quantity, message } = await request.json();
  const stmt = env.DB.prepare(`
    INSERT INTO inquiries(category,product,name,email,whatsapp,country,quantity,message)
    VALUES (?,?,?,?,?,?,?,?)
  `).bind(category,product,name,email,whatsapp,country,quantity,message);
  await stmt.run();
  return Response.json({ok:true,msg:"Inquiry submitted successfully"});
}
