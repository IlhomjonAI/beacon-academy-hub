import { createFileRoute } from "@tanstack/react-router";
import { AlarmClock, Image as ImageIcon, Newspaper, Save, Trophy } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  CATEGORY_LABELS,
  useSchoolStore,
  type AchievementCategory,
} from "@/lib/school-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Oʻqituvchi paneli — maktab boshqaruvi" },
      {
        name: "description",
        content:
          "Imtihon ogohlantirishini yoqish, oʻquvchi yutuqlarini va yangiliklarni qoʻshish uchun oddiy boshqaruv paneli.",
      },
      { property: "og:title", content: "Oʻqituvchi paneli — maktab boshqaruvi" },
      {
        property: "og:description",
        content: "CHSB banneri, yutuqlar va yangiliklar boshqaruvi.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const field =
  "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-ring/15";
const labelCls = "block text-sm font-medium text-foreground";
const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elevated transition-all hover:-translate-y-0.5 hover:shadow-glow";

function Panel({
  icon,
  title,
  desc,
  children,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
          {icon}
        </span>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function AdminPage() {
  const { state, ready, setExam, addAchievement, addNews } = useSchoolStore();

  const [exam, setExamForm] = useState(state.exam);
  useEffect(() => {
    if (ready) setExamForm(state.exam);
  }, [ready, state.exam]);

  const [ach, setAch] = useState({
    student: "",
    grade: "",
    category: "language" as AchievementCategory,
    title: "",
    badge: "",
    description: "",
    certificateUrl: "",
  });

  const [news, setNews] = useState({ title: "", text: "", imageUrl: "" });

  const readFile = (file: File | undefined, cb: (url: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => cb(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
      <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
        Oʻqituvchi paneli
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Bu sahifa oddiy: maydonlarni toʻldirib “Saqlash” tugmasini bosasiz, oʻzgarish
        darhol saytda koʻrinadi.
      </p>

      <div className="mt-10 grid gap-6">
        <Panel
          icon={<AlarmClock className="h-5 w-5" aria-hidden />}
          title="CHSB / BShB banneri"
          desc="Bosh sahifadagi qizil imtihon ogohlantirishini yoqing yoki oʻchiring."
        >
          <form
            className="grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setExam(exam);
              toast.success("Banner sozlamalari saqlandi");
            }}
          >
            <label className="flex items-center justify-between gap-4 rounded-xl border border-border bg-secondary/50 px-4 py-3">
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  Banner holati
                </span>
                <span className="block text-xs text-muted-foreground">
                  {exam.active ? "Yoqilgan — bosh sahifada koʻrinadi" : "Oʻchirilgan"}
                </span>
              </span>
              <span className="relative inline-flex">
                <input
                  type="checkbox"
                  checked={exam.active}
                  onChange={(e) => setExamForm({ ...exam, active: e.target.checked })}
                  className="peer sr-only"
                />
                <span className="h-7 w-12 rounded-full bg-muted transition-colors peer-checked:bg-success" />
                <span className="pointer-events-none absolute left-1 top-1 h-5 w-5 rounded-full bg-background shadow transition-transform peer-checked:translate-x-5" />
              </span>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="exam-grade">
                  Sinf
                </label>
                <input
                  id="exam-grade"
                  className={field}
                  placeholder="9-A sinf"
                  value={exam.grade}
                  onChange={(e) => setExamForm({ ...exam, grade: e.target.value })}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="exam-subject">
                  Fan
                </label>
                <input
                  id="exam-subject"
                  className={field}
                  placeholder="Matematika"
                  value={exam.subject}
                  onChange={(e) => setExamForm({ ...exam, subject: e.target.value })}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="exam-time">
                  Boshlanish vaqti
                </label>
                <input
                  id="exam-time"
                  type="datetime-local"
                  className={field}
                  value={toLocalInput(exam.startsAt)}
                  onChange={(e) =>
                    setExamForm({
                      ...exam,
                      startsAt: new Date(e.target.value).toISOString(),
                    })
                  }
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="exam-room">
                  Xona
                </label>
                <input
                  id="exam-room"
                  className={field}
                  placeholder="2-kompyuter xonasi"
                  value={exam.room}
                  onChange={(e) => setExamForm({ ...exam, room: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" className={primaryBtn}>
              <Save className="h-4 w-4" aria-hidden />
              Saqlash
            </button>
          </form>
        </Panel>

        <Panel
          icon={<Trophy className="h-5 w-5" aria-hidden />}
          title="Yangi yutuq qoʻshish"
          desc="Oʻquvchi sertifikati yoki olimpiada natijasini “Bizning faxrimiz” sahifasiga joylash."
        >
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!ach.student || !ach.title) {
                toast.error("Oʻquvchi ismi va yutuq nomini kiriting");
                return;
              }
              addAchievement({
                ...ach,
                badge: ach.badge || "Yutuq",
                certificateUrl: ach.certificateUrl || undefined,
              });
              setAch({
                student: "",
                grade: "",
                category: "language",
                title: "",
                badge: "",
                description: "",
                certificateUrl: "",
              });
              toast.success("Yutuq qoʻshildi");
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="ach-student">
                  Oʻquvchi ismi
                </label>
                <input
                  id="ach-student"
                  className={field}
                  placeholder="Sardor Yoʻldoshev"
                  value={ach.student}
                  onChange={(e) => setAch({ ...ach, student: e.target.value })}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="ach-grade">
                  Sinf
                </label>
                <input
                  id="ach-grade"
                  className={field}
                  placeholder="11-A"
                  value={ach.grade}
                  onChange={(e) => setAch({ ...ach, grade: e.target.value })}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="ach-category">
                  Kategoriya
                </label>
                <select
                  id="ach-category"
                  className={field}
                  value={ach.category}
                  onChange={(e) =>
                    setAch({ ...ach, category: e.target.value as AchievementCategory })
                  }
                >
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="ach-badge">
                  Daraja belgisi
                </label>
                <input
                  id="ach-badge"
                  className={field}
                  placeholder="IELTS C1 / Milliy A+"
                  value={ach.badge}
                  onChange={(e) => setAch({ ...ach, badge: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className={labelCls} htmlFor="ach-title">
                Yutuq nomi
              </label>
              <input
                id="ach-title"
                className={field}
                placeholder="IELTS C1 — umumiy ball 7.5"
                value={ach.title}
                onChange={(e) => setAch({ ...ach, title: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="ach-desc">
                Izoh
              </label>
              <textarea
                id="ach-desc"
                rows={3}
                className={field}
                placeholder="Bo‘limlar bo‘yicha ballar, imtihon markazi va sana"
                value={ach.description}
                onChange={(e) => setAch({ ...ach, description: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="ach-file">
                Sertifikat rasmi
              </label>
              <label
                htmlFor="ach-file"
                className="mt-1.5 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-secondary/50 px-4 py-8 text-center text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <ImageIcon className="h-6 w-6" aria-hidden />
                {ach.certificateUrl ? "Rasm tanlandi ✓" : "Rasm tanlash uchun bosing"}
              </label>
              <input
                id="ach-file"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) =>
                  readFile(e.target.files?.[0], (url) =>
                    setAch((a) => ({ ...a, certificateUrl: url })),
                  )
                }
              />
            </div>
            <button type="submit" className={primaryBtn}>
              <Save className="h-4 w-4" aria-hidden />
              Yutuqni joylash
            </button>
          </form>
        </Panel>

        <Panel
          icon={<Newspaper className="h-5 w-5" aria-hidden />}
          title="Yangilik qoʻshish"
          desc="Tadbir, maʼnaviyat soati yoki eʼlonni bosh sahifaga joylash."
        >
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!news.title || !news.text) {
                toast.error("Sarlavha va matnni kiriting");
                return;
              }
              addNews({
                title: news.title,
                text: news.text,
                imageUrl: news.imageUrl || undefined,
                date: new Date().toISOString().slice(0, 10),
              });
              setNews({ title: "", text: "", imageUrl: "" });
              toast.success("Yangilik joylandi");
            }}
          >
            <div>
              <label className={labelCls} htmlFor="news-title">
                Sarlavha
              </label>
              <input
                id="news-title"
                className={field}
                placeholder="Maʼnaviyat soati oʻtkazildi"
                value={news.title}
                onChange={(e) => setNews({ ...news, title: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="news-text">
                Matn
              </label>
              <textarea
                id="news-text"
                rows={4}
                className={field}
                placeholder="Tadbir qanday oʻtdi, kimlar qatnashdi..."
                value={news.text}
                onChange={(e) => setNews({ ...news, text: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="news-file">
                Tadbir rasmi
              </label>
              <label
                htmlFor="news-file"
                className="mt-1.5 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-secondary/50 px-4 py-8 text-center text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <ImageIcon className="h-6 w-6" aria-hidden />
                {news.imageUrl ? "Rasm tanlandi ✓" : "Rasm tanlash uchun bosing"}
              </label>
              <input
                id="news-file"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) =>
                  readFile(e.target.files?.[0], (url) =>
                    setNews((n) => ({ ...n, imageUrl: url })),
                  )
                }
              />
            </div>
            <button type="submit" className={primaryBtn}>
              <Save className="h-4 w-4" aria-hidden />
              Yangilikni joylash
            </button>
          </form>
        </Panel>
      </div>
    </div>
  );
}
