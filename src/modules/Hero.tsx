
import React from 'react';

export const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="font-mono text-[#38bdf8] mb-4 tracking-[0.3em] uppercase animate-pulse">
        [ Selección Estratégica de Modelos ]
      </div>
      <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tighter leading-none">
        FINE-TUNING <br /> & RAG
      </h1>
      <p className="max-w-2xl text-lg opacity-60 mb-12 leading-relaxed">
        La IA moderna no se trata solo del modelo base, sino de cómo le entregas el conocimiento. 
        Explora las capas interactivas del desarrollo de LLMs en menos de 15 minutos.
      </p>
      <button 
        onClick={onStart}
        className="group relative px-10 py-4 bg-transparent border border-white/20 overflow-hidden transition-all hover:border-[#38bdf8]"
      >
        <div className="absolute inset-0 bg-[#38bdf8] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative z-10 font-bold group-hover:text-black transition-colors uppercase tracking-widest text-sm">
          Iniciar Experiencia
        </span>
      </button>
    </div>
  );
};
