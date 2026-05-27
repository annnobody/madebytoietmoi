import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Piece } from "@/data/pieces";

type Props = {
  pieces: Piece[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  onInquire: (piece: Piece) => void;
};

export function Lightbox({ pieces, index, onClose, onIndexChange, onInquire }: Props) {
  const { t, tx } = useLanguage();
  const open = index !== null && index >= 0 && index < pieces.length;
  const piece = open ? pieces[index!] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndexChange((index! + 1) % pieces.length);
      else if (e.key === "ArrowLeft") onIndexChange((index! - 1 + pieces.length) % pieces.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, pieces.length, onClose, onIndexChange]);

  if (!open || !piece) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 fade-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={tx(piece.title)}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-5 right-5 text-cream/80 hover:text-cream transition-colors"
        aria-label={t("gallery.close")}
      >
        <X className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onIndexChange((index! - 1 + pieces.length) % pieces.length); }}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream transition-colors"
        aria-label={t("gallery.prev")}
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onIndexChange((index! + 1) % pieces.length); }}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream transition-colors"
        aria-label={t("gallery.next")}
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      <div
        className="relative max-w-5xl w-full grid md:grid-cols-[1.6fr_1fr] gap-0 bg-cream rounded-sm overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-muted">
          <img
            src={piece.image}
            alt={tx(piece.title)}
            className="w-full h-full max-h-[80vh] object-cover"
            width={1024}
            height={1024}
          />
        </div>
        <div className="p-8 md:p-10 flex flex-col">
          <p className="text-[10px] tracking-[0.3em] uppercase text-green-deep">
            {t(`collections.${piece.collection}`)}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mt-2 leading-tight">
            {tx(piece.title)}
          </h2>
          <p className="text-ink-soft mt-4 leading-relaxed">{tx(piece.caption)}</p>

          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-[10px] tracking-[0.25em] uppercase text-ink-soft">
                {t("gallery.dimensions")}
              </dt>
              <dd className="mt-1 text-ink">{piece.dimensions}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.25em] uppercase text-ink-soft">
                {t("gallery.material")}
              </dt>
              <dd className="mt-1 text-ink">{tx(piece.material)}</dd>
            </div>
          </dl>

          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={() => onInquire(piece)}
              className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-green text-primary-foreground text-xs tracking-[0.25em] uppercase hover:bg-green-deep transition-colors"
            >
              {t("gallery.inquire")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
