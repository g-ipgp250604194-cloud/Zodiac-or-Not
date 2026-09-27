import React from 'react';
import { ConstellationData, TeacherPollVote } from '../types';
import { Volume2, VolumeX, Eye, HelpCircle, Users, ChevronRight, RotateCcw } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface TeacherToolbarProps {
  teacherMode: boolean;
  onToggleTeacherMode: () => void;
  currentCard?: ConstellationData;
  revealed: boolean;
  score: number;
  totalCards: number;
  currentIndex: number;
  onJumpToCard: (index: number) => void;
  onRevealNow: () => void;
  pollVote: TeacherPollVote;
  onUpdateVote: (type: 'zodiac' | 'notZodiac', delta: number) => void;
  onResetVote: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestartGame: () => void;
}

export const TeacherToolbar: React.FC<TeacherToolbarProps> = ({
  teacherMode,
  onToggleTeacherMode,
  currentCard,
  revealed,
  score,
  totalCards,
  currentIndex,
  onJumpToCard,
  onRevealNow,
  pollVote,
  onUpdateVote,
  onResetVote,
  isMuted,
  onToggleMute,
  onRestartGame,
}) => {
  return (
    <header className="relative z-30 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md px-4 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Title & Mode Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌌</span>
            <span className="font-display font-bold tracking-tight text-white text-base sm:text-lg">
              ZODIAC OR NOT?
            </span>
          </div>
          <span className="hidden sm:inline text-xs text-slate-500 font-mono">|</span>
          <span className="hidden sm:inline text-xs text-slate-400 font-medium">
            Classroom Astronomy Mini-Game
          </span>
        </div>

        {/* Center / Progress when in game */}
        {currentCard && (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-inner">
            <span className="text-slate-400">Card</span>
            <span className="font-bold text-amber-400 tabular-nums">
              {currentIndex + 1} / {totalCards}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Score</span>
            <span className="font-bold text-emerald-400 tabular-nums">{score}</span>
          </div>
        )}

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Mute Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              soundFx.playClick();
            }}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Quick Restart */}
          <button
            onClick={() => {
              soundFx.playClick();
              onRestartGame();
            }}
            title="Restart Game"
            aria-label="Restart Game"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Teacher Mode Toggle Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onToggleTeacherMode();
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-2 ${
              teacherMode
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            <span>👩‍🏫</span>
            <span className="font-semibold whitespace-nowrap">
              {teacherMode ? 'Teacher Mode: ON' : 'Teacher Mode'}
            </span>
          </button>
        </div>
      </div>

      {/* Expanded Teacher Panel (Visible only when Teacher Mode is ON) */}
      {teacherMode && currentCard && (
        <div className="mt-2.5 max-w-7xl mx-auto pt-2.5 border-t border-amber-500/20 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs animate-in fade-in duration-200">
          {/* Card Answer & Hint */}
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-amber-400 uppercase tracking-wider font-semibold">
                  Presenter Answer Key
                </span>
                <span
                  className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                    currentCard.isZodiac ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {currentCard.isZodiac ? '🟢 ZODIAC (Lies on Ecliptic)' : '🔴 NOT ZODIAC (Off Ecliptic)'}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {currentCard.teacherNotes || currentCard.explanation}
              </p>
            </div>
            {!revealed && (
              <button
                onClick={onRevealNow}
                className="mt-2 text-left text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Force reveal answer to class</span>
              </button>
            )}
          </div>

          {/* Classroom Hand-Raise Poll / Tally Tool */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                Classroom Hand-Raise Poll
              </span>
              {(pollVote.zodiac > 0 || pollVote.notZodiac > 0) && (
                <button
                  onClick={onResetVote}
                  className="text-slate-500 hover:text-slate-400 text-[10px]"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 my-1">
              <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-lg p-1.5 text-center">
                <div className="text-[10px] text-emerald-400 font-medium">Voted ZODIAC</div>
                <div className="text-lg font-mono font-bold text-emerald-200 tabular-nums">
                  {pollVote.zodiac}
                </div>
                <div className="flex justify-center gap-1 mt-1">
                  <button
                    onClick={() => onUpdateVote('zodiac', -1)}
                    className="w-5 h-5 rounded bg-emerald-900/60 text-emerald-200 text-xs flex items-center justify-center hover:bg-emerald-800"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onUpdateVote('zodiac', 1)}
                    className="w-5 h-5 rounded bg-emerald-700/80 text-white text-xs flex items-center justify-center hover:bg-emerald-600 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-rose-950/40 border border-rose-800/40 rounded-lg p-1.5 text-center">
                <div className="text-[10px] text-rose-400 font-medium">Voted NOT ZODIAC</div>
                <div className="text-lg font-mono font-bold text-rose-200 tabular-nums">
                  {pollVote.notZodiac}
                </div>
                <div className="flex justify-center gap-1 mt-1">
                  <button
                    onClick={() => onUpdateVote('notZodiac', -1)}
                    className="w-5 h-5 rounded bg-rose-900/60 text-rose-200 text-xs flex items-center justify-center hover:bg-rose-800"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onUpdateVote('notZodiac', 1)}
                    className="w-5 h-5 rounded bg-rose-700/80 text-white text-xs flex items-center justify-center hover:bg-rose-600 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 italic">
              Count hands before revealing for student engagement
            </div>
          </div>

          {/* Quick Jump Navigator */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between">
            <span className="font-mono text-slate-400 uppercase tracking-wider font-semibold mb-1">
              Jump To Constellation Card
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  onClick={() => onJumpToCard(num)}
                  className={`py-1 text-center rounded font-mono text-[11px] font-medium border transition-colors ${
                    currentIndex === num
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  #{num + 1} {num === 7 ? '🐍' : ''}
                </button>
              ))}
            </div>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-amber-400" />
              <span>Keyboard: [1] Zodiac, [2] Not Zodiac, [Space] Next</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
