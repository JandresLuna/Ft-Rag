
import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';

interface SortingItem {
  id: string;
  text: string;
  category: string;
  explanation: string;
}

interface GameProps {
  title: string;
  description: string;
  itemsSet: SortingItem[];
  targetCategory: string;
  onComplete: (score: number, total: number) => void;
}

export const GameDragDrop: React.FC<GameProps> = ({ title, description, itemsSet, targetCategory, onComplete }) => {
  const [items, setItems] = useState(itemsSet.map(i => ({ ...i, status: 'pending' as 'pending' | 'correct' | 'wrong', feedback: '' })));
  const [showSummary, setShowSummary] = useState(false);

  const handleDecision = (id: string, isMatch: boolean) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const correct = isMatch; // En este juego simplificado, si el usuario pulsa el boton de la categoria correcta
        return { 
          ...item, 
          status: correct ? 'correct' : 'wrong',
          feedback: item.explanation
        };
      }
      return item;
    }));
  };

  const finishedCount = items.filter(i => i.status !== 'pending').length;
  const score = items.filter(i => i.status === 'correct').length;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter text-[#fbbf24]">{title}</h2>
        <p className="opacity-50 text-sm max-w-lg mx-auto leading-relaxed">{description}</p>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <div key={item.id} className={`relative transition-all duration-500 overflow-hidden ${item.status !== 'pending' ? 'opacity-100' : ''}`}>
            <GlassCard className={`flex flex-col md:flex-row items-center gap-6 p-8 ${
              item.status === 'correct' ? 'border-green-500/50 bg-green-500/5' : 
              item.status === 'wrong' ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'
            }`}>
              <div className="flex-1">
                <p className="text-lg font-medium">{item.text}</p>
                {item.status !== 'pending' && (
                  <p className={`mt-2 text-xs font-mono uppercase tracking-widest ${item.status === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                    {item.status === 'correct' ? '✓ Correcto: ' : '✕ Incorrecto: '}
                    <span className="text-white opacity-80 lowercase tracking-normal font-sans italic">{item.feedback}</span>
                  </p>
                )}
              </div>

              {item.status === 'pending' && (
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleDecision(item.id, true)}
                    className="px-6 py-2 border border-[#38bdf8] text-[#38bdf8] text-[10px] font-bold uppercase tracking-widest hover:bg-[#38bdf8] hover:text-black transition-all"
                  >
                    Pertenece a {targetCategory}
                  </button>
                  <button 
                    onClick={() => handleDecision(item.id, false)}
                    className="px-6 py-2 border border-white/20 text-white/40 text-[10px] font-bold uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all"
                  >
                    No es {targetCategory}
                  </button>
                </div>
              )}
            </GlassCard>
          </div>
        ))}
      </div>

      {finishedCount === items.length && (
        <div className="mt-16 text-center animate-bounce">
          <button 
            onClick={() => onComplete(score, items.length)}
            className="px-12 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-[#38bdf8] transition-colors"
          >
            Continuar Aprendizaje
          </button>
        </div>
      )}
    </div>
  );
};
