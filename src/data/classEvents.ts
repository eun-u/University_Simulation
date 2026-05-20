import { GameEvent } from "../types";

export const classEvents: GameEvent[] = [
  {
    id: "class-late-wakeup",
    type: "class",
    title: "알람 7개의 패배",
    time: "오전 9:42",
    avatar: "system",
    assetKey: "week1",
    intro: ["알람 7개가 모두 패배했다.", "1교시는 이미 전설이 되었다."],
    options: [
      {
        id: "run",
        label: "지금이라도 뛰어간다",
        resultText: "당신은 뛰었다.\n강의실에 도착했을 때, 교수님은 출석부를 닫고 있었다.\n그래도 노력은 보였다. 아마도.",
        effects: [
          { target: "attendance", value: 5 },
          { target: "stamina", value: -10 },
          { target: "mental", value: -5 },
          { target: "professorAggro", value: 3 },
        ],
      },
      {
        id: "second-class",
        label: "자연스럽게 2교시부터 간다",
        resultText: "당신은 침착하게 현실을 재구성했다.\n오늘의 하루는 2교시부터 시작된다.",
        effects: [
          { target: "mental", value: 5 },
          { target: "attendance", value: -6 },
          { target: "grade", value: -3 },
          { target: "selfHolidayGauge", value: 3 },
        ],
      },
      {
        id: "self-holiday",
        label: "자휴를 선언한다",
        resultText: "당신은 자체휴강을 선언했다.\n학교는 몰랐지만, 당신은 매우 공식적이었다.",
        effects: [
          { target: "mental", value: 12 },
          { target: "attendance", value: -10 },
          { target: "selfHolidayGauge", value: 15 },
          { target: "professorAggro", value: 5 },
        ],
      },
      {
        id: "ask-friend",
        label: "친구에게 출석 여부를 묻는다",
        outcomes: [
          {
            weight: 40,
            resultText: "친구: “오늘 휴강이래.”\n당신은 침대 위에서 승리했다.",
            effects: [{ target: "mental", value: 10 }],
          },
          {
            weight: 60,
            resultText: "친구: “교수님 출석 두 번 부르심.”\n당신은 조용히 천장을 보았다.",
            effects: [
              { target: "mental", value: -10 },
              { target: "attendance", value: -8 },
              { target: "professorAggro", value: 8 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "class-seat",
    type: "class",
    title: "강의실 자리 선택",
    time: "수업 시작 전",
    avatar: "friend",
    intro: ["강의실에 도착했다.", "앞자리는 비어 있고, 뒷자리는 안전해 보인다.", "문 옆자리는 탈출 루트처럼 빛난다."],
    options: [
      {
        id: "front",
        label: "앞자리에 앉는다",
        resultText: "당신은 앞자리에 앉았다.\n교수님의 시선이 따뜻하다.\n부담도 따뜻하다.",
        effects: [
          { target: "grade", value: 5 },
          { target: "professorAggro", value: -5 },
          { target: "mental", value: -3 },
        ],
      },
      {
        id: "back",
        label: "뒷자리에 앉는다",
        resultText: "뒷자리는 평화로웠다.\n강의 내용도 평화롭게 지나갔다.",
        effects: [
          { target: "mental", value: 3 },
          { target: "grade", value: 1 },
          { target: "stamina", value: 2 },
        ],
      },
      {
        id: "friend",
        label: "친구 옆에 앉는다",
        resultText: "친구 옆에 앉았다.\n필기는 줄었지만 웃음은 늘었다.",
        effects: [
          { target: "social", value: 5 },
          { target: "grade", value: -2 },
          { target: "mental", value: 2 },
        ],
      },
      {
        id: "door",
        label: "문 옆에 앉는다",
        resultText: "문 옆자리는 언제나 가능성을 품고 있다.\n도망칠 가능성.",
        effects: [
          { target: "mental", value: 5 },
          { target: "selfHolidayGauge", value: 3 },
          { target: "professorAggro", value: 3 },
        ],
      },
    ],
  },
  {
    id: "class-attendance",
    type: "class",
    title: "출석 체크",
    time: "수업 시작",
    avatar: "professor",
    intro: ["교수님이 출석부를 펼쳤다.", "강의실 전체가 조용해졌다."],
    options: [
      {
        id: "answer",
        label: "당당하게 대답한다",
        resultText: "“네.”\n오늘의 가장 안정적인 발성이었다.",
        effects: [
          { target: "attendance", value: 5 },
          { target: "professorAggro", value: -2 },
        ],
      },
      {
        id: "proxy",
        label: "친구에게 대리출석을 부탁한다",
        outcomes: [
          {
            weight: 70,
            resultText: "친구가 당신의 이름을 불렀다.\n우정은 때로 제도보다 빠르다.",
            effects: [
              { target: "attendance", value: 4 },
              { target: "social", value: -3 },
            ],
          },
          {
            weight: 30,
            resultText: "교수님이 고개를 들었다.\n“방금 두 목소리가 비슷하네요?”",
            effects: [
              { target: "attendance", value: -10 },
              { target: "professorAggro", value: 20 },
              { target: "mental", value: -10 },
            ],
          },
        ],
      },
      {
        id: "restroom",
        label: "화장실 타이밍에 걸린다",
        resultText: "당신이 없는 동안 당신의 이름이 불렸다.\n이름은 있었지만, 사람은 없었다.",
        effects: [
          { target: "attendance", value: -5 },
          { target: "mental", value: -5 },
          { target: "professorAggro", value: 5 },
        ],
      },
      {
        id: "lms",
        label: "LMS를 확인하다 놓친다",
        resultText: "LMS에는 새 공지가 있었다.\n그리고 출석에는 빈칸이 생겼다.",
        effects: [
          { target: "attendance", value: -4 },
          { target: "mental", value: -4 },
        ],
      },
    ],
  },
  {
    id: "class-surprise-question",
    type: "class",
    title: "교수님의 기습 질문",
    time: "수업 중",
    avatar: "professor",
    intro: ["교수님이 갑자기 말을 멈췄다.", "“이 부분, 누가 설명해볼까요?”", "교수님의 시선이 당신 근처에서 멈췄다."],
    options: [
      {
        id: "answer",
        label: "대답해본다",
        outcomes: [
          {
            weight: 60,
            resultText: "당신은 의외로 맞는 말을 했다.\n교수님이 고개를 끄덕였다.",
            effects: [
              { target: "grade", value: 8 },
              { target: "professorAggro", value: -8 },
              { target: "mental", value: 3 },
            ],
          },
          {
            weight: 40,
            resultText: "당신은 말하면서도 자신이 틀렸다는 걸 느꼈다.\n강의실 공기가 조용해졌다.",
            effects: [
              { target: "grade", value: 2 },
              { target: "mental", value: -8 },
              { target: "professorAggro", value: 5 },
            ],
          },
        ],
      },
      {
        id: "fake-note",
        label: "필기하는 척한다",
        outcomes: [
          {
            weight: 50,
            resultText: "교수님은 다른 학생을 지목했다.\n당신의 위장술은 통했다.",
            effects: [{ target: "mental", value: 5 }],
          },
          {
            weight: 50,
            resultText: "교수님이 말했다.\n“필기한 내용 한번 읽어볼까요?”",
            effects: [
              { target: "mental", value: -12 },
              { target: "professorAggro", value: 10 },
              { target: "grade", value: 1 },
            ],
          },
        ],
      },
      {
        id: "friend-eyes",
        label: "친구에게 눈빛 구조 요청",
        outcomes: [
          {
            weight: 60,
            resultText: "친구가 작은 목소리로 힌트를 줬다.\n우정은 오늘 출석했다.",
            effects: [
              { target: "social", value: 3 },
              { target: "mental", value: -3 },
              { target: "grade", value: 2 },
            ],
          },
          {
            weight: 40,
            resultText: "친구는 앞만 보고 있었다.\n우정에도 쿨타임이 있다.",
            effects: [
              { target: "social", value: 3 },
              { target: "mental", value: -10 },
            ],
          },
        ],
      },
      {
        id: "sleep",
        label: "꿈속으로 대피한다",
        resultText: "당신은 잠시 눈을 감았다.\n꿈속에서도 교수님은 판서를 하고 있었다.",
        effects: [
          { target: "stamina", value: 5 },
          { target: "grade", value: -6 },
          { target: "professorAggro", value: 6 },
        ],
      },
    ],
  },
  {
    id: "class-assignment-notice",
    type: "class",
    title: "새 과제 공지",
    time: "수업 끝나기 5분 전",
    avatar: "professor",
    assetKey: "week4",
    intro: ["교수님이 말했다.", "“아, 과제 하나만 공지하고 마치겠습니다.”", "강의실의 온도가 2도 내려갔다."],
    options: [
      {
        id: "calendar",
        label: "바로 캘린더에 등록한다",
        resultText: "당신은 마감일을 기록했다.\n미래의 당신이 아주 조금 덜 울 예정이다.",
        effects: [
          { target: "assignment", value: 8 },
          { target: "grade", value: 3 },
          { target: "mental", value: -3 },
        ],
      },
      {
        id: "ask",
        label: "친구에게 설명을 부탁한다",
        resultText: "친구가 설명해줬다.\n이해는 안 됐지만, 혼자는 아니었다.",
        effects: [
          { target: "social", value: 3 },
          { target: "assignment", value: 4 },
        ],
      },
      {
        id: "ignore",
        label: "못 들은 척한다",
        resultText: "당신은 아무것도 듣지 못했다.\n물론 LMS는 들었다.",
        effects: [
          { target: "mental", value: 6 },
          { target: "assignment", value: -8 },
          { target: "professorAggro", value: 3 },
        ],
      },
      {
        id: "title",
        label: "제목만 미리 써둔다",
        resultText: "문서 제목을 만들었다.\n이제 거의 다 한 기분이다.",
        effects: [
          { target: "assignment", value: 2 },
          { target: "mental", value: 2 },
        ],
      },
    ],
  },
  {
    id: "class-quiz",
    type: "class",
    title: "쪽지시험",
    time: "수업 시작",
    avatar: "professor",
    intro: ["교수님이 종이를 나눠줬다.", "“간단한 확인 테스트입니다.”", "간단하다는 말은 보통 간단하지 않다."],
    options: [
      {
        id: "memory",
        label: "기억을 긁어모은다",
        resultText: "당신은 뇌 어딘가에 있던 내용을 꺼냈다.\n먼지가 많았지만 쓸 수는 있었다.",
        effects: [
          { target: "grade", value: 5 },
          { target: "mental", value: -5 },
        ],
      },
      {
        id: "pray",
        label: "찍기의 신에게 기도한다",
        outcomes: [
          {
            weight: 30,
            resultText: "찍기의 신이 응답했다.",
            effects: [
              { target: "grade", value: 7 },
              { target: "mental", value: 5 },
            ],
          },
          {
            weight: 70,
            resultText: "신은 바빴다.",
            effects: [
              { target: "grade", value: -4 },
              { target: "mental", value: -3 },
            ],
          },
        ],
      },
      {
        id: "panic",
        label: "옆 사람 속도를 보고 흔들린다",
        resultText: "옆 사람은 이미 3번 문제를 풀고 있었다.\n당신은 아직 이름을 쓰고 있었다.",
        effects: [
          { target: "mental", value: -8 },
          { target: "grade", value: -2 },
        ],
      },
      {
        id: "tone",
        label: "교수님 말투를 떠올린다",
        outcomes: [
          {
            weight: 60,
            resultText: "교수님의 말투가 머릿속에 울렸다.\n이게 공부인지 생존 본능인지 모르겠다.",
            effects: [{ target: "grade", value: 6 }],
          },
          {
            weight: 40,
            resultText: "교수님의 말투는 떠올랐다.\n문제의 답은 떠오르지 않았다.",
            effects: [
              { target: "grade", value: 1 },
              { target: "mental", value: -4 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "class-pdf",
    type: "class",
    title: "강의자료 PDF 폭격",
    time: "LMS 알림",
    avatar: "lms",
    intro: ["새 강의자료가 업로드되었습니다.", "week5_final_real_last_진짜최종.pdf"],
    options: [
      {
        id: "sort",
        label: "바로 정리한다",
        resultText: "당신은 폴더를 정리했다.\n삶의 통제권을 잠시 되찾은 기분이다.",
        effects: [
          { target: "grade", value: 5 },
          { target: "assignment", value: 4 },
          { target: "mental", value: -4 },
        ],
      },
      {
        id: "save",
        label: "파일명만 믿고 저장한다",
        resultText: "파일은 저장됐다.\n어디에 저장됐는지는 미래의 문제가 되었다.",
        effects: [
          { target: "grade", value: 1 },
          { target: "mental", value: 2 },
        ],
      },
      {
        id: "print",
        label: "프린트한다",
        resultText: "종이 냄새가 났다.\n괜히 공부한 기분이 들었다.",
        effects: [
          { target: "money", value: -1000 },
          { target: "grade", value: 3 },
          { target: "stamina", value: -2 },
        ],
      },
      {
        id: "later",
        label: "다음에 본다",
        resultText: "다음의 당신은 아직 이 사실을 모른다.\n불쌍하다.",
        effects: [
          { target: "mental", value: 4 },
          { target: "grade", value: -4 },
          { target: "assignment", value: -2 },
        ],
      },
    ],
  },
  {
    id: "class-sleepy",
    type: "class",
    title: "졸음의 습격",
    time: "수업 중",
    avatar: "system",
    intro: ["교수님의 목소리가 점점 멀어진다.", "칠판 글씨가 꿈과 현실 사이에 떠 있다."],
    options: [
      {
        id: "coffee",
        label: "커피를 마신다",
        resultText: "아이스 아메리카노가 혈관을 순찰하기 시작했다.",
        effects: [
          { target: "money", value: -4500 },
          { target: "stamina", value: 10 },
          { target: "caffeine", value: 10 },
          { target: "grade", value: 2 },
        ],
      },
      {
        id: "stand",
        label: "서서 듣는다",
        resultText: "당신은 서 있었다.\n자존심도 같이 서 있었다.",
        effects: [
          { target: "grade", value: 3 },
          { target: "mental", value: -2 },
          { target: "stamina", value: -3 },
        ],
      },
      {
        id: "close-eyes",
        label: "잠깐 눈을 감는다",
        resultText: "잠깐이었다.\n하지만 판서는 세 페이지가 지나 있었다.",
        effects: [
          { target: "stamina", value: 6 },
          { target: "grade", value: -5 },
          { target: "professorAggro", value: 5 },
        ],
      },
      {
        id: "wake-me",
        label: "친구에게 깨워달라고 한다",
        outcomes: [
          {
            weight: 60,
            resultText: "친구가 팔꿈치로 당신을 깨웠다.\n고맙지만 아팠다.",
            effects: [
              { target: "stamina", value: 3 },
              { target: "social", value: 2 },
              { target: "grade", value: -1 },
            ],
          },
          {
            weight: 40,
            resultText: "친구도 자고 있었다.\n동맹은 무너졌다.",
            effects: [
              { target: "stamina", value: 6 },
              { target: "grade", value: -6 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "class-discussion",
    type: "class",
    title: "갑작스러운 토론",
    time: "수업 중",
    avatar: "professor",
    intro: ["교수님이 말했다.", "“옆 사람과 5분만 토론해보세요.”", "강의실 전체가 어색해졌다."],
    options: [
      {
        id: "say",
        label: "한마디라도 한다",
        resultText: "당신은 입을 열었다.\n문장이 조금 흔들렸지만, 아무튼 소리가 났다.",
        effects: [
          { target: "social", value: 5 },
          { target: "grade", value: 3 },
          { target: "mental", value: -4 },
        ],
      },
      {
        id: "nod",
        label: "고개만 끄덕인다",
        resultText: "당신은 깊이 있는 끄덕임을 선보였다.\n내용은 없었지만 무게감은 있었다.",
        effects: [
          { target: "mental", value: 2 },
          { target: "grade", value: -1 },
        ],
      },
      {
        id: "avoid",
        label: "발표 담당을 피한다",
        resultText: "당신은 자연스럽게 시선을 내렸다.\n생존 기술이었다.",
        effects: [
          { target: "mental", value: 5 },
          { target: "social", value: -3 },
          { target: "teamContribution", value: -2 },
        ],
      },
      {
        id: "present",
        label: "발표를 맡는다",
        resultText: "당신은 발표를 맡았다.\n말은 먼저 나갔고, 후회는 뒤따라왔다.",
        effects: [
          { target: "grade", value: 5 },
          { target: "social", value: 7 },
          { target: "mental", value: -10 },
          { target: "teamContribution", value: 5 },
        ],
      },
    ],
  },
  {
    id: "class-last-bomb",
    type: "class",
    title: "수업 끝 5분 전 폭탄",
    time: "수업 종료 5분 전",
    avatar: "professor",
    intro: ["모두가 가방을 싸려는 순간,", "교수님이 다시 마이크를 잡았다.", "“마지막으로 하나만 더.”"],
    options: [
      {
        id: "accept",
        label: "현실을 받아들인다",
        resultText: "당신은 받아들였다.\n이것도 수업이다.\n아마도.",
        effects: [
          { target: "assignment", value: 5 },
          { target: "mental", value: -8 },
          { target: "grade", value: 2 },
        ],
      },
      {
        id: "joke",
        label: "농담이라고 믿는다",
        resultText: "농담이 아니었다.\nLMS가 증명했다.",
        effects: [
          { target: "mental", value: 2 },
          { target: "assignment", value: -10 },
          { target: "professorAggro", value: 5 },
        ],
      },
      {
        id: "anger",
        label: "친구와 분노를 공유한다",
        resultText: "분노는 나누면 줄어들지 않는다.\n대신 단톡방이 활발해진다.",
        effects: [
          { target: "social", value: 3 },
          { target: "mental", value: 2 },
          { target: "grade", value: -1 },
        ],
      },
      {
        id: "lms",
        label: "LMS를 즉시 확인한다",
        resultText: "과제는 진짜였다.\n당신은 진실을 너무 빨리 알아버렸다.",
        effects: [
          { target: "assignment", value: 3 },
          { target: "mental", value: -4 },
        ],
      },
    ],
  },
];
