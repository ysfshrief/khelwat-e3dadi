import { diffParts, toArabicDigits } from "../lib/utils";
import { useNow } from "../lib/hooks";

function Cell({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative grid place-items-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-ink/80 border-2 border-gold/50 shadow-lg backdrop-blur-sm">
        <span className="latin text-2xl sm:text-3xl font-extrabold text-gold tabular-nums">
          {toArabicDigits(String(value).padStart(2, "0"))}
        </span>
      </div>
      <span className="mt-2 text-xs font-extrabold text-white drop-shadow">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ targetISO }) {
  const now = useNow(1000);
  const target = new Date(targetISO);
  const { d, h, m, s, total } = diffParts(target, now);

  if (total <= 0) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-ink font-extrabold shadow-lg">
        🔥 الخلوة بدأت — كن مختلفاً
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-4">
      <Cell value={d} label="يوم" />
      <Cell value={h} label="ساعة" />
      <Cell value={m} label="دقيقة" />
      <Cell value={s} label="ثانية" />
    </div>
  );
}
