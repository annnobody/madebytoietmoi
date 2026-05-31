# Color Picker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an interactive Pantone color picker to the Lightbox for `customColor: true` pieces, with 5 fixed available swatches and a name-search for custom Pantone pre-orders.

**Architecture:** `ColorPicker` and `PantoneSearch` are new standalone components. `Lightbox` owns `selectedColor` state and drives photo tint, CTA label, and mailto subject. `InquiryDialog` receives an optional `colorNote` string prepended to the email body.

**Tech Stack:** React 19, TypeScript, Tailwind v4, no external API (client-side name search against bundled JSON)

---

## File map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/data/colors.ts` | 5 fixed available Pantone swatches |
| Create | `src/data/pantone-names.json` | Curated ~100-entry name→PMS→hex dataset for search |
| Create | `src/components/ColorPicker.tsx` | Swatch row + "Other" toggle |
| Create | `src/components/PantoneSearch.tsx` | Name-search input + dropdown |
| Modify | `src/i18n/translations.ts` | New color picker keys |
| Modify | `src/components/Lightbox.tsx` | Color state, tint overlay, CTA logic |
| Modify | `src/components/InquiryDialog.tsx` | Accept + forward `colorNote` |

---

## Task 1: Add i18n keys

**Files:**
- Modify: `src/i18n/translations.ts`

- [ ] **Step 1: Add new keys to the `gallery` section**

Open `src/i18n/translations.ts`. Inside the `gallery` object (after the existing `nameTag` key), add:

```ts
colorLabel:        { vi: "Màu sắc",                  en: "Color" },
colorOther:        { vi: "+ Màu Pantone khác",         en: "+ Other Pantone color" },
colorApprox:       { vi: "Màu xấp xỉ",               en: "Approximate preview" },
colorPreorder:     { vi: "Đặt trước màu này",          en: "Pre-order this color" },
colorPreorderNote: { vi: "+ thời gian đặt trước",      en: "+ pre-order lead time applies" },
colorSearch:       { vi: "Tên màu Pantone…",           en: "Pantone color name…" },
colorSelected:     { vi: "Đã chọn",                   en: "Selected" },
```

- [ ] **Step 2: Verify TypeScript still compiles**

```bash
bun run build 2>&1 | tail -5
```
Expected: build succeeds (no type errors).

- [ ] **Step 3: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat: add color picker i18n keys"
```

---

## Task 2: Create fixed color data

**Files:**
- Create: `src/data/colors.ts`

- [ ] **Step 1: Create the file**

```ts
export type PantoneColor = {
  name: string;
  pantone: string;
  hex: string;
};

export type SelectedColor =
  | { type: "available"; color: PantoneColor }
  | { type: "custom"; name: string; pantone: string; hex: string };

export const availableColors: PantoneColor[] = [
  { name: "Sage Green",  pantone: "PMS 7494 C", hex: "#8FAF8A" },
  { name: "Cream",       pantone: "PMS 9183 C", hex: "#F0E3C5" },
  { name: "Linen",       pantone: "PMS 7527 C", hex: "#BFA99A" },
  { name: "Slate",       pantone: "PMS 7544 C", hex: "#6B7B8D" },
  { name: "Charcoal",    pantone: "PMS 425 C",  hex: "#3C3C3C" },
];
```

- [ ] **Step 2: Verify build**

```bash
bun run build 2>&1 | tail -5
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/colors.ts
git commit -m "feat: add available color data"
```

---

## Task 3: Create Pantone name search dataset

**Files:**
- Create: `src/data/pantone-names.json`

- [ ] **Step 1: Create the curated dataset**

This is a manually curated list of well-known Pantone color names. It covers the most commonly requested custom colors. The owner can extend it freely.

```json
[
  { "name": "Dusty Rose",      "pantone": "PMS 698 C",   "hex": "#E8A0AA" },
  { "name": "Blush",           "pantone": "PMS 705 C",   "hex": "#F9DDD6" },
  { "name": "Coral",           "pantone": "PMS 170 C",   "hex": "#FC7F3F" },
  { "name": "Peach",           "pantone": "PMS 156 C",   "hex": "#FCAD56" },
  { "name": "Tangerine",       "pantone": "PMS 158 C",   "hex": "#EDA04F" },
  { "name": "Marigold",        "pantone": "PMS 137 C",   "hex": "#FCA311" },
  { "name": "Sunflower",       "pantone": "PMS 116 C",   "hex": "#FCD116" },
  { "name": "Lemon",           "pantone": "PMS 102 C",   "hex": "#F9E814" },
  { "name": "Lime",            "pantone": "PMS 375 C",   "hex": "#8CD600" },
  { "name": "Mint",            "pantone": "PMS 7478 C",  "hex": "#8EE2BC" },
  { "name": "Sage Green",      "pantone": "PMS 7494 C",  "hex": "#8FAF8A" },
  { "name": "Forest Green",    "pantone": "PMS 357 C",   "hex": "#006B3F" },
  { "name": "Emerald",         "pantone": "PMS 340 C",   "hex": "#00B28C" },
  { "name": "Teal",            "pantone": "PMS 320 C",   "hex": "#009EA0" },
  { "name": "Aqua",            "pantone": "PMS 306 C",   "hex": "#00BCE2" },
  { "name": "Sky Blue",        "pantone": "PMS 292 C",   "hex": "#75B2DD" },
  { "name": "Baby Blue",       "pantone": "PMS 283 C",   "hex": "#9BC4E2" },
  { "name": "Cobalt",          "pantone": "PMS 286 C",   "hex": "#3A75C4" },
  { "name": "Navy",            "pantone": "PMS 289 C",   "hex": "#002D47" },
  { "name": "Royal Blue",      "pantone": "PMS 285 C",   "hex": "#3A75C4" },
  { "name": "Denim",           "pantone": "PMS 539 C",   "hex": "#003049" },
  { "name": "Slate Blue",      "pantone": "PMS 7544 C",  "hex": "#6B7B8D" },
  { "name": "Periwinkle",      "pantone": "PMS 2706 C",  "hex": "#D1CEDD" },
  { "name": "Lavender",        "pantone": "PMS 263 C",   "hex": "#E0CEE0" },
  { "name": "Lilac",           "pantone": "PMS 524 C",   "hex": "#D3B7CC" },
  { "name": "Mauve",           "pantone": "PMS 688 C",   "hex": "#BF93CC" },
  { "name": "Plum",            "pantone": "PMS 259 C",   "hex": "#72166B" },
  { "name": "Purple",          "pantone": "PMS 527 C",   "hex": "#7A1E99" },
  { "name": "Violet",          "pantone": "PMS 266 C",   "hex": "#6D28AA" },
  { "name": "Magenta",         "pantone": "PMS 213 C",   "hex": "#F94F8E" },
  { "name": "Hot Pink",        "pantone": "PMS 812 C",   "hex": "#FC2366" },
  { "name": "Rose",            "pantone": "PMS 1915 C",  "hex": "#F4547C" },
  { "name": "Fuchsia",         "pantone": "PMS 806 C",   "hex": "#FF0093" },
  { "name": "Cherry",          "pantone": "PMS 200 C",   "hex": "#C41E3A" },
  { "name": "Crimson",         "pantone": "PMS 187 C",   "hex": "#AF1E2D" },
  { "name": "Red",             "pantone": "PMS 485 C",   "hex": "#D81E05" },
  { "name": "Tomato",          "pantone": "PMS 179 C",   "hex": "#E23D28" },
  { "name": "Rust",            "pantone": "PMS 167 C",   "hex": "#BC4F07" },
  { "name": "Brick",           "pantone": "PMS 174 C",   "hex": "#933311" },
  { "name": "Terracotta",      "pantone": "PMS 1525 C",  "hex": "#B55400" },
  { "name": "Burnt Orange",    "pantone": "PMS 166 C",   "hex": "#DD5900" },
  { "name": "Caramel",         "pantone": "PMS 729 C",   "hex": "#C18E60" },
  { "name": "Tan",             "pantone": "PMS 7527 C",  "hex": "#BFA99A" },
  { "name": "Sand",            "pantone": "PMS 4515 C",  "hex": "#BCAD75" },
  { "name": "Cream",           "pantone": "PMS 9183 C",  "hex": "#F0E3C5" },
  { "name": "Ivory",           "pantone": "PMS 607 C",   "hex": "#F2EDAF" },
  { "name": "Beige",           "pantone": "PMS 9123 C",  "hex": "#E5DBBA" },
  { "name": "Warm White",      "pantone": "PMS 9020 C",  "hex": "#F4F0E8" },
  { "name": "Off White",       "pantone": "PMS 9184 C",  "hex": "#EDE2CC" },
  { "name": "Pearl",           "pantone": "PMS 9260 C",  "hex": "#E8DDD0" },
  { "name": "Linen",           "pantone": "PMS 7527 C",  "hex": "#BFA99A" },
  { "name": "Taupe",           "pantone": "PMS 402 C",   "hex": "#AFA593" },
  { "name": "Stone",           "pantone": "PMS 7530 C",  "hex": "#C1B5A5" },
  { "name": "Greige",          "pantone": "PMS 7534 C",  "hex": "#C6C1B2" },
  { "name": "Warm Gray",       "pantone": "PMS 408 C",   "hex": "#99897C" },
  { "name": "Cool Gray",       "pantone": "PMS 429 C",   "hex": "#ADAFAA" },
  { "name": "Silver",          "pantone": "PMS 427 C",   "hex": "#DDDBD1" },
  { "name": "Charcoal",        "pantone": "PMS 425 C",   "hex": "#3C3C3C" },
  { "name": "Graphite",        "pantone": "PMS 431 C",   "hex": "#666D70" },
  { "name": "Black",           "pantone": "PMS 426 C",   "hex": "#2B2B28" },
  { "name": "Dark Brown",      "pantone": "PMS 469 C",   "hex": "#603311" },
  { "name": "Chocolate",       "pantone": "PMS 4625 C",  "hex": "#472311" },
  { "name": "Espresso",        "pantone": "PMS 4975 C",  "hex": "#441E1C" },
  { "name": "Nude",            "pantone": "PMS 7523 C",  "hex": "#D8ADA8" },
  { "name": "Powder Pink",     "pantone": "PMS 706 C",   "hex": "#FCC9C6" },
  { "name": "Millennial Pink", "pantone": "PMS 694 C",   "hex": "#E8A0AA" },
  { "name": "Old Rose",        "pantone": "PMS 695 C",   "hex": "#B26B70" },
  { "name": "Dusty Blue",      "pantone": "PMS 5425 C",  "hex": "#8499A5" },
  { "name": "Steel Blue",      "pantone": "PMS 5405 C",  "hex": "#607C8C" },
  { "name": "Powder Blue",     "pantone": "PMS 290 C",   "hex": "#C4D8E2" },
  { "name": "Ice Blue",        "pantone": "PMS 656 C",   "hex": "#D6DBE0" },
  { "name": "Dusty Green",     "pantone": "PMS 5565 C",  "hex": "#779182" },
  { "name": "Olive",           "pantone": "PMS 576 C",   "hex": "#608E3A" },
  { "name": "Khaki",           "pantone": "PMS 452 C",   "hex": "#C4B796" },
  { "name": "Mustard",         "pantone": "PMS 117 C",   "hex": "#C6930A" },
  { "name": "Gold",            "pantone": "PMS 124 C",   "hex": "#E0AA0F" },
  { "name": "Champagne",       "pantone": "PMS 726 C",   "hex": "#E2BF9B" },
  { "name": "Copper",          "pantone": "PMS 876 C",   "hex": "#B87333" },
  { "name": "Dusty Purple",    "pantone": "PMS 5275 C",  "hex": "#605677" },
  { "name": "Dusty Mauve",     "pantone": "PMS 5185 C",  "hex": "#8E6877" },
  { "name": "Blush Pink",      "pantone": "PMS 9360 C",  "hex": "#F9DDD6" }
]
```

- [ ] **Step 2: Verify it parses**

```bash
node -e "const d = JSON.parse(require('fs').readFileSync('src/data/pantone-names.json','utf8')); console.log('entries:', d.length)"
```
Expected: `entries: 80` (or the count of entries you added).

- [ ] **Step 3: Commit**

```bash
git add src/data/pantone-names.json
git commit -m "feat: add Pantone name search dataset"
```

---

## Task 4: Create PantoneSearch component

**Files:**
- Create: `src/components/PantoneSearch.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import pantoneData from "@/data/pantone-names.json";

type PantoneEntry = { name: string; pantone: string; hex: string };

type Props = {
  value: PantoneEntry | null;
  onChange: (v: PantoneEntry | null) => void;
};

export function PantoneSearch({ value, onChange }: Props) {
  const { t } = useLanguage();
  const [query, setQuery] = useState(value?.name ?? "");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return (pantoneData as PantoneEntry[])
      .filter((e) => e.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  const select = (entry: PantoneEntry) => {
    onChange(entry);
    setQuery(entry.name);
    setOpen(false);
  };

  const clear = () => {
    onChange(null);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative mt-3">
      <div className="flex items-center gap-2 border-b border-border pb-1">
        {value && (
          <span
            className="w-4 h-4 rounded-full flex-shrink-0 border border-border"
            style={{ background: value.hex }}
          />
        )}
        <input
          type="text"
          className="flex-1 bg-transparent text-[11px] text-ink outline-none placeholder:text-ink-soft"
          placeholder={t("gallery.colorSearch")}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (!e.target.value) onChange(null);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
        {value && (
          <button
            type="button"
            onClick={clear}
            className="text-ink-soft hover:text-ink text-xs leading-none"
            aria-label="Clear"
          >
            ×
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-10 left-0 right-0 mt-1 bg-cream border border-border shadow-lg max-h-48 overflow-y-auto">
          {results.map((entry) => (
            <li key={entry.pantone}>
              <button
                type="button"
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted transition-colors"
                onMouseDown={() => select(entry)}
              >
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0 border border-border"
                  style={{ background: entry.hex }}
                />
                <span className="text-[11px] text-ink">{entry.name}</span>
                <span className="text-[9px] text-ink-soft ml-auto">{entry.pantone}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {value && (
        <p className="text-[9px] text-ink-soft mt-1 tracking-[0.1em]">
          {value.pantone}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
bun run build 2>&1 | tail -5
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/PantoneSearch.tsx
git commit -m "feat: add PantoneSearch component"
```

---

## Task 5: Create ColorPicker component

**Files:**
- Create: `src/components/ColorPicker.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { availableColors } from "@/data/colors";
import type { SelectedColor } from "@/data/colors";
import { PantoneSearch } from "@/components/PantoneSearch";

type Props = {
  value: SelectedColor | null;
  onChange: (color: SelectedColor | null) => void;
};

export function ColorPicker({ value, onChange }: Props) {
  const { t } = useLanguage();
  const [showOther, setShowOther] = useState(value?.type === "custom");

  const selectedAvailable =
    value?.type === "available" ? value.color : null;
  const selectedCustom =
    value?.type === "custom"
      ? { name: value.name, pantone: value.pantone, hex: value.hex }
      : null;

  const pickAvailable = (color: (typeof availableColors)[number]) => {
    setShowOther(false);
    onChange({ type: "available", color });
  };

  const openOther = () => {
    setShowOther(true);
    onChange(null);
  };

  const pickCustom = (entry: { name: string; pantone: string; hex: string } | null) => {
    if (entry) {
      onChange({ type: "custom", ...entry });
    } else {
      onChange(null);
    }
  };

  return (
    <div className="mt-6">
      <p className="text-[10px] tracking-[0.25em] uppercase text-ink-soft mb-3">
        {t("gallery.colorLabel")}
      </p>

      <div className="flex gap-2 flex-wrap">
        {availableColors.map((color) => {
          const selected = selectedAvailable?.pantone === color.pantone;
          return (
            <button
              key={color.pantone}
              type="button"
              title={`${color.name} · ${color.pantone}`}
              aria-label={`${color.name} · ${color.pantone}`}
              onClick={() => pickAvailable(color)}
              className="w-7 h-7 rounded-full transition-all focus:outline-none"
              style={{
                background: color.hex,
                boxShadow: selected
                  ? `0 0 0 2px #f7f1e6, 0 0 0 3.5px ${color.hex}`
                  : "0 0 0 1px #d4c9bc",
              }}
            />
          );
        })}
      </div>

      {selectedAvailable && (
        <p className="text-[9px] text-green-deep mt-2 tracking-[0.12em]">
          ✓ {selectedAvailable.name} · {selectedAvailable.pantone}
        </p>
      )}

      {!showOther && (
        <button
          type="button"
          onClick={openOther}
          className="mt-3 text-[9px] tracking-[0.15em] uppercase text-ink-soft hover:text-ink transition-colors underline"
        >
          {t("gallery.colorOther")}
        </button>
      )}

      {showOther && (
        <PantoneSearch value={selectedCustom} onChange={pickCustom} />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
bun run build 2>&1 | tail -5
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ColorPicker.tsx
git commit -m "feat: add ColorPicker component"
```

---

## Task 6: Update InquiryDialog to accept colorNote

**Files:**
- Modify: `src/components/InquiryDialog.tsx`

- [ ] **Step 1: Add `colorNote` prop to the `Props` type**

In `src/components/InquiryDialog.tsx`, change:

```ts
type Props = {
  open: boolean;
  onClose: () => void;
  pieceLabel?: string;
};
```

to:

```ts
type Props = {
  open: boolean;
  onClose: () => void;
  pieceLabel?: string;
  colorNote?: string;
};
```

- [ ] **Step 2: Accept `colorNote` in the component signature and thread it into the email body**

Change:

```ts
export function InquiryDialog({ open, onClose, pieceLabel }: Props) {
```

to:

```ts
export function InquiryDialog({ open, onClose, pieceLabel, colorNote }: Props) {
```

Then in `onSubmit`, change the `body` construction from:

```ts
const body = encodeURIComponent(
  `${message}\n\n— ${name} (${email})${piece ? `\nPiece: ${piece}` : ""}`,
);
```

to:

```ts
const colorLine = colorNote ? `${colorNote}\n\n` : "";
const body = encodeURIComponent(
  `${colorLine}${message}\n\n— ${name} (${email})${piece ? `\nPiece: ${piece}` : ""}`,
);
```

- [ ] **Step 3: Verify build**

```bash
bun run build 2>&1 | tail -5
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/InquiryDialog.tsx
git commit -m "feat: thread colorNote into inquiry email body"
```

---

## Task 7: Wire everything into Lightbox

**Files:**
- Modify: `src/components/Lightbox.tsx`

- [ ] **Step 1: Add imports at the top of `src/components/Lightbox.tsx`**

After the existing imports, add:

```tsx
import { useState, useEffect } from "react";
import { ColorPicker } from "@/components/ColorPicker";
import type { SelectedColor } from "@/data/colors";
```

Note: `useEffect` is already imported — just add `useState`. Add only what is missing.

- [ ] **Step 2: Add `selectedColor` state inside the `Lightbox` component, reset it when the piece changes**

After the existing `const open = ...` line, add:

```tsx
const [selectedColor, setSelectedColor] = useState<SelectedColor | null>(null);

useEffect(() => {
  setSelectedColor(null);
}, [index]);
```

- [ ] **Step 3: Build the `colorNote` string and determine if this is a pre-order**

After the `selectedColor` state, add:

```tsx
const isPreorder = selectedColor?.type === "custom";

const colorNote = selectedColor
  ? selectedColor.type === "available"
    ? `Color: ${selectedColor.color.name} · ${selectedColor.color.pantone}`
    : `Color: ${selectedColor.name} · ${selectedColor.pantone}`
  : undefined;
```

- [ ] **Step 4: Update the `onInquire` call to pass `colorNote`**

The `Lightbox` currently calls `onInquire(piece)`. The parent (`SiteLayout` or the route) passes this down. We need to thread `colorNote` through.

Change the `onInquire` button's `onClick`:

```tsx
onClick={() => onInquire(piece)}
```

to:

```tsx
onClick={() => onInquire(piece, colorNote)}
```

- [ ] **Step 5: Update the `Props` type and `onInquire` signature to accept `colorNote`**

At the top of the file, change:

```ts
type Props = {
  pieces: Piece[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  onInquire: (piece: Piece) => void;
};
```

to:

```ts
type Props = {
  pieces: Piece[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  onInquire: (piece: Piece, colorNote?: string) => void;
};
```

- [ ] **Step 6: Add the photo tint overlay inside the image div**

Find the image block in the Lightbox JSX:

```tsx
<div className="bg-muted">
  <img
    src={piece.image}
    alt={tx(piece.title)}
    className="w-full h-full max-h-[80vh] object-cover"
    width={1024}
    height={1024}
  />
</div>
```

Replace with:

```tsx
<div className="bg-muted relative overflow-hidden">
  <img
    src={piece.image}
    alt={tx(piece.title)}
    className="w-full h-full max-h-[80vh] object-cover"
    width={1024}
    height={1024}
  />
  {isPreorder && selectedColor?.type === "custom" && (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: selectedColor.hex,
          opacity: 0.35,
          mixBlendMode: "color",
        }}
      />
      <p className="absolute bottom-0 left-0 right-0 bg-ink/50 text-cream/80 text-[9px] tracking-[0.15em] uppercase text-center py-1">
        {t("gallery.colorApprox")}
      </p>
    </>
  )}
</div>
```

- [ ] **Step 7: Replace the static `customColor` badge with `ColorPicker`, and update the CTA button**

Find the existing badge block:

```tsx
{(piece.customColor || piece.allowNameTag) && (
  <div className="mt-4 flex flex-wrap gap-2">
    {piece.customColor && (
      <span className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-green text-green-deep">
        {t("gallery.customColor")}
      </span>
    )}
    {piece.allowNameTag && (
      <span className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-green text-green-deep">
        {t("gallery.nameTag")}
      </span>
    )}
  </div>
)}
```

Replace with:

```tsx
{(piece.customColor || piece.allowNameTag) && (
  <div className="mt-2">
    {piece.customColor && (
      <ColorPicker value={selectedColor} onChange={setSelectedColor} />
    )}
    {piece.allowNameTag && (
      <span className="mt-3 inline-block text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-green text-green-deep">
        {t("gallery.nameTag")}
      </span>
    )}
  </div>
)}
```

Then find the CTA button:

```tsx
<button
  type="button"
  onClick={() => onInquire(piece)}
  className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-green text-primary-foreground text-xs tracking-[0.25em] uppercase hover:bg-green-deep transition-colors"
>
  {t("gallery.inquire")}
</button>
```

Replace with:

```tsx
<div>
  {isPreorder && (
    <p className="text-[9px] text-ink-soft tracking-[0.1em] mb-2">
      {t("gallery.colorPreorderNote")}
    </p>
  )}
  <button
    type="button"
    onClick={() => onInquire(piece, colorNote)}
    className={`w-full md:w-auto inline-flex items-center justify-center px-6 py-3 text-primary-foreground text-xs tracking-[0.25em] uppercase transition-colors ${
      isPreorder
        ? "bg-ink hover:bg-ink/80"
        : "bg-green hover:bg-green-deep"
    }`}
  >
    {isPreorder ? t("gallery.colorPreorder") : t("gallery.inquire")}
  </button>
</div>
```

- [ ] **Step 8: Update `SiteLayout.tsx` to thread `colorNote` through**

In `src/components/SiteLayout.tsx`, make these exact changes:

**Add `inquiryColorNote` state** (after `inquiryPiece` state):

```ts
const [inquiryColorNote, setInquiryColorNote] = useState<string | undefined>(undefined);
```

**Update `openInquiry` signature** (change the function to accept and store `colorNote`):

```ts
// Before:
const openInquiry = useCallback((pieceLabel?: string) => {
  setInquiryPiece(pieceLabel);
  setInquiryOpen(true);
}, []);

// After:
const openInquiry = useCallback((pieceLabel?: string, colorNote?: string) => {
  setInquiryPiece(pieceLabel);
  setInquiryColorNote(colorNote);
  setInquiryOpen(true);
}, []);
```

**Update the `LayoutCtx` type** to match the new signature:

```ts
type LayoutCtx = {
  openInquiry: (pieceLabel?: string, colorNote?: string) => void;
  openLightbox: (list: Piece[], index: number) => void;
};
```

**Update `Lightbox.onInquire`** to forward `colorNote`:

```tsx
// Before:
onInquire={(p) => {
  setLightboxIndex(null);
  openInquiry(tx(p.title));
}}

// After:
onInquire={(p, colorNote) => {
  setLightboxIndex(null);
  openInquiry(tx(p.title), colorNote);
}}
```

**Update `<InquiryDialog>`** to receive `colorNote`:

```tsx
// Before:
<InquiryDialog
  open={inquiryOpen}
  onClose={() => setInquiryOpen(false)}
  pieceLabel={inquiryPiece}
/>

// After:
<InquiryDialog
  open={inquiryOpen}
  onClose={() => setInquiryOpen(false)}
  pieceLabel={inquiryPiece}
  colorNote={inquiryColorNote}
/>
```

- [ ] **Step 9: Verify build**

```bash
bun run build 2>&1 | tail -5
```
Expected: no errors.

- [ ] **Step 10: Start dev server and manually verify the full flow**

```bash
bun dev
```

Open the gallery page. Click a piece that has `customColor: true` (the "Pet sand shovel"). In the Lightbox:
1. ✓ 5 color swatches appear below the specs
2. ✓ Clicking a swatch highlights it with a ring + shows name · PMS code
3. ✓ Photo is unchanged, button stays "Inquire about this product"
4. ✓ Clicking "+ Other Pantone color" shows the search input
5. ✓ Typing "dusty" shows matching results in a dropdown
6. ✓ Selecting a custom color applies a tint to the photo + "Approximate preview" label
7. ✓ Button changes to "Pre-order this color" (darker/ink color) + lead time note
8. ✓ Clicking Inquire/Pre-order opens the dialog with the color pre-filled in the email body
9. ✓ Navigating to the next piece resets the color selection

- [ ] **Step 11: Commit**

```bash
git add src/components/Lightbox.tsx src/components/SiteLayout.tsx
git commit -m "feat: wire color picker into lightbox with tint preview and pre-order flow"
```

---

## Done

All tasks complete. The feature is live in dev. Run `bun build` for a production build before merging.
