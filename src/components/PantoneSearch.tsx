import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import pantoneData from "@/data/pantone-names.json";

type PantoneEntry = { name: string; pantone: string; hex: string };

type Props = {
  value: PantoneEntry | null;
  onChange: (v: PantoneEntry | null) => void;
};

export function PantoneSearch({ value, onChange }: Props) {
  const { t } = useLanguage();
  const [query, setQuery] = useState(value?.name ?? "");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return (pantoneData as PantoneEntry[])
      .filter((e) => e.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  const select = (entry: PantoneEntry) => {
    onChange(entry);
    setQuery(entry.name);
    setOpen(false);
  };

  const clear = () => {
    onChange(null);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative mt-3">
      <div className="flex items-center gap-2 border-b border-border pb-1">
        {value && (
          <span
            className="w-4 h-4 rounded-full flex-shrink-0 border border-border"
            style={{ background: value.hex }}
          />
        )}
        <input
          type="text"
          className="flex-1 bg-transparent text-[11px] text-ink outline-none placeholder:text-ink-soft"
          placeholder={t("gallery.colorSearch")}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (!e.target.value) onChange(null);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
        {value && (
          <button
            type="button"
            onClick={clear}
            className="text-ink-soft hover:text-ink text-xs leading-none"
            aria-label="Clear"
          >
            ×
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-10 left-0 right-0 mt-1 bg-cream border border-border shadow-lg max-h-48 overflow-y-auto">
          {results.map((entry) => (
            <li key={entry.pantone}>
              <button
                type="button"
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted transition-colors"
                onMouseDown={() => select(entry)}
              >
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0 border border-border"
                  style={{ background: entry.hex }}
                />
                <span className="text-[11px] text-ink">{entry.name}</span>
                <span className="text-[9px] text-ink-soft ml-auto">{entry.pantone}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {value && (
        <p className="text-[9px] text-ink-soft mt-1 tracking-[0.1em]">
          {value.pantone}
        </p>
      )}
    </div>
  );
}
