import React, { useState, useEffect, useCallback } from 'react';
import { ScreenMode, UserAnswer, TeacherPollVote } from './types';
import { GAME_CARDS } from './data/constellations';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { TeacherToolbar } from './components/TeacherToolbar';
import { IntroScreen } from './components/IntroScreen';
import { CardGameScreen } from './components/CardGameScreen';
import { OphiuchusTwistScreen } from './components/OphiuchusTwistScreen';
import { BigExplanationScreen } from './components/BigExplanationScreen';
import { ScoreScreen } from './components/ScoreScreen';
import { soundFx } from './utils/audio';

export default function App() {
  const [screenMode, setScreenMode] = useState<ScreenMode>('intro');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswer>>({});
  const [score, setScore] = useState<number>(0);

  // Classroom teacher mode & sound settings
  const [teacherMode, setTeacherMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [pollVote, setPollVote] = useState<TeacherPollVote>({ zodiac: 0, notZodiac: 0 });

  const currentCard = GAME_CARDS[currentIndex];
  const totalCards = GAME_CARDS.length;

  // Handle student answering a card
  const handleAnswer = useCallback(
    (choice: 'ZODIAC' | 'NOT_ZODIAC') => {
      if (revealed || !currentCard) return;

      const isCorrect =
        (choice === 'ZODIAC' && currentCard.isZodiac) ||
        (choice === 'NOT_ZODIAC' && !currentCard.isZodiac);

      setUserAnswers((prev) => ({
        ...prev,
        [currentCard.id]: {
          cardId: currentCard.id,
          userChoice: choice,
          isCorrect,
        },
      }));

      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      setRevealed(true);
    },
    [revealed, currentCard]
  );

  // Go to next card or next phase
  const handleNext = useCallback(() => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
      setRevealed(false);
      setPollVote({ zodiac: 0, notZodiac: 0 });
    } else {
      // Completed all cards, advance to twist reveal
      setScreenMode('twist_reveal');
    }
  }, [currentIndex, totalCards]);

  // Restart game
  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setRevealed(false);
    setUserAnswers({});
    setScore(0);
    setPollVote({ zodiac: 0, notZodiac: 0 });
    setScreenMode('intro');
  }, []);

  // Jump to specific card from Teacher Mode
  const handleJumpToCard = (index: number) => {
    if (index >= 0 && index < totalCards) {
      setCurrentIndex(index);
      setRevealed(Boolean(userAnswers[GAME_CARDS[index].id]));
      setScreenMode('game');
      setPollVote({ zodiac: 0, notZodiac: 0 });
    }
  };

  // Force reveal current card (Teacher action)
  const handleRevealNow = () => {
    if (!revealed && currentCard) {
      setRevealed(true);
      if (!userAnswers[currentCard.id]) {
        setUserAnswers((prev) => ({
          ...prev,
          [currentCard.id]: {
            cardId: currentCard.id,
            userChoice: currentCard.isZodiac ? 'ZODIAC' : 'NOT_ZODIAC',
            isCorrect: true,
          },
        }));
        setScore((prev) => prev + 1);
      }
    }
  };

  // Update classroom poll vote
  const handleUpdateVote = (type: 'zodiac' | 'notZodiac', delta: number) => {
    setPollVote((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const handleResetVote = () => {
    setPollVote({ zodiac: 0, notZodiac: 0 });
  };

  const handleToggleMute = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  // Keyboard navigation for classroom teacher / presenter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setTeacherMode((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleMute();
      } else if (e.key === 'r' || e.key === 'R') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRestart();
        }
      } else if (screenMode === 'game') {
        if (!revealed) {
          if (e.key === '1' || e.key === 'z' || e.key === 'Z') {
            e.preventDefault();
            handleAnswer('ZODIAC');
            if (currentCard.isTwist) {
              setScreenMode('twist_reveal');
            }
          } else if (e.key === '2' || e.key === 'n' || e.key === 'N') {
            e.preventDefault();
            handleAnswer('NOT_ZODIAC');
            if (currentCard.isTwist) {
              setScreenMode('twist_reveal');
            }
          }
        } else {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (currentCard.isTwist) {
              setScreenMode('twist_reveal');
            } else {
              handleNext();
            }
          }
        }
      } else if (screenMode === 'intro') {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          setScreenMode('game');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screenMode, revealed, currentCard, handleAnswer, handleNext, handleRestart]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col relative selection:bg-amber-500 selection:text-black">
      {/* Animated Starry Space Canvas */}
      <StarfieldCanvas />

      {/* Teacher / Presenter Top Bar */}
      <TeacherToolbar
        teacherMode={teacherMode}
        onToggleTeacherMode={() => setTeacherMode((prev) => !prev)}
        currentCard={screenMode === 'game' ? currentCard : undefined}
        revealed={revealed}
        score={score}
        totalCards={totalCards}
        currentIndex={currentIndex}
        onJumpToCard={handleJumpToCard}
        onRevealNow={handleRevealNow}
        pollVote={pollVote}
        onUpdateVote={handleUpdateVote}
        onResetVote={handleResetVote}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onRestartGame={handleRestart}
      />

      {/* Main Dynamic Screen Views */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4">
        {screenMode === 'intro' && (
          <IntroScreen
            onStart={() => {
              setScreenMode('game');
            }}
          />
        )}

        {screenMode === 'game' && currentCard && (
          <CardGameScreen
            card={currentCard}
            cardIndex={currentIndex}
            totalCards={totalCards}
            score={score}
            revealed={revealed}
            userAnswer={userAnswers[currentCard.id]}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onOpenTwistReveal={() => setScreenMode('twist_reveal')}
          />
        )}

        {screenMode === 'twist_reveal' && (
          <OphiuchusTwistScreen
            onProceedToExplanation={() => setScreenMode('big_explanation')}
          />
        )}

        {screenMode === 'big_explanation' && (
          <BigExplanationScreen
            onComplete={() => setScreenMode('score')}
          />
        )}

        {screenMode === 'score' && (
          <ScoreScreen
            score={score}
            totalCards={totalCards}
            userAnswers={userAnswers}
            onPlayAgain={handleRestart}
            onReviewExplanation={() => setScreenMode('big_explanation')}
          />
        )}
      </main>
    </div>
  );
}
