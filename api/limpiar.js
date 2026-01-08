export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).send("OK");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo POST" });
  }

  let texto = "";

  // Si viene como JSON
  if (req.headers["content-type"]?.includes("application/json")) {
    texto = req.body?.texto || "";
  }

  // Si viene como FORM (Make-friendly)
  if (req.headers["content-type"]?.includes("application/x-www-form-urlencoded")) {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    const params = new URLSearchParams(data);
    texto = params.get("texto") || "";
  }

  const textoLimpio = texto
    .replace(/\r\n|\r|\n/g, ".")
    .replace(/\.{2,}/g, ".");

  res.status(200).json({ texto_limpio: textoLimpio });
}
