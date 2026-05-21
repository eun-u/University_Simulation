import { useEffect, useMemo, useRef, useState } from "react";
import {
  addDerivedTitles,
  applyEffects,
  applyFinalExamSideEffects,
  calculateFinalGrades,
  calculateFinalScore,
  calculateMidtermScore,
  determineEnding,
  initialGameState,
  mainByWeek,
  pickClassEvent,
  pickOutcome,
  pickRandomLifeEvent,
} from "./engine/core";
import { pixelAssetMap } from "./assets/pixelAssetMap";
import { Effect, EventOption, GameEvent, GameState, HistoryEntry, Outcome } from "./types";
import {
  PixelAppShell,
  PixelChoiceButton,
  PixelChatWindow,
  PixelEventScene,
  PixelEventIcon,
  PixelFinalResultCard,
  PixelHudHeader,
  PixelLoadingOverlay,
  PixelMenuOverlay,
  PixelQuickHud,
  PixelResultPanel,
  PixelStatusMenu,
  PixelWeekMap,
  PixelWeekSummary,
} from "./components/pixel";

const SAVE_KEY = "uni-rpg-save-v2";

const SOUND_ASSETS = {
  click: new URL("../sound/click.mp3", import.meta.url).href,
  nextlog: new URL("../sound/nextlog.mp3", import.meta.url).href,
  weekSummary: new URL("../sound/weekSummary.mp3", import.meta.url).href,
  background: new URL("../sound/background.mp3", import.meta.url).href,
} as const;

const audioCache = new Map<string, HTMLAudioElement>();

function playSound(src: string) {
  if (typeof window === "undefined") return;

  let audio = audioCache.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.preload = "auto";
    audioCache.set(src, audio);
  }

  try {
    audio.currentTime = 0;
  } catch {
    // Ignore reset failures on not-yet-ready audio.
  }

  void audio.play().catch(() => {});
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? (JSON.parse(raw) as GameState) : null;
  } catch {
    return null;
  }
}

function saveGame(state: GameState) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function buildWeek(state: GameState) {
  const queue: GameEvent[] = [];
  const classEvent = pickClassEvent(state);
  if (classEvent) queue.push(classEvent);
  queue.push(mainByWeek(state.week));
  const randomEvent = pickRandomLifeEvent(state);
  if (randomEvent) queue.push(randomEvent);

  return {
    ...state,
    phase: "event" as const,
    eventQueue: queue,
    currentEvent: queue[0],
    pendingResult: undefined,
    recentClassEventIds: classEvent ? [classEvent.id, ...state.recentClassEventIds].slice(0, 2) : state.recentClassEventIds,
  };
}

export default function App() {
  const [state, setState] = useState<GameState>(() => structuredClone(initialGameState));
  const [name, setName] = useState("");
  const [menu, setMenu] = useState<"status" | "map" | null>(null);
  const [loading, setLoading] = useState<"start" | "week" | "final" | null>(null);
  const previousPhase = useRef(state.phase);
  const backgroundAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!backgroundAudio.current) {
      backgroundAudio.current = new Audio(SOUND_ASSETS.background);
      backgroundAudio.current.loop = true;
      backgroundAudio.current.volume = 0.5;
      backgroundAudio.current.preload = "auto";
    }

    if (state.phase !== "start") {
      if (backgroundAudio.current.paused) {
        void backgroundAudio.current.play().catch(() => {});
      }
    } else {
      backgroundAudio.current.pause();
      backgroundAudio.current.currentTime = 0;
    }

    return () => {
      if (backgroundAudio.current) {
        backgroundAudio.current.pause();
      }
    };
  }, [state.phase]);


  useEffect(() => {
    const previous = previousPhase.current;
    if (previous !== state.phase) {
      if (state.phase === "event" && previous === "result") {
        playSound(SOUND_ASSETS.nextlog);
      }
      if (state.phase === "weekSummary") {
        playSound(SOUND_ASSETS.weekSummary);
      }
    }
    previousPhase.current = state.phase;
  }, [state.phase]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest("button")) return;
      playSound(SOUND_ASSETS.click);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  const persist = (next: GameState) => {
    setState(next);
    saveGame(next);
  };

  const begin = (continueSaved = false) => {
    if (continueSaved) {
      const saved = loadGame();
      if (saved) {
        setState(saved);
        return;
      }
    }

    setLoading("start");
    setTimeout(() => {
      const fresh = structuredClone(initialGameState) as GameState;
      fresh.playerName = name.trim() || "익명의 대학생";
      persist(buildWeek(fresh));
      setLoading(null);
    }, 1200);
  };

  const restart = () => {
    localStorage.removeItem(SAVE_KEY);
    setState(structuredClone(initialGameState) as GameState);
    setName("");
  };

  const choose = (option: EventOption) => {
    if (!state.currentEvent) return;

    const picked = resolveOption(option);
    let next = applyEffects(state, picked.effects);

    const choiceBonus = picked.choiceBonus ?? option.choiceBonus ?? 0;
    if (next.currentEvent?.week === 7 && next.currentEvent.type === "exam") {
      next.hidden.midtermScore = calculateMidtermScore(next, choiceBonus);
      picked.effects = [...picked.effects, { target: "midtermScore", value: next.hidden.midtermScore }];
      picked.resultText += `\n\n중간고사 점수: ${next.hidden.midtermScore}점`;
    }

    if (next.currentEvent?.week === 14 && next.currentEvent.type === "exam") {
      const finalScore = calculateFinalScore(next, choiceBonus);
      next.hidden.finalScore = finalScore;
      next = applyFinalExamSideEffects(next);
      picked.effects = [...picked.effects, { target: "finalScore", value: finalScore }];
      picked.resultText += `\n\n기말고사 점수: ${finalScore}점`;
    }

    if (option.addTitle && !next.titles.includes(option.addTitle)) next.titles.push(option.addTitle);
    if (picked.addTitle && !next.titles.includes(picked.addTitle)) next.titles.push(picked.addTitle);

    const historyEntry: HistoryEntry = {
      week: next.week,
      eventTitle: state.currentEvent.title,
      optionLabel: option.label,
      resultText: picked.resultText,
      effects: picked.effects,
      summary: picked.summary ?? option.summary ?? `${state.currentEvent.title}에서 “${option.label}” 선택.`,
    };

    next.history = [...next.history, historyEntry];
    next.pendingResult = historyEntry;
    next.phase = "result";

    persist(next);
  };

  const continueAfterResult = () => {
    const rest = state.eventQueue.slice(1);
    const next: GameState = {
      ...state,
      eventQueue: rest,
      currentEvent: rest[0],
      pendingResult: undefined,
    };

    if (rest[0]) {
      next.phase = "event";
    } else if (state.week === 16) {
      setLoading("final");
      setTimeout(() => {
        next.phase = "final";
        persist(next);
        // keep the final loading visible briefly so the overlay is shown
        // during the final screen render, then hide it
        setTimeout(() => setLoading(null), 600);
      }, 1500);
      return;
    } else {
      next.phase = "weekSummary";
    }

    persist(next);
  };

  const nextWeek = () => {
    setLoading("week");
    setTimeout(() => {
      const next = buildWeek({
        ...state,
        week: state.week + 1,
        phase: "event",
        eventQueue: [],
        currentEvent: undefined,
        pendingResult: undefined,
      });
      persist(next);
      setLoading(null);
    }, 1200);
  };

  const final = useMemo(() => (state.phase === "final" ? calculateFinalGrades(state) : null), [state]);
  const finalState = useMemo(() => (final ? addDerivedTitles(state, final) : state), [state, final]);
  const ending = final ? determineEnding(finalState, final) : null;

  if (state.phase === "start") {
    return (
      <PixelAppShell>
        {loading ? <PixelLoadingOverlay type={loading} /> : null}
        <section className="start-hero">
          <div className="start-panel pixel-panel">
            <img className="start-logo pixel-art" src={pixelAssetMap.logo.title} alt="한 학기만 버텨라" />
            <h1 className="pixel-title">대학생 생존 RPG</h1>
            <p className="start-subtitle">개강부터 성적 확인까지, 학점과 멘탈을 들고 16주를 버텨라.</p>
            <label>
              <span className="small-note">플레이어 이름</span>
              <input className="pixel-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="익명의 대학생" />
            </label>
            <button className="pixel-control pixel-control--primary" type="button" onClick={() => begin(false)}>
              새 학기 시작하기
            </button>
            <button className="pixel-control" type="button" onClick={() => begin(true)} disabled={!loadGame()}>
              이어하기
            </button>
            <p className="small-note">저장은 자동으로 진행됩니다. 선택지는 언제나 대가가 있습니다.</p>
          </div>
        </section>
      </PixelAppShell>
    );
  }

  if (state.phase === "final" && final && ending) {
    return (
      <PixelAppShell>
        {loading ? <PixelLoadingOverlay type={loading} /> : null}
        <PixelHudHeader state={finalState} />
        <PixelFinalResultCard state={finalState} final={final} ending={ending.title} endingText={ending.text} onRestart={restart} />
      </PixelAppShell>
    );
  }

  return (
    <PixelAppShell>
      {loading ? <PixelLoadingOverlay type={loading} /> : null}
      <PixelHudHeader state={state} />
      <PixelQuickHud state={state} onOpenStatus={() => setMenu("status")} onOpenMap={() => setMenu("map")} />

      {state.phase === "event" && state.currentEvent ? (
        <section className="game-screen">
          <PixelEventScene event={state.currentEvent} week={state.week} />
          <div className="event-play-area">
            <PixelEventIcon event={state.currentEvent} />
            <PixelChatWindow event={state.currentEvent} />
          </div>
          <section className="choice-dock" aria-label="선택지">
            {state.currentEvent.options.map((option, index) => (
              <PixelChoiceButton key={option.id} option={option} index={index} onChoose={() => choose(option)} />
            ))}
          </section>
        </section>
      ) : null}

      {state.phase === "result" && state.pendingResult ? (
        <section className="game-screen game-screen--result">
          <PixelResultPanel
            resultText={state.pendingResult.resultText}
            effects={state.pendingResult.effects}
            onNext={continueAfterResult}
            onOpenStatus={() => setMenu("status")}
          />
        </section>
      ) : null}

      {state.phase === "weekSummary" ? (
        <section className="game-screen game-screen--summary">
          <PixelWeekSummary state={state} onNextWeek={nextWeek} onOpenStatus={() => setMenu("status")} onOpenMap={() => setMenu("map")} />
        </section>
      ) : null}

      {menu === "status" ? (
        <PixelMenuOverlay title="STATUS" onClose={() => setMenu(null)}>
          <PixelStatusMenu state={state} />
        </PixelMenuOverlay>
      ) : null}

      {menu === "map" ? (
        <PixelMenuOverlay title="WEEK" onClose={() => setMenu(null)}>
          <PixelWeekMap week={state.week} />
        </PixelMenuOverlay>
      ) : null}
    </PixelAppShell>
  );
}

function resolveOption(option: EventOption): Outcome & { effects: Effect[] } {
  if (option.outcomes) {
    return { ...pickOutcome(option.outcomes) };
  }
  return {
    weight: 1,
    resultText: option.resultText ?? `${option.label} 선택.`,
    effects: option.effects ?? [],
    addTitle: option.addTitle,
    choiceBonus: option.choiceBonus,
    summary: option.summary,
  };
}
