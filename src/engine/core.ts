import { classEvents } from "../data/classEvents";
import { mainEvents } from "../data/mainEvents";
import { randomEvents } from "../data/randomEvents";
import { Effect, Ending, EventCondition, FinalGradeResult, GameEvent, GameState, Outcome } from "../types";

const ENDING_RULES = {
  mentalCollapse: 10,
  attendanceLostGauge: 25,
  attendanceLostScore: 5,
  semesterCollapse: 45,
  academicHigh: 85,
  zombieMental: 30,
  balancedMental: 50,
  balancedStamina: 50,
  teamSlaveContribution: 70,
  teamSlaveMental: 45,
  professorRadarAggro: 30,
  professorRadarGrade: 70,
  selfHolidayMasterGauge: 35,
  socialEndingScore: 80,
  socialEndingMental: 35,
  soloMealTolerance: 15,
  soloMealSocial: 45,
  soloMealMental: 35,
  examSurvivorScore: 75,
  examSurvivorStamina: 35,
  assignmentHumanScore: 25,
  assignmentHumanMental: 50,
} as const;

export const initialGameState: GameState = {
  playerName: "익명의 대학생",
  department: "미정학과",
  week: 1,
  phase: "start",
  eventQueue: [],
  history: [],
  recentClassEventIds: [],
  scheduledRandomEvents: [],
  titles: [],
  stats: {
    grade: 50,
    mental: 70,
    stamina: 70,
    money: 60000,
    social: 35,
    professorAggro: 10,
  },
  hidden: {
    attendance: 0,
    assignment: 0,
    teamContribution: 20,
    teamStability: 50,
    selfHolidayGauge: 0,
    soloMealTolerance: 0,
    midtermScore: null,
    finalScore: null,
  },
};

export function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function pickOutcome(outcomes: Outcome[]) {
  const total = outcomes.reduce((sum, outcome) => sum + outcome.weight, 0);
  let roll = Math.random() * total;
  for (const outcome of outcomes) {
    roll -= outcome.weight;
    if (roll <= 0) return outcome;
  }
  return outcomes[outcomes.length - 1];
}

export function applyEffects(state: GameState, effects: Effect[]) {
  const next = structuredClone(state) as GameState;
  for (const effect of effects) {
    if (effect.target in next.stats) {
      next.stats[effect.target as keyof typeof next.stats] += effect.value;
      continue;
    }

    const key = effect.target as keyof typeof next.hidden;
    const current = next.hidden[key] ?? 0;
    next.hidden[key] = (current + effect.value) as never;
  }

  for (const key of ["grade", "mental", "stamina", "social", "professorAggro"] as const) {
    next.stats[key] = clamp(next.stats[key]);
  }

  for (const key of ["attendance", "assignment", "teamContribution", "teamStability", "selfHolidayGauge", "soloMealTolerance"] as const) {
    next.hidden[key] = clamp(next.hidden[key]);
  }

  return next;
}

export function calculateMidtermScore(state: GameState, choiceBonus: number) {
  const burnoutPenalty = (state.stats.mental <= 20 ? 10 : 0) + (state.stats.stamina <= 20 ? 8 : 0);
  return Math.round(
    clamp(
      state.stats.grade * 0.65 +
        state.hidden.attendance * 0.15 +
        state.hidden.assignment * 0.1 +
        choiceBonus +
        randomRange(-8, 8) -
        burnoutPenalty,
    ),
  );
}

export function calculateFinalScore(state: GameState, choiceBonus: number) {
  const burnoutPenalty = (state.stats.mental <= 20 ? 10 : 0) + (state.stats.stamina <= 20 ? 8 : 0);
  return Math.round(
    clamp(
      state.stats.grade * 0.6 +
        state.hidden.attendance * 0.1 +
        state.hidden.assignment * 0.1 +
        choiceBonus +
        randomRange(-8, 8) -
        burnoutPenalty,
    ),
  );
}

export function pickClassEvent(state: GameState) {
  if ([7, 14, 16].includes(state.week)) return null;
  const candidates = classEvents.filter((event) => !state.recentClassEventIds.includes(event.id));
  const pool = candidates.length > 0 ? candidates : classEvents;
  return weightedPick(pool.map((event) => ({ item: event, weight: getClassWeight(event, state) })));
}

export function pickRandomLifeEvent(state: GameState) {
  if ([7, 14, 16].includes(state.week)) return null;
  if (Math.random() < 0.25) return null;

  const pool = randomEvents.filter((event) => matchesCondition(event.condition, state));
  if (pool.length === 0) return null;

  return weightedPick(pool.map((event) => ({ item: event, weight: getRandomWeight(event, state) })));
}

export function createRandomEventSchedule() {
  const randomWeeks = shuffle([2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15]).slice(0, 2).sort((a, b) => a - b);
  const usedEventIds = new Set<string>();

  return randomWeeks.map((week) => {
    const candidates = randomEvents.filter((event) => isScheduleCompatible(event, week) && !usedEventIds.has(event.id));
    const event = candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : randomEvents[0];
    usedEventIds.add(event.id);
    return { week, eventId: event.id };
  });
}

export function scheduledRandomEventForWeek(state: GameState) {
  const scheduled = state.scheduledRandomEvents.find((event) => event.week === state.week);
  if (!scheduled) return null;

  const event = randomEvents.find((candidate) => candidate.id === scheduled.eventId);
  if (event && matchesCondition(event.condition, state)) return event;

  const fallback = randomEvents.find((candidate) => isScheduleCompatible(candidate, state.week) && matchesCondition(candidate.condition, state));
  return fallback ?? null;
}

export function mainByWeek(week: number) {
  const event = mainEvents.find((candidate) => candidate.week === week);
  if (!event) throw new Error(`Missing main event for week ${week}`);
  return event;
}

export function calculateFinalGrades(state: GameState): FinalGradeResult {
  const midtermScore = state.hidden.midtermScore ?? 50;
  const finalScore = state.hidden.finalScore ?? 50;
  const academicScore = clamp(
    state.stats.grade * 0.45 +
      midtermScore * 0.18 +
      finalScore * 0.18 +
      state.hidden.assignment * 0.08 +
      state.hidden.attendance * 0.06 +
      state.hidden.teamContribution * 0.05,
  );
  const moneyScore = normalizeMoney(state.stats.money);
  const survivalScore = clamp(
    academicScore * 0.3 +
      state.stats.mental * 0.22 +
      state.stats.stamina * 0.18 +
      state.stats.social * 0.14 +
      moneyScore * 0.1 +
      state.hidden.attendance * 0.03 +
      state.hidden.assignment * 0.03 -
      state.stats.professorAggro * 0.06,
  );

  return {
    academicScore: Number(academicScore.toFixed(1)),
    survivalScore: Number(survivalScore.toFixed(1)),
  };
}

export function determineEnding(state: GameState, finalGradeResult: FinalGradeResult): Ending {
  const endings: Array<{ condition: boolean; ending: Ending }> = [
    {
      condition: state.stats.mental <= ENDING_RULES.mentalCollapse,
      ending: {
        title: "휴학 고민 엔딩",
        tone: "danger",
        text: "점수보다 중요한 것이 있다는 걸 깨달았다.\n당신은 포털보다 휴학 신청 페이지를 더 오래 바라보았다.",
      },
    },
    {
      condition: state.stats.money <= 0,
      ending: {
        title: "잔고 실종 엔딩",
        tone: "danger",
        text: "학기는 끝났다.\n잔고도 끝났다.\n지갑은 가장 조용한 보스였다.",
      },
    },
    {
      condition: state.hidden.selfHolidayGauge >= ENDING_RULES.attendanceLostGauge && state.hidden.attendance <= ENDING_RULES.attendanceLostScore,
      ending: {
        title: "출석부 실종 엔딩",
        tone: "danger",
        text: "수업은 있었고, 당신은 자주 없었다.\n출석부는 생각보다 기억력이 좋았다.",
      },
    },
    {
      condition: finalGradeResult.survivalScore < ENDING_RULES.semesterCollapse,
      ending: {
        title: "학기 붕괴 엔딩",
        tone: "danger",
        text: "학기는 끝났지만 상태창은 조용하지 않았다.\n다음 학기에는 튜토리얼부터 다시 봐야 할지도 모른다.",
      },
    },
    {
      condition: finalGradeResult.academicScore >= ENDING_RULES.academicHigh && state.stats.mental <= ENDING_RULES.zombieMental,
      ending: {
        title: "좀비 우등생 엔딩",
        tone: "academic",
        text: "학업 스탯은 살아남았다.\n당신은 잘 모르겠다.",
      },
    },
    {
      condition:
        finalGradeResult.academicScore >= ENDING_RULES.academicHigh &&
        state.stats.mental > ENDING_RULES.balancedMental &&
        state.stats.stamina > ENDING_RULES.balancedStamina,
      ending: {
        title: "균형 생존 엔딩",
        tone: "survival",
        text: "당신은 공부도 하고 잠도 잤다.\n이론상 드문 일이지만, 아무튼 성공했다.",
      },
    },
    {
      condition: state.hidden.teamContribution >= ENDING_RULES.teamSlaveContribution && state.stats.mental <= ENDING_RULES.teamSlaveMental,
      ending: {
        title: "팀플 노예 엔딩",
        tone: "danger",
        text: "팀플은 끝났다.\n하지만 당신은 아직도 PPT 애니메이션을 수정하고 있는 기분이다.",
      },
    },
    {
      condition: state.stats.professorAggro >= ENDING_RULES.professorRadarAggro && state.stats.grade < ENDING_RULES.professorRadarGrade,
      ending: {
        title: "교수님 레이더 엔딩",
        tone: "danger",
        text: "교수님의 시선이 너무 오래 머물렀다.\n당신은 이제 질문이 아니라 사건에 가깝다.",
      },
    },
    {
      condition: state.hidden.selfHolidayGauge >= ENDING_RULES.selfHolidayMasterGauge && finalGradeResult.survivalScore >= ENDING_RULES.semesterCollapse,
      ending: {
        title: "자휴 마스터 엔딩",
        tone: "rare",
        text: "당신은 수많은 수업을 보내주었다.\n그런데도 어떻게든 살아남았다.\n시스템도 약간 당황했다.",
      },
    },
    {
      condition: state.stats.social >= ENDING_RULES.socialEndingScore && state.stats.mental >= ENDING_RULES.socialEndingMental,
      ending: {
        title: "인싸 생존 엔딩",
        tone: "rare",
        text: "학업이 완벽하지는 않았지만,\n당신의 연락처 목록은 풍성해졌다.\n이것도 대학생활이다.",
      },
    },
    {
      condition:
        state.hidden.soloMealTolerance >= ENDING_RULES.soloMealTolerance &&
        state.stats.social <= ENDING_RULES.soloMealSocial &&
        state.stats.mental >= ENDING_RULES.soloMealMental,
      ending: {
        title: "혼밥 고수 엔딩",
        tone: "rare",
        text: "당신은 혼자 밥을 먹는 법을 배웠다.\n그리고 생각보다 괜찮았다.",
      },
    },
    {
      condition:
        (state.hidden.midtermScore ?? 0) >= ENDING_RULES.examSurvivorScore &&
        (state.hidden.finalScore ?? 0) >= ENDING_RULES.examSurvivorScore &&
        state.stats.stamina <= ENDING_RULES.examSurvivorStamina,
      ending: {
        title: "벼락치기 생존 엔딩",
        tone: "survival",
        text: "시험 점수는 어떻게든 건졌다.\n몸은 아직 도서관 의자에 남아 있는 것 같다.",
      },
    },
    {
      condition: state.hidden.assignment >= ENDING_RULES.assignmentHumanScore && state.stats.mental <= ENDING_RULES.assignmentHumanMental,
      ending: {
        title: "과제형 인간 엔딩",
        tone: "academic",
        text: "마감은 전부 지나갔다.\n당신은 아직 파일명을 final_real_last로 저장하고 있다.",
      },
    },
  ];

  return (
    endings.find(({ condition }) => condition)?.ending ?? {
      title: "평범한 대학생 엔딩",
      tone: "normal",
      text: "엄청나게 성공하지도,\n완전히 망하지도 않았다.\n그래서 더 현실적이었다.",
    }
  );
}

export function addDerivedTitles(state: GameState, finalGradeResult: FinalGradeResult) {
  const next = structuredClone(state) as GameState;
  const add = (title: string) => {
    if (!next.titles.includes(title)) next.titles.push(title);
  };

  if (next.hidden.attendance >= 90 && next.stats.mental <= 30) add("출석만은 지킨 껍데기");
  if (finalGradeResult.survivalScore >= 55 && finalGradeResult.survivalScore <= 62) add("커트라인 생존자");
  if (finalGradeResult.academicScore >= 85 && next.stats.mental <= 25) add("우수하지만 행복하지 않은 자");
  return next;
}

function matchesCondition(condition: EventCondition | undefined, state: GameState) {
  if (!condition) return true;
  if (condition.minWeek !== undefined && state.week < condition.minWeek) return false;
  if (condition.maxWeek !== undefined && state.week > condition.maxWeek) return false;
  if (condition.minStats && !Object.entries(condition.minStats).every(([key, value]) => state.stats[key as keyof typeof state.stats] >= value)) return false;
  if (condition.maxStats && !Object.entries(condition.maxStats).every(([key, value]) => state.stats[key as keyof typeof state.stats] <= value)) return false;
  if (condition.minHidden && !Object.entries(condition.minHidden).every(([key, value]) => (state.hidden[key as keyof typeof state.hidden] ?? 0) >= value)) return false;
  if (condition.maxHidden && !Object.entries(condition.maxHidden).every(([key, value]) => (state.hidden[key as keyof typeof state.hidden] ?? 0) <= value)) return false;
  return true;
}

function weightedPick<T>(items: Array<{ item: T; weight: number }>) {
  const total = items.reduce((sum, entry) => sum + Math.max(0, entry.weight), 0);
  let roll = Math.random() * total;
  for (const entry of items) {
    roll -= Math.max(0, entry.weight);
    if (roll <= 0) return entry.item;
  }
  return items[items.length - 1].item;
}

function getClassWeight(event: GameEvent, state: GameState) {
  let weight = event.weight ?? 10;
  if (event.id === "class-late-wakeup" && state.stats.stamina <= 30) weight += 15;
  if (event.id === "class-surprise-question" && state.stats.professorAggro >= 60) weight += 18;
  if (event.id === "class-attendance" && state.hidden.attendance <= 60) weight += 10;
  return weight;
}

function getRandomWeight(event: GameEvent, state: GameState) {
  let weight = event.weight ?? 10;
  if (event.id === "random-solo-meal" && state.stats.social <= 30) weight += 18;
  if (event.id === "random-commute" && state.stats.stamina <= 30) weight += 10;
  if (event.id === "random-balance" && state.stats.money <= 10000) weight += 24;
  if (event.id === "random-team-silent" && state.hidden.teamStability <= 40) weight += 22;
  if (event.id === "random-self-holiday" && state.hidden.selfHolidayGauge >= 50) weight += 20;
  if (event.id === "random-lms" && state.stats.professorAggro >= ENDING_RULES.professorRadarAggro) weight += 8;
  return weight;
}

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function normalizeMoney(money: number) {
  if (money >= 60000) return 100;
  if (money <= 0) return 0;
  return (money / 60000) * 100;
}

function isScheduleCompatible(event: GameEvent, week: number) {
  const condition = event.condition;
  if (!condition) return true;
  if (condition.minWeek !== undefined && week < condition.minWeek) return false;
  if (condition.maxWeek !== undefined && week > condition.maxWeek) return false;
  return !condition.minStats && !condition.maxStats && !condition.minHidden && !condition.maxHidden;
}

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}
