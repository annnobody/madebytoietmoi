import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

export function Header({ onInquire }: { onInquire: () => void }) {
  const { t } = useLanguage();
  const navLink =
    "text-xs tracking-[0.25em] uppercase text-ink-soft hover:text-green-deep transition-colors";
  return (
    <header className="sticky top-0 z-30 bg-cream/85 backdrop-blur-sm border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Toi et Moi — Home">
          <img src={logo} alt="Toi et Moi" className="h-10 w-10 object-contain" />
          <span className="font-serif text-lg text-ink hidden sm:inline">Toi et Moi</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={navLink} activeProps={{ className: `${navLink} text-green-deep` }}>
            {t("nav.home")}
          </Link>
          <Link to="/gallery" className={navLink} activeProps={{ className: `${navLink} text-green-deep` }}>
            {t("nav.gallery")}
          </Link>
          <Link to="/about" className={navLink} activeProps={{ className: `${navLink} text-green-deep` }}>
            {t("nav.about")}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onInquire}
            className="hidden sm:inline-flex items-center text-xs tracking-[0.25em] uppercase text-green-deep border-b border-green hover:border-green-deep transition-colors pb-0.5"
          >
            {t("nav.inquire")}
          </button>
          <LanguageToggle />
        </div>
      </div>

      {/* mobile nav row */}
      <div className="md:hidden border-t border-border/60">
        <nav className="mx-auto max-w-6xl px-6 h-11 flex items-center justify-center gap-6">
          <Link to="/" className={navLink}>{t("nav.home")}</Link>
          <Link to="/gallery" className={navLink}>{t("nav.gallery")}</Link>
          <Link to="/about" className={navLink}>{t("nav.about")}</Link>
          <button type="button" onClick={onInquire} className={navLink}>
            {t("nav.inquire")}
          </button>
        </nav>
      </div>
    </header>
  );
}
