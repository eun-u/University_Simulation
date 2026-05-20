import { CSSProperties, ReactNode } from "react";
import { pixelAssetMap, PixelAvatar } from "../assets/pixelAssetMap";
import { Effect, EventOption, FinalGradeResult, GameEvent, GameState } from "../types";

const statLabels = {
  grade: "학점",
  mental: "멘탈",
  stamina: "체력",
  money: "지갑",
  social: "관계",
  professorAggro: "어그로",
} as const;

const hiddenLabels = {
  attendance: "출석",
  assignment: "과제",
  teamContribution: "팀플기여",
  teamStability: "팀플안정",
  selfHolidayGauge: "자휴",
  soloMealTolerance: "혼밥내성",
  caffeine: "카페인",
  midtermScore: "중간",
  finalScore: "기말",
} as const;

const statColors = {
  grade: "var(--stat-grade)",
  mental: "var(--stat-mental)",
  stamina: "var(--stat-stamina)",
  money: "var(--stat-money)",
  social: "var(--stat-social)",
  professorAggro: "var(--stat-aggro)",
} as const;

export function PixelAppShell({ children }: { children: ReactNode }) {
  return <main className="PixelAppShell">{children}</main>;
}

export function PixelHudHeader({ state }: { state: GameState }) {
  return (
    <header className="PixelHudHeader">
      <div className="hud-player">
        <img className="hud-avatar pixel-art" src={pixelAssetMap.avatar.player} alt="" />
        <div>
          <div className="hud-title">{state.playerName}</div>
          <div className="hud-subtitle">1학년 1학기</div>
        </div>
      </div>
      <div className="hud-chip">WEEK {String(state.week).padStart(2, "0")}</div>
    </header>
  );
}

export function PixelQuickHud({
  state,
  onOpenStatus,
  onOpenMap,
}: {
  state: GameState;
  onOpenStatus: () => void;
  onOpenMap: () => void;
}) {
  return (
    <section className="PixelQuickHud" aria-label="빠른 상태">
      <div className="quick-stat">
        <img className="pixel-art" src={pixelAssetMap.statIcon.mental} alt="" />
        <span>{Math.round(state.stats.mental)}</span>
      </div>
      <div className="quick-stat">
        <img className="pixel-art" src={pixelAssetMap.statIcon.grade} alt="" />
        <span>{Math.round(state.stats.grade)}</span>
      </div>
      <div className="quick-stat">
        <img className="pixel-art" src={pixelAssetMap.statIcon.money} alt="" />
        <span>{compactMoney(state.stats.money)}</span>
      </div>
      <div className="quick-stat">
        <img className="pixel-art" src={pixelAssetMap.statIcon.stamina} alt="" />
        <span>{Math.round(state.stats.stamina)}</span>
      </div>
      <div className="quick-stat">
        <img className="pixel-art" src={pixelAssetMap.statIcon.social} alt="" />
        <span>{Math.round(state.stats.social)}</span>
      </div>
      <div className="quick-stat">
        <img className="pixel-art" src={pixelAssetMap.statIcon.professorAggro} alt="" />
        <span>{Math.round(state.stats.professorAggro)}</span>
      </div>
      <button className="hud-menu-button" type="button" onClick={onOpenStatus}>
        STATUS
      </button>
      <button className="hud-menu-button" type="button" onClick={onOpenMap}>
        WEEK
      </button>
    </section>
  );
}

export function PixelStatHud({ state }: { state: GameState }) {
  const stats = state.stats;
  return (
    <>
      <section className="PixelStatHud" aria-label="현재 스탯">
        {(["mental", "grade", "stamina", "money", "social", "professorAggro"] as const).map((key) => {
          const value = stats[key];
          const meterValue = key === "money" ? Math.max(0, Math.min(100, (value / 60000) * 100)) : value;
          const shown = key === "money" ? `${value.toLocaleString()}원` : `${Math.round(value)}/100`;
          return (
            <div className="stat-row" key={key}>
              <div className="stat-name">
                <img className="stat-icon pixel-art" src={pixelAssetMap.statIcon[key]} alt="" />
                <span>{statLabels[key]}</span>
              </div>
              <PixelMeter value={meterValue} color={statColors[key]} label={statLabels[key]} />
              <div className="stat-value">{shown}</div>
            </div>
          );
        })}
      </section>
      <DangerBadges state={state} />
    </>
  );
}

function DangerBadges({ state }: { state: GameState }) {
  const danger = [];
  if (state.stats.mental <= 20) danger.push("번아웃 경고");
  if (state.stats.stamina <= 20) danger.push("쓰러지기 직전");
  if (state.stats.money <= 5000) danger.push("잔고 위험");
  if (state.stats.professorAggro >= 70) danger.push("교수님 집중 감시");
  if (state.hidden.attendance <= 50) danger.push("출석 위험");
  if (state.hidden.teamStability <= 30) danger.push("팀플 붕괴 위험");
  if (danger.length === 0) return null;

  return (
    <div className="danger-stack" aria-label="위험 상태">
      {danger.map((text) => (
        <PixelBadge key={text} tone="danger">
          {text}
        </PixelBadge>
      ))}
    </div>
  );
}

export function PixelMeter({ value, color, label }: { value: number; color: string; label: string }) {
  const style = {
    "--meter-value": `${Math.max(0, Math.min(100, value))}%`,
    "--meter-color": color,
  } as CSSProperties;
  return (
    <div className="pixel-meter" role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value)}>
      <div className="pixel-meter__fill" style={style} />
    </div>
  );
}

export function PixelWeekMap({ week }: { week: number }) {
  return (
    <nav className="PixelWeekMap" aria-label="학기 진행도">
      {Array.from({ length: 16 }, (_, index) => {
        const current = index + 1;
        const className = ["week-node", current < week ? "week-node--done" : "", current === week ? "week-node--current" : ""]
          .filter(Boolean)
          .join(" ");
        return (
          <div className={className} key={current} aria-current={current === week ? "step" : undefined}>
            {current}
          </div>
        );
      })}
    </nav>
  );
}

export function PixelEventScene({ event, week }: { event: GameEvent; week: number }) {
  const banner = getBanner(week, event);
  return (
    <section className="PixelEventScene pixel-panel">
      <div className="scene-banner">
        {banner ? <img className="scene-banner-image pixel-art" src={banner} alt="" /> : null}
        <div>
          <div className="scene-kicker">{event.type.toUpperCase()} LOG</div>
          <h1 className="scene-title">{event.title}</h1>
        </div>
      </div>
      <div className="scene-meta">WEEK {week} / {event.weekName ?? "캠퍼스 생존 로그"}</div>
    </section>
  );
}

function getBanner(week: number, event: GameEvent) {
  if (event.assetKey && event.assetKey in pixelAssetMap.banner) {
    return pixelAssetMap.banner[event.assetKey as keyof typeof pixelAssetMap.banner];
  }
  const key = `week${week}` as keyof typeof pixelAssetMap.banner;
  return pixelAssetMap.banner[key];
}

export function PixelChatWindow({ event }: { event: GameEvent }) {
  const avatar = event.avatar ?? inferAvatar(event);
  return (
    <section className="PixelChatWindow" aria-label="이벤트 로그">
      <PixelChatBubble avatar="system" speaker="SYSTEM" lines={[`[${event.time ?? "캠퍼스 시간"}] ${event.title}`]} />
      <PixelChatBubble avatar={avatar} speaker={speakerLabel(avatar)} lines={event.intro} />
    </section>
  );
}

export function PixelEventIcon({ event }: { event: GameEvent }) {
  const icon = getEventIcon(event);
  if (!icon) return null;
  return (
    <div className="event-icon-frame" aria-hidden="true">
      <img className="event-icon pixel-art" src={icon} alt="" />
    </div>
  );
}

export function PixelChatBubble({ avatar, speaker, lines }: { avatar: PixelAvatar; speaker: string; lines: string[] }) {
  return (
    <article className={`PixelChatBubble PixelChatBubble--${avatar}`}>
      <img className="chat-avatar pixel-art" src={pixelAssetMap.avatar[avatar]} alt="" />
      <div className="chat-box">
        <div className="chat-speaker">{speaker}</div>
        <div className="chat-text">{lines.join("\n")}</div>
      </div>
    </article>
  );
}

export function PixelChoiceButton({ option, index, onChoose }: { option: EventOption; index: number; onChoose: () => void }) {
  return (
    <button className="choice-button" type="button" onClick={onChoose}>
      <span className="choice-button__label">▶ {index + 1}. {option.label}</span>
      {option.description ? <span className="choice-button__desc">{option.description}</span> : null}
    </button>
  );
}

export function PixelResultPanel({
  resultText,
  effects,
  onNext,
  onOpenStatus,
}: {
  resultText: string;
  effects: Effect[];
  onNext: () => void;
  onOpenStatus: () => void;
}) {
  return (
    <section className="PixelResultPanel pixel-panel">
      <div className="panel-label">RESULT</div>
      <p className="result-text">{resultText}</p>
      <div className="effect-grid" aria-label="스탯 변화">
        {effects.map((effect, index) => (
          <PixelEffectChip effect={effect} key={`${effect.target}-${index}`} />
        ))}
      </div>
      <button className="pixel-control" type="button" onClick={onOpenStatus}>
        STATUS
      </button>
      <button className="pixel-control pixel-control--primary" type="button" onClick={onNext}>
        다음 로그로
      </button>
    </section>
  );
}

export function PixelEffectChip({ effect }: { effect: Effect }) {
  const className = effect.value > 0 ? "effect-chip effect-chip--good" : effect.value < 0 ? "effect-chip effect-chip--bad" : "effect-chip";
  const label = { ...statLabels, ...hiddenLabels }[effect.target as keyof typeof statLabels & keyof typeof hiddenLabels] ?? effect.target;
  return (
    <span className={className}>
      {label} {effect.value > 0 ? "+" : ""}
      {effect.value}
    </span>
  );
}

export function PixelWeekSummary({
  state,
  onNextWeek,
  onOpenStatus,
  onOpenMap,
}: {
  state: GameState;
  onNextWeek: () => void;
  onOpenStatus: () => void;
  onOpenMap: () => void;
}) {
  const last = state.history[state.history.length - 1];
  const titles = state.titles.slice(-3);
  return (
    <section className="PixelWeekSummary pixel-panel">
      <div className="panel-label">WEEK CLEAR</div>
      <h2 className="pixel-title">WEEK {state.week} CLEAR</h2>
      <ul className="summary-list">
        <li>{last?.summary ?? "이번 주도 어떻게든 지나갔다."}</li>
        <li>학점 {Math.round(state.stats.grade)} / 멘탈 {Math.round(state.stats.mental)} / 체력 {Math.round(state.stats.stamina)}</li>
        <li>지갑 {state.stats.money.toLocaleString()}원 / 관계 {Math.round(state.stats.social)} / 어그로 {Math.round(state.stats.professorAggro)}</li>
      </ul>
      <div className="summary-actions">
        <button className="pixel-control" type="button" onClick={onOpenStatus}>
          STATUS
        </button>
        <button className="pixel-control" type="button" onClick={onOpenMap}>
          WEEK
        </button>
      </div>
      {titles.length > 0 ? (
        <div className="badge-grid">
          {titles.map((title) => (
            <PixelBadge key={title}>{title}</PixelBadge>
          ))}
        </div>
      ) : null}
      <button className="pixel-control pixel-control--primary" type="button" onClick={onNextWeek}>
        WEEK {state.week + 1} START
      </button>
    </section>
  );
}

export function PixelMenuOverlay({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="PixelMenuOverlay" role="dialog" aria-modal="true" aria-label={title}>
      <section className="menu-card pixel-panel">
        <div className="menu-head">
          <h2 className="pixel-title">{title}</h2>
          <button className="menu-close" type="button" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>
        <div className="menu-body">{children}</div>
      </section>
    </div>
  );
}

export function PixelStatusMenu({ state }: { state: GameState }) {
  return (
    <div className="status-menu">
      <PixelStatHud state={state} />
      <section className="hidden-stat-grid" aria-label="보조 수치">
        <HiddenStat label="출석" value={state.hidden.attendance} />
        <HiddenStat label="과제" value={state.hidden.assignment} />
        <HiddenStat label="팀플기여" value={state.hidden.teamContribution} />
        <HiddenStat label="팀플안정" value={state.hidden.teamStability} />
        <HiddenStat label="자휴" value={state.hidden.selfHolidayGauge} />
        <HiddenStat label="혼밥내성" value={state.hidden.soloMealTolerance} />
        <HiddenStat label="카페인" value={state.hidden.caffeine} />
        <HiddenStat label="중간" value={state.hidden.midtermScore ?? "-"} />
        <HiddenStat label="기말" value={state.hidden.finalScore ?? "-"} />
      </section>
      {state.titles.length > 0 ? (
        <section className="badge-grid">
          {state.titles.slice(-6).map((title) => (
            <PixelBadge key={title} tone="survival">
              {title}
            </PixelBadge>
          ))}
        </section>
      ) : null}
    </div>
  );
}

export function PixelBadge({ children, tone = "normal" }: { children: ReactNode; tone?: "normal" | "danger" | "rare" | "academic" | "survival" }) {
  const icon = tone === "danger" ? pixelAssetMap.badge.danger : tone === "rare" ? pixelAssetMap.badge.rare : tone === "academic" ? pixelAssetMap.badge.academic : tone === "survival" ? pixelAssetMap.badge.survival : pixelAssetMap.badge.normal;
  return (
    <span className={`PixelBadge PixelBadge--${tone}`}>
      <img className="pixel-art" src={icon} alt="" />
      {children}
    </span>
  );
}

export function PixelFinalResultCard({
  state,
  final,
  ending,
  endingText,
  onRestart,
}: {
  state: GameState;
  final: FinalGradeResult;
  ending: string;
  endingText: string;
  onRestart: () => void;
}) {
  const titles = state.titles.length > 0 ? state.titles.slice(-3) : ["칭호 없이도 생존한 자"];
  return (
    <section className="PixelFinalResultCard pixel-panel">
      <div className="panel-label">FINAL RESULT</div>
      <div className="final-rank">
        <div className="final-grade">{final.survivalGrade}</div>
      </div>
      <h1 className="pixel-title">1학기 최종 성적표</h1>
      <div className="subject-grid">
        {final.subjects.map((subject) => (
          <div className="subject-card" key={subject.name}>
            <div className="subject-name">{subject.name}</div>
            <div className="subject-letter">{subject.letter}</div>
            <div>{subject.score}점 / {subject.gpa.toFixed(1)}</div>
          </div>
        ))}
      </div>
      <p className="summary-text">평균 학점 {final.averageGpa.toFixed(2)} / 4.5 · 생존 점수 {final.survivalScore}</p>
      <div className="badge-grid">
        {titles.map((title) => (
          <PixelBadge key={title} tone="survival">
            {title}
          </PixelBadge>
        ))}
      </div>
      <h2 className="pixel-title">{ending}</h2>
      <p className="ending-text">{endingText}</p>
      <button className="pixel-control pixel-control--primary" type="button" onClick={onRestart}>
        다시 하기
      </button>
    </section>
  );
}

function inferAvatar(event: GameEvent): PixelAvatar {
  if (event.type === "class") return event.id.includes("lms") || event.title.includes("LMS") ? "lms" : "professor";
  if (event.title.includes("팀플")) return "teammate";
  if (event.title.includes("개총") || event.title.includes("MT") || event.title.includes("술")) return "friend";
  return "system";
}

function speakerLabel(avatar: PixelAvatar) {
  return {
    player: "PLAYER",
    professor: "교수님",
    lms: "LMS",
    teammate: "팀원",
    friend: "동기",
    system: "SYSTEM",
  }[avatar];
}

function compactMoney(money: number) {
  if (Math.abs(money) >= 10000) return `${Math.round(money / 1000) / 10}만`;
  return `${money.toLocaleString()}`;
}

function HiddenStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="hidden-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function getEventIcon(event: GameEvent) {
  const title = `${event.id} ${event.title}`;
  if (title.includes("알람") || title.includes("지각")) return pixelAssetMap.eventIcon.lateWakeup;
  if (title.includes("혼밥")) return pixelAssetMap.eventIcon.soloMeal;
  if (title.includes("자휴")) return pixelAssetMap.eventIcon.selfHoliday;
  if (title.includes("과제") || title.includes("발표")) return pixelAssetMap.eventIcon.assignment;
  if (title.includes("LMS") || title.includes("성적")) return pixelAssetMap.eventIcon.lms;
  if (title.includes("팀플")) return pixelAssetMap.eventIcon.teamProject;
  if (title.includes("통학")) return pixelAssetMap.eventIcon.commute;
  if (title.includes("학식")) return pixelAssetMap.eventIcon.cafeteria;
  if (title.includes("카페인") || title.includes("졸음")) return pixelAssetMap.eventIcon.caffeine;
  if (title.includes("개총") || title.includes("술")) return pixelAssetMap.eventIcon.drinking;
  if (event.avatar && event.avatar in pixelAssetMap.avatar) return pixelAssetMap.avatar[event.avatar];
  return pixelAssetMap.avatar.system;
}
