import React from 'react';
import { ConstellationData } from '../types';

interface ConstellationDiagramProps {
  card: ConstellationData;
  revealed: boolean;
  highlightEcliptic?: boolean;
}

export const ConstellationDiagram: React.FC<ConstellationDiagramProps> = ({
  card,
  revealed,
  highlightEcliptic = false,
}) => {
  const showEcliptic = revealed || highlightEcliptic;

  return (
    <div className="relative w-full max-w-md mx-auto aspect-4/3 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 backdrop-blur-md overflow-hidden shadow-2xl flex items-center justify-center">
      {/* Subtle radial starlight background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,rgba(15,23,42,0)_70%)] pointer-events-none" />

      {/* Grid Coordinates (Aesthetic astronomical declination/RA marks) */}
      <div className="absolute inset-2 border border-slate-800/40 rounded-xl pointer-events-none opacity-40">
        <div className="absolute top-1 left-2 text-[10px] font-mono text-slate-500">RA / DEC GRID</div>
        <div className="absolute bottom-1 right-2 text-[10px] font-mono text-slate-500">
          {card.eclipticIntersection ? 'LAT: ~0° (ECLIPTIC)' : 'LAT: OFFSET FROM ECLIPTIC'}
        </div>
      </div>

      <svg
        viewBox="0 0 300 220"
        className="w-full h-full relative z-10 filter drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]"
      >
        <defs>
          <linearGradient id="eclipticGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
          </linearGradient>
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ecliptic Line (Golden path of the Sun) */}
        {showEcliptic && card.eclipticLine && (
          <g className="transition-all duration-700 ease-out">
            {/* Glowing aura for ecliptic */}
            <line
              x1={card.eclipticLine.x1}
              y1={card.eclipticLine.y1}
              x2={card.eclipticLine.x2}
              y2={card.eclipticLine.y2}
              stroke="rgba(251, 191, 36, 0.3)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Main dashed ecliptic line */}
            <line
              x1={card.eclipticLine.x1}
              y1={card.eclipticLine.y1}
              x2={card.eclipticLine.x2}
              y2={card.eclipticLine.y2}
              stroke="url(#eclipticGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
              className="animate-ecliptic"
            />
            {/* Moving Sun marker on ecliptic */}
            <g
              transform={`translate(${
                card.eclipticIntersection
                  ? (card.eclipticLine.x1 + card.eclipticLine.x2) / 2
                  : card.eclipticLine.x2 - 40
              }, ${
                card.eclipticIntersection
                  ? (card.eclipticLine.y1 + card.eclipticLine.y2) / 2
                  : card.eclipticLine.y2 - 2
              })`}
            >
              <circle r="6" fill="#fbbf24" filter="url(#starGlow)" />
              <circle r="10" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
              <text
                x="12"
                y="4"
                fill="#fde68a"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.05em"
              >
                ☀️ SUN’S PATH
              </text>
            </g>
          </g>
        )}

        {/* Constellation Connection Lines */}
        {card.connections.map((conn, idx) => {
          const s1 = card.stars[conn.from];
          const s2 = card.stars[conn.to];
          if (!s1 || !s2) return null;
          return (
            <line
              key={`conn-${idx}`}
              x1={s1.x}
              y1={s1.y}
              x2={s2.x}
              y2={s2.y}
              stroke="rgba(147, 197, 253, 0.45)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}

        {/* Stars */}
        {card.stars.map((star, idx) => (
          <g key={`star-${idx}`} className="group">
            {/* Star outer glow */}
            <circle
              cx={star.x}
              cy={star.y}
              r={(star.size || 4) * 1.8}
              fill="rgba(56, 189, 248, 0.15)"
            />
            {/* Star core */}
            <circle
              cx={star.x}
              cy={star.y}
              r={(star.size || 4) / 1.5}
              fill="#ffffff"
              filter="url(#starGlow)"
              className="transition-transform duration-300 group-hover:scale-125"
            />
            {/* Star Label */}
            {star.label && (
              <text
                x={star.x + 8}
                y={star.y + 3}
                fill="rgba(226, 232, 240, 0.65)"
                fontSize="8"
                fontFamily="sans-serif"
                className="select-none pointer-events-none font-medium"
              >
                {star.label}
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Ecliptic Status Badge in Corner when revealed */}
      {revealed && (
        <div className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-700/60 flex items-center gap-1.5 shadow-lg">
          <span
            className={`w-2 h-2 rounded-full ${
              card.eclipticIntersection ? 'bg-amber-400 animate-ping' : 'bg-slate-500'
            }`}
          />
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
            {card.eclipticIntersection ? 'Along Ecliptic' : 'Off Ecliptic'}
          </span>
        </div>
      )}
    </div>
  );
};
