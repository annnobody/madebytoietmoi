import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import { SiteLayout } from "@/components/SiteLayout";
import { CollectionRow } from "@/components/CollectionRow";
import { useLanguage } from "@/contexts/LanguageContext";
import { collections, featuredPiece, pieces as allPieces } from "@/data/pieces";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Toi et Moi — Made for your little world" },
      {
        name: "description",
        content:
          "Toi et Moi — small, hand-finished 3D-printed objects for the quiet corners of your home.",
      },
      { property: "og:title", content: "Toi et Moi — Made for your little world" },
      {
        property: "og:description",
        content: "Functional 3D-printed art pieces. Personalization, aesthetics, a cozy home.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {({ openInquiry, openLightbox }) => <HomeInner openInquiry={openInquiry} openLightbox={openLightbox} />}
    </SiteLayout>
  );
}

function HomeInner({
  openInquiry,
  openLightbox,
}: {
  openInquiry: (label?: string) => void;
  openLightbox: (list: typeof allPieces, index: number) => void;
}) {
  const { t, tx } = useLanguage();
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 md:pt-28 pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl px-6 text-center fade-up">
          <img src={logo} alt="Toi et Moi" className="mx-auto h-60 md:h-65 w-auto" />
          <h1 className="sr-only">Toi et Moi — {t("hero.tagline")}</h1>
          <p className="mt-6 text-ink-soft text-2xl md:text-2xl text-ink leading-[1.15] tracking-tight">
            {t("hero.tagline")}
          </p>
          <p className="mt-6 text-ink-soft md:text-lg leading-relaxed max-w-xl mx-auto">
            {t("hero.intro")}
          </p>
          <div className="mt-12 flex items-center justify-center gap-6 text-xs tracking-[0.3em] uppercase">
            <Link to="/gallery" className="text-green-deep border-b border-green pb-1 hover:border-green-deep">
              {t("nav.gallery")}
            </Link>
            <button
              type="button"
              onClick={() => openInquiry()}
              className="text-ink-soft hover:text-ink transition-colors"
            >
              {t("nav.inquire")}
            </button>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28 grid gap-10 md:grid-cols-2 items-center">
          <button
            type="button"
            onClick={() => openLightbox([featuredPiece, ...allPieces], 0)}
            className="block group overflow-hidden bg-muted"
            aria-label={tx(featuredPiece.title)}
          >
            <img
              src={featuredPiece.image}
              alt={tx(featuredPiece.title)}
              width={1024}
              height={1024}
              className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
          </button>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-green-deep">
              {t("featured.eyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl text-ink leading-tight">
              {tx(featuredPiece.title)}
            </h2>
            <p className="mt-5 text-ink-soft leading-relaxed md:text-lg">{tx(featuredPiece.caption)}</p>
            <p className="mt-4 text-sm text-ink-soft">
              {featuredPiece.dimensions} · {tx(featuredPiece.material)}
            </p>
            <Link
              to="/gallery"
              className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-green-deep border-b border-green pb-1 hover:border-green-deep"
            >
              {t("featured.cta")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Collections */}
      {collections.map(({ key, pieces }) => (
        <CollectionRow
          key={key}
          titleKey={`collections.${key}`}
          pieces={pieces}
          onPieceClick={(i) => openLightbox(pieces, i)}
        />
      ))}

      {/* About teaser */}
      <section className="mt-28 md:mt-36">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-green-deep">Toi et Moi</p>
          <p className="mt-4 font-serif text-2xl md:text-3xl text-ink leading-snug">
            {t("about.lead")}
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-xs tracking-[0.3em] uppercase">
            <Link to="/about" className="text-green-deep border-b border-green pb-1 hover:border-green-deep">
              {t("nav.about")}
            </Link>
            <button
              type="button"
              onClick={() => openInquiry()}
              className="text-ink-soft hover:text-ink transition-colors"
            >
              {t("nav.inquire")}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
