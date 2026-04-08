const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Función para limpiar respuesta de la IA
function cleanAIResponse(data) {
  let clean = "";

  if (data.response) {
    clean = data.response;
  } else if (data.message) {
    clean = data.message.content || data.message;
  } else {
    clean = JSON.stringify(data);
  }

  clean = clean
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/\n/g, "")
    .trim();

  const match = clean.match(/{[\s\S]*}/);
  if (match) {
    clean = match[0];
  }

  return clean;
}

// 🔹 Diccionarios de apoyo
const negativeWords = [
  "malo", "terrible", "horrible", "dañado", "lento",
  "error", "fallo", "pésimo", "queja", "no sirve"
];

const positiveWords = [
  "excelente", "increíble", "bueno", "perfecto",
  "recomendado", "me encantó"
];

// 🔹 Endpoint principal
app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "El texto está vacío",
      });
    }

    // 🧠 PROMPT MEJORADO CON EJEMPLOS
    const prompt = `
Devuelve SOLO un JSON válido en una sola línea.

Clasifica el sentimiento del texto.

Reglas:
- sentiment debe ser SOLO uno de estos valores EXACTOS:
  Positivo, Negativo o Neutral

Ejemplos:
Texto: "Me encantó el producto, es excelente"
Resultado: {"summary":"Opinión positiva","sentiment":"Positivo","tags":["producto"]}

Texto: "El servicio fue horrible y muy lento"
Resultado: {"summary":"Queja del servicio","sentiment":"Negativo","tags":["servicio"]}

Texto: "Funciona como se esperaba"
Resultado: {"summary":"Funcionamiento básico","sentiment":"Neutral","tags":["sistema"]}

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

    console.log("🧠 RESPUESTA COMPLETA:", data);

    let clean = cleanAIResponse(data);
    console.log("🧹 LIMPIO:", clean);

    try {
      const parsed = JSON.parse(clean);

      let sentiment = parsed.sentiment;

      // 🔒 Normalizar
      if (typeof sentiment === "string") {
        sentiment = sentiment.charAt(0).toUpperCase() + sentiment.slice(1).toLowerCase();
      }

      const validSentiments = ["Positivo", "Negativo", "Neutral"];

      if (!validSentiments.includes(sentiment)) {
        sentiment = "Neutral";
      }

      // 🔥 REFUERZO INTELIGENTE (CLAVE)
      const textLower = text.toLowerCase();

      if (negativeWords.some(w => textLower.includes(w))) {
        sentiment = "Negativo";
      } else if (positiveWords.some(w => textLower.includes(w))) {
        sentiment = "Positivo";
      }

      return res.json({
        summary: parsed.summary || "",
        sentiment: sentiment,
        tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      });

    } catch (err) {
      console.error("💥 ERROR PARSEANDO:", clean);

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

// 🚀 Servidor
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});