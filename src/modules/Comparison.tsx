
import React from 'react';

export const Comparison: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const data = [
    { attr: 'Objetivo Principal', ft: 'Comportamiento y Estilo', rag: 'Conocimiento Externo' },
    { attr: 'Actualidad del Dato', ft: 'Estática (al entrenar)', rag: 'Tiempo Real (actualizable)' },
    { attr: 'Riesgo de Alucinación', ft: 'Alto (inventa información)', rag: 'Bajo (basado en contexto)' },
    { attr: 'Trazabilidad', ft: 'Caja Negra', rag: 'Alta (incluye citas)' },
    { attr: 'Costo de Setup', ft: 'Alto (horas de GPU)', rag: 'Medio (Bases Vectoriales)' },
    { attr: 'Mantenimiento', ft: 'Difícil (re-entrenamiento)', rag: 'Fácil (solo subir archivos)' }
  ];

  return (
    <div className="py-12">
      <h2 className="text-4xl font-extrabold mb-12 text-center">Matriz Comparativa Strata</h2>
      
      <div className="overflow-x-auto bg-white/5 border border-white/10 rounded mb-12">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs font-mono text-[#38bdf8] text-left">
              <th className="p-6">ATRIBUTO</th>
              <th className="p-6">FINE-TUNING (FT)</th>
              <th className="p-6">RAG (RETRIEVAL)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-6 font-bold text-sm">{row.attr}</td>
                <td className="p-6 opacity-80 text-sm">{row.ft}</td>
                <td className="p-6 opacity-80 text-sm">{row.rag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <button 
          onClick={onNext}
          className="px-12 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-[#38bdf8] transition-colors"
        >
          Ver Árbol de Decisión Final
        </button>
      </div>
    </div>
  );
};
