import { AlertTriangle, DoorOpen, Timer } from "lucide-react";
import { useCountdown, type ExamAlert } from "@/lib/school-store";

export function ExamBanner({ exam }: { exam: ExamAlert }) {
  const { label, started } = useCountdown(exam.startsAt);

  if (!exam.active) return null;

  return (
    <div className="relative overflow-hidden bg-alert text-alert-foreground shadow-alert">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-40%,rgba(255,255,255,0.35),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="relative mt-1 flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alert-foreground/80" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-alert-foreground" />
          </span>
          <p className="text-sm font-medium leading-snug sm:text-base">
            <AlertTriangle className="mr-1.5 -mt-0.5 inline h-4 w-4" aria-hidden />
            <span className="font-bold">
              {exam.grade}, {exam.subject}
            </span>{" "}
            {started ? "imtihoni boshlandi!" : "imtihoni boshlanishiga vaqt qoldi!"}{" "}
            <span className="inline-flex items-center gap-1 font-semibold">
              <DoorOpen className="h-4 w-4" aria-hidden />
              {exam.room}ga oʻting.
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-xl bg-white/15 px-3 py-2 backdrop-blur-md sm:self-auto">
          <Timer className="h-4 w-4" aria-hidden />
          <span className="font-mono text-xl font-bold tabular-nums tracking-tight">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
