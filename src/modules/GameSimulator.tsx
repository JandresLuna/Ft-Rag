
import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { SCENARIOS } from '../utils/constants';

export const GameSimulator: React.FC<{ onComplete: (score: number, total: number) => void }> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (correct: boolean, f: string) => {
    if (feedback) return;
    if (correct) setScore(s => s + 1);
    setIsCorrect(correct);
    setFeedback(f);
  };

  const next = () => {
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex(c => c + 1);
      setFeedback(null);
    } else {
      onComplete(score, SCENARIOS.length);
    }
  };

  const scenario = SCENARIOS[currentIndex];

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="mb-12 text-center">
        <span className="font-mono text-[10px] text-[#fbbf24] uppercase tracking-[0.5em] block mb-2">Simulación de Despliegue</span>
        <h2 className="text-4xl font-black uppercase tracking-tighter">¿Qué tecnología elegirías?</h2>
        <div className="mt-4 flex justify-center gap-1">
            {SCENARIOS.map((_, i) => (
                <div key={i} className={`h-1 w-8 transition-all ${i === currentIndex ? 'bg-[#38bdf8]' : i < currentIndex ? 'bg-green-500' : 'bg-white/10'}`} />
            ))}
        </div>
      </div>
      
      <GlassCard className="mb-8 min-h-[250px] flex flex-col items-center justify-center text-center p-12 bg-white/5 border-white/20">
        <span className="text-4xl mb-6 opacity-30">💼</span>
        <p className="text-2xl font-light italic leading-relaxed text-white/90">
          &ldquo;{scenario.question}&rdquo;
        </p>
      </GlassCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {scenario.options.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.correct, opt.feedback)}
            disabled={!!feedback}
            className={`
              p-8 border-2 transition-all text-sm font-black uppercase tracking-widest text-center
              ${feedback ? (opt.correct ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-red-500 text-red-500 opacity-20 scale-95') : 'border-white/10 hover:border-[#38bdf8] hover:bg-[#38bdf8]/5 hover:scale-[1.02]'}
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {feedback && (
        <div className="animate-in slide-in-from-bottom-8 duration-700">
           <GlassCard className={`text-center ${isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-orange-500/30 bg-orange-500/5'}`}>
              <p className={`text-xl mb-8 font-bold ${isCorrect ? 'text-green-400' : 'text-orange-400'}`}>
                {isCorrect ? '✓ DECISIÓN CORRECTA' : '✕ EVALUACIÓN ERRÓNEA'}
              </p>
              <p className="text-lg opacity-80 mb-10 leading-relaxed max-w-xl mx-auto">
                {feedback}
              </p>
              <button 
                onClick={next}
                className="px-16 py-4 bg-white text-black font-black rounded-sm hover:bg-[#38bdf8] transition-colors uppercase text-xs tracking-widest"
              >
                {currentIndex === SCENARIOS.length - 1 ? 'Finalizar Certificación' : 'Siguiente Caso'}
              </button>
           </GlassCard>
        </div>
      )}
    </div>
  );
};
