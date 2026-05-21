import { useEffect, useMemo, useRef, useState } from "react";
import {
  addDerivedTitles,
  applyEffects,
  applyFinalExamSideEffects,
  calculateFinalGrades,
  calculateFinalScore,
  calculateMidtermScore,
  createRandomEventSchedule,
  determineEnding,
  initialGameState,
  mainByWeek,
  pickOutcome,
  scheduledRandomEventForWeek,
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
  PixelPrologue,
  PixelQuickHud,
  PixelResultPanel,
  PixelRunProgress,
  PixelSettingsMenu,
  PixelStatusMenu,
  PixelWeekMap,
  PixelWeekSummary,
} from "./components/pixel";

const SAVE_KEY = "uni-rpg-save-v3";
const AUDIO_SETTINGS_KEY = "uni-rpg-audio-settings-v1";
const TOTAL_RUN_EVENTS = 18;
const CHECKPOINT_WEEKS = [4, 8, 12, 15];

const SOUND_ASSETS = {
  click: new URL("../sound/click.mp3", import.meta.url).href,
  nextlog: new URL("../sound/nextlog.mp3", import.meta.url).href,
  weekSummary: new URL("../sound/weekSummary.mp3", import.meta.url).href,
  background: new URL("../sound/background.mp3", import.meta.url).href,
} as const;

const audioCache = new Map<string, HTMLAudioElement>();
const soundGate = new Map<string, number>();

interface AudioSettings {
  bgmVolume: number;
  sfxVolume: number;
}

function loadAudioSettings(): AudioSettings {
  try {
    const raw = localStorage.getItem(AUDIO_SETTINGS_KEY);
    return raw ? { ...DEFAULT_AUDIO_SETTINGS, ...JSON.parse(raw) } : DEFAULT_AUDIO_SETTINGS;
  } catch {
    return DEFAULT_AUDIO_SETTINGS;
  }
}

function saveAudioSettings(settings: AudioSettings) {
  localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(settings));
}

function playSound(src: string, volume: number) {
  if (typeof window === "undefined") return;
  if (volume <= 0) return;

  const now = Date.now();
  const previous = soundGate.get(src) ?? 0;
  if (now - previous < 70) return;
  soundGate.set(src, now);

  let audio = audioCache.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.preload = "auto";
    audioCache.set(src, audio);
  }

  try {
    audio.pause();
    audio.volume = volume;
    audio.currentTime = 0;
  } catch {
    // Ignore reset failures on not-yet-ready audio.
  }

  void audio.play().catch(() => {});
}

const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  bgmVolume: 0.45,
  sfxVolume: 0.65,
};

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? normalizeSavedGame(JSON.parse(raw) as Partial<GameState>) : null;
  } catch {
    return null;
  }
}

function saveGame(state: GameState) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function buildWeek(state: GameState) {
  const queue: GameEvent[] = [mainByWeek(state.week)];
  const randomEvent = scheduledRandomEventForWeek(state);
  if (randomEvent) queue.push(randomEvent);

  return {
    ...state,
    phase: "event" as const,
    eventQueue: queue,
    currentEvent: queue[0],
    pendingResult: undefined,
  };
}

export default function App() {
  const [state, setState] = useState<GameState>(() => loadGame() ?? initialGameState);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [menu, setMenu] = useState<"status" | "map" | "settings" | null>(null);
  const [prologueStep, setPrologueStep] = useState(0);
  const [loading, setLoading] = useState<"start" | "week" | "final" | null>(null);
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(() => loadAudioSettings());
  const previousPhase = useRef(state.phase);
  const backgroundAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!backgroundAudio.current) {
      backgroundAudio.current = new Audio(SOUND_ASSETS.background);
      backgroundAudio.current.loop = true;
      backgroundAudio.current.preload = "auto";
    }

    backgroundAudio.current.volume = audioSettings.bgmVolume;
    if (audioSettings.bgmVolume <= 0) {
      backgroundAudio.current.pause();
    } else if (backgroundAudio.current.paused) {
      void backgroundAudio.current.play().catch(() => {});
    }

    return () => {
      if (backgroundAudio.current) {
        backgroundAudio.current.pause();
      }
    };
  }, [audioSettings.bgmVolume]);

  useEffect(() => {
    saveAudioSettings(audioSettings);
  }, [audioSettings]);


  useEffect(() => {
    const previous = previousPhase.current;
    if (previous !== state.phase) {
      if (state.phase === "event" && previous === "result") {
        playSound(SOUND_ASSETS.nextlog, audioSettings.sfxVolume);
      }
      if (state.phase === "weekSummary") {
        playSound(SOUND_ASSETS.weekSummary, audioSettings.sfxVolume);
      }
    }
    previousPhase.current = state.phase;
  }, [audioSettings.sfxVolume, state.phase]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest("button")) return;
      if (backgroundAudio.current && backgroundAudio.current.paused && audioSettings.bgmVolume > 0) {
        void backgroundAudio.current.play().catch(() => {});
      }
      playSound(SOUND_ASSETS.click, audioSettings.sfxVolume);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [audioSettings.bgmVolume, audioSettings.sfxVolume]);

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
      fresh.department = department.trim() || "미정학과";
      fresh.scheduledRandomEvents = createRandomEventSchedule();
      fresh.phase = "prologue";
      setPrologueStep(0);
      persist(fresh);
      setLoading(null);
    }, 900);
  };

  const startRun = () => {
    setLoading("start");
    setTimeout(() => {
      persist(buildWeek({ ...state, phase: "event" }));
      setLoading(null);
    }, 700);
  };

  const nextPrologue = () => {
    if (prologueStep >= 2) {
      startRun();
      return;
    }
    setPrologueStep((step) => step + 1);
  };

  const restart = () => {
    localStorage.removeItem(SAVE_KEY);
    setState(structuredClone(initialGameState) as GameState);
    setName("");
    setDepartment("");
    setMenu(null);
  };

  const updateAudioSettings = (next: Partial<AudioSettings>) => {
    setAudioSettings((current) => ({ ...current, ...next }));
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
    } else if (CHECKPOINT_WEEKS.includes(state.week)) {
      next.phase = "weekSummary";
    } else {
      persist(
        buildWeek({
          ...next,
          week: next.week + 1,
          phase: "event",
          eventQueue: [],
          currentEvent: undefined,
          pendingResult: undefined,
        }),
      );
      return;
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
            <label>
              <span className="small-note">학과</span>
              <input className="pixel-input" value={department} onChange={(event) => setDepartment(event.target.value)} placeholder="예: 컴퓨터공학과" />
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

  if (state.phase === "prologue") {
    return (
      <PixelAppShell>
        <PixelPrologue playerName={state.playerName} step={prologueStep} onNext={nextPrologue} onSkip={startRun} />
      </PixelAppShell>
    );
  }

  if (state.phase === "final" && final && ending) {
    return (
      <PixelAppShell>
        {loading ? <PixelLoadingOverlay type={loading} /> : null}
        <PixelHudHeader state={finalState} onOpenSettings={() => setMenu("settings")} />
        <PixelFinalResultCard state={finalState} ending={ending.title} endingText={ending.text} />
        {menu === "settings" ? (
          <PixelMenuOverlay title="SETTINGS" onClose={() => setMenu(null)}>
            <PixelSettingsMenu
              bgmVolume={audioSettings.bgmVolume}
              sfxVolume={audioSettings.sfxVolume}
              onBgmVolumeChange={(value) => updateAudioSettings({ bgmVolume: value })}
              onSfxVolumeChange={(value) => updateAudioSettings({ sfxVolume: value })}
              onRestart={restart}
            />
          </PixelMenuOverlay>
        ) : null}
      </PixelAppShell>
    );
  }

  return (
    <PixelAppShell>
      {loading ? <PixelLoadingOverlay type={loading} /> : null}
      <PixelHudHeader state={state} onOpenSettings={() => setMenu("settings")} />
      <PixelQuickHud state={state} onOpenStatus={() => setMenu("status")} />
      <PixelRunProgress current={getRunProgress(state)} total={TOTAL_RUN_EVENTS} />

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

      {menu === "settings" ? (
        <PixelMenuOverlay title="SETTINGS" onClose={() => setMenu(null)}>
          <PixelSettingsMenu
            bgmVolume={audioSettings.bgmVolume}
            sfxVolume={audioSettings.sfxVolume}
            onBgmVolumeChange={(value) => updateAudioSettings({ bgmVolume: value })}
            onSfxVolumeChange={(value) => updateAudioSettings({ sfxVolume: value })}
            onRestart={restart}
          />
        </PixelMenuOverlay>
      ) : null}
    </PixelAppShell>
  );
}

function getRunProgress(state: GameState) {
  if (state.phase === "event") return Math.min(TOTAL_RUN_EVENTS, state.history.length + 1);
  return Math.min(TOTAL_RUN_EVENTS, state.history.length);
}

function normalizeSavedGame(saved: Partial<GameState>): GameState {
  return {
    ...(structuredClone(initialGameState) as GameState),
    ...saved,
    playerName: saved.playerName ?? initialGameState.playerName,
    department: saved.department ?? "미정학과",
    recentClassEventIds: saved.recentClassEventIds ?? [],
    scheduledRandomEvents: saved.scheduledRandomEvents?.length ? saved.scheduledRandomEvents : createRandomEventSchedule(),
    stats: {
      ...initialGameState.stats,
      ...saved.stats,
    },
    hidden: {
      ...initialGameState.hidden,
      ...saved.hidden,
    },
  };
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
