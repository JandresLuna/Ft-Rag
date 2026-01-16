
import React, { useState, useEffect, useCallback } from 'react';
import { ModuleId, UserRole, AppState, GameScore } from './types/types';
import { MODULE_SEQUENCE, FT_ITEMS, RAG_ITEMS } from './utils/constants';
import { Hero } from './modules/Hero';
import { RoleSelection } from './modules/RoleSelection';
import { NarrativeModule } from './modules/NarrativeModule';
import { GameDragDrop } from './modules/GameDragDrop';
import { GameSimulator } from './modules/GameSimulator';
import { Comparison } from './modules/Comparison';
import { DifyChatbot } from './components/DifyChatbot';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('strata_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          role: parsed.role || null,
          currentModuleIndex: parsed.currentModuleIndex || 0,
          scores: parsed.scores || {},
        };
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }
    return {
      role: null,
      currentModuleIndex: 0,
      scores: {},
    };
  });

  useEffect(() => {
    localStorage.setItem('strata_progress', JSON.stringify(state));
  }, [state]);

  const currentModule = MODULE_SEQUENCE[state.currentModuleIndex];

  const handleNext = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentModuleIndex: Math.min(prev.currentModuleIndex + 1, MODULE_SEQUENCE.length - 1)
    }));
  }, []);

  const handlePrev = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentModuleIndex: Math.max(prev.currentModuleIndex - 1, 0)
    }));
  }, []);

  const setRole = (role: UserRole) => {
    setState(prev => ({ ...prev, role, currentModuleIndex: prev.currentModuleIndex + 1 }));
  };

  const updateScore = (gameId: string, score: number, total: number) => {
    setState(prev => ({
      ...prev,
      scores: {
        ...prev.scores,
        [gameId]: { gameId, score, total, completed: true }
      }
    }));
  };

  const jumpTo = (index: number) => {
    setState(prev => ({ ...prev, currentModuleIndex: index }));
  };

  const renderModule = () => {
    if (!currentModule) return <div>Error: Módulo no encontrado.</div>;

    switch (currentModule.id) {
      case ModuleId.HERO:
        return <Hero onStart={handleNext} />;
      case ModuleId.ROLE_SELECTION:
        return <RoleSelection onSelect={setRole} />;
      case ModuleId.CONTEXT:
        return (
          <NarrativeModule
            title="El Problema: La Brecha de Datos"
            label="02"
            content="Los modelos base son genios olvidadizos. No conocen tus datos privados y **alucinan** cuando intentan inventar lo que no saben. Necesitamos conectar su cerebro con la realidad."
            visualType="problem"
            chatMode="EXPERT"
            onNext={handleNext}
          />
        );
      case ModuleId.FINE_TUNING:
        return (
          <NarrativeModule
            title="Solución A: Fine-Tuning"
            label="03"
            content="Consiste en re-entrenar al modelo con un set de datos específico. Es como **grabar** el conocimiento en su ADN digital. Excelente para aprender estilos, jergas y comportamientos."
            visualType="ft"
            chatMode="FT_SIM"
            onNext={handleNext}
          />
        );
      case ModuleId.GAME_DRAG_DROP:
        return (
          <GameDragDrop
            title="Práctica de Ajuste Fino"
            description="Identifica qué tareas requieren modificar el 'comportamiento' del modelo."
            itemsSet={FT_ITEMS}
            targetCategory="FT"
            onComplete={(s, t) => { updateScore('FineTuning-Fix', s, t); handleNext(); }}
          />
        );
      case ModuleId.RAG:
        return (
          <NarrativeModule
            title="Solución B: Retrieval (RAG)"
            label="05"
            content="En lugar de re-entrenar, le damos una biblioteca. El modelo **busca información relevante** antes de responder. Es la clave para datos actualizados y veraces."
            visualType="rag"
            chatMode="RAG_SIM"
            onNext={handleNext}
          />
        );
      case ModuleId.HYBRID:
        return (
          <NarrativeModule
            title="El Poder de la Hibridación"
            label="06"
            content="¿Por qué elegir? En proyectos reales usamos **FT** para que la IA hable como un experto y **RAG** para que ese experto tenga acceso a los manuales más recientes."
            visualType="tree"
            chatMode="BOTH"
            onNext={handleNext}
          />
        );
      case ModuleId.GAME_SIMULATOR:
        return <GameSimulator onComplete={(s, t) => { updateScore('Arquitecto-Final', s, t); handleNext(); }} />;
      case ModuleId.COMPARISON:
        return <Comparison onNext={handleNext} />;
      case ModuleId.TAKEAWAYS:
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-4xl mx-auto">
            <h2 className="text-5xl font-extrabold mb-8 text-[#fbbf24] tracking-tighter">MISIÓN CUMPLIDA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12 max-w-2xl">
              {Object.values(state.scores).map((s: GameScore) => (
                <div key={s.gameId} className="p-6 border border-[#38bdf8]/30 rounded bg-[#38bdf8]/5 flex flex-col items-center">
                  <p className="text-[10px] uppercase font-mono text-[#38bdf8] mb-2">{s.gameId}</p>
                  <p className="text-3xl font-black">{Math.round((s.score / s.total) * 100)}%</p>
                  <p className="text-xs opacity-50">{s.score} de {s.total} aciertos</p>
                </div>
              ))}
            </div>

            {/* Chatbot Integrado (Iframe) */}
            <DifyChatbot isVisible={true} />

            <div className="mt-12">
              <button
                onClick={() => {
                  localStorage.removeItem('strata_progress');
                  window.location.reload();
                }}
                className="px-12 py-4 bg-[#38bdf8] text-black font-black rounded-sm hover:scale-105 transition-transform uppercase tracking-widest"
              >
                Reiniciar Academia
              </button>
            </div>
          </div>
        );
      default:
        return <div>Error de carga de módulo.</div>;
    }
  };

  return (
    <div className="min-h-screen selection:bg-[#38bdf8] selection:text-black bg-[#050505]">
      {/* HUD de Navegación */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="font-mono text-[10px] tracking-widest flex items-center gap-6">
          <span className="font-black text-[#38bdf8] border-r border-white/10 pr-6">STRATA_ARCH_v2</span>
          <span className="hidden sm:block opacity-40 uppercase">{currentModule.title}</span>
        </div>

        <div className="flex gap-4">
          <button onClick={handlePrev} disabled={state.currentModuleIndex === 0} className="text-xs uppercase font-mono opacity-50 hover:opacity-100 disabled:opacity-0 transition-opacity">
            [ Anterior ]
          </button>
          <button onClick={handleNext} disabled={state.currentModuleIndex === MODULE_SEQUENCE.length - 1} className="text-xs uppercase font-mono opacity-50 hover:opacity-100 disabled:opacity-0 transition-opacity">
            [ Siguiente ]
          </button>
        </div>
      </nav>

      {/* Indicador de progreso lateral */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-40">
        {MODULE_SEQUENCE.map((m, idx) => (
          <div key={m.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => jumpTo(idx)}>
            <div className={`w-1 h-8 transition-all ${idx === state.currentModuleIndex ? 'bg-[#38bdf8]' : 'bg-white/10 group-hover:bg-white/30'}`} />
            <span className={`text-[8px] font-mono uppercase tracking-widest transition-opacity ${idx === state.currentModuleIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              {m.title}
            </span>
          </div>
        ))}
      </div>

      <main className="pt-24 pb-32 px-6 max-w-6xl mx-auto min-h-screen">
        {renderModule()}
      </main>
    </div>
  );
};

export default App;
