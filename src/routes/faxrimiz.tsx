import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, FileImage, Hand, Trophy, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  useSchoolStore,
  type Achievement,
  type AchievementCategory,
} from "@/lib/school-store";

export const Route = createFileRoute("/faxrimiz")({
  head: () => ({
    meta: [
      { title: "Bizning faxrimiz — oʻquvchilar yutuqlari" },
      {
        name: "description",
        content:
          "IELTS va til sertifikatlari, Al-Xorazmiy olimpiadasi gʻoliblari va aniq fanlar boʻyicha milliy sertifikat egalari.",
      },
      { property: "og:title", content: "Bizning faxrimiz — oʻquvchilar yutuqlari" },
      {
        property: "og:description",
        content: "Maktab oʻquvchilarining sertifikat va olimpiada yutuqlari galereyasi.",
      },
    ],
  }),
  component: AchievementsPage,
});

const filters: { key: "all" | AchievementCategory; label: string }[] = [
  { key: "all", label: "Barchasi" },
  { key: "language", label: CATEGORY_LABELS.language },
  { key: "olympiad", label: CATEGORY_LABELS.olympiad },
  { key: "exact", label: CATEGORY_LABELS.exact },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function AchievementsPage() {
  const { state, clap } = useSchoolStore();
  const [active, setActive] = useState<"all" | AchievementCategory>("all");
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [clapped, setClapped] = useState<Record<string, boolean>>({});

  const list = useMemo(
    () =>
      active === "all"
        ? state.achievements
        : state.achievements.filter((a) => a.category === active),
    [state.achievements, active],
  );

  const totalClaps = state.achievements.reduce((sum, a) => sum + a.claps, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Trophy className="h-3.5 w-3.5" aria-hidden />
          Bizning faxrimiz
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold text-foreground sm:text-5xl">
          Oʻquvchilarimizning <span className="text-gradient-primary">yutuqlari</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Xalqaro til sertifikatlari, Al-Xorazmiy olimpiadasi gʻoliblari va aniq fanlar
          boʻyicha milliy sertifikat egalari.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(f.key)}
            className={
              active === f.key
                ? "rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated transition-all"
                : "rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <article
            key={a.id}
            className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elevated"
          >
            <button
              type="button"
              onClick={() => setSelected(a)}
              className="flex items-center gap-4 text-left"
            >
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-primary font-display text-xl font-bold text-primary-foreground">
                {initials(a.student)}
              </span>
              <span>
                <span className="block font-display text-lg font-bold text-foreground">
                  {a.student}
                </span>
                <span className="block text-sm text-muted-foreground">
                  {a.grade} sinf · {CATEGORY_LABELS[a.category]}
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelected(a)}
              className="mt-4 flex-1 text-left"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/12 px-3 py-1 text-xs font-bold text-success">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                {a.badge}
              </span>
              <span className="mt-3 block text-sm font-semibold text-foreground">
                {a.title}
              </span>
              <span className="mt-3 flex h-24 items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary/60 text-xs font-medium text-muted-foreground">
                {a.certificateUrl ? (
                  <img
                    src={a.certificateUrl}
                    alt={`${a.student} sertifikati`}
                    loading="lazy"
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <>
                    <FileImage className="h-4 w-4" aria-hidden />
                    Sertifikatni koʻrish
                  </>
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                clap(a.id);
                setClapped((c) => ({ ...c, [a.id]: true }));
              }}
              className={
                clapped[a.id]
                  ? "mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground transition-all"
                  : "mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-all hover:bg-success hover:text-success-foreground active:scale-95"
              }
            >
              <Hand className="h-4 w-4" aria-hidden />
              Tabriklash · {a.claps}
            </button>
          </article>
        ))}
      </div>

      <div className="mt-14 grid gap-4 rounded-3xl bg-gradient-primary p-8 text-center text-primary-foreground shadow-glow sm:grid-cols-3">
        <div>
          <p className="font-display text-4xl font-extrabold">
            {state.achievements.length}
          </p>
          <p className="mt-1 text-sm text-primary-foreground/85">Jami yutuq va sertifikat</p>
        </div>
        <div>
          <p className="font-display text-4xl font-extrabold">{totalClaps}</p>
          <p className="mt-1 text-sm text-primary-foreground/85">Tabriklar soni</p>
        </div>
        <div>
          <p className="font-display text-4xl font-extrabold">
            {state.achievements.filter((a) => a.category === "language").length}
          </p>
          <p className="mt-1 text-sm text-primary-foreground/85">Til sertifikatlari</p>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Yopish"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="bg-gradient-primary px-6 py-7 text-primary-foreground">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 font-display text-lg font-bold backdrop-blur">
                  {initials(selected.student)}
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold">{selected.student}</h2>
                  <p className="text-sm text-primary-foreground/85">
                    {selected.grade} sinf · {CATEGORY_LABELS[selected.category]}
                  </p>
                </div>
              </div>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-6">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-success/12 px-3 py-1 text-xs font-bold text-success">
                <Award className="h-3.5 w-3.5" aria-hidden />
                {selected.badge}
              </p>
              <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                {selected.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {selected.description}
              </p>
              <div className="mt-6 grid min-h-56 place-items-center overflow-hidden rounded-2xl border border-dashed border-border bg-secondary/60">
                {selected.certificateUrl ? (
                  <img
                    src={selected.certificateUrl}
                    alt={`${selected.student} sertifikati`}
                    className="max-h-80 w-full object-contain"
                  />
                ) : (
                  <p className="flex flex-col items-center gap-2 p-6 text-center text-sm text-muted-foreground">
                    <FileImage className="h-8 w-8" aria-hidden />
                    Sertifikat skanlangan nusxasi admin panel orqali yuklanadi.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => clap(selected.id)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-success px-4 py-3 text-sm font-semibold text-success-foreground transition-transform active:scale-[0.98]"
              >
                <Hand className="h-4 w-4" aria-hidden />
                Tabriklash · {state.achievements.find((a) => a.id === selected.id)?.claps}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
