import { Link } from "@tanstack/react-router";
import { GraduationCap, Menu, Send, X } from "lucide-react";
import { useState } from "react";
import { TELEGRAM_URL } from "@/lib/school-store";

const links = [
  { to: "/", label: "Bosh sahifa" },
  { to: "/faxrimiz", label: "Bizning faxrimiz" },
  { to: "/malumot", label: "Maʼlumot va dars jadvali" },
  { to: "/admin", label: "Admin" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elevated transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6" aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold text-foreground sm:text-base">
              Bekobod tumani ixtisoslashtirilgan maktabi
            </span>
            <span className="block text-xs text-muted-foreground">
              PIIMA agentligi tasarrufida
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="ml-2 inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elevated transition-all hover:-translate-y-0.5 hover:shadow-glow"
          >
            <Send className="h-4 w-4" aria-hidden />
            Telegram
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menyu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background/95 px-4 pb-4 pt-2 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary data-[status=active]:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Send className="h-4 w-4" aria-hidden />
            Telegram jamoamiz
          </a>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-base font-bold text-foreground">
            Bekobod tumani ixtisoslashtirilgan maktabi
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Ixtisoslashtirilgan taʼlim muassasalari agentligi (PIIMA) tasarrufidagi
            maktab. Aniq fanlar va chuqurlashtirilgan til taʼlimi.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-foreground">Sahifalar</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <Link to="/faxrimiz" className="transition-colors hover:text-primary">
                Bizning faxrimiz
              </Link>
            </li>
            <li>
              <Link to="/malumot" className="transition-colors hover:text-primary">
                Dars jadvali va CHSB qoʻllanma
              </Link>
            </li>
            <li>
              <Link to="/admin" className="transition-colors hover:text-primary">
                Oʻqituvchi paneli
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-foreground">Jamoamiz</p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
          >
            <Send className="h-4 w-4" aria-hidden />
            t.me/piima_bekobodtumani
          </a>
          <p className="mt-4 text-muted-foreground">
            © {new Date().getFullYear()} Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
