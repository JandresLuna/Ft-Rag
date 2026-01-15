# Fine-Tuning vs RAG - Plataforma Educativa Interactiva

Una aplicación web interactiva para aprender sobre las diferencias entre Fine-Tuning y Retrieval-Augmented Generation (RAG) en modelos de lenguaje.

## 🚀 Características

- **Módulos Educativos**: Aprende paso a paso sobre FT y RAG
- **Simuladores de IA**: Chat con modelos que simulan comportamiento FT y RAG
- **Juegos Interactivos**: Arrastra y suelta para clasificar casos de uso
- **Diseño Futurista**: Interfaz cyberpunk con animaciones fluidas
- **Progreso Guardado**: Tu avance se guarda automáticamente

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Estilos**: TailwindCSS + CSS personalizado
- **IA**: Google Gemini API
- **Despliegue**: Vercel

## 📦 Instalación

1. Instala dependencias:
```bash
npm install
```

2. Configura las variables de entorno:
```bash
cp .env.example .env.local
# Edita .env.local con tu API key de Gemini
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🔧 Configuración de Variables de Entorno

### Desarrollo Local
Crea un archivo `.env.local` con:
```
VITE_GEMINI_API_KEY=tu_api_key_de_gemini_aqui
```

### Producción (Vercel)
1. Ve al dashboard de Vercel
2. Configura la variable de entorno:
   - Nombre: `VITE_GEMINI_API_KEY`
   - Valor: Tu API key real de Gemini

## 🚀 Despliegue en Vercel

El proyecto está configurado para despliegue automático en Vercel:

1. Conecta tu repositorio a Vercel
2. Configura la variable de entorno `VITE_GEMINI_API_KEY`
3. Despliega automáticamente

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── modules/       # Módulos principales de la aplicación
├── services/      # Servicios de IA y API
├── types/         # Definiciones de TypeScript
├── utils/         # Utilidades y constantes
├── hooks/         # Hooks personalizados
└── styles/        # Estilos globales
```

## 🎯 Funcionalidades de IA

La aplicación incluye tres modos de simulación:

1. **EXPERT**: Respuestas educativas precisas
2. **FT_SIM**: Simula un modelo con Fine-Tuning (estilo pirata corporativo)
3. **RAG_SIM**: Simula un sistema RAG (recuperación factual)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

MIT License
