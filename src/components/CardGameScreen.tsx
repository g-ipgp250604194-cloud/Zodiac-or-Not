import React, { useState, useEffect } from 'react';
import { ConstellationData, UserAnswer } from '../types';
import { ConstellationDiagram } from './ConstellationDiagram';
import { soundFx } from '../utils/audio';
import { ArrowRight, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface CardGameScreenProps {
  card: ConstellationData;
  cardIndex: number;
  totalCards: number;
  score: number;
  revealed: boolean;
  userAnswer?: UserAnswer;
  onAnswer: (choice: 'ZODIAC' | 'NOT_ZODIAC') => void;
  onNext: () => void;
  onOpenTwistReveal: () => void;
}

export const CardGameScreen: React.FC<CardGameScreenProps> = ({
  card,
  cardIndex,
  totalCards,
  score,
  revealed,
  userAnswer,
  onAnswer,
  onNext,
  onOpenTwistReveal,
}) => {
  const [, setSelectedChoice] = useState<'ZODIAC' | 'NOT_ZODIAC' | null>(
    userAnswer ? userAnswer.userChoice : null
  );

  useEffect(() => {
    setSelectedChoice(userAnswer ? userAnswer.userChoice : null);
  }, [card.id, userAnswer]);

  const handleChoice = (choice: 'ZODIAC' | 'NOT_ZODIAC') => {
    if (revealed) return;
    setSelectedChoice(choice);

    if (card.isTwist) {
      soundFx.playDramaticReveal();
      onAnswer(choice);
      onOpenTwistReveal();
    } else {
      const isCorrect = (choice === 'ZODIAC' && card.isZodiac) || (choice === 'NOT_ZODIAC' && !card.isZodiac);
      if (isCorrect) {
        soundFx.playCorrect();
      } else {
        soundFx.playIncorrect();
      }
      onAnswer(choice);
    }
  };

  const isOphiuchus = card.id === 'ophiuchus';
  const isCorrect = userAnswer?.isCorrect;

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      {/* Top Card Progress Header */}
      <div className="w-full flex items-center justify-between text-xs sm:text-sm font-mono text-slate-400 mb-4 max-w-2xl px-2">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold text-base">CARD {cardIndex + 1}</span>
          <span className="text-slate-600">OF</span>
          <span className="text-slate-300 font-semibold">{totalCards}</span>
          {isOphiuchus && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/50 text-purple-300 text-[11px] font-bold animate-pulse">
              ⚡ MYSTERY CARD
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span>Score:</span>
          <span className="font-bold text-emerald-400 text-base tabular-nums">
            {score} / {totalCards}
          </span>
        </div>
      </div>

      {/* Main Presentation Stage */}
      <div className="w-full max-w-3xl bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.6)] flex flex-col items-center text-center transition-all duration-300">
        {/* Constellation Icon / Emoji */}
        <div className="text-6xl sm:text-7xl mb-3 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-bounce duration-1000">
          {card.emoji}
        </div>

        {/* Constellation Name (Classroom Display font) */}
        <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white mb-1 uppercase drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]">
          {card.name}
        </h1>

        {/* Latin name & Meaning */}
        <p className="text-base sm:text-lg text-slate-400 font-medium mb-6">
          <span className="italic">{card.latinName}</span> · {card.meaning}
        </p>

        {/* SVG Star Chart / Diagram */}
        <div className="w-full mb-6">
          <ConstellationDiagram card={card} revealed={revealed} />
        </div>

        {/* Big Classroom Question */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-sky-200 tracking-wide">
            ZODIAC OR NOT?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Does this constellation lie along the Sun's path (the ecliptic)?
          </p>
        </div>

        {/* Action Choice Buttons */}
        {!revealed ? (
          <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            {/* 🟢 ZODIAC Button */}
            <button
              onClick={() => handleChoice('ZODIAC')}
              className="group relative flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-display font-bold text-xl sm:text-2xl shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer border border-emerald-400/40"
            >
              <span className="text-2xl sm:text-3xl">🟢</span>
              <span className="tracking-wide">ZODIAC</span>
            </button>

            {/* 🔴 NOT ZODIAC Button */}
            <button
              onClick={() => handleChoice('NOT_ZODIAC')}
              className="group relative flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-display font-bold text-xl sm:text-2xl shadow-[0_0_25px_rgba(244,63,94,0.35)] hover:shadow-[0_0_40px_rgba(244,63,94,0.7)] transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer border border-rose-400/40"
            >
              <span className="text-2xl sm:text-3xl">🔴</span>
              <span className="tracking-wide">NOT ZODIAC</span>
            </button>
          </div>
        ) : (
          /* Answer Revealed Stage */
          <div className="w-full max-w-xl flex flex-col items-center animate-dramatic">
            {!isOphiuchus ? (
              <div className="w-full flex flex-col items-center">
                {/* Result header */}
                <div className="flex items-center gap-2 mb-3">
                  {isCorrect ? (
                    <div className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      <span>✅ CORRECT!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-rose-400 font-display">
                      <XCircle className="w-8 h-8 text-rose-400" />
                      <span>NOT QUITE!</span>
                    </div>
                  )}
                </div>

                {/* Correct answer indicator */}
                <div
                  className={`text-lg sm:text-xl font-bold px-4 py-1.5 rounded-full mb-4 border ${
                    card.isZodiac
                      ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                      : 'bg-rose-950/70 border-rose-500/50 text-rose-300'
                  }`}
                >
                  Correct Answer: {card.isZodiac ? '🟢 ZODIAC' : '🔴 NOT ZODIAC'}
                </div>

                {/* Clear, student-friendly explanation */}
                <div className="w-full p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                  {card.explanation}
                </div>

                {/* Next Card Button */}
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onNext();
                  }}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-xl font-bold font-display text-white rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(59,130,246,0.8)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>NEXT</span>
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1.5" />
                </button>
              </div>
            ) : (
              /* Special Ophiuchus Card - Directs into the dramatic sequence */
              <div className="w-full flex flex-col items-center">
                <div className="p-3 bg-purple-950/80 border border-purple-500/40 rounded-xl mb-4 text-purple-200 text-sm">
                  Answer recorded! Prepare for the astronomical reveal...
                </div>
                <button
                  onClick={() => {
                    soundFx.playDramaticReveal();
                    onOpenTwistReveal();
                  }}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-5 text-2xl font-black font-display text-white rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 shadow-[0_0_40px_rgba(168,85,247,0.7)] transition-all transform hover:scale-105 cursor-pointer animate-pulse"
                >
                  <Sparkles className="w-7 h-7 fill-white" />
                  <span>REVEAL THE TRUTH ABOUT OPHIUCHUS →</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
