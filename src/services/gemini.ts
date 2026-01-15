
import { GoogleGenAI } from "@google/genai";

export type ChatMode = 'EXPERT' | 'FT_SIM' | 'RAG_SIM';

/**
 * Servicio experto para insights educativos de LLM.
 * Soporta diferentes modos para simular el comportamiento de FT y RAG.
 */
export const askGemini = async (prompt: string, mode: ChatMode = 'EXPERT', context: string = "") => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('GEMINI_API_KEY no está configurada');
    return "Error: API key no configurada. Por favor configura la variable de entorno VITE_GEMINI_API_KEY.";
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  let systemInstruction = "Eres un experto educador en IA. RESPONDE SIEMPRE EN ESPAÑOL. Usa formato Markdown (negritas, listas) pero sin exagerar.";
  
  if (mode === 'FT_SIM') {
    systemInstruction = `Simula un modelo que ha pasado por Fine-Tuning para hablar como un 'Pirata Corporativo' muy exagerado. 
    Tu conocimiento es INTERNO y estático. No tienes acceso a bases de datos externas. 
    Si te preguntan algo factual reciente, invéntalo con seguridad (alucina) basándote en tu personalidad de pirata. 
    Tu prioridad es el ESTILO y el TONO, no la veracidad. RESPONDE SIEMPRE EN ESPAÑOL.`;
  } else if (mode === 'RAG_SIM') {
    systemInstruction = `Simula un sistema RAG (Retrieval Augmented Generation). Eres extremadamente factual, serio y seco. 
    Siempre comienzas tus respuestas indicando que estás 'Consultando la base de conocimientos...'. 
    Cita fuentes ficticias (ej: [Documento_Técnico_A2]). Si no sabes algo, di que 'No se encontró información en la base de datos'. 
    No tienes personalidad, solo recuperas datos. RESPONDE SIEMPRE EN ESPAÑOL.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: context ? `Contexto del módulo actual: ${context}\n\nPregunta: ${prompt}` : prompt,
      config: {
        systemInstruction,
        temperature: mode === 'FT_SIM' ? 1.2 : 0.3, // Más creativo para FT, más preciso para RAG
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error en la transmisión de datos corticales.";
  }
};
