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
