
import { ModuleId } from '../types/types';

export const MODULE_SEQUENCE = [
  { id: ModuleId.HERO, title: 'Inicio', label: '00' },
  { id: ModuleId.ROLE_SELECTION, title: 'Tu Perfil', label: '01' },
  { id: ModuleId.CONTEXT, title: 'El Gran Dilema', label: '02' },
  { id: ModuleId.FINE_TUNING, title: 'Concepto: Fine-Tuning', label: '03' },
  { id: ModuleId.GAME_DRAG_DROP, title: 'Práctica: Ajuste Fino', label: '04' },
  { id: ModuleId.RAG, title: 'Concepto: RAG', label: '05' },
  { id: ModuleId.HYBRID, title: 'Estrategia Híbrida', label: '06' },
  { id: ModuleId.GAME_SIMULATOR, title: 'Simulador de Arquitecto', label: '07' },
  { id: ModuleId.COMPARISON, title: 'Cuadro Comparativo', label: '08' },
  { id: ModuleId.TAKEAWAYS, title: 'Resumen Final', label: '09' },
];

export const FT_ITEMS = [
  { id: 'ft-1', text: 'Imitar el estilo de escritura de Cervantes', category: 'FT', explanation: 'El estilo y la forma se graban en los pesos del modelo.' },
  { id: 'ft-2', text: 'Responder siempre en formato YAML estricto', category: 'FT', explanation: 'La estructura de salida es una habilidad aprendida por el modelo.' },
  { id: 'ft-3', text: 'Aprender terminología médica de nicho', category: 'FT', explanation: 'El vocabulario especializado mejora la comprensión interna.' },
];

export const RAG_ITEMS = [
  { id: 'rag-1', text: 'Consultar el precio del Bitcoin hoy', category: 'RAG', explanation: 'Para datos en tiempo real, necesitas una fuente externa.' },
  { id: 'rag-2', text: 'Analizar 5,000 archivos PDF de la empresa', category: 'RAG', explanation: 'RAG permite buscar en grandes volúmenes de datos dinámicos.' },
  { id: 'rag-3', text: 'Citar la fuente exacta de una ley judicial', category: 'RAG', explanation: 'La trazabilidad es la mayor ventaja de la recuperación.' },
];

export const SCENARIOS = [
  {
    question: "Un banco necesita una IA que ayude a los empleados a entender normativas que cambian cada semana.",
    options: [
      { id: 'rag', label: 'Implementar RAG', correct: true, feedback: '¡Exacto! Al cambiar semanalmente, re-entrenar el modelo (FT) sería demasiado lento y costoso.' },
      { id: 'ft', label: 'Hacer Fine-Tuning', correct: false, feedback: 'Error. El Fine-Tuning dejaría a la IA desactualizada en apenas unos días.' }
    ]
  },
  {
    question: "Una editorial de cuentos infantiles quiere que su IA escriba siempre con el mismo tono alegre y rimas específicas.",
    options: [
      { id: 'ft', label: 'Hacer Fine-Tuning', correct: true, feedback: '¡Correcto! El tono y la rima son "comportamientos" que se aprenden mejor ajustando los pesos internos.' },
      { id: 'rag', label: 'Implementar RAG', correct: false, feedback: 'Incorrecto. RAG le daría información, pero no garantiza que mantenga el estilo poético deseado.' }
    ]
  },
  {
    question: "Caso Maestro: Necesitas que la IA use datos privados del cliente Y que además hable como un consejero financiero senior.",
    options: [
      { id: 'hybrid', label: 'Enfoque Híbrido', correct: true, feedback: '¡Nivel Experto! FT para el tono de "consejero senior" y RAG para los datos privados del cliente.' },
      { id: 'ft', label: 'Solo Fine-Tuning', correct: false, feedback: 'Incompleto. Los datos privados suelen ser demasiados y cambian rápido para FT.' }
    ]
  }
];
