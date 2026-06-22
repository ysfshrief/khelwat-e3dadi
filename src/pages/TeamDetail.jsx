import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { TEAMS } from "../lib/seed";
import { useStore } from "../lib/hooks";
import { toArabicDigits, drivePreview } from "../lib/utils";
import {
  ArrowRight,
  BookOpen,
  MessageCircle,
  Users,
  Heart,
  Sparkles,
  GraduationCap,
  ChevronDown,
} from "lucide-react";

export default function TeamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const team = TEAMS.find((t) => t.id === id);
  const [logos] = useStore("teamLogos", {});
  const [storyOpen, setStoryOpen] = useState(false);

  if (!team) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-10 text-center">
        <p className="text-ink/60">الفريق غير موجود.</p>
        <Link to="/teams" className="btn-primary mt-4">
          العودة للفرق
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fadeUp">
      {/* ───── colored header (team color dominant) ───── */}
      <div
        className="relative px-5 pt-5 pb-16 text-white"
        style={{
          background: `linear-gradient(150deg, ${team.color}, ${team.accent})`,
        }}
      >
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-white text-sm font-bold bg-ink/25 rounded-full px-3 py-1.5 backdrop-blur-sm mb-4"
          >
            <ArrowRight size={18} /> رجوع
          </button>
          <div className="flex items-center gap-4">
            {/* small team avatar (the story image) + admin logo slot */}
            <span className="relative shrink-0">
              <img
                src={team.image}
                alt={team.name}
                className="h-16 w-16 rounded-2xl object-cover border-2 border-white/80 shadow-md"
              />
              {logos[team.id] && (
                <img
                  src={drivePreview(logos[team.id])}
                  alt="شعار الفريق"
                  className="absolute -bottom-1.5 -left-1.5 h-7 w-7 rounded-lg object-cover border-2 border-white bg-white"
                />
              )}
            </span>
            <div>
              <h1 className="font-display text-2xl font-extrabold drop-shadow">
                {team.name}
              </h1>
              <span className="chip bg-ink/25 text-white mt-2 backdrop-blur-sm">
                <BookOpen size={13} /> {team.verseRef}
              </span>
            </div>
            <span className="text-4xl mr-auto">{team.emoji}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 -mt-10 relative z-10">
        {/* ───── FRAMED PORTRAIT (not a background) ───── */}
        <div
          className="rounded-3xl p-2 shadow-card"
          style={{ background: team.color }}
        >
          <div className="rounded-[20px] overflow-hidden border-4 border-white bg-white">
            <img
              src={team.image}
              alt={team.name}
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>

        {/* ───── WHO AM I ───── */}
        <section className="surface p-6 text-center mt-4">
          <Sparkles size={22} className="mx-auto text-gold mb-2" />
          <p className="eyebrow justify-center mb-1">أنا مين؟</p>
          <p className="font-display text-2xl font-extrabold text-deep">
            {team.whoAmI}
          </p>
        </section>

        {/* ───── FULL STORY (expandable) ───── */}
        <section className="surface overflow-hidden mt-4">
          <button
            onClick={() => setStoryOpen((v) => !v)}
            className="w-full flex items-center justify-between p-5 text-right"
            aria-expanded={storyOpen}
          >
            <span className="flex items-center gap-2 font-extrabold text-deep">
              <BookOpen size={18} className="text-teal" /> القصة كاملة
            </span>
            <span
              className="chip text-white"
              style={{ background: team.color }}
            >
              {storyOpen ? "إخفاء" : "عرض القصة"}
              <ChevronDown
                size={15}
                className={`transition-transform ${
                  storyOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>

          {storyOpen && (
            <div className="px-5 pb-6 animate-fadeUp">
              <div className="space-y-3.5">
                {team.story.map((para, i) => (
                  <p
                    key={i}
                    className={`leading-loose ${
                      i === 0
                        ? "font-extrabold text-teal text-sm"
                        : "text-deep/90"
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* lessons */}
              <div
                className="mt-6 rounded-2xl p-5"
                style={{ background: `${team.color}10` }}
              >
                <p className="flex items-center gap-2 font-extrabold text-deep mb-3">
                  <GraduationCap size={18} style={{ color: team.color }} />
                  تتعلّم مني إيه؟
                </p>
                <ul className="space-y-2.5">
                  {team.lessons.map((l, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className="grid place-items-center h-6 w-6 rounded-lg text-white text-xs font-extrabold shrink-0 mt-0.5"
                        style={{ background: team.accent }}
                      >
                        {toArabicDigits(i + 1)}
                      </span>
                      <span className="text-deep/90 leading-relaxed font-semibold">
                        {l}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* ───── MESSAGE TO YOU ───── */}
        <section
          className="rounded-3xl p-6 mt-4 text-white relative overflow-hidden"
          style={{ background: team.color }}
        >
          <MessageCircle
            size={90}
            className="absolute -bottom-5 -left-3 opacity-10"
          />
          <p className="text-white/80 text-xs font-extrabold mb-2 flex items-center gap-1.5">
            <Heart size={14} /> رسالتي ليك
          </p>
          <p className="font-display text-xl font-bold leading-relaxed">
            « {team.message} »
          </p>
        </section>

        {/* ───── MEMBERS ───── */}
        <section className="surface p-5 mt-4">
          <p className="eyebrow mb-3 flex items-center gap-1.5">
            <Users size={14} /> الأعضاء · {toArabicDigits(team.members.length)}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {team.members.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-xl bg-sand/60 px-3 py-2"
              >
                <span
                  className="latin grid place-items-center h-6 w-6 rounded-lg text-[11px] font-extrabold text-white shrink-0"
                  style={{ background: team.accent }}
                >
                  {toArabicDigits(i + 1)}
                </span>
                <span className="text-sm font-semibold text-deep truncate">
                  {m}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ───── SERVANTS ───── */}
        <section className="surface p-5 mt-4 mb-2">
          <p className="eyebrow mb-3">الخدام</p>
          <div className="flex flex-wrap gap-2">
            {team.servants.map((s, i) => (
              <span
                key={i}
                className="chip bg-gold/15 text-deep border border-gold/20 text-sm"
              >
                ✝️ {s}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
