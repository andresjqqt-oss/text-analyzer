const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    // 🛡 Validación
    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "El texto está vacío",
      });
    }

    // 🧠 Prompt simple (menos errores)
    const prompt = `
Devuelve SOLO un JSON válido en una sola línea.

Formato exacto:
{"summary":"...","sentiment":"Positivo","tags":["tag1","tag2"]}

Texto:
${text}
`;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral",
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();

    // 🔍 DEBUG (MUY IMPORTANTE)
    console.log("🧠 RESPUESTA COMPLETA:", data);

    let clean = "";

    // 🧠 Detectar dónde viene el texto
    if (data.response) {
      clean = data.response;
    } else if (data.message) {
      clean = data.message.content || data.message;
    } else {
      clean = JSON.stringify(data);
    }

    try {
      // 🔥 LIMPIEZA FUERTE
      clean = clean
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/\n/g, "")
        .trim();

      // Extraer JSON
      const match = clean.match(/{[\s\S]*}/);
      if (match) {
        clean = match[0];
      }

      const parsed = JSON.parse(clean);

      return res.json(parsed);
    } catch (err) {
      console.error("💥 TEXTO LIMPIO FALLIDO:", clean);

      return res.status(500).json({
        error: "La IA no devolvió JSON válido",
        raw: clean,
      });
    }
  } catch (error) {
    console.error("❌ ERROR GENERAL:", error);

    res.status(500).json({
      error: "Error con IA local",
    });
  }
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});