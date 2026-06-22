import { Link } from "react-router-dom";
import { RETREAT, SCHEDULE } from "../lib/seed";
import { resolveScheduleState } from "../lib/utils";
import { useNow } from "../lib/hooks";
import Countdown from "../components/Countdown";
import { MapPin, CalendarDays, ArrowLeft, Clock, Sparkles } from "lucide-react";

export default function Home() {
  const now = useNow(30000);
  const { current, next } = resolveScheduleState(SCHEDULE, now);

  return (
    <div className="animate-fadeUp">
      {/* ───────── HERO : two vertical images + centered content ───────── */}
      <section className="relative overflow-hidden">
        {/* split background */}
        <div className="absolute inset-0 grid grid-cols-2">
          <img
            src="/assets/hero-right.jpg"
            alt="طريق المسيح"
            className="h-full w-full object-cover"
          />
          <img
            src="/assets/hero-left.jpg"
            alt="طريق العالم"
            className="h-full w-full object-cover"
          />
        </div>
        {/* strong dark scrim for contrast (fixes white-text visibility) */}
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink/90" />
        {/* center seam glow */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gold/40" />

        <div className="relative mx-auto max-w-3xl px-5 pt-9 pb-9 text-center">
          {/* logo in an elegant dark glassmorphism frame for contrast */}
          <div className="relative mx-auto w-[88%] max-w-md">
            {/* soft warm glow halo */}
            <div
              className="absolute inset-0 -z-10 rounded-[2rem] blur-2xl opacity-60"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(201,150,47,0.35), rgba(122,32,32,0.18) 55%, transparent 75%)",
              }}
            />
            <div
              className="rounded-[1.75rem] px-6 py-5 border backdrop-blur-md shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
              style={{
                background:
                  "linear-gradient(160deg, rgba(10,18,30,0.62), rgba(18,12,20,0.58))",
                borderColor: "rgba(201,150,47,0.35)",
              }}
            >
              <img
                src="/assets/camp-logo.png"
                alt="Be Different"
                className="mx-auto w-full drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>

          <p className="mt-1 text-white font-extrabold text-lg drop-shadow-md">
            {RETREAT.subtitle}
          </p>

          {/* meta chips — solid for readability */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="chip bg-ink/70 text-white border border-white/25 backdrop-blur-sm">
              <CalendarDays size={14} /> {RETREAT.dateLabel}
            </span>
            <span className="chip bg-ink/70 text-white border border-white/25 backdrop-blur-sm">
              <MapPin size={14} /> {RETREAT.location}
              <span className="latin opacity-80">({RETREAT.locationCopt})</span>
            </span>
          </div>

          {/* countdown */}
          <div className="mt-7">
            <p className="text-gold text-xs font-extrabold tracking-[0.2em] mb-3 drop-shadow">
              العد التنازلي للخلوة
            </p>
            <Countdown targetISO={RETREAT.startISO} />
          </div>
        </div>
      </section>

      {/* ───────── LIVE NOW STRIP ───────── */}
      {(current || next) && (
        <section className="mx-auto max-w-3xl px-5 -mt-5 relative z-10">
          <Link
            to="/schedule"
            className="surface flex items-center gap-3 p-4 active:scale-[0.99] transition"
          >
            <span className="grid place-items-center h-12 w-12 rounded-2xl bg-teal/12 text-2xl shrink-0">
              {current ? current.icon : next?.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-extrabold tracking-wide text-teal flex items-center gap-1">
                {current ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulseSoft" />
                    يحدث الآن
                  </>
                ) : (
                  <>
                    <Clock size={12} /> النشاط القادم
                  </>
                )}
              </p>
              <p className="font-extrabold text-deep truncate">
                {current ? current.title : next?.title}
              </p>
            </div>
            <ArrowLeft size={20} className="text-ink/30 shrink-0" />
          </Link>
        </section>
      )}

      {/* ───────── BIBLE VERSE ───────── */}
      <section className="mx-auto max-w-3xl px-5 mt-6">
        <div className="relative surface overflow-hidden p-7 text-center">
          <div className="absolute -top-8 -right-6 text-[120px] leading-none text-teal/5 font-display select-none">
            ”
          </div>
          <Sparkles size={20} className="mx-auto text-gold mb-3" />
          <p className="font-display text-xl sm:text-2xl font-bold text-deep leading-loose">
            {RETREAT.verse}
          </p>
          <p className="mt-4 inline-flex chip bg-gold/15 text-gold font-extrabold">
            {RETREAT.verseRef}
          </p>
        </div>
      </section>

      {/* ───────── THE TWO PATHS (signature) ───────── */}
      <section className="mx-auto max-w-3xl px-5 mt-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl overflow-hidden bg-ink text-white p-5 relative">
            <span className="text-3xl">🌃</span>
            <p className="mt-2 font-extrabold">طريق العالم</p>
            <p className="text-xs text-white/70 mt-1 leading-relaxed">
              «ولا تشاكلوا هذا الدهر»
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-gold to-goldLight text-ink p-5 relative">
            <span className="text-3xl">🌅</span>
            <p className="mt-2 font-extrabold">طريق المسيح</p>
            <p className="text-xs text-ink/75 mt-1 leading-relaxed">
              «بل تغيّروا بتجديد أذهانكم»
            </p>
          </div>
        </div>
        <p className="text-center mt-4 font-display text-lg font-extrabold text-gradient">
          إنت بتختار تكون مين؟ · كن مختلفاً
        </p>
      </section>

      {/* ───────── QUICK LINKS ───────── */}
      <section className="mx-auto max-w-3xl px-5 mt-8">
        <div className="grid grid-cols-2 gap-3">
          <QuickCard to="/schedule" emoji="📅" title="البرنامج" sub="مواعيد الخلوة" />
          <QuickCard to="/teams" emoji="👥" title="الفرق" sub="٣ فرق · القصص" />
          <QuickCard to="/rankings" emoji="🏆" title="النتائج" sub="ترتيب الفرق" />
          <QuickCard to="/hymns" emoji="🎶" title="الترانيم" sub="كلمات وتحميل" />
        </div>
      </section>
    </div>
  );
}

function QuickCard({ to, emoji, title, sub }) {
  return (
    <Link
      to={to}
      className="surface p-4 flex items-center gap-3 active:scale-[0.98] transition"
    >
      <span className="text-2xl">{emoji}</span>
      <div>
        <p className="font-extrabold text-deep leading-tight">{title}</p>
        <p className="text-xs text-ink/55">{sub}</p>
      </div>
    </Link>
  );
}
