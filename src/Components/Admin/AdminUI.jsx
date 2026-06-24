import { Icon } from "./AdminIcons";

// الـ CSS Class المشترك لكل الـ inputs في الأدمن
export const inputCls = "w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition text-sm";

// ── Field ─────────────────────────────────────────────
// Label + Input مع بعض
export function Field({ label, children }) {
  return (
    <div>
      <label className="block mb-1.5 text-gray-300 text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

// ── LangTabs ──────────────────────────────────────────
// التابات اللي بتغير بين عربي وإنجليزي في الـ Modal
export function LangTabs({ active, onChange }) {
  const tabs = [
    { key: "ar", label: "🇪🇬 عربي" },
    { key: "en", label: "🇬🇧 English" },
  ];

  return (
    <div className="flex gap-1 p-1 bg-gray-800 rounded-2xl mb-5">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
            active === tab.key
              ? "bg-indigo-500 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ── LoadingDots ───────────────────────────────────────
// نقط اللودينج الصغيرة
export function LoadingDots() {
  return (
    <div className="flex items-center justify-center py-16 gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

// ── EmptyState ────────────────────────────────────────
// لما مفيش بيانات
export function EmptyState({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-600">
      <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-3">
        <Icon.Package />
      </div>
      <p className="text-sm">{label}</p>
    </div>
  );
}

// ── StatCard ──────────────────────────────────────────
// كارد الإحصائيات في أعلى الداشبورد
export function StatCard({ label, value, accent, icon }) {
  const colors = {
    indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  };

  return (
    <div className={`rounded-2xl border p-4 ${colors[accent]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl font-extrabold text-white">{value}</span>
        <div className="opacity-60">{icon}</div>
      </div>
      <p className="text-sm opacity-70">{label}</p>
    </div>
  );
}
