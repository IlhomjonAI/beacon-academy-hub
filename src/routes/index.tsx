import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  FlaskConical,
  Languages,
  Send,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import heroImage from "@/assets/school-hero.jpg";
import { ExamBanner } from "@/components/exam-banner";
import { TELEGRAM_URL, useSchoolStore } from "@/lib/school-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bekobod tumani ixtisoslashtirilgan maktabi — rasmiy sayt" },
      {
        name: "description",
        content:
          "Maktab yangiliklari, CHSB/BShB imtihon ogohlantirishlari, dars jadvali va oʻquvchilarimiz yutuqlari bir joyda.",
      },
      {
        property: "og:title",
        content: "Bekobod tumani ixtisoslashtirilgan maktabi — rasmiy sayt",
      },
      {
        property: "og:description",
        content:
          "Maktab hayoti, imtihon ogohlantirishlari va oʻquvchilarimiz yutuqlari uchun raqamli platforma.",
      },
    ],
  }),
  component: HomePage,
});

const stats = [
  { icon: Users, value: "620+", label: "Oʻquvchi" },
  { icon: Trophy, value: "140+", label: "Sertifikat va gʻoliblik" },
  { icon: Languages, value: "6", label: "Chuqurlashtirilgan til guruhi" },
  { icon: FlaskConical, value: "5", label: "Zamonaviy laboratoriya" },
];

function HomePage() {
  const { state, ready } = useSchoolStore();

  return (
    <div>
      {ready && <ExamBanner exam={state.exam} />}

      <section className="relative overflow-hidden bg-gradient-hero">
        <img
          src={heroImage}
          alt="Maktab binosi kunbotar payti"
          width={1600}
          height={912}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div className="text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full glass-panel-dark px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              PIIMA agentligi tasarrufidagi maktab
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
              Bekobod tumani ixtisoslashtirilgan maktabi
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
              Aniq fanlar, xalqaro til sertifikatlari va raqamli imtihon madaniyati
              asosida qurilgan taʼlim muhiti. Barcha yangiliklar, dars jadvali va
              yutuqlar shu yerda.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/faxrimiz"
                className="inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-primary shadow-elevated transition-all hover:-translate-y-0.5 hover:shadow-glow"
              >
                <Trophy className="h-4 w-4" aria-hidden />
                Bizning faxrimiz
              </Link>
              <Link
                to="/malumot"
                className="inline-flex items-center gap-2 rounded-xl glass-panel-dark px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
              >
                <CalendarDays className="h-4 w-4" aria-hidden />
                Dars jadvali
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 self-center">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="rounded-2xl glass-panel-dark p-5 text-primary-foreground transition-transform hover:-translate-y-1 animate-slide-up-fade"
                style={{ animationDelay: `${i * 100 + 200}ms` }}
              >
                <s.icon className="h-6 w-6 text-primary-foreground/80" aria-hidden />
                <p className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  {s.value}
                </p>
                <p className="text-xs text-primary-foreground/75 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Maktab hayoti
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Yangiliklar va tadbirlar
            </h2>
          </div>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Telegram kanalimiz
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {state.news.map((item, i) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elevated animate-slide-up-fade"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative h-44 overflow-hidden bg-gradient-primary">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-primary-foreground/90">
                    <CalendarDays className="h-10 w-10" aria-hidden />
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                  {new Date(item.date).toLocaleDateString("uz-UZ", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-bold leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-all hover:bg-gradient-primary hover:text-primary-foreground"
                >
                  <Send className="h-4 w-4" aria-hidden />
                  Telegramda koʻrish va izoh yozish
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-3xl bg-gradient-primary px-6 py-12 text-center text-primary-foreground shadow-glow sm:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            CHSB va BShB sinovlariga tayyormisiz?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-primary-foreground/85 sm:text-base">
            Kompyuterlashtirilgan imtihon qoidalari, xonalar taqsimoti va stressni
            boshqarish bosqichma-bosqich tushuntirilgan.
          </p>
          <Link
            to="/malumot"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
          >
            Qoʻllanmani oʻqish
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
