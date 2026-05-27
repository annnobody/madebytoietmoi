import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Lang } from "@/i18n/translations";

type Bilingual = { vi: string; en: string };

function isBilingual(v: unknown): v is Bilingual {
  return !!v && typeof v === "object" && "vi" in (v as object) && "en" in (v as object);
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (path: string) => string;
  tx: (val: Bilingual | string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "toi-et-moi:lang";

function detectInitial(): Lang {
  if (typeof window === "undefined") return "vi";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "vi" || stored === "en") return stored;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("vi") ? "vi" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi");

  useEffect(() => {
    setLangState(detectInitial());
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const setLang = (l: Lang) => setLangState(l);
    const toggle = () => setLangState((l) => (l === "vi" ? "en" : "vi"));
    const t = (path: string) => {
      const parts = path.split(".");
      let cur: unknown = translations;
      for (const p of parts) {
        if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
          cur = (cur as Record<string, unknown>)[p];
        } else {
          return path;
        }
      }
      if (isBilingual(cur)) return cur[lang];
      return typeof cur === "string" ? cur : path;
    };
    const tx = (val: Bilingual | string) => (typeof val === "string" ? val : val[lang]);
    return { lang, setLang, toggle, t, tx };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
