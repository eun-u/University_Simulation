# 한 학기만 버텨라: 대학생 생존 RPG
# 픽셀 디자인 가이드 v2.0

용도: Codex / 개발자 / 디자이너가 이 문서만 보고 앱 UI를 구현하기 위한 기준  
핵심 방향: **채팅형 UI + 16비트 픽셀 게임 HUD + 대학생활 밈**  
기준 레퍼런스 느낌: 어두운 남보라 배경, 큼직한 픽셀 타이틀, 스마트폰 UI 안에 게임 HUD가 들어간 모바일 게임 홍보 이미지

---

## 0. 이번 디자인에서 바뀌는 핵심

기존 방향은 “플랫 2D 아이콘이 들어간 채팅 앱”에 가까웠다.  
이제는 다음처럼 갈아엎는다.

```text
기존:
밝은 파스텔 배경
부드러운 라운드 카드
플랫 SVG 아이콘
현대적인 앱 UI

변경:
다크 네이비/퍼플 배경
두꺼운 픽셀 테두리
하드 섀도우
8비트/16비트 스프라이트
게임 HUD
레트로 모바일 RPG 광고 느낌
```

정확한 목표는 이거다.

```text
채팅 앱처럼 읽히지만,
겉보기는 완전히 픽셀 게임 UI처럼 보여야 한다.
```

---

## 1. 최종 디자인 한 줄 정의

**어두운 캠퍼스 밤 배경 위에서, 대학생활 이벤트가 픽셀 RPG 전투 로그처럼 뜨는 채팅형 생존 게임.**

겉모습:

```text
픽셀 모바일 게임
레트로 RPG HUD
어두운 보라/남색 밤 캠퍼스
두꺼운 픽셀 프레임
아이콘은 모두 16비트 스프라이트
```

동작 방식:

```text
채팅 로그를 읽는다
선택지를 누른다
스탯이 변한다
주차가 진행된다
성적표와 칭호를 받는다
```

---

## 2. 반드시 지켜야 하는 픽셀 룰

### 2-1. 부드러운 UI 금지

아래 표현은 금지한다.

```text
glassmorphism
blur shadow
neumorphism
부드러운 그라디언트 카드
너무 둥근 버튼
현대 SaaS 대시보드 느낌
일반 플랫 SVG 아이콘
```

대신 아래를 사용한다.

```text
4px 단위 하드 테두리
검은색 또는 짙은 남색 외곽선
계단식 픽셀 모서리
하드 드롭섀도우
제한된 색상 수
도트 패턴 / 디더링 / 체크 패턴
```

### 2-2. 모든 주요 UI는 픽셀 박스다

카드, 버튼, 말풍선, 결과창은 일반 라운드 카드가 아니라 픽셀 박스로 만든다.

좋은 형태:

```text
┌────────────────────┐
│  [오후 5:34]       │
│  교수님의 공격이   │
│  시작되었다         │
└────────────────────┘
```

나쁜 형태:

```text
둥글둥글한 흰색 카드 + 부드러운 그림자
```

### 2-3. Shadow는 blur 없이 offset만

```css
/* 좋음 */
box-shadow: 6px 6px 0 #05051a;

/* 나쁨 */
box-shadow: 0 20px 40px rgba(0,0,0,.2);
```

### 2-4. 이미지 출력은 pixelated

```css
.pixel-art {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
```

### 2-5. 기본 단위는 4px

픽셀 UI는 4px 단위로 맞춘다.

```text
테두리: 4px
내부 여백: 12px / 16px / 20px
버튼 높이: 56px
아이콘: 24px / 32px / 48px / 64px
카드 그림자: 4px 또는 6px offset
```

---

## 3. 컬러 방향

### 3-1. 메인 팔레트 이름

**Night Campus Pixel**

대학생활 밤샘, LMS 알림, 시험기간, 레트로 RPG를 모두 담는 색상이다.

```text
기본 배경: 아주 짙은 네이비
메인 패널: 보라가 섞인 남색
강조색: 보라 / 라벤더
보상색: 골드
위험색: 코랄 레드
회복색: 민트
정보색: 시안
```

### 3-2. CSS 컬러 토큰

```css
:root {
  /* Background */
  --px-bg-950: #06061a;
  --px-bg-900: #0b0b2e;
  --px-bg-850: #10103a;
  --px-bg-800: #171044;

  /* Panels */
  --px-panel-900: #151234;
  --px-panel-800: #1e174d;
  --px-panel-700: #2b2166;
  --px-panel-600: #3b2a7a;

  /* Pixel borders */
  --px-line-black: #03030d;
  --px-line-dark: #0f1024;
  --px-line-mid: #5148a6;
  --px-line-light: #9b7cff;

  /* Text */
  --px-text-main: #fff7e8;
  --px-text-sub: #c9c1f2;
  --px-text-muted: #8f87bd;
  --px-text-dark: #181225;

  /* Accents */
  --px-purple: #8b5cf6;
  --px-purple-light: #b794ff;
  --px-blue: #315bea;
  --px-cyan: #52d6ff;
  --px-mint: #4ee39a;
  --px-gold: #ffd166;
  --px-orange: #ff9f1c;
  --px-coral: #ff5c7a;
  --px-red: #ff3b5c;

  /* Stat colors */
  --stat-mental: #ff5c9a;
  --stat-grade: #ffd166;
  --stat-stamina: #ff6b6b;
  --stat-money: #f6c445;
  --stat-social: #52d6ff;
  --stat-aggro: #ff3b5c;

  /* Effects */
  --effect-good: #4ee39a;
  --effect-bad: #ff5c7a;
  --effect-neutral: #b794ff;
}
```

### 3-3. 화면별 색상 비율

```text
배경 네이비/남색: 60%
패널 보라/짙은 블루: 25%
텍스트 아이보리/라벤더: 8%
골드/민트/코랄 포인트: 7%
```

너무 밝게 만들면 픽셀 게임 느낌이 약해진다.  
전체적으로 **밤 배경 + 네온 픽셀 포인트** 느낌을 유지한다.

---

## 4. 폰트 / 타이포그래피

### 4-1. 원칙

텍스트도 픽셀 느낌이 나야 한다.  
단, 본문 가독성은 유지해야 한다.

권장 구조:

```text
타이틀 / 버튼 / HUD 숫자: 픽셀 폰트
긴 본문 채팅: 가독성 좋은 한글 폰트 또는 픽셀 느낌이 약한 폰트
```

픽셀 폰트만 전부 쓰면 긴 문장이 피곤할 수 있다.  
따라서 본문은 살짝 타협한다.

### 4-2. 추천 폰트 스택

```css
:root {
  --font-pixel: "NeoDunggeunmo", "DungGeunMo", "Galmuri11",
    "Press Start 2P", monospace;

  --font-body: "Galmuri11", "NeoDunggeunmo", "Noto Sans KR",
    system-ui, sans-serif;
}
```

라이선스 확인 후 사용할 것.  
폰트를 못 넣는 경우에도 `monospace` fallback으로 동작하게 한다.

### 4-3. 타이포그래피 크기

| 용도 | 크기 | 폰트 | 굵기 |
|---|---:|---|---:|
| 메인 타이틀 | 32~42px | pixel | 800 |
| 주차 제목 | 18~22px | pixel | 800 |
| 이벤트 제목 | 17~20px | pixel | 800 |
| 채팅 본문 | 15~16px | body | 500 |
| 선택지 버튼 | 15~16px | pixel/body | 800 |
| HUD 라벨 | 10~12px | pixel | 700 |
| HUD 숫자 | 12~14px | pixel | 800 |
| 결과 등급 | 48~72px | pixel | 900 |

### 4-4. 타이틀 스타일

타이틀은 단순 텍스트가 아니라 픽셀 로고처럼 보이게 한다.

```css
.pixel-title {
  font-family: var(--font-pixel);
  color: var(--px-text-main);
  text-shadow:
    4px 0 0 var(--px-purple),
    0 4px 0 var(--px-purple),
    4px 4px 0 var(--px-line-black);
  letter-spacing: -0.04em;
}
```

---

## 5. 레이아웃 구조

### 5-1. 모바일 우선

앱은 스마트폰 게임처럼 보여야 한다.

```text
최대 폭: 430~480px
데스크톱에서는 중앙에 게임기/폰 화면처럼 배치
전체 배경은 픽셀 밤 캠퍼스
앱 내부는 다크 픽셀 패널
```

```css
body {
  background:
    linear-gradient(#06061a, #0b0b2e);
}

.app-shell {
  max-width: 480px;
  min-height: 100dvh;
  margin: 0 auto;
  background: var(--px-bg-900);
  color: var(--px-text-main);
  border-left: 4px solid var(--px-line-black);
  border-right: 4px solid var(--px-line-black);
}
```

### 5-2. 화면 기본 구조

```text
┌─────────────────────────┐
│ Pixel HUD Header         │
│ 1학년 1학기 / 3주차 / 코인│
├─────────────────────────┤
│ Stat HUD                 │
│ 멘탈 학점 체력 지갑 ...  │
├─────────────────────────┤
│ Week/Event Pixel Banner  │
├─────────────────────────┤
│ Chat Log Window          │
│ 교수님 / LMS / 시스템     │
├─────────────────────────┤
│ Choice Buttons           │
└─────────────────────────┘
```

### 5-3. 데스크톱 배경

데스크톱에서는 앱 카드 바깥에 픽셀 캠퍼스 밤 배경을 깔 수 있다.

```text
왼쪽 아래: 책 더미 / 가방
오른쪽 아래: 노트북 / 체크리스트
배경: 대학 건물 실루엣, 별, 픽셀 구름
```

MVP에서는 CSS 패턴으로 대체 가능하다.

---

## 6. 픽셀 UI 컴포넌트 규칙

### 6-1. 공통 Pixel Panel

모든 주요 카드의 기본이다.

```css
.pixel-panel {
  position: relative;
  background: var(--px-panel-800);
  border: 4px solid var(--px-line-black);
  box-shadow:
    0 0 0 4px var(--px-line-mid) inset,
    6px 6px 0 var(--px-line-black);
  color: var(--px-text-main);
}
```

모서리는 너무 둥글게 하지 않는다.

```css
.pixel-panel {
  border-radius: 0;
}
```

모서리 장식을 넣고 싶으면 `clip-path`를 사용한다.

```css
.pixel-cut-corner {
  clip-path: polygon(
    0 8px, 8px 8px, 8px 0,
    calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px,
    100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px),
    calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px),
    0 calc(100% - 8px)
  );
}
```

---

### 6-2. Pixel Header / HUD

상단은 앱 헤더가 아니라 게임 HUD다.

표시 요소:

```text
작은 플레이어 아이콘
1학년 1학기
현재 주차
DAY 또는 WEEK
멘탈 하트
코인
저장 상태
```

예시:

```text
[🙂] 1학년 1학기   WEEK 03
♥ 62   🪙 42,000
```

스타일:

```css
.pixel-hud {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px;
  background: var(--px-panel-900);
  border-bottom: 4px solid var(--px-line-black);
  font-family: var(--font-pixel);
}
```

---

### 6-3. Stat HUD

스탯 패널은 현대적인 카드 그리드가 아니라 **게임 상태창**처럼 만든다.

권장 배치:

```text
♥ 멘탈   [████░░░] 62/100
★ 학점   [█████░] 3.2/4.5
♦ 체력   [███░░░] 45/100
▣ 지갑   12,400원
👥 관계   [███░░░] 51/100
👁 어그로 [████░░] 집중 감시
```

CSS:

```css
.stat-hud {
  padding: 12px;
  background: var(--px-panel-900);
  border-bottom: 4px solid var(--px-line-black);
}

.stat-row {
  display: grid;
  grid-template-columns: 72px 1fr 56px;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-family: var(--font-pixel);
  font-size: 12px;
}

.pixel-meter {
  height: 12px;
  background: #0b0b2e;
  border: 2px solid var(--px-line-black);
  box-shadow: 2px 2px 0 var(--px-line-black);
}

.pixel-meter__fill {
  height: 100%;
  background: var(--stat-mental);
}
```

바는 부드럽게 애니메이션하지 않는다.  
픽셀 게임처럼 계단식으로 변한다.

---

### 6-4. Chat Window

채팅창도 현대 말풍선이 아니라 픽셀 로그 창이다.

```css
.chat-window {
  margin: 12px;
  padding: 12px;
  background: #0d0b2b;
  border: 4px solid var(--px-line-black);
  box-shadow:
    0 0 0 4px var(--px-panel-600) inset,
    6px 6px 0 #03030d;
}
```

메시지 말풍선:

```css
.pixel-bubble {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.pixel-bubble__avatar {
  width: 48px;
  height: 48px;
  image-rendering: pixelated;
  border: 3px solid var(--px-line-black);
  background: var(--px-panel-700);
}

.pixel-bubble__box {
  flex: 1;
  padding: 10px 12px;
  background: var(--px-panel-800);
  border: 3px solid var(--px-line-black);
  box-shadow: 4px 4px 0 var(--px-line-black);
}
```

발신자별 컬러:

| 발신자 | 패널색 | 강조색 |
|---|---|---|
| 교수님 | 짙은 보라 | 코랄 레드 |
| LMS | 짙은 블루 | 시안 |
| 팀플 조원 | 어두운 바이올렛 | 골드 |
| 친구 | 네이비 | 민트 |
| 시스템 | 블랙퍼플 | 라벤더 |
| 플레이어 | 로열 퍼플 | 골드 |

---

### 6-5. 선택지 버튼

선택지는 게임 커맨드 버튼처럼 만든다.

```css
.choice-button {
  width: 100%;
  min-height: 56px;
  padding: 12px 14px;
  background: var(--px-panel-700);
  color: var(--px-text-main);
  border: 4px solid var(--px-line-black);
  box-shadow:
    0 0 0 3px var(--px-line-light) inset,
    5px 5px 0 var(--px-line-black);
  font-family: var(--font-pixel);
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}
```

hover:

```css
.choice-button:hover {
  background: var(--px-purple);
  transform: translate(-2px, -2px);
  box-shadow:
    0 0 0 3px var(--px-purple-light) inset,
    7px 7px 0 var(--px-line-black);
}
```

active:

```css
.choice-button:active {
  transform: translate(3px, 3px);
  box-shadow:
    0 0 0 3px var(--px-line-light) inset,
    2px 2px 0 var(--px-line-black);
}
```

선택지 내부에 작은 픽셀 아이콘을 넣을 수 있다.

```text
🌙 꿈속으로
🚪 문을 뚫고 집
✍️ 필기하는 척
🙏 기도한다
```

실제 아이콘은 emoji보다 픽셀 스프라이트를 권장한다.

---

### 6-6. Result Panel

결과는 RPG 전투 결과창처럼 보여준다.

```text
RESULT
당신은 꿈속으로 대피했다.
하지만 꿈속에서도 교수님은 판서를 하고 있었다.

획득/손실
멘탈 +10
학점 -6
교수님 어그로 +5
```

CSS:

```css
.result-panel {
  margin: 12px;
  padding: 14px;
  background: var(--px-panel-900);
  border: 4px solid var(--px-line-black);
  box-shadow:
    0 0 0 4px var(--px-gold) inset,
    6px 6px 0 var(--px-line-black);
}
```

효과 pill도 둥근 pill이 아니라 픽셀 태그로 만든다.

```css
.effect-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  margin: 4px;
  background: var(--px-bg-800);
  border: 3px solid var(--px-line-black);
  font-family: var(--font-pixel);
  font-size: 12px;
}

.effect-chip--good {
  color: var(--effect-good);
}

.effect-chip--bad {
  color: var(--effect-bad);
}
```

---

### 6-7. Week Progress

주차 진행은 RPG 월드맵/스테이지 진행처럼 보여준다.

```text
1주 ─ 2주 ─ 3주 ─ 4주 ─ 시험
 ✅    ✅    ✅    🔒    👹
```

UI:

```css
.week-map {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px;
  overflow-x: auto;
}

.week-node {
  min-width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: var(--px-panel-700);
  border: 3px solid var(--px-line-black);
  box-shadow: 3px 3px 0 var(--px-line-black);
  font-family: var(--font-pixel);
}
```

현재 주차는 골드로 표시한다.

```css
.week-node--current {
  background: var(--px-gold);
  color: var(--px-text-dark);
}
```

---

### 6-8. Final Result Card

최종 성적 확인은 가장 게임스러워야 한다.

구조:

```text
┌─────────────────────────┐
│       생존 결과          │
│          A-              │
│   나름 잘 버텼습니다!    │
├─────────────────────────┤
│ 전공필수 B+              │
│ 교양 A0                  │
│ 팀플 과목 C+             │
│ 정체불명 과목 B0         │
├─────────────────────────┤
│ 획득 칭호                │
│ [카페인 생존자] [자휴의 사도]│
├─────────────────────────┤
│ 다음 학기로!             │
└─────────────────────────┘
```

디자인:

```css
.final-card {
  margin: 16px;
  padding: 18px;
  background: var(--px-panel-900);
  border: 5px solid var(--px-line-black);
  box-shadow:
    0 0 0 5px var(--px-gold) inset,
    8px 8px 0 var(--px-line-black);
}

.final-grade {
  font-family: var(--font-pixel);
  font-size: 64px;
  color: var(--px-gold);
  text-shadow: 4px 4px 0 var(--px-line-black);
}
```

---

## 7. 화면별 구체 디자인

### 7-1. 시작 화면

목표: “픽셀 모바일 게임”이라는 인상을 1초 안에 준다.

구성:

```text
픽셀 밤 캠퍼스 배경
큰 픽셀 로고: 한 학기만 버텨라
서브타이틀: 대학생 생존 RPG
작은 픽셀 장식: 책, 커피, 알람, LMS
[새 학기 시작]
[이어하기]
```

배경:

```text
어두운 남색 하늘
보라색 대학 건물 실루엣
픽셀 별
작은 창문 불빛
하단에 가방/책더미 장식
```

CTA 버튼:

```text
새 학기 시작하기 → 골드/보라 강조
이어하기 → 어두운 패널
```

---

### 7-2. 인게임 기본 화면

구성 순서:

```text
HUD Header
Stat HUD
위험 상태 배너
Event Banner 또는 Event Icon
Chat Window
Choice Buttons
```

예시:

```text
[1학년 1학기] WEEK 03
♥ 62   ★ 2.8   🪙 12,400

[오후 5:34]
교수님의 공격이 시작되었다.

대피할 장소는?

[꿈속으로]
[문을 뚫고 집]
[필기하는 척]
[옆 사람을 본다]
```

---

### 7-3. 수업 이벤트 화면

교수님, LMS, 출석 체크 등은 전투 로그처럼 보이게 한다.

```text
BATTLE LOG 느낌이지만,
텍스트는 대학생활 현실 이벤트.
```

예시:

```text
교수님의 공격!
“이 부분 설명해볼 사람?”

효과:
멘탈 -8
교수님 어그로 +5
```

화면 색:

```text
교수님 이벤트: 보라 + 코랄
LMS 이벤트: 네이비 + 시안
출석 이벤트: 짙은 보라 + 골드
```

---

### 7-4. 랜덤 생활 이벤트 화면

생활 이벤트는 짧고 빠르게.

예시:

```text
[점심시간]
친구들이 모두 수업이 다르다.
학식당에 혼자 들어섰다.

[당당하게 혼밥한다]
[편의점으로 도망간다]
[아는 사람을 찾는 척 걷는다]
[배고픔을 철학으로 승화한다]
```

아이콘:

```text
혼밥: 식판/삼김
자휴: 침대/문
통학: 버스/지하철
술약속: 잔/단톡
```

---

### 7-5. 시험 화면

중간/기말은 보스전 느낌을 준다.

구성:

```text
BOSS: 중간고사
D-0
시험지 픽셀 아이콘
커피 / 다크서클 / 타이머
```

컬러:

```text
배경 더 어둡게
위험색 코랄 증가
버튼은 보라/블루 유지
```

---

### 7-6. 성적 확인 화면

최종 보스/보상 화면.

```text
성적 확인 버튼이 당신을 노려본다.

[바로 확인한다]
[친구 성적부터 물어본다]
[하루 미룬다]
[부모님 연락을 먼저 차단한다]
```

이후:

```text
픽셀 등급 배지
성적표
칭호
엔딩
```

---

## 8. 앱에 필요한 이미지/스프라이트 설계

이제 이미지는 플랫 SVG가 아니라 **픽셀 스프라이트 / 픽셀 배너 / 픽셀 UI 파츠**로 생각한다.

### 8-1. 권장 파일 방식

```text
캐릭터/아이콘: PNG, transparent, nearest-neighbor upscale
UI 프레임: CSS 또는 PNG 9-slice
배경: PNG
로고: PNG 또는 SVG, 단 픽셀 형태 유지
```

픽셀 이미지는 SVG보다 PNG가 더 자연스럽다.  
SVG를 쓸 경우에도 shape를 픽셀처럼 계단식으로 만들어야 한다.

### 8-2. 해상도 규칙

디자인은 작은 캔버스에서 만들고 확대한다.

| 에셋 | 원본 픽셀 캔버스 | 내보내기 |
|---|---:|---:|
| 스탯 아이콘 | 16x16 또는 24x24 | 4x 확대 |
| 이벤트 아이콘 | 32x32 | 4x 확대 |
| 아바타 | 48x48 또는 64x64 | 4x 확대 |
| 칭호 배지 | 64x64 또는 96x96 | 3~4x 확대 |
| 주차 배너 | 320x120 | 3x 확대 |
| 시작 배경 | 360x640 | 3x 확대 |
| 최종 결과 카드 배경 | 360x640 | 3x 확대 |

절대 처음부터 고해상도 일러스트처럼 그리지 않는다.

### 8-3. 필수 이미지 목록

#### A. 로고 / 타이틀

| 키 | 설명 |
|---|---|
| `logo_title_pixel` | 한 학기만 버텨라 픽셀 로고 |
| `logo_subtitle_pixel` | 대학생 생존 RPG 서브타이틀 |

#### B. 배경

| 키 | 설명 |
|---|---|
| `bg_night_campus` | 밤 캠퍼스 메인 배경 |
| `bg_classroom_night` | 수업/교수 이벤트 배경 |
| `bg_library_exam` | 시험기간 도서관/책상 배경 |
| `bg_result_stage` | 최종 결과 화면 배경 |

#### C. 메시지 아바타

| 키 | 크기 | 설명 |
|---|---:|---|
| `avatar_player` | 64x64 | 지친 대학생 |
| `avatar_professor` | 64x64 | 교수님 NPC |
| `avatar_lms` | 64x64 | LMS 알림 몬스터/봇 |
| `avatar_teammate` | 64x64 | 팀플 조원 |
| `avatar_friend` | 64x64 | 동기/친구 |
| `avatar_system` | 64x64 | 시스템 로봇/고양이 |

#### D. 스탯 아이콘

| 키 | 설명 |
|---|---|
| `stat_mental` | 뇌/깨진 하트 |
| `stat_grade` | 별/A+ 종이 |
| `stat_stamina` | 하트/번개 |
| `stat_money` | 코인/지갑 |
| `stat_social` | 말풍선/두 사람 |
| `stat_aggro` | 눈/경고 표시 |

#### E. 주차 배너

| 키 | 설명 |
|---|---|
| `banner_week1_start` | 개강, 강의실, 시간표 |
| `banner_week2_opening_party` | 개총, 단톡, 치킨집 |
| `banner_week3_mt` | MT 버스, 밤 숙소 |
| `banner_week4_team_project` | 노트북, 단톡, 조 편성 |
| `banner_week7_midterm` | 시험지, 커피, D-day |
| `banner_week9_sports_day` | 운동장, 계주, 응원 |
| `banner_week14_final` | 새벽 책상, 기말고사 |
| `banner_week16_grade_check` | 포털, 성적표, 떨리는 손 |

#### F. 이벤트 아이콘

| 키 | 설명 |
|---|---|
| `event_late_wakeup` | 알람시계 |
| `event_solo_meal` | 학식 식판/삼김 |
| `event_self_holiday` | 침대/자휴 |
| `event_assignment` | 과제 문서/D-day |
| `event_lms` | LMS 알림 |
| `event_team_project` | 노트북/단톡 |
| `event_commute` | 버스/지하철 |
| `event_cafeteria` | 학식 |
| `event_caffeine` | 커피/에너지드링크 |
| `event_drinking` | 술자리/잔 |

#### G. 배지 / 칭호

| 키 | 설명 |
|---|---|
| `badge_normal` | 일반 칭호 |
| `badge_rare` | 희귀 칭호 |
| `badge_danger` | 위험/번아웃 칭호 |
| `badge_academic` | 학업/성적 칭호 |
| `badge_survival` | 생존/자휴 칭호 |

#### H. UI 파츠

| 키 | 설명 |
|---|---|
| `ui_panel_frame` | 기본 픽셀 패널 프레임 |
| `ui_chat_frame` | 채팅 로그 프레임 |
| `ui_choice_button` | 선택지 버튼 기본 |
| `ui_result_frame` | 결과창 프레임 |
| `ui_progress_node` | 주차 진행 노드 |
| `ui_coin` | 코인 |
| `ui_heart` | 하트 |
| `ui_exp` | EXP 아이콘 |

---

## 9. 이미지 생성용 마스터 프롬프트

이미지를 실제로 만들 때는 아래 스타일 프롬프트를 기본으로 사용한다.

### 9-1. Master Pixel Style Prompt

```text
Retro 16-bit pixel art for a Korean university survival mobile game, dark navy and royal purple night campus palette, chunky black pixel outlines, limited color palette, crisp square pixels, no anti-aliasing, no smooth vector shapes, no gradients except subtle pixel dithering, cute but slightly stressful college-life mood, readable game UI, pixel RPG HUD style, 2D sprite art, nearest-neighbor upscaled, transparent background where appropriate.
```

### 9-2. Negative Prompt

```text
smooth vector illustration, flat modern app icon, glassmorphism, soft blur shadow, 3D render, realistic photo, watercolor, painterly, anime illustration, high-detail concept art, antialiased edges, glossy gradient, rounded SaaS dashboard, minimal corporate UI
```

### 9-3. Korean Style Prompt

```text
한국 대학생활 생존 게임용 16비트 픽셀 아트. 어두운 네이비와 로열 퍼플 밤 캠퍼스 팔레트, 두꺼운 검은 픽셀 외곽선, 제한된 색상, 선명한 사각 픽셀, 안티앨리어싱 없는 도트 느낌, 귀엽지만 약간 피곤한 대학생 밈 분위기, RPG HUD와 모바일 게임 UI 느낌, 투명 배경이 필요한 에셋은 투명 배경.
```

---

## 10. 에셋별 구체 프롬프트

### 10-1. 교수님 아바타

```text
A 64x64 pixel art avatar of a Korean university professor NPC, gray hair, glasses, stern expression, holding a pointer stick, brown jacket, tiny exclamation mark bubble, retro 16-bit RPG portrait, dark navy/purple outline frame, chunky black pixel outline, limited palette, transparent background, crisp pixels, no anti-aliasing.
```

### 10-2. LMS 아바타

```text
A 64x64 pixel art avatar of an LMS notification monster bot for a college survival game, small computer screen face, red notification badge with number 3, glowing cyan eyes, dark purple body, cute but threatening, chunky black pixel outline, retro 16-bit mobile RPG style, transparent background, crisp pixels.
```

### 10-3. 플레이어 아바타

```text
A 64x64 pixel art avatar of a tired Korean college student, hoodie, backpack strap, sleepy eyes, holding iced coffee, cute survival game character portrait, dark navy and purple palette with mint/coral accents, chunky black outline, transparent background, crisp 16-bit pixels.
```

### 10-4. 스탯 아이콘 세트

```text
A sprite sheet of six 24x24 pixel art stat icons for a Korean college survival RPG: mental brain/heart, grade star or A+ paper, stamina heart/lightning, money coin/wallet, social chat bubbles, professor aggro angry eye. Dark navy/purple UI palette, gold, mint, coral accents, chunky black pixel outlines, transparent background, crisp square pixels.
```

### 10-5. 주차 배너 공통

```text
A 320x120 pixel art banner for a Korean university survival RPG mobile game, dark night campus palette, chunky pixel outlines, retro 16-bit style, readable UI background, no realistic detail, no smooth gradients, crisp pixels.
```

주차별 주제만 붙인다.

```text
Week 1 opening semester: classroom, timetable, books, nervous student.
Week 2 opening party: group chat notification, restaurant table, name tags.
Week 3 MT: bus, mountain lodge, night sky, awkward students.
Week 4 team project: laptops, group chat bubbles, presentation board.
Week 7 midterm: exam paper, coffee, D-day timer, stressed mood.
Week 9 sports day: school field, relay baton, cheering flags.
Week 14 final exam: midnight desk, textbook pile, coffee steam.
Week 16 grade check: portal login, grade report, shaking cursor.
```

### 10-6. 선택지 버튼용 아이콘

```text
A set of 32x32 pixel art command icons for a college survival choice UI: dream bed with moon, escape door with arrow, notebook pretending to write, prayer hands, coffee, alarm clock, cafeteria tray, team project laptop. Retro 16-bit style, dark purple outline, transparent background, crisp pixels.
```

### 10-7. 최종 결과 배지

```text
Pixel art grade result badge for a Korean college survival RPG, large A- rank shield with gold laurel, dark purple frame, small ribbon banner, celebratory but exhausted mood, 16-bit pixel game UI, chunky black outline, crisp pixels, transparent background.
```

---

## 11. Codex 구현 지시 핵심

Codex에게는 다음 문장을 반드시 준다.

```text
기존 플랫/파스텔 앱 디자인으로 만들지 말고, 완전히 픽셀 게임 UI처럼 만들어줘.
모든 카드, 버튼, 말풍선은 pixel-panel 스타일을 사용해.
부드러운 box-shadow, glassmorphism, 현대적인 둥근 카드 UI는 사용하지 마.
색상은 Night Campus Pixel 팔레트를 사용해.
텍스트는 채팅형으로 읽히되, HUD/버튼/제목은 픽셀 폰트를 사용해.
이미지는 PNG pixel sprite를 우선하고, CSS에는 image-rendering: pixelated를 적용해.
```

---

## 12. 구현용 컴포넌트 구조

```text
src/
  App.tsx

  assets/
    pixel/
      avatars/
      icons/
      banners/
      badges/
      ui/
      backgrounds/
      assetMap.ts

  components/
    PixelAppShell.tsx
    PixelHudHeader.tsx
    PixelStatHud.tsx
    PixelMeter.tsx
    PixelWeekMap.tsx
    PixelEventScene.tsx
    PixelChatWindow.tsx
    PixelChatBubble.tsx
    PixelChoiceButton.tsx
    PixelResultPanel.tsx
    PixelEffectChip.tsx
    PixelWeekSummary.tsx
    PixelBadge.tsx
    PixelFinalResultCard.tsx

  styles/
    pixel-tokens.css
    pixel-components.css
```

---

## 13. AssetMap 설계

```ts
export const pixelAssetMap = {
  logo: {
    title: "/assets/pixel/logo/logo_title_pixel.png",
  },

  background: {
    nightCampus: "/assets/pixel/backgrounds/bg_night_campus.png",
    classroomNight: "/assets/pixel/backgrounds/bg_classroom_night.png",
    libraryExam: "/assets/pixel/backgrounds/bg_library_exam.png",
    resultStage: "/assets/pixel/backgrounds/bg_result_stage.png",
  },

  avatar: {
    player: "/assets/pixel/avatars/avatar_player.png",
    professor: "/assets/pixel/avatars/avatar_professor.png",
    lms: "/assets/pixel/avatars/avatar_lms.png",
    teammate: "/assets/pixel/avatars/avatar_teammate.png",
    friend: "/assets/pixel/avatars/avatar_friend.png",
    system: "/assets/pixel/avatars/avatar_system.png",
  },

  statIcon: {
    mental: "/assets/pixel/icons/stat_mental.png",
    grade: "/assets/pixel/icons/stat_grade.png",
    stamina: "/assets/pixel/icons/stat_stamina.png",
    money: "/assets/pixel/icons/stat_money.png",
    social: "/assets/pixel/icons/stat_social.png",
    aggro: "/assets/pixel/icons/stat_aggro.png",
  },

  banner: {
    week1: "/assets/pixel/banners/banner_week1_start.png",
    week2: "/assets/pixel/banners/banner_week2_opening_party.png",
    week3: "/assets/pixel/banners/banner_week3_mt.png",
    week4: "/assets/pixel/banners/banner_week4_team_project.png",
    week7: "/assets/pixel/banners/banner_week7_midterm.png",
    week9: "/assets/pixel/banners/banner_week9_sports_day.png",
    week14: "/assets/pixel/banners/banner_week14_final.png",
    week16: "/assets/pixel/banners/banner_week16_grade_check.png",
  },

  eventIcon: {
    lateWakeup: "/assets/pixel/icons/event_late_wakeup.png",
    soloMeal: "/assets/pixel/icons/event_solo_meal.png",
    selfHoliday: "/assets/pixel/icons/event_self_holiday.png",
    assignment: "/assets/pixel/icons/event_assignment.png",
    lms: "/assets/pixel/icons/event_lms.png",
    teamProject: "/assets/pixel/icons/event_team_project.png",
    commute: "/assets/pixel/icons/event_commute.png",
    cafeteria: "/assets/pixel/icons/event_cafeteria.png",
    caffeine: "/assets/pixel/icons/event_caffeine.png",
    drinking: "/assets/pixel/icons/event_drinking.png",
  },

  badge: {
    normal: "/assets/pixel/badges/badge_normal.png",
    rare: "/assets/pixel/badges/badge_rare.png",
    danger: "/assets/pixel/badges/badge_danger.png",
    academic: "/assets/pixel/badges/badge_academic.png",
    survival: "/assets/pixel/badges/badge_survival.png",
  },

  ui: {
    coin: "/assets/pixel/ui/ui_coin.png",
    heart: "/assets/pixel/ui/ui_heart.png",
    exp: "/assets/pixel/ui/ui_exp.png",
  },
} as const;
```

---

## 14. 픽셀 UI CSS 시작점

```css
.pixel-panel {
  background: var(--px-panel-800);
  border: 4px solid var(--px-line-black);
  box-shadow:
    0 0 0 4px var(--px-line-mid) inset,
    6px 6px 0 var(--px-line-black);
}

.pixel-button {
  background: var(--px-panel-700);
  border: 4px solid var(--px-line-black);
  color: var(--px-text-main);
  box-shadow:
    0 0 0 3px var(--px-line-light) inset,
    5px 5px 0 var(--px-line-black);
  font-family: var(--font-pixel);
}

.pixel-button:hover {
  background: var(--px-purple);
  transform: translate(-2px, -2px);
  box-shadow:
    0 0 0 3px var(--px-purple-light) inset,
    7px 7px 0 var(--px-line-black);
}

.pixel-button:active {
  transform: translate(3px, 3px);
  box-shadow:
    0 0 0 3px var(--px-line-light) inset,
    2px 2px 0 var(--px-line-black);
}

.pixel-art {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
```

---

## 15. 디자인 QA 체크리스트

아래 중 하나라도 아니면 픽셀 느낌이 약하다.

### 필수

- [ ] 배경이 다크 네이비/퍼플 계열인가?
- [ ] 카드에 blur shadow가 없는가?
- [ ] 버튼에 하드 픽셀 shadow가 있는가?
- [ ] 테두리가 최소 3~4px로 두꺼운가?
- [ ] 주요 텍스트가 픽셀 폰트인가?
- [ ] 스탯바가 픽셀 meter처럼 보이는가?
- [ ] 아바타/아이콘이 플랫 SVG가 아니라 픽셀 스프라이트처럼 보이는가?
- [ ] 결과 화면이 게임 보상창처럼 보이는가?
- [ ] 앱을 멀리서 봐도 “게임”으로 보이는가?

### 금지

- [ ] 유리 질감/blur/glassmorphism
- [ ] 너무 부드러운 라운드 카드
- [ ] 일반 이모지로만 구성된 아이콘
- [ ] 흰 배경 위주의 현대 앱 UI
- [ ] 얇은 1px border
- [ ] 부드러운 파스텔만 사용하는 톤

---

## 16. 최종 방향 요약

```text
읽는 방식은 채팅.
보이는 방식은 픽셀 RPG.
상황은 대학생활.
감정은 웃기지만 절박함.
```

이 앱의 디자인은 **픽셀 모바일 게임 광고 이미지 안에 실제 앱이 들어간 느낌**이어야 한다.

즉, 사용자가 첫 화면을 보자마자 이렇게 느껴야 한다.

```text
아, 이거 그냥 텍스트 앱이 아니라
대학생활을 게임처럼 만든 픽셀 생존 RPG구나.
```