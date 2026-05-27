import { useLanguage } from "@/contexts/LanguageContext";
import type { Piece } from "@/data/pieces";

export function PieceCard({
  piece,
  onClick,
  aspect = "square",
  priority = false,
}: {
  piece: Piece;
  onClick: () => void;
  aspect?: "square" | "portrait";
  priority?: boolean;
}) {
  const { tx } = useLanguage();
  const aspectClass = aspect === "portrait" ? "aspect-[4/5]" : "aspect-square";
  return (
    <button
      type="button"
      onClick={onClick}
      className="group block text-left w-full focus:outline-none"
      aria-label={tx(piece.title)}
    >
      <div className={`relative overflow-hidden bg-muted ${aspectClass}`}>
        <img
          src={piece.image}
          alt={tx(piece.title)}
          loading={priority ? "eager" : "lazy"}
          width={1024}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="pt-3">
        <p className="font-serif text-lg text-ink leading-snug">{tx(piece.title)}</p>
        <p className="text-sm text-ink-soft mt-0.5">{tx(piece.caption)}</p>
      </div>
    </button>
  );
}
