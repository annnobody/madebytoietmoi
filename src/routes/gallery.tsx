import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CollectionRow } from "@/components/CollectionRow";
import { useLanguage } from "@/contexts/LanguageContext";
import { collections } from "@/data/pieces";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Toi et Moi" },
      {
        name: "description",
        content:
          "Explore Toi et Moi's gallery of functional 3D-printed art pieces for desks, plants, tables, and home.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <SiteLayout>
      {({ openLightbox }) => <GalleryInner openLightbox={openLightbox} />}
    </SiteLayout>
  );
}

function GalleryInner({
  openLightbox,
}: {
  openLightbox: (list: any, index: number) => void;
}) {
  const { t } = useLanguage();
  return (
    <>
      <section className="pt-20 md:pt-28 pb-8 md:pb-12">
        <div className="mx-auto max-w-3xl px-6 text-center fade-up">
          {/* <p className="text-[10px] tracking-[0.3em] uppercase text-green-deep">Toi et Moi</p> */}
          <h1 className="mt-3 font-serif text-4xl md:text-6xl text-ink leading-tight">
            {t("gallery.title")}
          </h1>
          <p className="mt-5 text-ink-soft md:text-lg leading-relaxed">{t("gallery.subtitle")}</p>
        </div>
      </section>

      {collections.map(({ key, pieces }) => (
        <CollectionRow
          key={key}
          titleKey={`collections.${key}`}
          pieces={pieces}
          onPieceClick={(i) => openLightbox(pieces, i)}
        />
      ))}
    </>
  );
}
