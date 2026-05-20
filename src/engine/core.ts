import { classEvents } from "../data/classEvents";
import { mainEvents } from "../data/mainEvents";
import { randomEvents } from "../data/randomEvents";
import { Effect, Ending, EventCondition, FinalGradeResult, GameEvent, GameState, Outcome } from "../types";

export const initialGameState: GameState = {
  playerName: "익명의 대학생",
  week: 1,
  phase: "start",
  eventQueue: [],
  history: [],
  recentClassEventIds: [],
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
    attendance: 80,
    assignment: 50,
    teamContribution: 20,
    teamStability: 50,
    selfHolidayGauge: 0,
    soloMealTolerance: 0,
    caffeine: 0,
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

  for (const key of ["attendance", "assignment", "teamContribution", "teamStability", "selfHolidayGauge", "soloMealTolerance", "caffeine"] as const) {
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
  const caffeineBonus = state.hidden.caffeine >= 20 && state.hidden.caffeine <= 60 ? 5 : state.hidden.caffeine > 60 ? 2 : 0;
  return Math.round(
    clamp(
      state.stats.grade * 0.6 +
        state.hidden.attendance * 0.1 +
        state.hidden.assignment * 0.1 +
        choiceBonus +
        randomRange(-8, 8) -
        burnoutPenalty +
        caffeineBonus,
    ),
  );
}

export function applyFinalExamSideEffects(state: GameState) {
  if (state.hidden.caffeine > 60) {
    return applyEffects(state, [{ target: "mental", value: -5 }]);
  }
  return state;
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

export function mainByWeek(week: number) {
  const event = mainEvents.find((candidate) => candidate.week === week);
  if (!event) throw new Error(`Missing main event for week ${week}`);
  return event;
}

export function calculateFinalGrades(state: GameState): FinalGradeResult {
  const midtermScore = state.hidden.midtermScore ?? 50;
  const finalScore = state.hidden.finalScore ?? 50;
  const academicScore = clamp(
    state.stats.grade * 0.35 +
      state.hidden.attendance * 0.15 +
      state.hidden.assignment * 0.15 +
      state.hidden.teamContribution * 0.1 +
      midtermScore * 0.12 +
      finalScore * 0.13,
  );

  const scores = [
    ["전공필수", clamp(academicScore - state.stats.professorAggro * 0.08 + randomRange(-5, 5))],
    ["교양", clamp(academicScore * 0.85 + state.stats.mental * 0.1 + randomRange(-5, 8))],
    ["팀플 과목", clamp(academicScore * 0.45 + state.hidden.teamContribution * 0.35 + state.hidden.teamStability * 0.2 + randomRange(-5, 5))],
    ["정체불명 과목", clamp(academicScore + randomRange(-15, 15))],
  ] as const;

  const subjects = scores.map(([name, score]) => {
    const converted = convertScore(score);
    return {
      name,
      score: Number(score.toFixed(1)),
      letter: converted.letter,
      gpa: converted.gpa,
    };
  });

  const averageGpa = subjects.reduce((sum, subject) => sum + subject.gpa, 0) / subjects.length;
  const moneyScore = normalizeMoney(state.stats.money);
  const survivalScore = clamp(
    academicScore * 0.4 +
      state.stats.mental * 0.25 +
      state.stats.stamina * 0.15 +
      state.stats.social * 0.1 +
      moneyScore * 0.1 -
      state.stats.professorAggro * 0.05,
  );

  return {
    academicScore: Number(academicScore.toFixed(1)),
    subjects,
    averageGpa: Number(averageGpa.toFixed(2)),
    survivalGrade: convertSurvivalScore(survivalScore),
    survivalScore: Number(survivalScore.toFixed(1)),
  };
}

export function determineEnding(state: GameState, finalGradeResult: FinalGradeResult): Ending {
  const endings: Array<{ condition: boolean; ending: Ending }> = [
    {
      condition: state.stats.mental <= 10,
      ending: {
        title: "휴학 고민 엔딩",
        text: "성적보다 중요한 것이 있다는 걸 깨달았다.\n당신은 포털보다 휴학 신청 페이지를 더 오래 바라보았다.",
      },
    },
    {
      condition: finalGradeResult.averageGpa < 1,
      ending: {
        title: "F의 전설 엔딩",
        text: "성적표는 조용했다.\n하지만 그 침묵이 모든 것을 말했다.",
      },
    },
    {
      condition: finalGradeResult.averageGpa >= 4 && state.stats.mental <= 30,
      ending: {
        title: "좀비 장학생 엔딩",
        text: "학점은 살아남았다.\n당신은 잘 모르겠다.",
      },
    },
    {
      condition: finalGradeResult.averageGpa >= 4 && state.stats.mental > 50,
      ending: {
        title: "A+ 인간 엔딩",
        text: "당신은 공부도 하고 잠도 잤다.\n이론상 불가능한 일이지만, 아무튼 성공했다.",
      },
    },
    {
      condition: state.hidden.teamContribution >= 80 && state.stats.mental <= 45,
      ending: {
        title: "팀플 노예 엔딩",
        text: "팀플은 끝났다.\n하지만 당신은 아직도 PPT 애니메이션을 수정하고 있는 기분이다.",
      },
    },
    {
      condition: state.hidden.selfHolidayGauge >= 75 && finalGradeResult.averageGpa >= 2,
      ending: {
        title: "자휴 마스터 엔딩",
        text: "당신은 수많은 수업을 보내주었다.\n그런데도 어떻게든 살아남았다.\n시스템도 약간 당황했다.",
      },
    },
    {
      condition: state.stats.social >= 80 && finalGradeResult.averageGpa >= 2,
      ending: {
        title: "인싸 생존 엔딩",
        text: "학점은 완벽하지 않았지만,\n당신의 연락처 목록은 풍성해졌다.\n이것도 대학생활이다.",
      },
    },
    {
      condition: state.hidden.soloMealTolerance >= 60 && state.stats.social <= 35 && state.stats.mental >= 40,
      ending: {
        title: "혼밥 고수 엔딩",
        text: "당신은 혼자 밥을 먹는 법을 배웠다.\n그리고 생각보다 괜찮았다.",
      },
    },
    {
      condition: state.stats.money <= 0,
      ending: {
        title: "잔고 실종 엔딩",
        text: "학기는 끝났다.\n잔고도 끝났다.",
      },
    },
  ];

  return (
    endings.find(({ condition }) => condition)?.ending ?? {
      title: "평범한 대학생 엔딩",
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
  if (Math.abs(finalGradeResult.averageGpa - 2.5) <= 0.15) add("C+의 기적");
  if (finalGradeResult.averageGpa >= 4 && next.stats.mental <= 25) add("A+인데 행복하지 않은 자");
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
  if (event.id === "class-sleepy" && state.hidden.caffeine >= 45) weight += 8;
  return weight;
}

function getRandomWeight(event: GameEvent, state: GameState) {
  let weight = event.weight ?? 10;
  if (event.id === "random-solo-meal" && state.stats.social <= 30) weight += 18;
  if (event.id === "random-commute" && state.stats.stamina <= 30) weight += 10;
  if (event.id === "random-balance" && state.stats.money <= 10000) weight += 24;
  if (event.id === "random-team-silent" && state.hidden.teamStability <= 40) weight += 22;
  if (event.id === "random-self-holiday" && state.hidden.selfHolidayGauge >= 50) weight += 20;
  if (event.id === "random-caffeine" && state.hidden.caffeine >= 60) weight += 30;
  if (event.id === "random-lms" && state.stats.professorAggro >= 60) weight += 8;
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

function convertScore(score: number) {
  if (score >= 95) return { letter: "A+", gpa: 4.5 };
  if (score >= 90) return { letter: "A0", gpa: 4 };
  if (score >= 85) return { letter: "B+", gpa: 3.5 };
  if (score >= 80) return { letter: "B0", gpa: 3 };
  if (score >= 75) return { letter: "C+", gpa: 2.5 };
  if (score >= 70) return { letter: "C0", gpa: 2 };
  if (score >= 60) return { letter: "D+", gpa: 1.5 };
  return { letter: "F", gpa: 0 };
}

function convertSurvivalScore(score: number) {
  if (score >= 90) return "S";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}
