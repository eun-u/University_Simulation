import { PixelAvatar } from "./assets/pixelAssetMap";

export type EventType = "class" | "main" | "random" | "exam" | "ending";

export type StatKey = "grade" | "mental" | "stamina" | "money" | "social" | "professorAggro";

export type HiddenKey =
  | "attendance"
  | "assignment"
  | "teamContribution"
  | "teamStability"
  | "selfHolidayGauge"
  | "soloMealTolerance"
  | "caffeine"
  | "midtermScore"
  | "finalScore";

export type EffectTarget = StatKey | HiddenKey;

export interface Effect {
  target: EffectTarget;
  value: number;
}

export interface Outcome {
  weight: number;
  resultText: string;
  effects: Effect[];
  addTitle?: string;
  choiceBonus?: number;
  summary?: string;
}

export interface EventOption {
  id: string;
  label: string;
  description?: string;
  resultText?: string;
  effects?: Effect[];
  outcomes?: Outcome[];
  addTitle?: string;
  choiceBonus?: number;
  summary?: string;
}

export interface EventCondition {
  minWeek?: number;
  maxWeek?: number;
  minStats?: Partial<Record<StatKey, number>>;
  maxStats?: Partial<Record<StatKey, number>>;
  minHidden?: Partial<Record<HiddenKey, number>>;
  maxHidden?: Partial<Record<HiddenKey, number>>;
}

export interface GameEvent {
  id: string;
  type: EventType;
  title: string;
  week?: number;
  weekName?: string;
  allowedWeeks?: number[];
  time?: string;
  avatar?: PixelAvatar;
  assetKey?: string;
  intro: string[];
  options: EventOption[];
  condition?: EventCondition;
  weight?: number;
}

export interface HistoryEntry {
  week: number;
  eventTitle: string;
  optionLabel: string;
  resultText: string;
  effects: Effect[];
  summary: string;
}

export interface GameState {
  playerName: string;
  week: number;
  phase: "start" | "event" | "result" | "weekSummary" | "final";
  eventQueue: GameEvent[];
  currentEvent?: GameEvent;
  pendingResult?: HistoryEntry;
  history: HistoryEntry[];
  recentClassEventIds: string[];
  titles: string[];
  stats: Record<StatKey, number>;
  hidden: {
    attendance: number;
    assignment: number;
    teamContribution: number;
    teamStability: number;
    selfHolidayGauge: number;
    soloMealTolerance: number;
    caffeine: number;
    midtermScore: number | null;
    finalScore: number | null;
  };
}

export interface SubjectGrade {
  name: string;
  score: number;
  letter: string;
  gpa: number;
}

export interface FinalGradeResult {
  academicScore: number;
  subjects: SubjectGrade[];
  averageGpa: number;
  survivalGrade: string;
  survivalScore: number;
}

export interface Ending {
  title: string;
  text: string;
}
