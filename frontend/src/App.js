import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const analyze = async () => {
    if (!text.trim()) {
      setError("⚠️ Ingresa un texto primero");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post("http://localhost:3001/analyze", {
        text,
      });
      setResult(res.data);
    } catch (err) {
      setError("❌ Error al analizar el texto");
    }

    setLoading(false);
  };

  return (
    <div style={darkMode ? styles.darkPage : styles.page}>
      <div style={darkMode ? styles.darkContainer : styles.container}>

        {/* Toggle modo oscuro */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={styles.toggle}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <h1 style={styles.title}>🧠 AI Text Analyzer</h1>

        <p
          style={{
            ...styles.subtitle,
            color: darkMode ? "#ccc" : "#666",
          }}
        >
          Analiza texto con inteligencia artificial en segundos
        </p>

        <textarea
          style={{
            ...styles.textarea,
            backgroundColor: darkMode ? "#2a2a2a" : "white",
            color: darkMode ? "white" : "black",
            border: darkMode ? "1px solid #555" : "1px solid #ccc",
          }}
          placeholder="Pega tu texto aquí..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
          onClick={analyze}
          disabled={loading}
        >
          {loading ? "⏳ Analizando..." : "🚀 Analizar"}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {!result && !loading && !error && (
          <p
            style={{
              ...styles.hint,
              color: darkMode ? "#aaa" : "#666",
            }}
          >
            👉 Ingresa un texto para analizar
          </p>
        )}

        {result && (
          <div
            style={{
              ...styles.card,
              background: darkMode ? "#2a2a2a" : "#f8f9fa",
              color: darkMode ? "white" : "black",
            }}
          >
            <div style={styles.section}>
              <h3>📄 Resumen</h3>
              <p>{result.summary}</p>
            </div>

            <div style={styles.section}>
              <h3>😊 Sentimiento</h3>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor:
                    result.sentiment === "Positivo"
                      ? "#28a745"
                      : result.sentiment === "Negativo"
                      ? "#dc3545"
                      : "#6c757d",
                }}
              >
                {result.sentiment}
              </span>
            </div>

            <div style={styles.section}>
              <h3>🏷 Tags</h3>
              <div>
                {result.tags.map((tag, i) => (
                  <span key={i} style={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  darkPage: {
    background: "#121212",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    width: "90%",
    maxWidth: "800px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  darkContainer: {
    background: "#1e1e1e",
    color: "white",
    padding: "30px",
    borderRadius: "15px",
    width: "90%",
    maxWidth: "800px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "140px",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "15px",
    fontSize: "14px",
  },
  button: {
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    background: "#2a5298",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  card: {
    marginTop: "25px",
    textAlign: "left",
    padding: "20px",
    borderRadius: "10px",
  },
  section: {
    marginBottom: "15px",
  },
  tag: {
    display: "inline-block",
    background: "#2a5298",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    margin: "5px",
    fontSize: "12px",
  },
  badge: {
    padding: "6px 12px",
    borderRadius: "20px",
    color: "white",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  hint: {
    marginTop: "10px",
  },
  toggle: {
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "none",
    background: "#444",
    color: "white",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default App;