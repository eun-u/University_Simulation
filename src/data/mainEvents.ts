import { GameEvent } from "../types";

export const mainEvents: GameEvent[] = [
  {
    id: "week-1-opening",
    type: "main",
    week: 1,
    weekName: "개강",
    title: "개강",
    time: "1주차",
    avatar: "system",
    assetKey: "week1",
    intro: ["개강했다.", "방학 동안 다짐했던 “이번 학기는 진짜 열심히”가 등장했다.", "지속 시간은 약 3일로 예상된다."],
    options: [
      {
        id: "front",
        label: "첫 수업부터 앞자리에 앉는다",
        resultText: "첫 수업부터 앞자리에 앉았다.\n초심자의 눈빛이 잠깐 빛났다.",
        summary: "초심자의 버프로 앞자리에 앉았다.",
        effects: [
          { target: "grade", value: 8 },
          { target: "professorAggro", value: -5 },
          { target: "mental", value: -5 },
        ],
        addTitle: "초심자 버프",
      },
      {
        id: "back",
        label: "적당히 뒷자리에 앉는다",
        resultText: "뒷자리는 안전했다.\n칠판은 멀었지만 마음은 가까스로 살아 있었다.",
        effects: [
          { target: "mental", value: 3 },
          { target: "grade", value: 2 },
          { target: "stamina", value: 2 },
        ],
      },
      {
        id: "change-course",
        label: "수강정정을 노린다",
        outcomes: [
          {
            weight: 40,
            resultText: "꿀강을 발견했다.\n포털이 오늘만큼은 인간적이었다.",
            summary: "수강정정에서 꿀강을 건졌다.",
            effects: [
              { target: "grade", value: 8 },
              { target: "mental", value: 5 },
            ],
          },
          {
            weight: 60,
            resultText: "빈자리는 없었다.\n남은 건 월요일 1교시뿐이었다.",
            summary: "수강정정은 실패했고 월요일 1교시가 남았다.",
            effects: [
              { target: "mental", value: -8 },
              { target: "stamina", value: -5 },
              { target: "professorAggro", value: 3 },
            ],
          },
        ],
      },
      {
        id: "deny",
        label: "개강을 부정한다",
        resultText: "당신은 개강을 부정했다.\n현실은 출석부를 들고 있었다.",
        effects: [
          { target: "mental", value: 10 },
          { target: "grade", value: -5 },
          { target: "selfHolidayGauge", value: 10 },
        ],
        addTitle: "개강 3일 천하",
      },
    ],
  },
  {
    id: "week-2-opening-party",
    type: "main",
    week: 2,
    weekName: "개총",
    title: "학과 개총",
    time: "2주차",
    avatar: "friend",
    assetKey: "week2",
    intro: ["학과 단톡방에 공지가 올라왔다.", "“오늘 개총 있습니다! 다들 꼭 참석해주세요~”", "‘꼭’이라는 단어가 수상하다."],
    options: [
      {
        id: "attend",
        label: "개총에 참석한다",
        resultText: "당신은 개총에 갔다.\n이름은 외웠는지 모르겠지만 얼굴은 몇 개 저장됐다.",
        effects: [
          { target: "social", value: 15 },
          { target: "money", value: -15000 },
          { target: "stamina", value: -10 },
          { target: "mental", value: -3 },
        ],
      },
      {
        id: "meal-only",
        label: "밥만 먹고 빠진다",
        outcomes: [
          {
            weight: 60,
            resultText: "당신은 밥만 먹고 조용히 빠졌다.\n탈출 루트가 아름다웠다.",
            summary: "개총에서 밥만 먹고 탈출했다.",
            effects: [
              { target: "social", value: 5 },
              { target: "money", value: -8000 },
              { target: "stamina", value: -5 },
              { target: "mental", value: 3 },
            ],
          },
          {
            weight: 40,
            resultText: "2차에 끌려갔다.\n‘잠깐’은 대학가에서 가장 위험한 단어다.",
            summary: "개총 2차에 끌려갔다.",
            effects: [
              { target: "social", value: 13 },
              { target: "money", value: -20000 },
              { target: "stamina", value: -15 },
              { target: "mental", value: 1 },
            ],
          },
        ],
      },
      {
        id: "home",
        label: "집에 일이 있다고 한다",
        resultText: "집에는 일이 없었다.\n하지만 침대는 있었다.",
        effects: [
          { target: "stamina", value: 5 },
          { target: "mental", value: 3 },
          { target: "social", value: -5 },
        ],
      },
      {
        id: "ignore",
        label: "단톡방을 읽씹한다",
        resultText: "당신은 단톡방을 읽씹했다.\n읽음 표시는 작았지만 존재감은 컸다.",
        effects: [
          { target: "mental", value: 8 },
          { target: "social", value: -10 },
        ],
        addTitle: "사회적 은신술",
      },
    ],
  },
  {
    id: "week-3-mt",
    type: "main",
    week: 3,
    weekName: "MT",
    title: "MT 버스 출발",
    time: "3주차",
    avatar: "friend",
    assetKey: "week3",
    intro: ["MT 버스가 출발했다.", "당신은 아직도 왜 신청했는지 기억나지 않는다."],
    options: [
      {
        id: "full",
        label: "풀참한다",
        resultText: "당신은 MT에 풀참했다.\n박수는 커졌고 체력은 사라졌다.",
        effects: [
          { target: "social", value: 25 },
          { target: "stamina", value: -25 },
          { target: "money", value: -20000 },
          { target: "mental", value: -5 },
          { target: "caffeine", value: 5 },
        ],
        addTitle: "MT 이후 기억상실자",
      },
      {
        id: "corner",
        label: "조용히 구석에서 생존한다",
        resultText: "구석은 평화로웠다.\n아무도 당신을 몰랐지만, 아무도 당신을 괴롭히지 않았다.",
        effects: [
          { target: "social", value: 8 },
          { target: "stamina", value: -10 },
          { target: "soloMealTolerance", value: 5 },
          { target: "mental", value: 3 },
        ],
      },
      {
        id: "host",
        label: "게임 사회자를 맡는다",
        resultText: "당신은 사회자가 되었다.\n마이크는 무거웠고 모두가 당신을 기억하게 됐다.",
        effects: [
          { target: "social", value: 30 },
          { target: "mental", value: -15 },
          { target: "stamina", value: -15 },
        ],
        addTitle: "학과 광대",
      },
      {
        id: "skip",
        label: "불참한다",
        resultText: "당신은 불참했다.\n단체 사진 속 빈자리가 당신을 닮았다.",
        effects: [
          { target: "stamina", value: 15 },
          { target: "social", value: -15 },
          { target: "mental", value: 5 },
        ],
      },
    ],
  },
  {
    id: "week-4-team-form",
    type: "main",
    week: 4,
    weekName: "팀플 시작",
    title: "팀플 조 편성",
    time: "4주차",
    avatar: "professor",
    assetKey: "week4",
    intro: ["교수님이 말했다.", "“이번 과제는 조별 발표입니다.”", "강의실의 공기가 바뀌었다."],
    options: [
      {
        id: "known",
        label: "아는 사람과 조를 짠다",
        resultText: "아는 얼굴과 조가 되었다.\n최소한 단톡방 첫 인사는 덜 어색했다.",
        effects: [
          { target: "social", value: 5 },
          { target: "teamStability", value: 10 },
          { target: "teamContribution", value: 5 },
          { target: "mental", value: 2 },
        ],
      },
      {
        id: "random",
        label: "랜덤 조에 맡긴다",
        outcomes: [
          {
            weight: 30,
            resultText: "에이스 조원을 만났다.\n단톡방에 빛이 들어왔다.",
            effects: [
              { target: "teamStability", value: 20 },
              { target: "grade", value: 5 },
              { target: "mental", value: 5 },
            ],
          },
          {
            weight: 40,
            resultText: "조원이 첫날부터 조용하다.\n불길하다.",
            effects: [
              { target: "teamStability", value: -20 },
              { target: "mental", value: -10 },
            ],
          },
          {
            weight: 30,
            resultText: "상황을 보니 당신이 에이스다.\n좋은 말처럼 들리지만 아니다.",
            effects: [
              { target: "teamContribution", value: 20 },
              { target: "grade", value: 8 },
              { target: "mental", value: -15 },
            ],
          },
        ],
      },
      {
        id: "leader",
        label: "내가 조장을 한다",
        resultText: "당신은 조장을 맡았다.\n단톡방 알림이 당신의 미래를 예고했다.",
        effects: [
          { target: "grade", value: 10 },
          { target: "mental", value: -20 },
          { target: "teamContribution", value: 20 },
          { target: "teamStability", value: 5 },
          { target: "professorAggro", value: -5 },
        ],
        addTitle: "조장의 무게",
      },
      {
        id: "ghost",
        label: "존재감을 지운다",
        outcomes: [
          {
            weight: 80,
            resultText: "당신은 조용해졌다.\n조용한 사람은 대체로 역할표 끝에 적힌다.",
            effects: [
              { target: "mental", value: 5 },
              { target: "teamContribution", value: -10 },
              { target: "teamStability", value: -5 },
            ],
          },
          {
            weight: 20,
            resultText: "조용히 있었는데 발표 담당이 됐다.\n침묵은 방어막이 아니었다.",
            effects: [
              { target: "mental", value: -10 },
              { target: "teamContribution", value: 0 },
              { target: "teamStability", value: -5 },
            ],
            addTitle: "조용한 발표자",
          },
        ],
      },
    ],
  },
  {
    id: "week-5-assignments",
    type: "main",
    week: 5,
    weekName: "과제 누적",
    title: "첫 과제 더미",
    time: "5주차",
    avatar: "lms",
    intro: ["과제가 쌓이기 시작했다.", "아직 감당할 수 있을 것 같다.", "이 생각이 가장 위험하다."],
    options: [
      {
        id: "weekend",
        label: "주말에 처리한다",
        resultText: "주말이 사라졌다.\n대신 과제 파일은 생겼다.",
        effects: [
          { target: "assignment", value: 12 },
          { target: "grade", value: 5 },
          { target: "mental", value: -10 },
          { target: "stamina", value: -5 },
        ],
      },
      {
        id: "future",
        label: "마감 전날의 나를 믿는다",
        resultText: "당신은 미래의 자신을 믿었다.\n미래의 자신은 아직 이 사실을 모른다.",
        effects: [
          { target: "mental", value: 5 },
          { target: "assignment", value: -3 },
          { target: "selfHolidayGauge", value: 5 },
        ],
      },
      {
        id: "share",
        label: "친구와 분담한다",
        resultText: "분담은 아름다웠다.\n서로가 맡은 부분을 이해했다는 착각도 함께 왔다.",
        effects: [
          { target: "social", value: 5 },
          { target: "assignment", value: 6 },
          { target: "teamStability", value: 5 },
          { target: "mental", value: -3 },
        ],
      },
      {
        id: "forget",
        label: "과제를 까먹는다",
        resultText: "과제를 까먹었다.\nLMS는 잊지 않았다.",
        effects: [
          { target: "mental", value: 5 },
          { target: "assignment", value: -15 },
          { target: "professorAggro", value: 10 },
        ],
        addTitle: "마감과 결별한 자",
      },
    ],
  },
  {
    id: "week-6-midterm-eve",
    type: "main",
    week: 6,
    weekName: "중간 전야",
    title: "중간고사 전야",
    time: "6주차",
    avatar: "system",
    assetKey: "week7",
    intro: ["중간고사가 3일 남았다.", "당신은 강의자료 폴더를 열었다.", "파일명이 모두 비슷하다. week3_final_real_last.pdf"],
    options: [
      {
        id: "all-night",
        label: "밤샘 공부한다",
        resultText: "밤은 길었고 커피는 짧았다.\n새벽의 형광펜은 이상하게 진지했다.",
        effects: [
          { target: "grade", value: 15 },
          { target: "stamina", value: -25 },
          { target: "mental", value: -8 },
          { target: "caffeine", value: 15 },
        ],
      },
      {
        id: "old-exam",
        label: "족보를 구한다",
        outcomes: [
          {
            weight: 80,
            resultText: "족보를 구했다.\n인간관계가 학업 자료로 변환됐다.",
            effects: [
              { target: "grade", value: 10 },
              { target: "social", value: 5 },
              { target: "money", value: -3000 },
            ],
          },
          {
            weight: 20,
            resultText: "오래된 족보였다.\n문제 유형보다 세월이 더 느껴졌다.",
            effects: [
              { target: "grade", value: 5 },
              { target: "social", value: 5 },
              { target: "money", value: -3000 },
              { target: "mental", value: -5 },
            ],
          },
        ],
      },
      {
        id: "summary",
        label: "요약본만 본다",
        resultText: "요약본은 짧았다.\n당신의 희망도 짧아졌다가 다시 회복됐다.",
        effects: [
          { target: "grade", value: 5 },
          { target: "mental", value: 5 },
          { target: "stamina", value: 3 },
        ],
      },
      {
        id: "tomorrow",
        label: "내일의 나에게 맡긴다",
        resultText: "당신은 내일의 자신에게 모든 것을 넘겼다.\n내일의 당신은 이미 피곤하다.",
        effects: [
          { target: "mental", value: 10 },
          { target: "grade", value: -15 },
          { target: "selfHolidayGauge", value: 5 },
        ],
        addTitle: "미래의 나 학대범",
      },
    ],
  },
  {
    id: "week-7-midterm",
    type: "exam",
    week: 7,
    weekName: "중간고사",
    title: "중간고사",
    time: "7주차",
    avatar: "professor",
    assetKey: "week7",
    intro: ["시험지가 배부되었다.", "1번 문제를 읽었다.", "분명 배운 내용이다. 하지만 당신은 배운 적 없는 표정이다."],
    options: [
      {
        id: "known-first",
        label: "아는 문제부터 푼다",
        resultText: "아는 문제부터 풀었다.\n아는 문제가 있다는 사실이 위로가 됐다.",
        effects: [{ target: "mental", value: -5 }],
        choiceBonus: 10,
      },
      {
        id: "pray",
        label: "찍기의 신에게 기도한다",
        outcomes: [
          {
            weight: 30,
            resultText: "찍기의 신이 응답했다.\n답안지가 잠깐 빛난 것 같았다.",
            effects: [{ target: "mental", value: 5 }],
            choiceBonus: 15,
          },
          {
            weight: 70,
            resultText: "신은 바빴다.\n당신의 OMR은 혼자였다.",
            effects: [{ target: "mental", value: -5 }],
            choiceBonus: -5,
          },
        ],
      },
      {
        id: "professor-tone",
        label: "교수님의 말투를 떠올린다",
        outcomes: [
          {
            weight: 60,
            resultText: "교수님의 말투가 답을 데려왔다.\n수업을 들은 보람이 아주 조금 있었다.",
            effects: [],
            choiceBonus: 12,
          },
          {
            weight: 40,
            resultText: "교수님의 말투는 떠올랐다.\n하지만 답은 출석하지 않았다.",
            effects: [{ target: "mental", value: -5 }],
            choiceBonus: 3,
          },
        ],
      },
      {
        id: "panic",
        label: "옆 사람 속도를 보고 절망한다",
        resultText: "옆 사람은 벌써 뒷장을 넘겼다.\n당신은 아직 이름을 예쁘게 쓰고 있었다.",
        effects: [{ target: "mental", value: -15 }],
        choiceBonus: -5,
      },
    ],
  },
  {
    id: "week-8-midterm-result",
    type: "main",
    week: 8,
    weekName: "중간 결과",
    title: "중간고사 점수 확인",
    time: "8주차",
    avatar: "lms",
    intro: ["중간고사 점수가 공개되었다.", "화면을 누르기 전부터 손에 땀이 난다."],
    options: [
      {
        id: "accept",
        label: "현실을 받아들인다",
        resultText: "현실을 받아들였다.\n받아들였다고 해서 마음에 든다는 뜻은 아니다.",
        effects: [
          { target: "mental", value: -5 },
          { target: "grade", value: 2 },
        ],
      },
      {
        id: "mail",
        label: "교수님께 메일을 보낸다",
        outcomes: [
          {
            weight: 20,
            resultText: "교수님이 재확인해줬다.\n점수가 3점 올랐다. 손이 떨렸다.",
            effects: [
              { target: "professorAggro", value: 10 },
              { target: "mental", value: -3 },
              { target: "midtermScore", value: 3 },
            ],
          },
          {
            weight: 30,
            resultText: "답장: “채점 기준은 공정합니다.”\n문장은 짧았고 마음은 길게 무너졌다.",
            effects: [
              { target: "professorAggro", value: 10 },
              { target: "mental", value: -6 },
            ],
          },
          {
            weight: 50,
            resultText: "답장이 없다.\n메일함 새로고침만 늘었다.",
            effects: [
              { target: "professorAggro", value: 10 },
              { target: "mental", value: -3 },
            ],
          },
        ],
      },
      {
        id: "final-revenge",
        label: "기말 역전을 다짐한다",
        resultText: "기말 역전을 다짐했다.\n중간고사 때도 비슷한 말을 했던 것 같다.",
        effects: [
          { target: "mental", value: 10 },
          { target: "grade", value: 5 },
        ],
      },
      {
        id: "seal",
        label: "성적 창을 닫고 기억을 봉인한다",
        resultText: "성적 창을 닫았다.\n기억은 봉인됐지만 점수는 서버에 남아 있다.",
        effects: [
          { target: "mental", value: 5 },
          { target: "selfHolidayGauge", value: 5 },
        ],
        addTitle: "회피형 장학생",
      },
    ],
  },
  {
    id: "week-9-sports",
    type: "main",
    week: 9,
    weekName: "체육대회",
    title: "체육대회",
    time: "9주차",
    avatar: "friend",
    assetKey: "week9",
    intro: ["학과 체육대회가 시작되었다.", "당신은 분명 구경만 하러 왔다.", "그런데 명단에 이름이 있다."],
    options: [
      {
        id: "relay",
        label: "계주에 나간다",
        outcomes: [
          {
            weight: 30,
            resultText: "레전드 장면이 생성됐다.\n당신은 오늘만큼은 학과의 속도였다.",
            effects: [
              { target: "social", value: 25 },
              { target: "stamina", value: -20 },
              { target: "mental", value: -5 },
            ],
            addTitle: "계주의 전설",
          },
          {
            weight: 70,
            resultText: "당신은 달렸다.\n생각보다 느렸다. 하지만 표정은 국가대표였다.",
            effects: [
              { target: "social", value: 15 },
              { target: "stamina", value: -20 },
              { target: "mental", value: -10 },
            ],
          },
        ],
      },
      {
        id: "dodgeball",
        label: "피구에 끌려간다",
        outcomes: [
          {
            weight: 50,
            resultText: "공을 피했다.\n인생의 다른 문제도 이렇게 피하고 싶었다.",
            effects: [
              { target: "social", value: 10 },
              { target: "stamina", value: -15 },
              { target: "mental", value: 5 },
            ],
          },
          {
            weight: 50,
            resultText: "공이 왔다.\n당신도 갔다.",
            effects: [
              { target: "social", value: 10 },
              { target: "stamina", value: -15 },
              { target: "mental", value: -5 },
            ],
          },
        ],
      },
      {
        id: "cheer",
        label: "응원만 한다",
        resultText: "응원은 안전했다.\n목만 조금 사라졌다.",
        effects: [
          { target: "social", value: 8 },
          { target: "stamina", value: -5 },
          { target: "mental", value: 3 },
        ],
      },
      {
        id: "cafeteria",
        label: "학식 먹으러 탈주한다",
        resultText: "당신은 학식당으로 탈주했다.\n운동장 함성은 멀어지고 국 냄새가 가까워졌다.",
        effects: [
          { target: "mental", value: 10 },
          { target: "social", value: -5 },
          { target: "money", value: -4500 },
          { target: "soloMealTolerance", value: 5 },
        ],
      },
    ],
  },
  {
    id: "week-10-team-check",
    type: "main",
    week: 10,
    weekName: "팀플 지옥",
    title: "팀플 중간 점검",
    time: "10주차",
    avatar: "teammate",
    assetKey: "week4",
    intro: ["팀플 단톡방에 메시지가 올라왔다.", "“다들 어디까지 하셨어요?”", "아무도 대답하지 않았다."],
    options: [
      {
        id: "lead-meeting",
        label: "회의를 주도한다",
        resultText: "당신이 회의를 열었다.\n침묵은 깨졌고 당신의 멘탈도 조금 깨졌다.",
        effects: [
          { target: "teamContribution", value: 15 },
          { target: "teamStability", value: 10 },
          { target: "mental", value: -15 },
          { target: "grade", value: 5 },
        ],
      },
      {
        id: "role",
        label: "역할만 다시 확인한다",
        resultText: "역할표를 다시 확인했다.\n역할표는 있었지만 역할 수행은 아직이었다.",
        effects: [
          { target: "teamStability", value: 5 },
          { target: "teamContribution", value: 5 },
          { target: "mental", value: -5 },
        ],
      },
      {
        id: "trust",
        label: "조원들을 믿어본다",
        outcomes: [
          {
            weight: 30,
            resultText: "조원들이 진짜 해왔다.\n당신은 잠시 인간을 믿었다.",
            effects: [
              { target: "mental", value: 5 },
              { target: "teamStability", value: 10 },
              { target: "grade", value: 3 },
            ],
          },
          {
            weight: 70,
            resultText: "아무도 하지 않았다.\n믿음은 파일로 제출되지 않는다.",
            effects: [
              { target: "mental", value: -5 },
              { target: "teamStability", value: -15 },
            ],
          },
        ],
      },
      {
        id: "report",
        label: "교수님께 조용히 보고한다",
        resultText: "교수님께 조용히 보고했다.\n조용했지만 파장은 조용하지 않았다.",
        effects: [
          { target: "grade", value: 5 },
          { target: "professorAggro", value: -5 },
          { target: "social", value: -10 },
          { target: "teamStability", value: -5 },
        ],
      },
    ],
  },
  {
    id: "week-11-self-holiday",
    type: "main",
    week: 11,
    weekName: "권태기",
    title: "자휴 유혹",
    time: "11주차",
    avatar: "system",
    intro: ["수업까지 3분 남았다.", "강의실은 4층이다. 엘리베이터는 만원이다.", "운명이 묻는다. “굳이?”"],
    options: [
      {
        id: "go",
        label: "그래도 간다",
        resultText: "그래도 갔다.\n영혼은 계단 2층에 놓고 왔다.",
        effects: [
          { target: "attendance", value: 8 },
          { target: "grade", value: 4 },
          { target: "mental", value: -6 },
          { target: "stamina", value: -3 },
        ],
      },
      {
        id: "skip",
        label: "자휴한다",
        resultText: "자휴했다.\n침대는 당신을 출석 처리했다.",
        effects: [
          { target: "mental", value: 15 },
          { target: "attendance", value: -10 },
          { target: "selfHolidayGauge", value: 15 },
          { target: "professorAggro", value: 5 },
        ],
        addTitle: "자휴의 사도",
      },
      {
        id: "ask",
        label: "친구에게 출석 여부를 묻는다",
        outcomes: [
          {
            weight: 40,
            resultText: "친구: “오늘 휴강이래.”\n당신은 구원받았다.",
            effects: [{ target: "mental", value: 10 }],
          },
          {
            weight: 60,
            resultText: "친구: “교수님 출석 부르심.”\n당신은 이미 늦었다.",
            effects: [
              { target: "attendance", value: -8 },
              { target: "mental", value: -8 },
              { target: "professorAggro", value: 5 },
            ],
          },
        ],
      },
      {
        id: "think",
        label: "건물 앞에서 10분 고민한다",
        outcomes: [
          {
            weight: 50,
            resultText: "고민 끝에 올라갔다.\n이미 늦었지만 대의명분은 있었다.",
            effects: [
              { target: "attendance", value: 4 },
              { target: "grade", value: 2 },
              { target: "mental", value: -6 },
              { target: "stamina", value: -4 },
            ],
          },
          {
            weight: 50,
            resultText: "고민 끝에 돌아섰다.\n10분은 합리화에 충분한 시간이었다.",
            effects: [
              { target: "mental", value: 5 },
              { target: "attendance", value: -5 },
              { target: "selfHolidayGauge", value: 8 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "week-12-presentation",
    type: "main",
    week: 12,
    weekName: "발표 시즌",
    title: "발표 / 레포트 시즌",
    time: "12주차",
    avatar: "teammate",
    assetKey: "week4",
    intro: ["발표 하루 전.", "조원이 단톡방에 메시지를 보냈다.", "“죄송한데 제가 맡은 부분이 정확히 어디였죠?”"],
    options: [
      {
        id: "presenter",
        label: "발표 담당을 맡는다",
        resultText: "발표 담당을 맡았다.\n마이크는 작았고 책임은 컸다.",
        effects: [
          { target: "grade", value: 12 },
          { target: "teamContribution", value: 15 },
          { target: "mental", value: -18 },
          { target: "stamina", value: -8 },
        ],
        addTitle: "발표 전날의 괴물",
      },
      {
        id: "ppt",
        label: "PPT 담당을 맡는다",
        resultText: "PPT 담당을 맡았다.\n정렬선이 당신의 밤을 지배했다.",
        effects: [
          { target: "assignment", value: 10 },
          { target: "teamContribution", value: 10 },
          { target: "stamina", value: -12 },
          { target: "mental", value: -10 },
        ],
        addTitle: "PPT의 순교자",
      },
      {
        id: "research",
        label: "자료조사만 한다",
        resultText: "자료조사를 했다.\n링크는 많았고 확신은 적었다.",
        effects: [
          { target: "assignment", value: 5 },
          { target: "teamContribution", value: 5 },
          { target: "mental", value: -5 },
        ],
      },
      {
        id: "hide",
        label: "최대한 숨어 있는다",
        resultText: "당신은 숨어 있었다.\n하지만 조별 발표에는 탐지 기능이 있다.",
        effects: [
          { target: "mental", value: 5 },
          { target: "teamContribution", value: -10 },
          { target: "teamStability", value: -10 },
          { target: "social", value: -5 },
        ],
      },
    ],
  },
  {
    id: "week-13-final-eve",
    type: "main",
    week: 13,
    weekName: "기말 전야",
    title: "기말고사 전야",
    time: "13주차",
    avatar: "system",
    assetKey: "week14",
    intro: ["기말고사가 다가온다.", "중간고사 때 했던 다짐이 다시 등장했다.", "이번에도 유효기간은 짧아 보인다."],
    options: [
      {
        id: "library",
        label: "도서관에 간다",
        outcomes: [
          {
            weight: 70,
            resultText: "도서관에 앉았다.\n주변의 형광펜 소리가 전투 BGM처럼 들렸다.",
            effects: [
              { target: "grade", value: 15 },
              { target: "stamina", value: -10 },
              { target: "mental", value: -5 },
            ],
          },
          {
            weight: 30,
            resultText: "자리가 없었다.\n도서관은 이미 보스방이었다.",
            effects: [
              { target: "grade", value: 15 },
              { target: "stamina", value: -15 },
              { target: "mental", value: -12 },
            ],
            addTitle: "도서관 자리 난민",
          },
        ],
      },
      {
        id: "cafe",
        label: "카페에 간다",
        resultText: "카페에 갔다.\n커피값은 공부세처럼 빠져나갔다.",
        effects: [
          { target: "grade", value: 8 },
          { target: "money", value: -6000 },
          { target: "caffeine", value: 10 },
          { target: "mental", value: 2 },
        ],
      },
      {
        id: "home",
        label: "집에서 공부한다",
        outcomes: [
          {
            weight: 40,
            resultText: "집에서 공부에 성공했다.\n방이 오늘은 도서관 흉내를 냈다.",
            effects: [
              { target: "grade", value: 10 },
              { target: "stamina", value: 3 },
            ],
          },
          {
            weight: 60,
            resultText: "침대가 승리했다.\n당신은 책을 베개 옆에 두고 연구했다.",
            effects: [
              { target: "stamina", value: 10 },
              { target: "grade", value: -5 },
              { target: "mental", value: 5 },
            ],
          },
        ],
      },
      {
        id: "study",
        label: "친구와 스터디한다",
        outcomes: [
          {
            weight: 60,
            resultText: "스터디가 스터디로 끝났다.\n기적에 가깝다.",
            effects: [
              { target: "grade", value: 10 },
              { target: "social", value: 5 },
            ],
          },
          {
            weight: 40,
            resultText: "스터디가 수다로 변질됐다.\n멘탈은 회복됐고 진도는 멈췄다.",
            effects: [
              { target: "grade", value: 5 },
              { target: "social", value: 5 },
              { target: "mental", value: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "week-14-final",
    type: "exam",
    week: 14,
    weekName: "기말고사",
    title: "기말고사",
    time: "14주차",
    avatar: "professor",
    assetKey: "week14",
    intro: ["마지막 시험이다.", "종강이 눈앞에 있다.", "그러나 교수님은 마지막까지 자비롭지 않았다."],
    options: [
      {
        id: "standard",
        label: "정석대로 푼다",
        resultText: "정석대로 풀었다.\n정석은 느렸지만 배신은 덜 했다.",
        effects: [{ target: "mental", value: -5 }],
        choiceBonus: 10,
      },
      {
        id: "analyze",
        label: "중간고사 패턴을 분석한다",
        outcomes: [
          {
            weight: 50,
            resultText: "중간고사 실패가 기말고사 자료가 됐다.\n상처도 데이터가 된다.",
            effects: [{ target: "mental", value: 3 }],
            choiceBonus: 15,
          },
          {
            weight: 50,
            resultText: "중간고사 패턴은 있었지만 교수님은 업데이트됐다.",
            effects: [],
            choiceBonus: 5,
          },
        ],
      },
      {
        id: "quick",
        label: "찍고 빠르게 퇴장한다",
        outcomes: [
          {
            weight: 50,
            resultText: "빠르게 찍었다.\n속도감만큼은 A+였다.",
            effects: [{ target: "mental", value: 10 }],
            choiceBonus: 12,
          },
          {
            weight: 50,
            resultText: "빠르게 찍었다.\n답도 빠르게 멀어졌다.",
            effects: [{ target: "mental", value: 10 }],
            choiceBonus: -10,
          },
        ],
      },
      {
        id: "last-five",
        label: "마지막 5분에 깨달음을 얻는다",
        outcomes: [
          {
            weight: 20,
            resultText: "마지막 5분에 깨달음이 왔다.\n손과 영혼이 동시에 움직였다.",
            effects: [{ target: "mental", value: 5 }],
            choiceBonus: 15,
          },
          {
            weight: 80,
            resultText: "손만 빨라졌다.\n글씨는 답보다 먼저 달렸다.",
            effects: [{ target: "mental", value: -5 }],
            choiceBonus: 2,
          },
        ],
      },
    ],
  },
  {
    id: "week-15-end",
    type: "main",
    week: 15,
    weekName: "종강",
    title: "종강",
    time: "15주차",
    avatar: "friend",
    intro: ["종강했다.", "자유가 찾아왔다.", "하지만 성적 확인이라는 최종 보스가 아직 남아 있다."],
    options: [
      {
        id: "party",
        label: "종강 파티에 간다",
        resultText: "종강 파티에 갔다.\n자유는 시끄럽고 계산서는 조용히 왔다.",
        effects: [
          { target: "social", value: 15 },
          { target: "money", value: -20000 },
          { target: "stamina", value: -15 },
          { target: "mental", value: 10 },
        ],
        addTitle: "종강의 망령",
      },
      {
        id: "sleep",
        label: "집에서 기절한다",
        resultText: "집에서 기절했다.\n잠은 최고의 종강 행사였다.",
        effects: [
          { target: "stamina", value: 20 },
          { target: "mental", value: 10 },
          { target: "social", value: -3 },
        ],
      },
      {
        id: "plan",
        label: "다음 학기 계획을 세운다",
        resultText: "당신은 다음 학기 계획을 세웠다.\n실현 여부는 별개의 문제다.",
        effects: [
          { target: "mental", value: 5 },
          { target: "grade", value: 2 },
        ],
      },
      {
        id: "nothing",
        label: "아무것도 안 한다",
        resultText: "아무것도 안 했다.\n드디어 일정표가 당신을 쫓아오지 않았다.",
        effects: [
          { target: "mental", value: 15 },
          { target: "stamina", value: 5 },
        ],
        addTitle: "무의 상태",
      },
    ],
  },
  {
    id: "week-16-grade-check",
    type: "ending",
    week: 16,
    weekName: "성적 확인",
    title: "성적 확인",
    time: "16주차",
    avatar: "lms",
    assetKey: "week16",
    intro: ["성적 확인 기간이 시작되었다.", "포털 로그인 버튼이 당신을 노려본다.", "확인하시겠습니까?"],
    options: [
      {
        id: "now",
        label: "바로 확인한다",
        outcomes: [
          {
            weight: 55,
            resultText: "바로 확인했다.\n마우스 클릭 소리가 보스전 시작음처럼 들렸다.",
            effects: [{ target: "mental", value: -10 }],
          },
          {
            weight: 45,
            resultText: "바로 확인했다.\n생각보다 숨은 붙어 있었다.",
            effects: [{ target: "mental", value: 5 }],
          },
        ],
      },
      {
        id: "friend-first",
        label: "친구 성적부터 물어본다",
        outcomes: [
          {
            weight: 50,
            resultText: "친구가 잘 봤다.\n축하는 했지만 손은 떨렸다.",
            effects: [
              { target: "social", value: 2 },
              { target: "mental", value: -13 },
            ],
          },
          {
            weight: 50,
            resultText: "친구도 망했다.\n이상한 동지애가 생겼다.",
            effects: [
              { target: "social", value: 2 },
              { target: "mental", value: 0 },
            ],
          },
        ],
      },
      {
        id: "tomorrow",
        label: "하루 미룬다",
        resultText: "성적은 사라지지 않았다.\n하루 뒤에도 그곳에 있었다.",
        effects: [
          { target: "mental", value: 5 },
          { target: "selfHolidayGauge", value: 3 },
        ],
      },
      {
        id: "block",
        label: "부모님 연락을 먼저 차단한다",
        resultText: "부모님 연락을 먼저 차단했다.\n예방은 치료보다 빠르다.",
        effects: [
          { target: "mental", value: 3 },
          { target: "social", value: -2 },
        ],
        addTitle: "성적확인 회피형 인간",
      },
    ],
  },
];
