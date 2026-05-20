export const pixelAssetMap = {
  logo: {
    title: "/university-survival/png/title_logo.png",
  },
  avatar: {
    player: "/university-survival/png/avatar_player.png",
    professor: "/university-survival/png/avatar_professor.png",
    lms: "/university-survival/png/avatar_lms.png",
    teammate: "/university-survival/png/avatar_teammate.png",
    friend: "/university-survival/png/avatar_friend.png",
    system: "/university-survival/png/avatar_system.png",
  },
  statIcon: {
    grade: "/university-survival/png/stat_grade.png",
    mental: "/university-survival/png/stat_mental.png",
    stamina: "/university-survival/png/stat_stamina.png",
    money: "/university-survival/png/stat_money.png",
    social: "/university-survival/png/stat_social.png",
    professorAggro: "/university-survival/png/stat_professorAggro.png",
  },
  banner: {
    week1: "/university-survival/png/week_week1_start.png",
    week2: "/university-survival/png/week_week2_openingParty.png",
    week3: "/university-survival/png/week_week3_mt.png",
    week4: "/university-survival/png/week_week4_teamProject.png",
    week7: "/university-survival/png/week_week7_midterm.png",
    week9: "/university-survival/png/week_week9_sportsDay.png",
    week14: "/university-survival/png/week_week14_final.png",
    week16: "/university-survival/png/week_week16_gradeCheck.png",
  },
  eventIcon: {
    assignment: "/university-survival/png/event_assignment.png",
    cafeteria: "/university-survival/png/event_cafeteria.png",
    caffeine: "/university-survival/png/event_caffeine.png",
    commute: "/university-survival/png/event_commute.png",
    drinking: "/university-survival/png/event_drinking.png",
    lateWakeup: "/university-survival/png/event_lateWakeup.png",
    lms: "/university-survival/png/event_lms.png",
    selfHoliday: "/university-survival/png/event_selfHoliday.png",
    soloMeal: "/university-survival/png/event_soloMeal.png",
    teamProject: "/university-survival/png/event_teamProject.png",
  },
  badge: {
    academic: "/university-survival/png/badge_academic.png",
    danger: "/university-survival/png/badge_danger.png",
    normal: "/university-survival/png/badge_normal.png",
    rare: "/university-survival/png/badge_rare.png",
    survival: "/university-survival/png/badge_survival.png",
  },
  finalBackground: {
    dark: "/university-survival/png/finalResultCardBackground_dark.png",
    light: "/university-survival/png/finalResultCardBackground_light.png",
  },
} as const;

export type PixelAvatar = keyof typeof pixelAssetMap.avatar;
