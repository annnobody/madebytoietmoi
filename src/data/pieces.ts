import featured from "@/assets/featured.jpg";
import vase from "@/assets/piece-vase.jpg";
import penholder from "@/assets/piece-penholder.jpg";
import planter from "@/assets/piece-planter.jpg";
import tray from "@/assets/piece-tray.jpg";
import napkinring from "@/assets/piece-napkinring.jpg";
import hook from "@/assets/piece-hook.jpg";

export type Bilingual = { vi: string; en: string };

export type CollectionKey = "desk" | "plants" | "home" | "table";

export type Piece = {
  id: string;
  collection: CollectionKey;
  image: string;
  title: Bilingual;
  caption: Bilingual;
  dimensions: string;
  material: Bilingual;
};

export const featuredImage = featured;

export const featuredPiece: Piece = {
  id: "featured-still-life",
  collection: "home",
  image: featured,
  title: {
    vi: "Bộ trang trí “Buổi sáng dịu dàng”",
    en: "“Gentle Morning” shelf set",
  },
  caption: {
    vi: "Một bộ ba nhỏ — lọ hoa, đế nến, và khay tròn — làm cho góc kệ trở nên ấm áp.",
    en: "A trio — bud vase, candle dish, and little cup — to warm up a quiet shelf.",
  },
  dimensions: "Set of 3 · H 6–11cm",
  material: { vi: "PLA mờ, hoàn thiện thủ công", en: "Matte PLA, hand-finished" },
};

export const pieces: Piece[] = [
  {
    id: "bud-vase",
    collection: "home",
    image: vase,
    title: { vi: "Lọ hoa nhỏ Olive", en: "Olive bud vase" },
    caption: {
      vi: "Cho một nhành hoa khô và một buổi sáng nắng nhẹ.",
      en: "For a single dried stem and slow morning light.",
    },
    dimensions: "H 9cm · Ø 7cm",
    material: { vi: "PLA mờ màu sage", en: "Matte sage PLA" },
  },
  {
    id: "pen-holder",
    collection: "desk",
    image: penholder,
    title: { vi: "Hộp đựng bút Atelier", en: "Atelier pen holder" },
    caption: {
      vi: "Một chỗ nhỏ gọn gàng cho cây bút yêu thích của bạn.",
      en: "A small, tidy home for your favourite pen.",
    },
    dimensions: "H 9cm · 8 × 5cm",
    material: { vi: "PLA mờ màu sage", en: "Matte sage PLA" },
  },
  {
    id: "planter",
    collection: "plants",
    image: planter,
    title: { vi: "Chậu cây Facet", en: "Facet planter" },
    caption: {
      vi: "Hình khối nhẹ nhàng, hợp với cây mọng nước nhỏ.",
      en: "Soft geometry — perfect for a small succulent.",
    },
    dimensions: "H 11cm · Ø 10cm",
    material: { vi: "PLA mờ màu sage", en: "Matte sage PLA" },
  },
  {
    id: "tray",
    collection: "home",
    image: tray,
    title: { vi: "Khay nhỏ Petit", en: "Petit catch-all tray" },
    caption: {
      vi: "Cho chìa khoá, nhẫn, và những điều bé nhỏ của ngày.",
      en: "For keys, rings, and the small things of the day.",
    },
    dimensions: "Ø 14cm · H 2.5cm",
    material: { vi: "PLA mờ màu kem", en: "Matte cream PLA" },
  },
  {
    id: "napkin-ring",
    collection: "table",
    image: napkinring,
    title: { vi: "Vòng khăn ăn Ondine", en: "Ondine napkin ring" },
    caption: {
      vi: "Một chi tiết nhỏ cho bữa tối thân mật.",
      en: "A quiet detail for a slow dinner at home.",
    },
    dimensions: "Ø 4.5cm · H 4cm",
    material: { vi: "PLA mờ màu sage", en: "Matte sage PLA" },
  },
  {
    id: "wall-hook",
    collection: "home",
    image: hook,
    title: { vi: "Móc treo tường Petale", en: "Petale wall hook" },
    caption: {
      vi: "Cho chiếc túi vải bạn dùng mỗi ngày.",
      en: "For the canvas tote you reach for every day.",
    },
    dimensions: "Ø 5cm",
    material: { vi: "PLA mờ màu sage", en: "Matte sage PLA" },
  },
];

export const collections: { key: CollectionKey; pieces: Piece[] }[] = (
  ["desk", "plants", "table", "home"] as CollectionKey[]
).map((key) => ({ key, pieces: pieces.filter((p) => p.collection === key) }));
