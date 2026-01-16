import React, { useState, useEffect } from 'react';

interface DifyChatbotProps {
  isVisible?: boolean;
}

export const DifyChatbot: React.FC<DifyChatbotProps> = ({ isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // 1. Inyectar Script para el Botón (solo si quieres mantener el de Dify por debajo, pero aquí haremos el propio)
    const scriptId = 'dify-chatbot-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://udify.app/embed.min.js';
      script.id = scriptId;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Botón Flotante Personalizado */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-[1000] w-16 h-16 bg-[#38bdf8] text-black rounded-full shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-110 transition-all flex items-center justify-center group animate-bounce"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform">
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
          </svg>
        </button>
      )}

      {/* Ventana de Chat */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-[1001] w-[90vw] md:w-[450px] max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/80 backdrop-blur-xl animate-in zoom-in-95 fade-in duration-300 origin-bottom-right">
          {/* Header con Botón X */}
          <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#38bdf8]">TERMINAL_ACTIVA</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/50 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cuerpo del Iframe */}
          <div className="w-full h-[600px] bg-white">
            <iframe
              src="https://udify.app/chatbot/wuMrJAL47HxJNpsO"
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="microphone"
            />
          </div>
        </div>
      )}
    </>
  );
};
