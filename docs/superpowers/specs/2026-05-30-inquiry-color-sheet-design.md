# Inquiry Form: Color Field + Google Sheets Submission

**Date:** 2026-05-30

## Goal

When a user selects a color in the Lightbox and clicks "Inquire", the chosen color must be visible in the inquiry form. On submit, the form data (including color and Zalo) is POSTed to a Google Apps Script endpoint that writes a row to a Google Sheet. The `mailto:` flow is replaced entirely.

## What Changes

### `InquiryDialog.tsx`

**New form fields:**
- `zalo: string` — optional, editable. Sits after the email field. Uses the existing `inquiry.zalo` translation key.
- Color — read-only display field, visible only when `colorNote` prop is set. Sits between `piece` and `message`. Displays the `colorNote` string (e.g. `"Màu sắc: Tan · PMS 7527 C"`).

**Submit handler:**
- Replaces `window.location.href = mailto:...` with a `fetch` POST to the Apps Script URL.
- Request: `POST https://script.google.com/macros/s/AKfycby-pj29sMuYa0aLxWcwi1tGyzpGDLuiaw_dP1KWUgQ377bFQt--MS27E73VQeBBC52aBw/exec`
- Content-Type: `application/x-www-form-urlencoded` (Apps Script `doPost` parses this via `e.parameter`)
- Body fields: `name`, `email`, `zalo`, `piece`, `color`, `message`, `timestamp` (ISO string)
- Loading state: `sending: boolean` — button shows `t("inquiry.sending")` and is `disabled` while true.
- On success (any non-error response): `setSent(true)`.
- On network/fetch error: `setError(t("inquiry.errorRetry"))` — user can retry. Button re-enables.

**Zod schema update:**
- Add `zalo: z.string().trim().max(50).optional().default("")`

**No changes to props** — `colorNote` is already passed in and the `piece`/`colorNote` threading from Lightbox → `onInquire` → `InquiryDialog` is already correct.

### `translations.ts`

Add two keys under `inquiry`:
- `inquiry.errorRetry` — shown when the fetch fails so the user can try again.
- (No new key needed for color label — reuse `gallery.colorLabel`.)

## Payload Shape

```
name=...&email=...&zalo=...&piece=...&color=...&message=...&timestamp=2026-05-30T...
```

`color` is the raw `colorNote` string (e.g. `"Màu sắc: Tan · PMS 7527 C"`), or empty string if none selected.

## What Does NOT Change

- `ColorPicker.tsx` — no changes.
- `Lightbox.tsx` — no changes.
- `pieces.ts` / `colors.ts` — no changes.
- Success screen (`sent` state) — reused as-is.
- The `onInquire(piece, colorNote)` call signature in Lightbox — already correct.

## Error Handling

| Scenario | Behavior |
|---|---|
| Validation fails (client) | Existing zod error shown, no fetch |
| Network error / fetch throws | Error message shown, button re-enables |
| Apps Script returns error JSON | Treat as success (Apps Script 200s on script errors) |
| Apps Script returns 2xx | `setSent(true)` |
