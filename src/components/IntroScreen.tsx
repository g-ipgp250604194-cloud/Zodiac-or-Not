import React from 'react';
import { Play, Sparkles, Orbit, Compass, ChevronRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface IntroScreenProps {
  onStart: () => void;
  onOpenTeacherGuide?: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
      {/* Visual Badge / Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Interactive Classroom Astronomy Game</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-white mb-4 drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
        🎮 ZODIAC OR NOT?
      </h1>

      {/* Subtitle */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-200 mb-8 max-w-2xl font-display">
        Can you spot the Zodiac constellations?
      </h2>

      {/* Ecliptic Demonstration Graphic */}
      <div className="w-full max-w-2xl mb-8 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Night sky & Ecliptic visualization */}
        <div className="relative h-44 sm:h-52 w-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-950/80 border border-slate-800/60 p-4">
          {/* Subtle starry background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.15),transparent_70%)]" />

          {/* SVG celestial dome showing Ecliptic curve */}
          <svg viewBox="0 0 600 180" className="w-full h-full relative z-10">
            <defs>
              <linearGradient id="introEclipticGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
              </linearGradient>
              <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Celestial Equator (faint blue) */}
            <line
              x1="20"
              y1="90"
              x2="580"
              y2="90"
              stroke="rgba(148, 163, 184, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <text x="30" y="82" fill="rgba(148, 163, 184, 0.45)" fontSize="10" fontFamily="monospace">
              CELESTIAL EQUATOR (Earth's Equator Projected)
            </text>

            {/* The Ecliptic Sine Curve (23.4° tilt) */}
            <path
              d="M 20,135 Q 160,35 300,90 T 580,45"
              fill="none"
              stroke="url(#introEclipticGrad)"
              strokeWidth="3.5"
              strokeDasharray="8 6"
              className="animate-ecliptic"
            />

            {/* Glowing Sun traversing the Ecliptic */}
            <g transform="translate(300, 90)">
              <circle r="12" fill="#fbbf24" filter="url(#sunGlow)" />
              <circle r="6" fill="#ffffff" />
              <text x="18" y="5" fill="#fde68a" fontSize="12" fontWeight="bold" fontFamily="monospace">
                ☀️ THE SUN
              </text>
            </g>

            {/* Constellation Markers along and off the ecliptic */}
            <g transform="translate(130, 50)">
              <circle r="3" fill="#ffffff" />
              <circle r="2" fill="#ffffff" cx="15" cy="5" />
              <circle r="2" fill="#ffffff" cx="-10" cy="12" />
              <line x1="-10" y1="12" x2="0" y2="0" stroke="rgba(255,255,255,0.4)" />
              <line x1="0" y1="0" x2="15" y2="5" stroke="rgba(255,255,255,0.4)" />
              <text x="-20" y="-8" fill="#38bdf8" fontSize="10" fontWeight="bold">
                Constellation A (ON Ecliptic)
              </text>
            </g>

            <g transform="translate(460, 140)">
              <circle r="3" fill="#ffffff" />
              <circle r="2" fill="#ffffff" cx="18" cy="-8" />
              <circle r="2" fill="#ffffff" cx="-8" cy="-14" />
              <text x="-25" y="16" fill="#f87171" fontSize="10" fontWeight="bold">
                Constellation B (OFF Ecliptic)
              </text>
            </g>
          </svg>

          {/* Bottom label */}
          <div className="absolute bottom-2 text-center text-xs font-mono text-amber-300/80 bg-slate-950/70 px-3 py-0.5 rounded-full border border-amber-500/20">
            ☀️ The Golden Line = The Ecliptic
          </div>
        </div>

        {/* Educational Brief */}
        <div className="mt-5 space-y-2 text-slate-200 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-xl mx-auto">
          <p className="font-medium text-amber-200">
            The <strong className="text-amber-400 font-bold">ecliptic</strong> is the apparent path the Sun seems to follow across the sky during the year.
          </p>
          <p className="text-slate-300">
            Some constellations lie along this path.
          </p>
          <p className="text-lg sm:text-xl font-bold text-white pt-1">
            Can you spot them?
          </p>
        </div>
      </div>

      {/* Game Instructions Box */}
      <div className="w-full max-w-xl mb-8 p-4 sm:p-5 rounded-xl bg-slate-900/50 border border-slate-800 text-left text-xs sm:text-sm text-slate-300 backdrop-blur-sm">
        <h3 className="font-semibold text-slate-200 uppercase tracking-wider text-xs mb-3 font-mono flex items-center gap-1.5 text-amber-400">
          <Compass className="w-4 h-4" />
          How to Play in Class
        </h3>
        <p className="mb-2 text-slate-200">
          <strong>One constellation will appear at a time.</strong>
        </p>
        <p className="mb-3 text-slate-300">
          Decide whether it is:
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-semibold text-sm">
            <span className="text-lg">🟢</span>
            <span>ZODIAC</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 font-semibold text-sm">
            <span className="text-lg">🔴</span>
            <span>NOT ZODIAC</span>
          </div>
        </div>
        <p className="text-slate-400 text-xs">
          Students choose before the correct answer is revealed. Keep the game fast and interactive!
        </p>
      </div>

      {/* Start Button */}
      <button
        onClick={() => {
          soundFx.playClick();
          onStart();
        }}
        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-xl sm:text-2xl font-bold font-display text-white rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_45px_rgba(16,185,129,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
      >
        <Play className="w-6 h-6 fill-white transition-transform group-hover:scale-110" />
        <span>▶ START GAME</span>
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
      </button>

      {/* Footer shortcut reminder */}
      <div className="mt-8 text-xs text-slate-500 font-mono">
        Designed for Classroom Projectors & Whiteboards · Press [Space] or Click to Play
      </div>
    </div>
  );
};
