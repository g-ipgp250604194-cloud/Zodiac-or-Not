import React, { useState } from 'react';
import { ECLIPTIC_13_CONSTELLATIONS } from '../data/constellations';
import { soundFx } from '../utils/audio';
import { Sparkles, Trophy, Check, X, ArrowRight, Compass } from 'lucide-react';

interface BigExplanationScreenProps {
  onProceedToScore?: () => void;
  onComplete?: () => void;
}

export const BigExplanationScreen: React.FC<BigExplanationScreenProps> = ({
  onProceedToScore,
  onComplete,
}) => {
  const [selectedConstellation, setSelectedConstellation] = useState<number>(11); // Ophiuchus index

  const handleSelect = (idx: number) => {
    soundFx.playClick();
    setSelectedConstellation(idx);
  };

  const handleFinish = () => {
    soundFx.playFanfare();
    if (onProceedToScore) {
      onProceedToScore();
    } else if (onComplete) {
      onComplete();
    }
  };

  const currentSelection = ECLIPTIC_13_CONSTELLATIONS[selectedConstellation] || ECLIPTIC_13_CONSTELLATIONS[11];

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white mb-3 text-center drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
        🌌 ASTRONOMY vs ♈ ASTROLOGY
      </h1>
      <p className="text-slate-400 font-mono text-sm sm:text-base uppercase tracking-wider mb-8 text-center">
        The Science of Constellations vs Traditional Zodiac Signs
      </p>

      {/* Side-by-side Main Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
        {/* 🌌 Astronomy Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border-2 border-sky-500/40 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🌌</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-sky-300 font-display">
                ASTRONOMY
              </h2>
            </div>

            <div className="space-y-4 text-slate-200 text-lg sm:text-xl leading-relaxed">
              <p>
                In astronomy, we look at the <strong className="text-sky-300 font-bold">actual constellations</strong> in the sky.
              </p>
              <p>
                The Sun's apparent path along the ecliptic passes through <strong className="text-amber-300 underline decoration-sky-400 font-bold">13 modern constellations</strong>.
              </p>
              <div className="p-4 bg-sky-950/70 border border-sky-500/40 rounded-2xl text-sky-200 font-semibold flex items-center gap-3 text-lg">
                <span className="text-3xl">🐍</span>
                <span>Ophiuchus is one of them.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-400 font-mono">
            Scientific discipline: Based on real physical boundaries fixed by the International Astronomical Union (IAU).
          </div>
        </div>

        {/* ♈ Astrology Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border-2 border-purple-500/40 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">♈</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-300 font-display">
                ASTROLOGY
              </h2>
            </div>

            <div className="space-y-4 text-slate-200 text-lg sm:text-xl leading-relaxed">
              <p>
                In traditional astrology, the zodiac is divided into <strong className="text-purple-300 font-bold">12 signs</strong>.
              </p>
              <p>
                These are the familiar 12 zodiac signs created thousands of years ago to align with a 12-month calendar.
              </p>
              <div className="p-4 bg-purple-950/70 border border-purple-500/40 rounded-2xl text-purple-200 font-semibold flex items-center gap-3 text-lg">
                <span className="text-2xl">🚫</span>
                <span>Ophiuchus is not one of the traditional 12 zodiac signs.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-400 font-mono">
            Belief system: Divides the sky into 12 equal 30-degree segments, ignoring constellation boundary sizes.
          </div>
        </div>
      </div>

      {/* MAKE THE DIFFERENCE VERY CLEAR (Side-by-side contrast boxes) */}
      <div className="w-full max-w-4xl p-6 sm:p-8 rounded-3xl bg-slate-950/85 border border-slate-800 shadow-2xl mb-10">
        <h3 className="text-center text-xl sm:text-2xl font-bold text-amber-300 mb-6 font-display flex items-center justify-center gap-2">
          <span>💡</span> MAKE THE DIFFERENCE VERY CLEAR
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Astronomy Column */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-sky-950/40 border border-sky-500/40">
            <h4 className="text-2xl font-bold text-sky-300 mb-1 flex items-center gap-2">
              <span>🌌</span> ASTRONOMY
            </h4>
            <p className="text-slate-200 font-semibold text-lg mb-3">
              13 constellations along the ecliptic
            </p>
            <div className="text-2xl text-sky-400 my-1">⬇️</div>
            <div className="mt-2 py-3 px-6 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 font-bold text-xl flex items-center gap-2">
              <Check className="w-6 h-6 text-emerald-400" />
              <span>Includes: 🐍 Ophiuchus</span>
            </div>
          </div>

          {/* Astrology Column */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-purple-950/40 border border-purple-500/40">
            <h4 className="text-2xl font-bold text-purple-300 mb-1 flex items-center gap-2">
              <span>♈</span> ASTROLOGY
            </h4>
            <p className="text-slate-200 font-semibold text-lg mb-3">
              12 traditional zodiac signs
            </p>
            <div className="text-2xl text-purple-400 my-1">⬇️</div>
            <div className="mt-2 py-3 px-6 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-300 font-bold text-xl flex items-center gap-2">
              <X className="w-6 h-6 text-rose-400" />
              <span>Does NOT include: 🐍 Ophiuchus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Ribbon of All 13 Ecliptic Constellations */}
      <div className="w-full max-w-4xl p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <h4 className="text-base sm:text-lg font-bold text-white font-display">
              All 13 Constellations Crosscut by the Ecliptic (IAU)
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Click any constellation below:
          </span>
        </div>

        {/* 13 items grid */}
        <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-13 gap-1.5 mb-4">
          {ECLIPTIC_13_CONSTELLATIONS.map((c, idx) => {
            const isSelected = selectedConstellation === idx;
            const isTwist = !c.inTraditional12;

            return (
              <button
                key={c.name}
                onClick={() => handleSelect(idx)}
                className={`p-2 rounded-xl flex flex-col items-center text-center transition-all cursor-pointer ${
                  isSelected
                    ? isTwist
                      ? 'bg-amber-400 text-slate-950 font-bold ring-2 ring-amber-300 scale-105'
                      : 'bg-sky-400 text-slate-950 font-bold ring-2 ring-sky-300 scale-105'
                    : isTwist
                    ? 'bg-amber-950/60 border border-amber-500/70 text-amber-300 hover:bg-amber-900/60'
                    : 'bg-slate-950/60 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-2xl">{c.symbol}</span>
                <span className="text-[11px] truncate w-full mt-1">{c.name}</span>
                <span className="text-[10px] opacity-75 font-mono">{c.daysInSun}d</span>
              </button>
            );
          })}
        </div>

        {/* Selected info card */}
        {currentSelection && (
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            !currentSelection.inTraditional12 ? 'bg-amber-950/30 border-amber-500/50' : 'bg-slate-950/70 border-slate-800'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{currentSelection.symbol}</span>
              <div>
                <h5 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{currentSelection.name}</span>
                  {!currentSelection.inTraditional12 && (
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-xs font-black">
                      THE 13TH CONSTELLATION
                    </span>
                  )}
                </h5>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  Actual Sun Passage: <strong className="text-amber-300">{currentSelection.astronomySunDates}</strong> ({currentSelection.daysInSun} days)
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-right sm:border-l sm:border-slate-800 sm:pl-4">
              <div className="text-slate-400">Astrology Sign:</div>
              <div className={`font-bold ${currentSelection.inTraditional12 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {currentSelection.inTraditional12 ? 'Traditional 12 Sign' : 'OMITTED in Astrology'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FINAL REVEAL (Hero Banner) */}
      <div className="w-full max-w-4xl p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/60 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2 font-display">
          IS OPHIUCHUS THE 13TH ZODIAC?
        </h2>

        <div className="my-6">
          <span className="text-4xl sm:text-6xl md:text-7xl font-black text-amber-300 font-display drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]">
            YES… AND NO. 👀
          </span>
        </div>

        <div className="max-w-2xl mx-auto space-y-3 text-lg sm:text-xl text-slate-200 leading-relaxed mb-8">
          <p>
            <strong className="text-emerald-400 font-bold">Yes</strong> — Ophiuchus is a constellation that lies along the ecliptic.
          </p>
          <p>
            <strong className="text-rose-400 font-bold">No</strong> — it is not one of the traditional 12 zodiac signs used in astrology.
          </p>
        </div>

        {/* ⭐ REMEMBER: Box */}
        <div className="bg-slate-950/80 border border-amber-500/40 rounded-2xl p-6 max-w-xl mx-auto mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-amber-300 mb-3 flex items-center justify-center gap-2 font-display">
            <Sparkles className="w-5 h-5 text-amber-400" />
            ⭐ REMEMBER:
          </h3>
          <div className="space-y-2 text-base sm:text-lg text-slate-100 font-medium">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sky-300 font-bold">Astronomy</span> ➔ <strong>13 constellations along the ecliptic</strong>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-purple-300 font-bold">Traditional Astrology</span> ➔ <strong>12 zodiac signs</strong>
            </div>
          </div>
        </div>

        <p className="text-lg sm:text-xl font-semibold text-amber-200 italic">
          🐍 Ophiuchus is the constellation that makes the “12 Zodiac” story interesting!
        </p>
      </div>

      {/* Button to Score */}
      <button
        onClick={handleFinish}
        className="group flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-slate-950 font-black text-2xl shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:shadow-[0_0_55px_rgba(16,185,129,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer font-display"
      >
        <Trophy className="w-7 h-7 text-slate-950 group-hover:rotate-12 transition-transform" />
        <span>SEE YOUR FINAL SCORE</span>
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
};
