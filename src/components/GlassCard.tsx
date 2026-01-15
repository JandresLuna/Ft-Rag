
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick, hoverable = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative p-6 bg-[rgba(255,255,255,0.03)] backdrop-blur-md 
        border border-[rgba(255,255,255,0.1)] rounded-sm overflow-hidden
        transition-all duration-500 group
        ${hoverable ? 'hover:bg-[rgba(255,255,255,0.05)] hover:border-[#38bdf8] cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#38bdf8] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      {children}
    </div>
  );
};
