import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Clock,
  DoorOpen,
  HeartPulse,
  Laptop,
  ListChecks,
  MapPin,
  Phone,
  ShieldAlert,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import examLab from "@/assets/exam-lab.jpg";
import { DAYS, TIMETABLE, todayDay, type Day } from "@/lib/timetable";

export const Route = createFileRoute("/malumot")({
  head: () => ({
    meta: [
      { title: "Maʼlumot va raqamli dars jadvali" },
      {
        name: "description",
        content:
          "Dushanbadan shanbagacha dars jadvali, oʻqituvchilar va xonalar, hamda PIIMA kompyuterlashtirilgan imtihon qoʻllanmasi.",
      },
      { property: "og:title", content: "Maʼlumot va raqamli dars jadvali" },
      {
        property: "og:description",
        content:
          "Kunlik dars jadvali va kompyuterlashtirilgan imtihonga tayyorgarlik qoʻllanmasi.",
      },
    ],
  }),
  component: InfoPage,
});

const examSteps = [
  {
    icon: DoorOpen,
    title: "1. Xonaga kirish",
    text: "Imtihondan 15 daqiqa oldin kelib, roʻyxatdan oʻtasiz. Faqat pasport/guvohnoma va ruxsat berilgan yozuv qurollari olib kiriladi.",
  },
  {
    icon: Laptop,
    title: "2. Tizimga kirish",
    text: "Nazoratchi bergan login va parolni kiritasiz. Ekranda ismingiz va fan nomini tekshiring — xato boʻlsa darhol qoʻl koʻtaring.",
  },
  {
    icon: ListChecks,
    title: "3. Test ishlash",
    text: "Har bir savol alohida ochiladi. Javobni belgilab “Keyingi” tugmasini bosasiz; belgilangan savollarga oxirida qaytish mumkin.",
  },
  {
    icon: Clock,
    title: "4. Vaqtni boshqarish",
    text: "Ekranning yuqori qismidagi taymerga qarab boring. Bitta savolga 1.5 daqiqadan koʻp vaqt sarflamang.",
  },
  {
    icon: ShieldAlert,
    title: "5. Nazorat qoidalari",
    text: "Kamera va ekran yozib olinadi. Gaplashish, telefon yoki boshqa oynani ochish urinishi natija bekor qilinishiga olib keladi.",
  },
  {
    icon: BadgeCheck,
    title: "6. Yakunlash",
    text: "“Yakunlash” tugmasini faqat barcha javoblarni tekshirgach bosing. Natija ekranda chiqadi va tizimda saqlanadi.",
  },
];

const calmTips = [
  "Imtihondan oldingi kecha kamida 7 soat uxlang — tunda takrorlash natijani pasaytiradi.",
  "Xonaga kirishdan avval 4 soniya nafas oling, 4 soniya ushlab turing, 6 soniya chiqaring. 3 marta takrorlang.",
  "Savol tushunarsiz boʻlsa, belgilab qoʻyib keyingisiga oʻting — bir savolda qotib qolmang.",
  "Suv ichib turing va yelka-boʻyinni har 20 daqiqada bir marta yumshoq yozing.",
];

function InfoPage() {
  const [day, setDay] = useState<Day>("Dushanba");
  const [today, setToday] = useState<Day | null>(null);

  useEffect(() => {
    const t = todayDay();
    setToday(t);
    if (t) setDay(t);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
      <h1 className="text-3xl font-extrabold text-foreground sm:text-5xl">
        Maʼlumot va <span className="text-gradient-primary">raqamli dars jadvali</span>
      </h1>
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
        Jadval har kuni avtomatik ravishda bugungi kunga sozlanadi. Boshqa kunni koʻrish
        uchun tepadagi kunlardan birini tanlang.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {DAYS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDay(d)}
            className={
              day === d
                ? "rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated"
                : "rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            }
          >
            {d}
            {today === d && (
              <span className="ml-2 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold uppercase text-success">
                bugun
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary/60 px-5 py-4">
          <p className="font-display text-lg font-bold text-foreground">{day} jadvali</p>
          <p className="text-xs text-muted-foreground">
            {TIMETABLE[day].length} ta dars · 1-smena
          </p>
        </div>
        <ul className="divide-y divide-border">
          {TIMETABLE[day].map((l, i) => (
            <li
              key={`${l.time}-${l.subject}`}
              className="flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-secondary/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{l.subject}</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <User className="h-3.5 w-3.5" aria-hidden />
                    {l.teacher}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 pl-14 text-sm sm:pl-0">
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <Clock className="h-4 w-4 text-primary" aria-hidden />
                  {l.time}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {l.room}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <section className="mt-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          PIIMA qoʻllanma
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          Kompyuterlashtirilgan imtihon qanday oʻtadi?
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {examSteps.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <img
              src={examLab}
              alt="Kompyuter xonasida nazorat ostida imtihon topshirayotgan oʻquvchilar"
              loading="lazy"
              width={1200}
              height={800}
              className="h-56 w-full rounded-2xl border border-border object-cover shadow-elevated"
            />
            <div className="rounded-2xl border border-success/30 bg-success/8 p-6">
              <p className="inline-flex items-center gap-2 font-display text-base font-bold text-success">
                <HeartPulse className="h-5 w-5" aria-hidden />
                Stressni boshqarish
              </p>
              <ul className="mt-4 space-y-3">
                {calmTips.map((tip) => (
                  <li key={tip} className="flex gap-2.5 text-sm text-foreground/80">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl glass-panel p-6">
              <p className="font-display text-base font-bold text-foreground">
                Savol boʻlsa
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" aria-hidden />
                Maktab oʻquv boʻlimi — dars vaqtida 2-qavat, 205-xona.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
