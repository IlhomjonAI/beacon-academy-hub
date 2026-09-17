import { useCallback, useEffect, useState } from "react";

export type AchievementCategory = "language" | "olympiad" | "exact";

export type Achievement = {
  id: string;
  student: string;
  grade: string;
  category: AchievementCategory;
  title: string;
  badge: string;
  description: string;
  certificateUrl?: string;
  claps: number;
};

export type NewsItem = {
  id: string;
  title: string;
  text: string;
  date: string;
  imageUrl?: string;
};

export type ExamAlert = {
  active: boolean;
  grade: string;
  subject: string;
  startsAt: string; // ISO datetime
  room: string;
};

export type SchoolState = {
  exam: ExamAlert;
  news: NewsItem[];
  achievements: Achievement[];
};

export const TELEGRAM_URL = "https://t.me/piima_bekobodtumani";

export const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  language: "IELTS / Til sertifikatlari",
  olympiad: "Al-Xorazmiy olimpiadasi",
  exact: "Aniq fanlar",
};

const inMinutes = (m: number) => new Date(Date.now() + m * 60_000).toISOString();

export const defaultState: SchoolState = {
  exam: {
    active: true,
    grade: "9-A sinf",
    subject: "Matematika",
    startsAt: inMinutes(15),
    room: "2-kompyuter xonasi",
  },
  news: [
    {
      id: "n1",
      title: "Maʼnaviyat soati: “Vatan tuygʻusi” uchrashuvi",
      text: "Maktabimizda tuman faxriylari bilan maʼnaviyat soati oʻtkazildi. Oʻquvchilar vatanparvarlik, oila qadriyatlari va kasb tanlash boʻyicha savollar berdi.",
      date: "2026-09-15",
    },
    {
      id: "n2",
      title: "PIIMA CHSB sinovlariga tayyorgarlik haftaligi",
      text: "Kompyuterlashtirilgan CHSB sinovlari oldidan barcha sinflar uchun sinov testlari va texnika bilan tanishtirish mashgʻulotlari tashkil etildi.",
      date: "2026-09-11",
    },
    {
      id: "n3",
      title: "STEAM laboratoriyasi ochilishi",
      text: "Yangi robototexnika va fizika laboratoriyasi ishga tushdi. 7–11-sinf oʻquvchilari uchun haftada ikki marta bepul toʻgaraklar ochiladi.",
      date: "2026-09-04",
    },
  ],
  achievements: [
    {
      id: "a1",
      student: "Sardor Yoʻldoshev",
      grade: "11-A",
      category: "language",
      title: "IELTS C1 — umumiy ball 7.5",
      badge: "IELTS C1",
      description:
        "Reading 8.0, Listening 8.0, Writing 7.0, Speaking 7.0. British Council markazida topshirilgan.",
      claps: 128,
    },
    {
      id: "a2",
      student: "Malika Rahimova",
      grade: "10-B",
      category: "olympiad",
      title: "Al-Xorazmiy olimpiadasi — respublika 2-oʻrin",
      badge: "Respublika II",
      description: "Informatika yoʻnalishi, algoritmlar boʻyicha 92/100 ball.",
      claps: 96,
    },
    {
      id: "a3",
      student: "Javohir Tursunov",
      grade: "9-A",
      category: "exact",
      title: "Fizika fani milliy sertifikati A+",
      badge: "Milliy A+",
      description: "Milliy sertifikat imtihonida 89 ball bilan A+ darajasi.",
      claps: 74,
    },
    {
      id: "a4",
      student: "Zilola Ergasheva",
      grade: "11-B",
      category: "language",
      title: "IELTS B2 — umumiy ball 6.0",
      badge: "IELTS B2",
      description: "Ingliz tili chuqurlashtirilgan guruh oʻquvchisi.",
      claps: 61,
    },
    {
      id: "a5",
      student: "Amirbek Qodirov",
      grade: "8-A",
      category: "olympiad",
      title: "Al-Xorazmiy olimpiadasi — viloyat 1-oʻrin",
      badge: "Viloyat I",
      description: "Matematik modellashtirish boʻlimida gʻolib.",
      claps: 45,
    },
    {
      id: "a6",
      student: "Nilufar Saidova",
      grade: "10-A",
      category: "exact",
      title: "Kimyo fani milliy sertifikati A",
      badge: "Milliy A",
      description: "Organik kimyo bloki boʻyicha eng yuqori natija.",
      claps: 38,
    },
  ],
};

const STORAGE_KEY = "bekobod-piima-state-v1";

function read(): SchoolState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<SchoolState>;
    return {
      exam: { ...defaultState.exam, ...parsed.exam },
      news: parsed.news ?? defaultState.news,
      achievements: parsed.achievements ?? defaultState.achievements,
    };
  } catch {
    return defaultState;
  }
}

const listeners = new Set<(s: SchoolState) => void>();
let memory: SchoolState | null = null;

function write(next: SchoolState) {
  memory = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l(next));
}

/** Client-side school data store (persists in the browser). */
export function useSchoolStore() {
  const [state, setState] = useState<SchoolState>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    memory = memory ?? read();
    setState(memory);
    setReady(true);
    const listener = (s: SchoolState) => setState({ ...s });
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  const update = useCallback((patch: (s: SchoolState) => SchoolState) => {
    const base = memory ?? read();
    write(patch(base));
  }, []);

  const setExam = useCallback(
    (exam: ExamAlert) => update((s) => ({ ...s, exam })),
    [update],
  );

  const addNews = useCallback(
    (item: Omit<NewsItem, "id">) =>
      update((s) => ({
        ...s,
        news: [{ ...item, id: crypto.randomUUID() }, ...s.news],
      })),
    [update],
  );

  const addAchievement = useCallback(
    (item: Omit<Achievement, "id" | "claps">) =>
      update((s) => ({
        ...s,
        achievements: [{ ...item, id: crypto.randomUUID(), claps: 0 }, ...s.achievements],
      })),
    [update],
  );

  const clap = useCallback(
    (id: string) =>
      update((s) => ({
        ...s,
        achievements: s.achievements.map((a) =>
          a.id === id ? { ...a, claps: a.claps + 1 } : a,
        ),
      })),
    [update],
  );

  return { state, ready, setExam, addNews, addAchievement, clap };
}

export function useCountdown(targetIso: string) {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setMs(new Date(targetIso).getTime() - Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  if (ms === null) return { label: "--:--", started: false, ready: false };
  if (ms <= 0) return { label: "Boshlandi", started: true, ready: true };

  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    label: h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`,
    started: false,
    ready: true,
  };
}
