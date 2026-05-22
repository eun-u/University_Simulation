const asset = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/?$/, "/")}${path.replace(/^\//, "")}`;

export const pixelAssetMap = {
  logo: {
    title: asset("university-survival/png/title_logo.png"),
  },
  avatar: {
    player: asset("university-survival/png/avatar_player.png"),
    professor: asset("university-survival/png/avatar_professor.png"),
    lms: asset("university-survival/png/avatar_lms.png"),
    teammate: asset("university-survival/png/avatar_teammate.png"),
    friend: asset("university-survival/png/avatar_friend.png"),
    system: asset("university-survival/png/avatar_system.png"),
  },
  statIcon: {
    grade: asset("university-survival/png/stat_grade.png"),
    mental: asset("university-survival/png/stat_mental.png"),
    stamina: asset("university-survival/png/stat_stamina.png"),
    money: asset("university-survival/png/stat_money.png"),
    social: asset("university-survival/png/stat_social.png"),
    professorAggro: asset("university-survival/png/stat_professorAggro.png"),
  },
  banner: {
    week1: asset("university-survival/png/week_week1_start.png"),
    week2: asset("university-survival/png/week_week2_openingParty.png"),
    week3: asset("university-survival/png/week_week3_mt.png"),
    week4: asset("university-survival/png/week_week4_teamProject.png"),
    week5: asset("university-survival/png/week_week5_assignmentPile.png"),
    week7: asset("university-survival/png/week_week7_midterm.png"),
    week8: asset("university-survival/png/week_week8_festival.png"),
    week9: asset("university-survival/png/week_week9_sportsDay.png"),
    week11: asset("university-survival/png/week_week11_selfHoliday.png"),
    week14: asset("university-survival/png/week_week14_final.png"),
    week15: asset("university-survival/png/week_week15_end.png"),
    week16: asset("university-survival/png/week_week16_gradeCheck.png"),
    randomSoloMeal: asset("university-survival/png/banner_random_soloMeal.png"),
    randomCafeteria: asset("university-survival/png/banner_random_cafeteria.png"),
    randomDrinking: asset("university-survival/png/banner_random_drinking.png"),
    randomCommute: asset("university-survival/png/banner_random_commute.png"),
    randomLms: asset("university-survival/png/banner_random_lms.png"),
    randomTeamSilent: asset("university-survival/png/banner_random_teamSilent.png"),
    randomBalance: asset("university-survival/png/banner_random_balance.png"),
    randomSelfHolidayRelapse: asset("university-survival/png/banner_random_selfHolidayRelapse.png"),
  },
  eventIcon: {
    assignment: asset("university-survival/png/event_assignment.png"),
    cafeteria: asset("university-survival/png/event_cafeteria.png"),
    commute: asset("university-survival/png/event_commute.png"),
    drinking: asset("university-survival/png/event_drinking.png"),
    lateWakeup: asset("university-survival/png/event_lateWakeup.png"),
    lms: asset("university-survival/png/event_lms.png"),
    selfHoliday: asset("university-survival/png/event_selfHoliday.png"),
    soloMeal: asset("university-survival/png/event_soloMeal.png"),
    teamProject: asset("university-survival/png/event_teamProject.png"),
  },
  badge: {
    academic: asset("university-survival/png/badge_academic.png"),
    danger: asset("university-survival/png/badge_danger.png"),
    normal: asset("university-survival/png/badge_normal.png"),
    rare: asset("university-survival/png/badge_rare.png"),
    survival: asset("university-survival/png/badge_survival.png"),
  },
  finalBackground: {
    dark: asset("university-survival/png/finalResultCardBackground_dark.png"),
    light: asset("university-survival/png/finalResultCardBackground_light.png"),
  },
} as const;

export type PixelAvatar = keyof typeof pixelAssetMap.avatar;
