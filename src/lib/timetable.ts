export type Lesson = {
  time: string;
  subject: string;
  teacher: string;
  room: string;
};

export const DAYS = [
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
] as const;

export type Day = (typeof DAYS)[number];

const t = (time: string, subject: string, teacher: string, room: string): Lesson => ({
  time,
  subject,
  teacher,
  room,
});

export const TIMETABLE: Record<Day, Lesson[]> = {
  Dushanba: [
    t("08:30 – 09:15", "Matematika", "N. Ismoilova", "204"),
    t("09:25 – 10:10", "Ingliz tili", "D. Karimov", "108"),
    t("10:20 – 11:05", "Fizika", "S. Aliyev", "Lab-1"),
    t("11:15 – 12:00", "Ona tili va adabiyot", "M. Yusupova", "203"),
    t("12:30 – 13:15", "Informatika", "B. Rahmonov", "Komp-2"),
  ],
  Seshanba: [
    t("08:30 – 09:15", "Kimyo", "G. Toshpoʻlatova", "Lab-2"),
    t("09:25 – 10:10", "Matematika", "N. Ismoilova", "204"),
    t("10:20 – 11:05", "Tarix", "A. Yoʻldoshev", "111"),
    t("11:15 – 12:00", "Ingliz tili", "D. Karimov", "108"),
    t("12:30 – 13:15", "Jismoniy tarbiya", "R. Xolmatov", "Sport zal"),
  ],
  Chorshanba: [
    t("08:30 – 09:15", "Biologiya", "Z. Nazarova", "Lab-3"),
    t("09:25 – 10:10", "Geometriya", "N. Ismoilova", "204"),
    t("10:20 – 11:05", "Informatika", "B. Rahmonov", "Komp-1"),
    t("11:15 – 12:00", "Maʼnaviyat soati", "Sinf rahbari", "203"),
    t("12:30 – 13:15", "Ingliz tili", "D. Karimov", "108"),
  ],
  Payshanba: [
    t("08:30 – 09:15", "Fizika", "S. Aliyev", "Lab-1"),
    t("09:25 – 10:10", "Matematika", "N. Ismoilova", "204"),
    t("10:20 – 11:05", "Geografiya", "O. Shermatov", "112"),
    t("11:15 – 12:00", "Ingliz tili", "D. Karimov", "108"),
    t("12:30 – 13:15", "Rus tili", "L. Petrova", "109"),
  ],
  Juma: [
    t("08:30 – 09:15", "Kimyo", "G. Toshpoʻlatova", "Lab-2"),
    t("09:25 – 10:10", "Ona tili va adabiyot", "M. Yusupova", "203"),
    t("10:20 – 11:05", "Matematika", "N. Ismoilova", "204"),
    t("11:15 – 12:00", "Informatika", "B. Rahmonov", "Komp-2"),
    t("12:30 – 13:15", "Sinf soati", "Sinf rahbari", "203"),
  ],
  Shanba: [
    t("08:30 – 09:15", "Ingliz tili (imtihon mashqi)", "D. Karimov", "Komp-1"),
    t("09:25 – 10:10", "Matematika (CHSB tayyorgarlik)", "N. Ismoilova", "Komp-2"),
    t("10:20 – 11:05", "Toʻgaraklar", "Fan oʻqituvchilari", "STEAM"),
  ],
};

/** Monday-first index into DAYS; Sunday returns null. */
export function todayDay(): Day | null {
  const js = new Date().getDay(); // 0 = Sunday
  if (js === 0) return null;
  return DAYS[js - 1];
}
