import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GAME_CARDS } from '../data/constellations';
import { UserAnswer } from '../types';
import { soundFx } from '../utils/audio';
import { RotateCcw, Trophy, CheckCircle2, XCircle, Sparkles, BookOpen } from 'lucide-react';

interface ScoreScreenProps {
  score: number;
  totalCards: number;
  userAnswers: Record<string, UserAnswer>;
  onPlayAgain: () => void;
  onReviewExplanation: () => void;
}

export const ScoreScreen: React.FC<ScoreScreenProps> = ({
  score,
  totalCards,
  userAnswers,
  onPlayAgain,
  onReviewExplanation,
}) => {
  useEffect(() => {
    if (score >= 6) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#fbbf24', '#34d399', '#f43f5e', '#a855f7'],
        });
      } catch {
        // Fallback
      }
    }
  }, [score]);

  // Determine message based on score
  let messageTitle = '';
  let messageSubtitle = '';
  let badgeColor = '';

  if (score === 8) {
    messageTitle = '🌟 AMAZING!';
    messageSubtitle = 'You know your constellations!';
    badgeColor = 'from-amber-400 to-yellow-500 text-slate-950';
  } else if (score >= 6) {
    messageTitle = '🚀 GREAT JOB!';
    messageSubtitle = 'Almost perfect!';
    badgeColor = 'from-emerald-400 to-teal-500 text-slate-950';
  } else if (score >= 4) {
    messageTitle = '🔭 NICE TRY!';
    messageSubtitle = 'Now you know more about the ecliptic!';
    badgeColor = 'from-blue-400 to-cyan-500 text-slate-950';
  } else {
    messageTitle = '🌌 KEEP EXPLORING!';
    messageSubtitle = 'The night sky has many surprises!';
    badgeColor = 'from-purple-400 to-pink-500 text-white';
  }

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center animate-dramatic">
      {/* Trophy Badge */}
      <div className="text-7xl sm:text-8xl mb-4 animate-bounce">
        🎉
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white mb-2 drop-shadow-[0_0_40px_rgba(251,191,36,0.5)]">
        GAME COMPLETE!
      </h1>

      {/* Score Badge */}
      <div className="my-6 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col items-center max-w-md w-full">
        <span className="text-sm sm:text-base font-mono uppercase tracking-widest text-slate-400 mb-2">
          Your Score:
        </span>
        <div className="text-6xl sm:text-7xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200 tabular-nums">
          {score} / {totalCards}
        </div>

        {/* Dynamic Classroom Message */}
        <div className="mt-4 pt-4 border-t border-slate-800 text-center">
          <div className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-1">
            {messageTitle}
          </div>
          <div className="text-base sm:text-lg text-slate-300 font-medium">
            {messageSubtitle}
          </div>
        </div>
      </div>

      {/* Constellation Breakdown Summary Grid */}
      <div className="w-full max-w-2xl bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 mb-8 backdrop-blur-sm text-left">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Constellation Card Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {GAME_CARDS.map((card) => {
            const ans = userAnswers[card.id];
            const wasCorrect = ans?.isCorrect;
            return (
              <div
                key={card.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{card.emoji}</span>
                  <div>
                    <span className="font-bold text-white block text-xs sm:text-sm">{card.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {card.isZodiac ? 'Along Ecliptic' : 'Off Ecliptic'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {ans ? (
                    wasCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Correct</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-400 text-xs font-semibold">
                        <XCircle className="w-4 h-4" />
                        <span>Review</span>
                      </span>
                    )
                  ) : (
                    <span className="text-xs text-slate-500 font-mono">—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Play Again Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onPlayAgain();
          }}
          className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-xl sm:text-2xl font-bold font-display text-white rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_45px_rgba(16,185,129,0.8)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <RotateCcw className="w-6 h-6 transition-transform group-hover:-rotate-90" />
          <span>🔄 PLAY AGAIN</span>
        </button>

        {/* Review Explanation Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onReviewExplanation();
          }}
          className="inline-flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold font-display text-slate-200 rounded-2xl bg-slate-900 border border-slate-700 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-purple-400" />
          <span>Review Astronomy vs Astrology</span>
        </button>
      </div>
    </div>
  );
};
