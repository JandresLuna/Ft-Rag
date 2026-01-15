import React, { useEffect } from 'react';

interface DifyChatbotProps {
  isVisible?: boolean;
}

export const DifyChatbot: React.FC<DifyChatbotProps> = ({ isVisible = true }) => {
  useEffect(() => {
    console.log('DifyChatbot Component Rendered. Visible:', isVisible);

    // 1. Configuración global
    (window as any).difyChatbotConfig = {
      token: 'wuMrJAL47HxJNpsO',
      inputs: {},
      systemVariables: {},
      userVariables: {},
    };

    // 2. Inyectar Script si no existe
    const scriptId = 'wuMrJAL47HxJNpsO';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://udify.app/embed.min.js';
      script.id = scriptId;
      script.defer = true;
      script.onload = () => console.log('Dify Script Loaded OK');
      script.onerror = () => console.error('Dify Script Load FAILED (404?)');
      document.body.appendChild(script);
    }

    // 3. Inyectar estilos (Override total)
    const styleId = 'dify-force-visible';
    let style = document.getElementById(styleId) as HTMLStyleElement;
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }

    // Aplicar estilos según visibilidad
    style.textContent = `
      #dify-chatbot-bubble-button {
        display: ${isVisible ? 'flex' : 'none'} !important;
        visibility: ${isVisible ? 'visible' : 'hidden'} !important;
        opacity: ${isVisible ? '1' : '0'} !important;
        background-color: #1C64F2 !important;
        position: fixed !important;
        bottom: 24px !important;
        right: 24px !important;
        z-index: 999999 !important;
        width: 60px !important;
        height: 60px !important;
        border-radius: 50% !important;
        box-shadow: 0 4px 15px rgba(0,0,0,0.4) !important;
      }
      #dify-chatbot-bubble-window {
        display: ${isVisible ? 'block' : 'none'} !important;
        z-index: 999999 !important;
        width: 24rem !important;
        height: 40rem !important;
      }
    `;

    // 4. Polling agresivo: Dify a veces recrea el botón o lo oculta al inicio
    const interval = setInterval(() => {
      const button = document.getElementById('dify-chatbot-bubble-button');
      if (button) {
        if (isVisible) {
          if (button.style.display === 'none') {
            button.style.setProperty('display', 'flex', 'important');
            button.style.setProperty('visibility', 'visible', 'important');
            button.style.setProperty('opacity', '1', 'important');
          }
        } else {
          button.style.setProperty('display', 'none', 'important');
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return null;
};
