import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby-pj29sMuYa0aLxWcwi1tGyzpGDLuiaw_dP1KWUgQ377bFQt--MS27E73VQeBBC52aBw/exec";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  zalo: z.string().trim().max(50).optional().default(""),
  message: z.string().trim().min(1).max(1000),
  piece: z.string().trim().max(200).optional().default(""),
});

type Props = {
  open: boolean;
  onClose: () => void;
  pieceLabel?: string;
  colorNote?: string;
};

export function InquiryDialog({ open, onClose, pieceLabel, colorNote }: Props) {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", zalo: "", message: "", piece: "" });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, piece: pieceLabel ?? "" }));
      setError(null);
      setSent(false);
      setSending(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, pieceLabel]);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSending(true);
    setError(null);
    const { name, email, zalo, message, piece } = parsed.data;
    const params = new URLSearchParams({
      name,
      email,
      zalo,
      piece,
      color: colorNote ?? "",
      message,
      timestamp: new Date().toISOString(),
    });
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: params,
      });
      setSent(true);
    } catch {
      setError(t("inquiry.errorRetry"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6 fade-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full md:max-w-md bg-cream rounded-t-2xl md:rounded-sm shadow-xl p-8 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-soft hover:text-ink transition-colors"
          aria-label={t("gallery.close")}
        >
          <X className="h-5 w-5" />
        </button>

        <p className="text-[10px] tracking-[0.3em] uppercase text-green-deep">Toi et Moi</p>
        <h2 className="font-serif text-2xl md:text-3xl text-ink mt-2">{t("inquiry.title")}</h2>
        <p className="text-sm text-ink-soft mt-2">{t("inquiry.subtitle")}</p>

        {sent ? (
          <div className="mt-8 text-center">
            <p className="font-serif text-xl text-green-deep">{t("inquiry.successTitle")}</p>
            <p className="text-sm text-ink-soft mt-2">{t("inquiry.successBody")}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-5 py-2 text-xs tracking-[0.25em] uppercase border border-ink text-ink hover:bg-ink hover:text-cream transition-colors"
            >
              {t("gallery.close")}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Field label={t("inquiry.name")}>
              <input
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border-b border-border focus:border-green outline-none py-2 text-ink"
              />
            </Field>
            <Field label={t("inquiry.email")}>
              <input
                required
                type="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border-b border-border focus:border-green outline-none py-2 text-ink"
              />
            </Field>
            <Field label={t("inquiry.zalo")}>
              <input
                type="tel"
                maxLength={50}
                value={form.zalo}
                onChange={(e) => setForm({ ...form, zalo: e.target.value })}
                className="w-full bg-transparent border-b border-border focus:border-green outline-none py-2 text-ink"
              />
            </Field>
            {form.piece && (
              <Field label={t("inquiry.piece")}>
                <input
                  readOnly
                  value={form.piece}
                  className="w-full bg-transparent border-b border-border outline-none py-2 text-ink"
                />
              </Field>
            )}
            {colorNote && (
              <Field label={t("gallery.colorLabel")}>
                <input
                  readOnly
                  value={colorNote}
                  className="w-full bg-transparent border-b border-border outline-none py-2 text-ink"
                />
              </Field>
            )}
            <Field label={t("inquiry.message")}>
              <textarea
                required
                maxLength={1000}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border-b border-border focus:border-green outline-none py-2 text-ink resize-none"
              />
            </Field>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={sending}
              className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 bg-green text-primary-foreground text-xs tracking-[0.25em] uppercase hover:bg-green-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? t("inquiry.sending") : t("inquiry.send")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.25em] uppercase text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
