# 한 학기만 버텨라: 대학생 생존 RPG — 1차 에셋팩

채팅형 UI에 바로 연결할 수 있는 SVG/PNG 에셋입니다.

## 구성

- logo: 타이틀 로고 1개
- messageAvatar: 교수님, LMS, 팀플 조원, 친구, 플레이어, 시스템 6개
- statIcon: 학점지수, 멘탈, 체력, 지갑, 인간관계, 교수님 어그로 6개
- weekBanner: 핵심 주차 배너 8개
- eventIcon: 랜덤/수업 이벤트 아이콘 10개
- titleBadge: 칭호 배지 프레임 5개
- finalResultCardBackground: 최종 결과 카드 배경 2개
- assetMap.json / assetMap.ts: 개발용 경로 매핑
- preview_contact_sheet.png: 전체 미리보기

## 사용법

React/Vite 기준으로 `src/assets` 아래에 `svg` 폴더를 복사한 뒤,
`assetMap.ts`의 경로를 프로젝트 구조에 맞게 조정하면 됩니다.

PNG는 빠른 미리보기/임시 적용용이고, 실제 앱에서는 SVG 사용을 추천합니다.

## 스타일 방향

- 채팅형 대학생활 밈 게임에 맞춘 플랫 2D 스타일
- 큰 RPG 일러스트가 아니라 아바타, 아이콘, 배너, 배지 중심
- 텍스트 재미를 방해하지 않도록 간결한 형태