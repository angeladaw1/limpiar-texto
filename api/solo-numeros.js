export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("OK (usa POST)");
  }

  // Leer body crudo (urlencoded)
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString();

  const params = new URLSearchParams(raw);

  // Acepta "texto" o "text"
  const texto = params.get("texto") || params.get("text") || "";

  // Eliminar todo lo que no sea número
  const match = texto.match(/[-+]?\d+(?:[.,]\d+)+|\d+/);
  const soloNumeros = match ? match[0] : "";

  res.status(200).json({
    numeros: soloNumeros
  });
}
