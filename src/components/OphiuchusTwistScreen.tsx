import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ConstellationDiagram } from './ConstellationDiagram';
import { GAME_CARDS } from '../data/constellations';

interface OphiuchusTwistScreenProps {
  onProceedToExplanation: () => void;
}

export const OphiuchusTwistScreen: React.FC<OphiuchusTwistScreenProps> = ({
  onProceedToExplanation,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const ophiuchusData = GAME_CARDS.find((c) => c.id === 'ophiuchus')!;

  const handleNextStep = () => {
    soundFx.playClick();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else {
      onProceedToExplanation();
    }
  };

  return (
    <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center">
      {/* Cosmic glow background effect */}
      <div className="absolute inset-0 bg-radial from-purple-600/20 via-slate-950/80 to-slate-950 pointer-events-none -z-10" />

      {/* STEP 1: Dramatic "👀 YES…!" */}
      {step === 1 && (
        <div className="flex flex-col items-center animate-dramatic space-y-6">
          <div className="text-8xl sm:text-9xl mb-2 animate-bounce">👀</div>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-[0_0_50px_rgba(52,211,153,0.8)] tracking-tight">
            YES…!
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-lg font-medium">
            Brace yourselves... You are about to uncover one of astronomy’s greatest secrets!
          </p>
          <button
            onClick={handleNextStep}
            className="mt-6 px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-display font-bold text-2xl shadow-[0_0_35px_rgba(16,185,129,0.6)] hover:shadow-[0_0_50px_rgba(16,185,129,0.9)] transition-all transform hover:scale-105 cursor-pointer"
          >
            SEE WHAT HAPPENS NEXT →
          </button>
        </div>
      )}

      {/* STEP 2: "🐍 OPHIUCHUS IS ALONG THE ECLIPTIC!" */}
      {step === 2 && (
        <div className="flex flex-col items-center animate-dramatic space-y-6 max-w-2xl">
          <div className="text-7xl sm:text-8xl mb-1 filter drop-shadow-[0_0_30px_rgba(34,197,94,0.6)]">
            🐍
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display text-emerald-400 drop-shadow-[0_0_40px_rgba(52,211,153,0.7)] uppercase tracking-tight leading-tight">
            OPHIUCHUS IS ALONG THE ECLIPTIC!
          </h1>

          <div className="w-full my-2">
            <ConstellationDiagram card={ophiuchusData} revealed={true} highlightEcliptic={true} />
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-lg sm:text-xl font-medium leading-relaxed">
            The Sun’s apparent yearly path crosses straight through Ophiuchus for <strong>18 whole days</strong> (Nov 29 – Dec 17)!
          </div>

          <button
            onClick={handleNextStep}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-display font-bold text-2xl shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:shadow-[0_0_50px_rgba(6,182,212,0.9)] transition-all transform hover:scale-105 cursor-pointer"
          >
            WAIT A MINUTE... →
          </button>
        </div>
      )}

      {/* STEP 3: "🚨 WAIT… We said there were 12 Zodiac constellations. So why is Ophiuchus here?" */}
      {step === 3 && (
        <div className="flex flex-col items-center animate-dramatic space-y-6 max-w-2xl">
          <div className="text-7xl sm:text-8xl mb-1 animate-pulse">🚨</div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-display text-amber-400 drop-shadow-[0_0_45px_rgba(245,158,11,0.7)] tracking-tight">
            WAIT…
          </h1>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-amber-500/40 shadow-2xl text-slate-100 text-xl sm:text-2xl leading-relaxed space-y-3 font-semibold">
            <p className="text-amber-200">
              We said there were <strong>12 Zodiac constellations</strong>.
            </p>
            <p className="text-2xl sm:text-3xl text-white font-extrabold font-display">
              So why is Ophiuchus here?
            </p>
          </div>

          <button
            onClick={handleNextStep}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-display font-extrabold text-2xl shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:shadow-[0_0_50px_rgba(245,158,11,0.9)] transition-all transform hover:scale-105 cursor-pointer"
          >
            ASK THE BIG QUESTION →
          </button>
        </div>
      )}

      {/* STEP 4: "🤔 IS THERE ACTUALLY A 13TH ZODIAC?" */}
      {step === 4 && (
        <div className="flex flex-col items-center animate-dramatic space-y-8 max-w-3xl">
          <div className="text-8xl sm:text-9xl mb-1">🤔</div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-300 drop-shadow-[0_0_50px_rgba(236,72,153,0.6)] tracking-tight leading-tight">
            IS THERE ACTUALLY A 13TH ZODIAC?
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-xl">
            Let’s solve this cosmic mystery once and for all by comparing <strong>Astronomy</strong> vs <strong>Astrology</strong>!
          </p>

          <button
            onClick={() => {
              soundFx.playDramaticReveal();
              onProceedToExplanation();
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-2xl sm:text-3xl font-black font-display text-white rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 shadow-[0_0_40px_rgba(168,85,247,0.7)] transition-all transform hover:scale-105 cursor-pointer animate-pulse"
          >
            <Sparkles className="w-8 h-8 fill-white" />
            <span>UNVEIL THE BIG EXPLANATION</span>
            <ArrowRight className="w-8 h-8 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      )}
    </div>
  );
};
