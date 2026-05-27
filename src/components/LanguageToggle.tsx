import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className={`inline-flex items-center gap-1 text-xs tracking-widest uppercase ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("vi")}
        aria-pressed={lang === "vi"}
        className={`px-1.5 py-0.5 transition-colors ${
          lang === "vi" ? "text-green-deep border-b border-green" : "text-ink-soft hover:text-ink"
        }`}
      >
        VI
      </button>
      <span className="text-ink-soft/40">/</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-1.5 py-0.5 transition-colors ${
          lang === "en" ? "text-green-deep border-b border-green" : "text-ink-soft hover:text-ink"
        }`}
      >
        EN
      </button>
    </div>
  );
}
