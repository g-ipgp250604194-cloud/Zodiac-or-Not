export type GameStep = 
  | 'intro' 
  | 'game'
  | 'playing' 
  | 'twist_reveal'
  | 'ophiuchus_reveal' 
  | 'big_explanation' 
  | 'score';

export type ScreenMode = GameStep;

export interface StarPoint {
  x: number;
  y: number;
  name?: string;
  label?: string;
  magnitude?: number;
  size?: number;
}

export interface ConstellationConnection {
  from: number;
  to: number;
}

export interface Constellation {
  id: string;
  number: number;
  order: number;
  name: string;
  emoji: string;
  latinName: string;
  meaning: string;
  subtitle: string;
  isZodiac: boolean;
  astrologicalZodiac: boolean;
  astronomicalEcliptic: boolean;
  traditionalZodiacSign: boolean;
  isTwist?: boolean;
  explanation: string;
  extendedFact: string;
  funFact: string;
  teacherNote: string;
  teacherNotes: string;
  eclipticPassingDescription?: string;
  eclipticIntersection: boolean;
  eclipticIntersects: boolean;
  eclipticLine: { x1: number; y1: number; x2: number; y2: number };
  eclipticYStart: number;
  eclipticYEnd: number;
  stars: StarPoint[];
  lines: [number, number][];
  connections: ConstellationConnection[];
  traditionalDates?: string;
  sunDatesActual?: string;
  sunDates?: string;
}

export type ConstellationData = Constellation;

export type OphiuchusRevealPhase = 
  | 'question'
  | 'revealed_yes'
  | 'wait_mystery'
  | 'is_13th_question';

export interface ClassroomPoll {
  zodiac: number;
  notZodiac: number;
}

export type TeacherPollVote = ClassroomPoll;

export interface UserAnswer {
  cardId: string;
  userChoice: 'ZODIAC' | 'NOT_ZODIAC';
  isCorrect: boolean;
  timeSpentMs?: number;
}

export interface EclipticConstellationInfo {
  name: string;
  symbol: string;
  emoji: string;
  astronomySunDates: string;
  dates: string;
  traditionalZodiacDates: string;
  daysInSun: number;
  days: number;
  inTraditional12: boolean;
  astrologySign: boolean;
  isTwist?: boolean;
  highlight?: boolean;
}
