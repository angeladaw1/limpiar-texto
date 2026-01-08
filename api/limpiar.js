export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo POST" });
  }

  const texto = req.body.texto || "";

  const textoLimpio = texto
    .replace(/\r\n|\r|\n/g, ".")
    .replace(/\.{2,}/g, ".");

  res.status(200).json({
    texto_limpio: textoLimpio
  });
}
