# Color Picker — Design Spec
_Date: 2026-05-30_

## Problem

Pieces with `customColor: true` currently show only a static badge ("Custom color available"). Users have no way to pick a color, preview it, or signal whether they want a standard or custom-printed piece.

## Solution overview

A color picker embedded in the Lightbox panel for `customColor: true` pieces. Users choose from 5 fixed Pantone swatches (in-stock) or search for any Pantone color by name (pre-order). The selection tints the product photo for custom colors and pre-fills the inquiry/pre-order email.

---

## Data layer

### `src/data/colors.ts`

A typed array of the 5 fixed available colors:

```ts
export type PantoneColor = {
  name: string;    // display name, e.g. "Sage Green"
  pantone: string; // PMS code, e.g. "PMS 7494 C"
  hex: string;     // approximate hex for UI rendering
};

export const availableColors: PantoneColor[] = [
  { name: "Sage Green",  pantone: "PMS 7494 C",  hex: "#8FAF8A" },
  { name: "Cream",       pantone: "PMS 9183 C",  hex: "#F0E3C5" },
  { name: "Linen",       pantone: "PMS 7527 C",  hex: "#BFA99A" },
  { name: "Slate",       pantone: "PMS 7544 C",  hex: "#6B7B8D" },
  { name: "Charcoal",    pantone: "PMS 425 C",   hex: "#3C3C3C" },
];
```

Owner (nhungo) updates this array when the physical stock changes.

### Pantone search dataset

A bundled JSON file (`src/data/pantone-names.json`) mapping Pantone color names to hex values, used for client-side name search. Sourced from the open-source `pantone-colors` dataset (~1,900 entries, ~80 KB). No external API call at runtime.

---

## Components

### `src/components/ColorPicker.tsx`

Props:
```ts
type Props = {
  value: SelectedColor | null;
  onChange: (color: SelectedColor | null) => void;
};

type SelectedColor =
  | { type: "available"; color: PantoneColor }
  | { type: "custom"; name: string; pantone: string; hex: string };
```

Renders:
1. Row of 5 swatches from `availableColors`. Selected swatch gets a ring (`box-shadow`). Shows name + PMS code below on selection.
2. `+ Other Pantone color` link below the swatches. Clicking it toggles `PantoneSearch` open and clears the available selection.
3. When `PantoneSearch` is open, the 5 swatches remain visible but deselected.

### `src/components/PantoneSearch.tsx`

Props:
```ts
type Props = {
  value: { name: string; pantone: string; hex: string } | null;
  onChange: (v: { name: string; pantone: string; hex: string } | null) => void;
};
```

Renders:
- Text input. Filters `pantone-names.json` by name (case-insensitive substring).
- Dropdown of up to 8 matches. Each row: color swatch circle + name + PMS code.
- Selected value shown with swatch + name. Clearable.

No debounce needed (client-side filtering is instant).

### `src/components/Lightbox.tsx` — changes

1. Add `selectedColor: SelectedColor | null` state (reset to `null` when `index` changes).
2. Render `<ColorPicker>` in the detail panel when `piece.customColor === true`, replacing the static badge.
3. When `selectedColor?.type === "custom"`: render a `<div>` absolutely positioned over the product photo with `background: selectedColor.hex`, `opacity: 0.35`, `mix-blend-mode: color`, plus a small `"Approximate preview"` label at the bottom of the photo.
4. CTA button: label and mailto subject depend on color type (see table below).
5. Pass `colorNote` to `onInquire`.

#### CTA behaviour

| selectedColor | Button label (VI) | Button label (EN) | mailto subject suffix |
|---|---|---|---|
| `null` or `available` | "Hỏi thêm về sản phẩm này" | "Inquire about this product" | `Inquiry:` |
| `custom` | "Đặt trước màu này" | "Pre-order this color" | `Pre-order:` |

### `src/components/InquiryDialog.tsx` — changes

Accept an additional optional prop `colorNote?: string`. When present, prepend it to the `message` field in the mailto body:

```
Color: Sage Green · PMS 7494 C

[user message]

— Name (email)
Piece: …
```

---

## i18n additions (`src/i18n/translations.ts`)

```ts
gallery: {
  // existing keys...
  colorLabel:       { vi: "Màu sắc",                en: "Color" },
  colorOther:       { vi: "+ Màu Pantone khác",      en: "+ Other Pantone color" },
  colorApprox:      { vi: "Màu xấp xỉ",             en: "Approximate preview" },
  colorPreorder:    { vi: "Đặt trước màu này",       en: "Pre-order this color" },
  colorPreorderNote:{ vi: "+ thời gian đặt trước",   en: "+ pre-order lead time applies" },
  colorSearch:      { vi: "Tên màu Pantone…",        en: "Pantone color name…" },
}
```

---

## Behaviour details

- Color state resets when the user navigates to another piece (index changes).
- "Other" input stays open if user navigates away and back within the same lightbox session — no, it resets (simpler).
- The static `customColor` badge is fully replaced by the picker. The `allowNameTag` badge is unchanged.
- `PantoneSearch` is only rendered when the "Other" toggle is active, so the dataset is loaded lazily (dynamic import).

---

## Out of scope

- Multiple color selections (single color only).
- Saving color preference across sessions.
- Real-time rendered product images per color.
- Any backend changes — flow remains pure `mailto:`.
