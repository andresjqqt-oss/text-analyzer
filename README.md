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

Sigue estas instrucciones para ejecutar el proyecto en tu máquina:

1️⃣ Clonar el repositorio

Primero, descarga el proyecto desde GitHub:

git clone https://github.com/andresjqqt-oss/text-analyzer.git
cd text-analyzer

Esto creará una carpeta text-analyzer con todos los archivos del proyecto.

2️⃣ Configurar y ejecutar el backend

El backend está hecho en Node.js y es el encargado de procesar los textos usando la IA.

Entra a la carpeta del backend:
cd backend
Instala las dependencias:
npm install
Inicia el servidor:
node index.js
El servidor quedará corriendo en http://localhost:3001
Debes mantener esta ventana abierta mientras usas la app
3️⃣ Instalar Ollama y el modelo Mistral

El backend utiliza Ollama para ejecutar la IA de manera local.

Descarga Ollama desde: https://ollama.com
Abre terminal y ejecuta:
ollama pull mistral
Esto descargará el modelo Mistral, que es necesario para que el análisis funcione
Sin este paso, la app no podrá generar resultados

4️⃣ Ejecutar la interfaz de usuario (frontend)
Entra a la carpeta del frontend:
cd frontend
Instala las dependencias:
npm install
Inicia la aplicación web:
npm start

Esto abrirá la app en tu navegador en http://localhost:3000
Pega un texto en la caja, presiona Analizar y obtendrás:
📄 Resumen: Síntesis del texto en máximo 2 oraciones
😊 Sentimiento: Positivo, Negativo o Neutral
🏷 Tags: Lista de temas principales
⚠️ Notas importantes
El backend debe estar corriendo antes de iniciar el frontend
Si no instalas Ollama o no descargas el modelo Mistral, la app no funcionará
Se incluye un archivo .env.example y .gitignore para seguir buenas prácticas de seguridad y limpieza del código

## 🔐 Seguridad

- No se usan API Keys
- IA corre localmente (privacidad total)

## ⚠️ Notas

- Asegúrate de tener Ollama corriendo
- El backend corre en puerto 3001
