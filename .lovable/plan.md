# Toi et Moi — Build Plan

A minimalist, bilingual (VI/EN) gallery site for functional 3D-printed art pieces. Cozy, tasteful, home-feeling — not "tech/3D-printing" energy.

## Brand

- Name: Toi et Moi · Tagline: "Made for your little world"
- Palette ("green butterfly" — soft botanical green on warm cream):
  - Cream background `#F7F1E6` (matches uploaded logo)
  - Brown ink `#5C3A21` (logo brown, for body text)
  - Primary green `#6B8E5A` (sage / butterfly green, accents + CTAs)
  - Deep green `#3F5D3A` (hover, headings accent)
- Type: serif display (Cormorant / Instrument Serif) for headings + sans (Work Sans / Karla) for body — echoes the logo's elegant serif.
- Logo: uploaded image used in header + footer + favicon.

## Pages

1. **Home** — full-bleed cream hero with logo mark + tagline (bilingual), one quiet line of intro, scroll cue. Below: 1 featured piece (large), then 2–3 curated collections (e.g. "For your desk", "For your plants", "For your kitchen") shown as horizontal scroll rows or asymmetric tiles. Closes with a soft About teaser + inquiry CTA.
2. **Gallery** — all pieces organized by collection. Click → lightbox (fullscreen image, title, short caption, dimensions/material, "Inquire about this piece" button that opens inquiry form prefilled with the piece name).
3. **About** — story of Toi et Moi, philosophy (personalization, aesthetics, cozy home), portrait/workspace image.

Persistent: minimal top nav (logo left, links + VI/EN toggle right), minimal footer (logo, contact, socials, language toggle).

## Key features

- **i18n**: lightweight in-app translation (no library overkill) — `useLanguage` context, `t(key)` helper, localStorage persistence, VI default-detectable. All copy in a single `translations.ts` keyed dictionary.
- **Lightbox**: accessible modal (Esc, arrows, click-outside), keyboard nav between pieces in same collection.
- **Inquiry form**: name, email, message, optional piece reference. Zod validation. v1 uses `mailto:` to madebytoietmoi (no backend) — clean and zero-setup. Can upgrade to Cloud + email later.
- **Gallery data**: typed `pieces.ts` array (id, slug, title VI/EN, caption VI/EN, collection, images, dimensions, material). Easy to extend.
- **Responsive**: mobile-first, generous whitespace, slow fade/scroll reveals, no flashy motion.

## Layout sketch

```text
HOME
┌────────────────────────────────────────────┐
│  [logo]                  Home Gallery About  VI|EN │
├────────────────────────────────────────────┤
│                                            │
│              [ logo mark ]                 │
│         Made for your little world         │
│                  ↓                          │
├────────────────────────────────────────────┤
│   FEATURED PIECE  (large image + caption)  │
├────────────────────────────────────────────┤
│   Collection: For your desk    →           │
│   [img] [img] [img] [img]                  │
├────────────────────────────────────────────┤
│   Collection: For your plants  →           │
│   [img] [img] [img] [img]                  │
├────────────────────────────────────────────┤
│   About teaser  ·  Inquire CTA             │
└────────────────────────────────────────────┘
```

## Tech / structure

- Vite + React + Tailwind + shadcn (already in template).
- Routes: `/`, `/gallery`, `/about` via react-router.
- Design tokens in `index.css` (`--cream`, `--ink`, `--green`, `--green-deep`) + Tailwind theme extension; all components use semantic tokens, no hardcoded colors.
- Files:
  - `src/contexts/LanguageContext.tsx`
  - `src/i18n/translations.ts`
  - `src/data/pieces.ts`
  - `src/components/{Header, Footer, LanguageToggle, Lightbox, InquiryDialog, CollectionRow, FeaturedPiece}.tsx`
  - `src/pages/{Home, Gallery, About}.tsx`
- SEO: per-page `<title>`/meta, single H1, alt text, JSON-LD `Organization`, favicon from logo.
- Placeholder piece images generated for v1 (3–6 pieces) so the gallery feels real; you can swap in your photos after.

## Out of scope for v1

- No cart/checkout, no auth, no backend (no Lovable Cloud needed).
- Inquiry sends via `mailto:` — upgrade path: Cloud + edge function to email.
