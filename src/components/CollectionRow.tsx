import type { Piece } from "@/data/pieces";
import { useLanguage } from "@/contexts/LanguageContext";
import { PieceCard } from "./PieceCard";

export function CollectionRow({
  titleKey,
  pieces,
  onPieceClick,
}: {
  titleKey: string;
  pieces: Piece[];
  onPieceClick: (index: number) => void;
}) {
  const { t } = useLanguage();
  if (pieces.length === 0) return null;
  return (
    <section className="mt-24 md:mt-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex items-baseline justify-between border-b border-border/60 pb-4">
          <h2 className="font-serif text-2xl md:text-3xl text-ink">{t(titleKey)}</h2>
          <span className="text-[10px] tracking-[0.3em] uppercase text-ink-soft">
            {String(pieces.length).padStart(2, "0")} —
          </span>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {pieces.map((p, i) => (
            <PieceCard key={p.id} piece={p} onClick={() => onPieceClick(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
