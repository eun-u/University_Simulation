import { GameEvent } from "../types";

export const randomEvents: GameEvent[] = [
  {
    id: "random-solo-meal",
    type: "random",
    title: "혼밥 이벤트",
    time: "점심시간",
    avatar: "system",
    intro: ["친구들이 모두 수업이 다르다.", "학식당에 혼자 들어섰다.", "빈자리는 많지만 마음의 자리는 없다."],
    options: [
      {
        id: "confident",
        label: "당당하게 혼밥한다",
        resultText: "당당하게 혼밥했다.\n젓가락 소리가 오늘의 독립 선언문이었다.",
        effects: [
          { target: "soloMealTolerance", value: 10 },
          { target: "mental", value: 3 },
          { target: "money", value: -4500 },
        ],
      },
      {
        id: "store",
        label: "편의점으로 도망간다",
        resultText: "편의점으로 도망갔다.\n삼각김밥은 조용하고 믿음직했다.",
        effects: [
          { target: "money", value: -3000 },
          { target: "mental", value: 5 },
          { target: "stamina", value: 3 },
        ],
      },
      {
        id: "walk",
        label: "아는 사람을 찾는 척 걷는다",
        outcomes: [
          {
            weight: 20,
            resultText: "진짜 아는 사람을 발견했다.\n연기였는데 현실이 협조했다.",
            effects: [
              { target: "stamina", value: -5 },
              { target: "social", value: 5 },
              { target: "mental", value: 2 },
            ],
          },
          {
            weight: 80,
            resultText: "아는 사람은 없었다.\n걷기 운동만 했다.",
            effects: [
              { target: "stamina", value: -5 },
              { target: "mental", value: -3 },
            ],
          },
        ],
      },
      {
        id: "philosophy",
        label: "배고픔을 철학으로 승화한다",
        resultText: "배고픔을 철학으로 승화했다.\n철학은 배를 채워주지 않았다.",
        effects: [
          { target: "stamina", value: -10 },
          { target: "mental", value: -5 },
        ],
        addTitle: "공복의 현자",
      },
    ],
  },
  {
    id: "random-cafeteria",
    type: "random",
    title: "학식 룰렛",
    time: "점심시간",
    avatar: "friend",
    intro: ["오늘의 학식 메뉴는 이름만 봐서는 정체를 알 수 없다.", "하지만 줄은 이미 길다."],
    options: [
      {
        id: "meal",
        label: "학식을 먹는다",
        outcomes: [
          {
            weight: 40,
            resultText: "학식이 의외로 괜찮았다.\n오늘 식당은 패치가 잘 됐다.",
            effects: [
              { target: "money", value: -4500 },
              { target: "stamina", value: 8 },
              { target: "mental", value: 5 },
            ],
          },
          {
            weight: 60,
            resultText: "학식이 실패했다.\n메뉴명은 설명이 아니라 수수께끼였다.",
            effects: [
              { target: "money", value: -4500 },
              { target: "stamina", value: 8 },
              { target: "mental", value: -5 },
            ],
          },
        ],
      },
      {
        id: "triangle",
        label: "편의점 삼김을 먹는다",
        resultText: "삼각김밥을 먹었다.\n작지만 정확한 회복 아이템이었다.",
        effects: [
          { target: "money", value: -1500 },
          { target: "stamina", value: 4 },
          { target: "mental", value: 2 },
        ],
      },
      {
        id: "skip",
        label: "굶는다",
        resultText: "굶었다.\n지갑은 지켰지만 몸이 항의했다.",
        effects: [
          { target: "stamina", value: -8 },
          { target: "mental", value: -5 },
        ],
      },
      {
        id: "steal",
        label: "친구 밥을 한입 뺏는다",
        resultText: "친구 밥을 한입 뺏었다.\n우정이 3그램 줄었다.",
        effects: [
          { target: "stamina", value: 3 },
          { target: "social", value: -5 },
          { target: "mental", value: 3 },
        ],
      },
    ],
  },
  {
    id: "random-drinking",
    type: "random",
    title: "갑작스러운 술 약속",
    time: "저녁",
    avatar: "friend",
    intro: ["동기가 말했다.", "“오늘 가볍게 한잔?”", "대학생활에서 가볍다는 말은 대체로 무겁다."],
    options: [
      {
        id: "go",
        label: "간다",
        resultText: "가볍게 한잔은 가볍지 않았다.\n하지만 단톡방 친밀도는 올랐다.",
        effects: [
          { target: "social", value: 12 },
          { target: "money", value: -18000 },
          { target: "stamina", value: -15 },
          { target: "mental", value: 5 },
        ],
      },
      {
        id: "first",
        label: "1차만 간다",
        outcomes: [
          {
            weight: 65,
            resultText: "1차만 가고 빠졌다.\n탈출 성공. 지갑은 일부만 잃었다.",
            effects: [
              { target: "social", value: 6 },
              { target: "money", value: -9000 },
              { target: "stamina", value: -7 },
              { target: "mental", value: 3 },
            ],
          },
          {
            weight: 35,
            resultText: "2차에 끌려갔다.\n가볍다는 말이 다시 무거워졌다.",
            effects: [
              { target: "social", value: 12 },
              { target: "money", value: -18000 },
              { target: "stamina", value: -14 },
              { target: "mental", value: 2 },
            ],
          },
        ],
      },
      {
        id: "assignment",
        label: "과제 핑계를 댄다",
        resultText: "과제 핑계를 댔다.\n이번만큼은 과제가 당신을 구했다.",
        effects: [
          { target: "assignment", value: 3 },
          { target: "mental", value: 2 },
          { target: "social", value: -3 },
        ],
      },
      {
        id: "ignore",
        label: "읽씹한다",
        resultText: "읽씹했다.\n단톡방은 조용해졌고 마음도 조용해졌다.",
        effects: [
          { target: "mental", value: 8 },
          { target: "social", value: -8 },
        ],
        addTitle: "단톡방 은신자",
      },
    ],
  },
  {
    id: "random-commute",
    type: "random",
    title: "통학 지옥",
    time: "아침",
    avatar: "system",
    intro: ["버스가 오지 않는다.", "지하철은 이미 사람으로 가득하다.", "당신은 등교가 아니라 던전에 입장하고 있다."],
    options: [
      {
        id: "run",
        label: "뛰어서 환승한다",
        resultText: "뛰어서 환승했다.\n영혼은 플랫폼에 잠깐 두고 왔다.",
        effects: [
          { target: "stamina", value: -12 },
          { target: "attendance", value: 4 },
          { target: "mental", value: -5 },
        ],
      },
      {
        id: "late",
        label: "지각을 받아들인다",
        resultText: "지각을 받아들였다.\n받아들인 건 당신뿐이었다.",
        effects: [
          { target: "mental", value: 3 },
          { target: "attendance", value: -5 },
          { target: "professorAggro", value: 5 },
        ],
      },
      {
        id: "taxi",
        label: "택시를 탄다",
        resultText: "택시를 탔다.\n시간은 샀고 지갑은 팔렸다.",
        effects: [
          { target: "money", value: -12000 },
          { target: "attendance", value: 5 },
          { target: "mental", value: 2 },
        ],
      },
      {
        id: "fate",
        label: "오늘은 운명이 아니라고 판단한다",
        resultText: "오늘은 운명이 아니었다.\n출석부는 운명을 믿지 않았다.",
        effects: [
          { target: "mental", value: 10 },
          { target: "attendance", value: -8 },
          { target: "selfHolidayGauge", value: 10 },
        ],
      },
    ],
  },
  {
    id: "random-lms",
    type: "random",
    title: "LMS 알림 폭격",
    time: "LMS",
    avatar: "lms",
    intro: ["새 공지가 등록되었습니다.", "새 과제가 등록되었습니다.", "새 자료가 등록되었습니다.", "새 공지가 수정되었습니다.", "당신의 심장이 먼저 반응했다."],
    options: [
      {
        id: "check",
        label: "하나씩 확인한다",
        resultText: "하나씩 확인했다.\n알림은 줄었고 정신도 조금 줄었다.",
        effects: [
          { target: "assignment", value: 6 },
          { target: "grade", value: 3 },
          { target: "mental", value: -8 },
        ],
      },
      {
        id: "later",
        label: "나중에 확인한다",
        resultText: "나중에 보기로 했다.\n나중의 당신은 아직 이 사실을 모른다.",
        effects: [
          { target: "mental", value: 5 },
          { target: "assignment", value: -5 },
        ],
      },
      {
        id: "ask",
        label: "친구에게 요약을 부탁한다",
        resultText: "친구가 요약해줬다.\n대신 당신은 커피 한 번을 빚진 기분이다.",
        effects: [
          { target: "social", value: 3 },
          { target: "assignment", value: 2 },
          { target: "mental", value: -2 },
        ],
      },
      {
        id: "mute",
        label: "알림을 끈다",
        resultText: "알림을 껐다.\n세상은 조용해졌고 과제도 조용히 다가왔다.",
        effects: [
          { target: "mental", value: 10 },
          { target: "assignment", value: -10 },
          { target: "professorAggro", value: 5 },
        ],
        addTitle: "LMS로부터의 자유",
      },
    ],
  },
  {
    id: "random-team-silent",
    type: "random",
    title: "팀플 잠수 조원",
    time: "오후 11:38",
    avatar: "teammate",
    condition: { minWeek: 4 },
    intro: ["발표 준비 단톡방.", "한 조원이 아직도 메시지를 읽지 않았다.", "그의 마지막 접속은 어제다."],
    options: [
      {
        id: "do-it",
        label: "내가 대신 한다",
        resultText: "당신이 대신 했다.\n팀플은 끝났지만 당신 안의 무언가는 아직 야근 중이다.",
        effects: [
          { target: "teamContribution", value: 15 },
          { target: "teamStability", value: 5 },
          { target: "mental", value: -20 },
          { target: "grade", value: 5 },
        ],
        addTitle: "팀플의 순교자",
      },
      {
        id: "ping",
        label: "다시 연락한다",
        outcomes: [
          {
            weight: 40,
            resultText: "응답이 왔다.\n내용은 짧았지만 살아는 있었다.",
            effects: [
              { target: "mental", value: -5 },
              { target: "teamStability", value: 11 },
            ],
          },
          {
            weight: 60,
            resultText: "무응답이다.\n단톡방의 1은 사라지지 않았다.",
            effects: [
              { target: "mental", value: -13 },
              { target: "teamStability", value: 3 },
            ],
          },
        ],
      },
      {
        id: "record",
        label: "조용히 기록해둔다",
        resultText: "조용히 기록해뒀다.\n증거는 말보다 오래 산다.",
        effects: [
          { target: "teamContribution", value: 5 },
          { target: "professorAggro", value: -3 },
          { target: "social", value: -3 },
        ],
      },
      {
        id: "lol",
        label: "단톡방에 “ㅋㅋ”만 보낸다",
        outcomes: [
          {
            weight: 50,
            resultText: "혼란이 생겼다.\n의미 없는 웃음은 가끔 방어막이 된다.",
            effects: [
              { target: "mental", value: 5 },
              { target: "teamStability", value: -5 },
            ],
          },
          {
            weight: 50,
            resultText: "분위기가 악화됐다.\nㅋㅋ는 만능 문장이 아니었다.",
            effects: [
              { target: "social", value: -8 },
              { target: "teamStability", value: -10 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "random-balance",
    type: "random",
    title: "교재비 위기",
    time: "서점",
    avatar: "system",
    intro: ["교수님이 지정한 교재를 찾았다.", "가격표를 본 순간,", "당신은 전공을 다시 생각했다."],
    options: [
      {
        id: "new",
        label: "새 책을 산다",
        resultText: "새 책을 샀다.\n표지는 빛났고 잔고는 흐려졌다.",
        effects: [
          { target: "money", value: -30000 },
          { target: "grade", value: 8 },
          { target: "mental", value: -5 },
        ],
      },
      {
        id: "used",
        label: "중고책을 찾는다",
        outcomes: [
          {
            weight: 60,
            resultText: "중고책을 구했다.\n이전 주인의 밑줄도 함께 왔다.",
            effects: [
              { target: "money", value: -12000 },
              { target: "grade", value: 5 },
              { target: "mental", value: 3 },
            ],
          },
          {
            weight: 40,
            resultText: "품절이었다.\n중고시장도 수강신청처럼 빠르다.",
            effects: [
              { target: "mental", value: -5 },
              { target: "grade", value: -2 },
            ],
          },
        ],
      },
      {
        id: "borrow",
        label: "친구 책을 빌린다",
        resultText: "친구 책을 빌렸다.\n페이지마다 조심성이 필요해졌다.",
        effects: [
          { target: "social", value: 3 },
          { target: "grade", value: 3 },
          { target: "mental", value: -2 },
        ],
      },
      {
        id: "pdf",
        label: "PDF의 존재를 믿는다",
        outcomes: [
          {
            weight: 50,
            resultText: "PDF를 찾았다.\n합법성은 마음 한구석에 접어두었다.",
            effects: [
              { target: "grade", value: 5 },
              { target: "professorAggro", value: 3 },
            ],
          },
          {
            weight: 50,
            resultText: "PDF는 없었다.\n믿음은 검색 결과가 아니었다.",
            effects: [
              { target: "grade", value: -5 },
              { target: "professorAggro", value: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "random-caffeine",
    type: "random",
    title: "카페인 부작용",
    time: "새벽",
    avatar: "system",
    condition: { minHidden: { caffeine: 60 } },
    intro: ["커피는 당신을 살렸다.", "그리고 잠도 함께 가져갔다."],
    options: [
      {
        id: "more",
        label: "더 마신다",
        resultText: "더 마셨다.\n심장은 조별과제 단톡방보다 빠르게 울렸다.",
        effects: [
          { target: "stamina", value: 8 },
          { target: "grade", value: 3 },
          { target: "caffeine", value: 15 },
          { target: "mental", value: -8 },
        ],
      },
      {
        id: "water",
        label: "물을 마신다",
        resultText: "물을 마셨다.\n몸이 드디어 정상적인 선택을 받았다.",
        effects: [
          { target: "caffeine", value: -10 },
          { target: "stamina", value: 2 },
          { target: "mental", value: 3 },
        ],
      },
      {
        id: "endure",
        label: "그냥 버틴다",
        resultText: "그냥 버텼다.\n이것도 공부인지 지구력 테스트인지 모르겠다.",
        effects: [
          { target: "stamina", value: -5 },
          { target: "mental", value: -5 },
          { target: "grade", value: 2 },
        ],
      },
      {
        id: "reflect",
        label: "누워서 반성한다",
        resultText: "누워서 반성했다.\n반성은 했지만 알람은 맞추지 않았다.",
        effects: [
          { target: "stamina", value: 10 },
          { target: "grade", value: -5 },
          { target: "mental", value: 5 },
        ],
      },
    ],
  },
  {
    id: "random-self-holiday",
    type: "random",
    title: "자휴 유혹 재발",
    time: "오전",
    avatar: "system",
    condition: { minHidden: { selfHolidayGauge: 50 } },
    intro: ["몸이 먼저 알고 있다.", "오늘 수업은 멀고 침대는 가깝다."],
    options: [
      {
        id: "resist",
        label: "이번엔 간다",
        resultText: "이번엔 갔다.\n출석부가 당신을 낯설어했다.",
        effects: [
          { target: "attendance", value: 7 },
          { target: "grade", value: 3 },
          { target: "mental", value: -5 },
          { target: "selfHolidayGauge", value: -8 },
        ],
      },
      {
        id: "again",
        label: "자휴 루틴을 이어간다",
        resultText: "자휴 루틴이 이어졌다.\n이제 거의 생활 패턴이다.",
        effects: [
          { target: "mental", value: 10 },
          { target: "attendance", value: -9 },
          { target: "selfHolidayGauge", value: 12 },
          { target: "professorAggro", value: 6 },
        ],
      },
      {
        id: "recording",
        label: "녹강이 있을 거라고 믿는다",
        resultText: "녹강을 믿었다.\n업로드 여부는 교수님의 마음속에 있었다.",
        effects: [
          { target: "mental", value: 4 },
          { target: "grade", value: -4 },
          { target: "attendance", value: -4 },
        ],
      },
      {
        id: "half",
        label: "출석만 찍고 나온다",
        resultText: "출석만 찍고 나왔다.\n몸은 강의실에 있었고 마음은 이미 하교했다.",
        effects: [
          { target: "attendance", value: 3 },
          { target: "grade", value: -2 },
          { target: "mental", value: 4 },
        ],
      },
    ],
  },
];
