
import React, { useState, useMemo } from 'react';
import { GlassCard } from '../components/GlassCard';
import { askGemini, ChatMode } from '../services/gemini';
import { marked } from 'marked';

interface NarrativeProps {
  title: string;
  label: string;
  content: string;
  visualType: 'problem' | 'ft' | 'rag' | 'tree';
  chatMode: 'EXPERT' | 'FT_SIM' | 'RAG_SIM' | 'BOTH';
  onNext: () => void;
}

export const NarrativeModule: React.FC<NarrativeProps> = ({ title, label, content, visualType, chatMode, onNext }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState<{ ft: string, rag: string, expert: string }>({ ft: '', rag: '', expert: '' });
  const [loading, setLoading] = useState(false);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);

    if (chatMode === 'FT_SIM') {
      setResponses(prev => ({ ...prev, ft: 'Recalibrando neuronas piratas...' }));
      const ans = await askGemini(question, 'FT_SIM', content);
      setResponses(prev => ({ ...prev, ft: ans || '' }));
    } else if (chatMode === 'RAG_SIM') {
      setResponses(prev => ({ ...prev, rag: 'Ejecutando búsqueda en base vectorial...' }));
      const ans = await askGemini(question, 'RAG_SIM', content);
      setResponses(prev => ({ ...prev, rag: ans || '' }));
    } else if (chatMode === 'BOTH') {
      setResponses({ ft: 'Entrenando...', rag: 'Buscando...', expert: '' });
      const [f, r] = await Promise.all([
        askGemini(question, 'FT_SIM', content),
        askGemini(question, 'RAG_SIM', content)
      ]);
      setResponses({ ft: f || '', rag: r || '', expert: '' });
    } else {
      setResponses(prev => ({ ...prev, expert: 'Consultando al oráculo...' }));
      const ans = await askGemini(question, 'EXPERT', content);
      setResponses(prev => ({ ...prev, expert: ans || '' }));
    }
    setLoading(false);
  };

  const renderMarkdown = (text: string) => {
    return { __html: marked.parse(text) };
  };

  const VisualElement = useMemo(() => {
    switch (visualType) {
      case 'problem':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-64 h-64 rounded-full border border-red-500 animate-[ping_3s_infinite]" />
            </div>
            <div className="text-8xl mb-4 animate-[bounce_2s_infinite] drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">🧠</div>
            <div className="font-mono text-[10px] text-red-500 space-y-1 text-center bg-black/40 p-4 border border-red-500/20 backdrop-blur-sm">
              <p className="animate-pulse">ERROR: FACT_NOT_FOUND</p>
              <p className="opacity-50">HALLUCINATION_PROBABILITY: 89%</p>
              <p className="text-white/40">"Ayer el cielo era verde..."</p>
            </div>
          </div>
        );
      case 'ft':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full max-w-[300px]">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Nodes and Links */}
              {[...Array(8)].map((_, i) => (
                <g key={i}>
                  <line x1="100" y1="100" x2={100 + 70 * Math.cos(i * Math.PI / 4)} y2={100 + 70 * Math.sin(i * Math.PI / 4)} 
                        stroke="#fbbf24" strokeWidth="0.5" className="animate-[pulse_3s_infinite]" style={{animationDelay: `${i*0.2}s`}} />
                  <circle cx={100 + 70 * Math.cos(i * Math.PI / 4)} cy={100 + 70 * Math.sin(i * Math.PI / 4)} r="4" fill="#fbbf24" filter="url(#glow)">
                    <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin={`${i*0.3}s`} />
                  </circle>
                </g>
              ))}
              <circle cx="100" cy="100" r="15" fill="#fbbf24" className="animate-pulse" filter="url(#glow)" />
            </svg>
            <div className="absolute bottom-10 font-mono text-[9px] text-[#fbbf24] tracking-[0.3em] uppercase">
              Actualizando Pesos...
            </div>
          </div>
        );
      case 'rag':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-6 p-8">
            <div className="grid grid-cols-4 gap-2 w-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`h-12 border border-[#38bdf8]/30 bg-[#38bdf8]/5 rounded flex items-center justify-center text-[8px] font-mono transition-all duration-700 ${i === 5 ? 'bg-[#38bdf8] border-white scale-110 shadow-[0_0_20px_#38bdf8]' : 'opacity-30'}`}>
                  DOC_{i}
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center items-center gap-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent animate-pulse" />
              <div className="text-2xl animate-bounce">🔍</div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent animate-pulse" />
            </div>
            <div className="bg-black/80 border border-[#38bdf8] p-3 w-full text-center">
               <p className="text-[10px] font-mono text-[#38bdf8] uppercase tracking-widest">Resultado de Búsqueda</p>
               <p className="text-[9px] opacity-60 mt-1">Fragmento #582: "Datos confirmados..."</p>
            </div>
          </div>
        );
      case 'tree':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
             <div className="flex gap-12 relative items-center">
                <div className="w-20 h-20 rounded-xl bg-[#fbbf24]/20 border-2 border-[#fbbf24] flex items-center justify-center text-xs font-bold animate-[pulse_2s_infinite]">FT</div>
                <div className="text-3xl font-black text-white/20 animate-spin-slow">×</div>
                <div className="w-20 h-20 rounded-xl bg-[#38bdf8]/20 border-2 border-[#38bdf8] flex items-center justify-center text-xs font-bold animate-[pulse_3s_infinite]">RAG</div>
             </div>
             <div className="mt-12 p-6 border border-white/10 bg-white/5 backdrop-blur-xl relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-6 w-[2px] bg-white/20" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#38bdf8] mb-1">Estatus del Sistema</p>
                <p className="text-lg font-black italic">HÍBRIDO_OPTIMIZADO</p>
             </div>
          </div>
        );
      default: return null;
    }
  }, [visualType]);

  return (
    <div className="flex flex-col gap-12 py-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Narrativa */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-[#fbbf24] text-[10px] tracking-[0.5em] uppercase mb-4 block animate-pulse">ESTRATO_{label}</span>
            <h2 className="text-6xl font-black tracking-tighter leading-none italic mb-6">{title}</h2>
            <div 
              className="text-lg opacity-70 leading-relaxed font-light prose prose-invert max-w-none" 
              dangerouslySetInnerHTML={renderMarkdown(content)} 
            />
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button onClick={onNext} className="group relative px-12 py-4 bg-[#38bdf8] text-black font-black uppercase tracking-tighter text-sm overflow-hidden">
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 transition-colors group-hover:text-black">Siguiente Nivel</span>
            </button>
            <button 
              onClick={() => setChatOpen(!chatOpen)} 
              className={`px-8 py-4 border border-white/20 font-mono text-[10px] uppercase tracking-widest transition-all ${chatOpen ? 'bg-[#fbbf24] text-black border-none' : 'hover:border-[#fbbf24] hover:text-[#fbbf24]'}`}
            >
              {chatOpen ? '[ Cerrar Consola ]' : `[ Probar Chatbot ${chatMode.split('_')[0]} ]`}
            </button>
          </div>
        </div>

        {/* Visualización */}
        <div className="relative aspect-square bg-[#0a0a0a] border border-white/10 rounded-lg shadow-2xl overflow-hidden group">
          <div className="absolute top-4 left-4 font-mono text-[8px] opacity-20 group-hover:opacity-100 transition-opacity">
            VISUAL_FEED: {visualType.toUpperCase()}
          </div>
          <div className="absolute bottom-4 right-4 flex gap-1">
            <div className="w-1 h-1 bg-[#38bdf8] rounded-full animate-ping" />
            <div className="w-1 h-1 bg-[#fbbf24] rounded-full animate-ping [animation-delay:0.2s]" />
          </div>
          {VisualElement}
        </div>
      </div>

      {/* Chat Dinámico según el modo */}
      {chatOpen && (
        <div className="animate-in slide-in-from-bottom-12 duration-700">
          <GlassCard className="bg-black/40 border-white/10 p-8 shadow-2xl">
            <header className="mb-8 border-b border-white/5 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-xs font-mono text-[#fbbf24] uppercase tracking-[0.4em]">Laboratorio de Inferencia</h3>
                <p className="text-[10px] opacity-40 uppercase font-mono mt-1">Configuración: {chatMode}</p>
              </div>
              <div className="flex gap-2">
                 <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                 <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse [animation-delay:0.2s]" />
                 <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse [animation-delay:0.4s]" />
              </div>
            </header>
            
            <form onSubmit={handleChat} className="flex gap-2 mb-10">
              <input 
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder={
                  chatMode === 'FT_SIM' ? "Pregunta al Pirata Corporativo (FT)..." :
                  chatMode === 'RAG_SIM' ? "Consulta datos específicos (RAG)..." :
                  "Haz una consulta al sistema..."
                }
                className="flex-1 bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-[#38bdf8] outline-none transition-all placeholder:opacity-30"
              />
              <button disabled={loading} className="px-10 bg-[#38bdf8] text-black font-black uppercase text-[10px] tracking-widest disabled:opacity-30 hover:bg-white transition-colors">
                {loading ? 'Procesando...' : 'Ejecutar'}
              </button>
            </form>

            <div className={`grid gap-8 ${chatMode === 'BOTH' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
              {(chatMode === 'FT_SIM' || chatMode === 'BOTH') && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#fbbf24] animate-pulse" />
                    <h4 className="font-mono text-[9px] text-[#fbbf24] uppercase tracking-widest">Respuesta de Fine-Tuning</h4>
                  </div>
                  <div 
                    className="p-8 bg-white/5 border border-white/5 rounded min-h-[180px] text-sm prose prose-invert prose-sm max-w-none" 
                    dangerouslySetInnerHTML={renderMarkdown(responses.ft || "*En espera de pesos sinápticos...*")} 
                  />
                </div>
              )}

              {(chatMode === 'RAG_SIM' || chatMode === 'BOTH') && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                    <h4 className="font-mono text-[9px] text-[#38bdf8] uppercase tracking-widest">Respuesta de RAG</h4>
                  </div>
                  <div 
                    className="p-8 bg-white/5 border border-white/5 rounded min-h-[180px] text-sm prose prose-invert prose-sm max-w-none" 
                    dangerouslySetInnerHTML={renderMarkdown(responses.rag || "*En espera de consulta vectorial...*")} 
                  />
                </div>
              )}

              {chatMode === 'EXPERT' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <h4 className="font-mono text-[9px] text-white uppercase tracking-widest">Respuesta del Experto</h4>
                  </div>
                  <div 
                    className="p-8 bg-white/5 border border-white/5 rounded min-h-[180px] text-sm prose prose-invert prose-sm max-w-none" 
                    dangerouslySetInnerHTML={renderMarkdown(responses.expert || "*Esperando tu consulta...*")} 
                  />
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
