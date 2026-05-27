import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import featured from "@/assets/featured.jpg";
import { SiteLayout } from "@/components/SiteLayout";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Toi et Moi" },
      {
        name: "description",
        content:
          "The story behind Toi et Moi — a small studio making personalized, beautifully functional 3D-printed objects for cozy homes.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      {({ openInquiry }) => <AboutInner openInquiry={openInquiry} />}
    </SiteLayout>
  );
}

function AboutInner({ openInquiry }: { openInquiry: (label?: string) => void }) {
  const { t } = useLanguage();
  return (
    <>
      <section className="pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl px-6 text-center fade-up">
          <img src={logo} alt="Toi et Moi" className="mx-auto h-24 w-auto" />
          <p className="mt-6 text-[10px] tracking-[0.3em] uppercase text-green-deep">Toi et Moi</p>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl text-ink leading-tight">
            {t("about.title")}
          </h1>
          <p className="mt-6 font-serif text-2xl md:text-3xl text-ink/90 leading-snug">
            {t("about.lead")}
          </p>
        </div>
      </section>

      <section className="mt-16 md:mt-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <img
            src={featured}
            alt=""
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full h-auto object-cover aspect-[16/9]"
          />
        </div>
      </section>

      <section className="mt-16 md:mt-24">
        <div className="mx-auto max-w-2xl px-6 text-ink-soft md:text-lg leading-relaxed">
          <p>{t("about.body")}</p>
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10 grid gap-10 md:grid-cols-3">
          {(["one", "two", "three"] as const).map((k) => (
            <div key={k} className="border-t border-border pt-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-green-deep">0{k === "one" ? 1 : k === "two" ? 2 : 3}</p>
              <h3 className="mt-3 font-serif text-2xl text-ink">{t(`about.values.${k}.title`)}</h3>
              <p className="mt-3 text-ink-soft leading-relaxed">{t(`about.values.${k}.body`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 md:mt-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="font-serif text-2xl md:text-3xl text-ink">{t("hero.tagline")}</p>
          <button
            type="button"
            onClick={() => openInquiry()}
            className="mt-8 inline-flex items-center px-8 py-3 bg-green text-primary-foreground text-xs tracking-[0.3em] uppercase hover:bg-green-deep transition-colors"
          >
            {t("nav.inquire")}
          </button>
        </div>
      </section>
    </>
  );
}
