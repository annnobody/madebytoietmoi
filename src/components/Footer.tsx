import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-32 border-t border-border/60 bg-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-14 grid gap-10 md:grid-cols-3 items-start">
        <div className="flex items-start gap-3">
          <img src={logo} alt="" className="h-20 w-25 object-contain" />
        </div>

        <div className="text-sm text-ink-soft">
          <p className="uppercase tracking-[0.25em] text-xs text-ink mb-3">{t("footer.handle")}</p>
          <a
            href="https://instagram.com/madebytoietmoi"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-deep transition-colors"
          >
            @madebytoietmoi
          </a>
          <p className="mt-2">
            <a href="mailto:hello@madebytoietmoi.com" className="hover:text-green-deep transition-colors">
              hello@madebytoietmoi.com
            </a>
          </p>
        </div>

        <div className="md:justify-self-end">
          <LanguageToggle />
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-6xl px-6 md:px-10 py-5 text-xs text-ink-soft/80 tracking-wider">
          © {new Date().getFullYear()} Toi et Moi. {t("footer.rights")}.
        </p>
      </div>
    </footer>
  );
}
