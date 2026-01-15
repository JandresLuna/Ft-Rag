
import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { UserRole } from '../types';

export const RoleSelection: React.FC<{ onSelect: (role: UserRole) => void }> = ({ onSelect }) => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-center text-4xl font-bold mb-12">¿Cómo vas a participar?</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard 
          hoverable 
          onClick={() => onSelect('EXPOSITOR')}
          className="flex flex-col items-center text-center p-12"
        >
          <div className="w-16 h-16 mb-6 rounded-full border-2 border-[#fbbf24] flex items-center justify-center">
            <span className="text-2xl">🎤</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Expositor</h3>
          <p className="opacity-60 text-sm">
            Presentaré el tema a un grupo. Necesito controles de navegación y notas de apoyo.
          </p>
        </GlassCard>

        <GlassCard 
          hoverable 
          onClick={() => onSelect('AUDIENCIA')}
          className="flex flex-col items-center text-center p-12"
        >
          <div className="w-16 h-16 mb-6 rounded-full border-2 border-[#38bdf8] flex items-center justify-center">
            <span className="text-2xl">🎓</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Audiencia</h3>
          <p className="opacity-60 text-sm">
            Vengo a aprender y participar en los minijuegos. Quiero feedback y seguimiento de progreso.
          </p>
        </GlassCard>
      </div>
      <p className="text-center mt-12 font-mono text-xs opacity-40">
        Nota: Puedes cambiar de rol en cualquier momento desde el menú.
      </p>
    </div>
  );
};
