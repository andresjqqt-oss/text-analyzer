# 🧠 AI Text Analyzer

Aplicación web que analiza texto usando Inteligencia Artificial local (Ollama).

## 🚀 Funcionalidades

- Resumen automático
- Análisis de sentimiento
- Extracción de tags

## 🛠 Tecnologías

- Frontend: React
- Backend: Node.js + Express
- IA: Ollama (modelo Mistral)

## ⚙️ Instalación

### 1. Clonar repositorio

git clone https://github.com/andresjqqt-oss/text-analyzer
cd text-analyzer

### 2. Backend

cd backend
npm install
node index.js

### 3. Instalar Ollama

Descargar desde:
https://ollama.com

Luego ejecutar:

ollama pull mistral

### 4. Frontend

cd frontend
npm install
npm start

## 📡 Uso

1. Abre http://localhost:3000
2. Ingresa un texto
3. Presiona "Analizar"

## 🔐 Seguridad

- No se usan API Keys
- IA corre localmente (privacidad total)

## ⚠️ Notas

- Asegúrate de tener Ollama corriendo
- El backend corre en puerto 3001
