import { useCallback, useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { InquiryDialog } from "./InquiryDialog";
import { Lightbox } from "./Lightbox";
import { pieces as allPieces, type Piece } from "@/data/pieces";
import { useLanguage } from "@/contexts/LanguageContext";

type LayoutCtx = {
  openInquiry: (pieceLabel?: string) => void;
  openLightbox: (list: Piece[], index: number) => void;
};

// Lightweight render-prop style: SiteLayout exposes handlers via children fn.
export function SiteLayout({ children }: { children: (ctx: LayoutCtx) => ReactNode }) {
  const { tx } = useLanguage();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryPiece, setInquiryPiece] = useState<string | undefined>(undefined);

  const [lightboxList, setLightboxList] = useState<Piece[]>(allPieces);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openInquiry = useCallback((pieceLabel?: string) => {
    setInquiryPiece(pieceLabel);
    setInquiryOpen(true);
  }, []);

  const openLightbox = useCallback((list: Piece[], index: number) => {
    setLightboxList(list);
    setLightboxIndex(index);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink">
      <Header onInquire={() => openInquiry()} />
      <main className="flex-1">{children({ openInquiry, openLightbox })}</main>
      <Footer />

      <Lightbox
        pieces={lightboxList}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={(i) => setLightboxIndex(i)}
        onInquire={(p) => {
          setLightboxIndex(null);
          openInquiry(tx(p.title));
        }}
      />
      <InquiryDialog
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        pieceLabel={inquiryPiece}
      />
    </div>
  );
}
