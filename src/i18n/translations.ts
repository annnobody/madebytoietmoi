export type Lang = "vi" | "en";

export const translations = {
  nav: {
    home: { vi: "Trang chủ", en: "Home" },
    gallery: { vi: "Bộ sưu tập", en: "Gallery" },
    about: { vi: "Câu chuyện", en: "About" },
    inquire: { vi: "Liên hệ", en: "Inquire" },
  },
  hero: {
    tagline: { vi: "Dành cho thế giới nhỏ của bạn", en: "Made for your little world" },
    intro: {
      vi: "Những món đồ in 3D nhỏ xinh, làm thủ công cho không gian sống thân thuộc của bạn.",
      en: "Small, hand-finished 3D-printed objects for the quiet corners of your home.",
    },
    scroll: { vi: "Cuộn xuống", en: "Scroll" },
  },
  featured: {
    eyebrow: { vi: "Piece nổi bật", en: "Featured piece" },
    cta: { vi: "Xem bộ sưu tập", en: "Explore the gallery" },
  },
  collections: {
    desk: { vi: "Cho bàn làm việc", en: "For your desk" },
    plants: { vi: "Cho cây xanh", en: "For your plants" },
    home: { vi: "Cho ngôi nhà", en: "For your home" },
    table: { vi: "Cho bàn ăn", en: "For your table" },
  },
  gallery: {
    title: { vi: "Bộ sưu tập", en: "Gallery" },
    subtitle: {
      vi: "Mỗi món đồ được thiết kế và in riêng, hoàn thiện bằng tay.",
      en: "Each piece is designed, printed, and finished by hand.",
    },
    inquire: { vi: "Hỏi về món này", en: "Inquire about this piece" },
    close: { vi: "Đóng", en: "Close" },
    prev: { vi: "Trước", en: "Previous" },
    next: { vi: "Tiếp", en: "Next" },
    dimensions: { vi: "Kích thước", en: "Dimensions" },
    material: { vi: "Chất liệu", en: "Material" },
  },
  about: {
    title: { vi: "Câu chuyện của chúng tôi", en: "Our story" },
    lead: {
      vi: "Toi et Moi — bạn và tôi. Một xưởng nhỏ làm ra những món đồ nhỏ, dành cho thế giới nhỏ của bạn.",
      en: "Toi et Moi — you and me. A small studio making small things for your little world.",
    },
    body: {
      vi: "Chúng tôi không bán “đồ in 3D”. Chúng tôi gửi đến bạn sự cá nhân hoá, vẻ đẹp dịu dàng, và cảm giác ấm áp của tổ ấm — những vật nhỏ khiến bạn muốn dừng lại và mỉm cười: “dễ thương và có gu quá.”",
      en: "We don't sell “3D-printed items.” We make personalization, quiet aesthetics, and a cozy sense of home — small things that make you pause and smile: “this is cute and tasteful.”",
    },
    values: {
      one: {
        title: { vi: "Cá nhân hoá", en: "Personalization" },
        body: {
          vi: "Mỗi món có thể được điều chỉnh theo màu, kích thước và sở thích của bạn.",
          en: "Every piece can be tuned to your colour, size, and feel.",
        },
      },
      two: {
        title: { vi: "Thẩm mỹ", en: "Aesthetics" },
        body: {
          vi: "Đường nét tối giản, gam màu trầm ấm, tỉ lệ chỉn chu.",
          en: "Quiet lines, warm palettes, careful proportions.",
        },
      },
      three: {
        title: { vi: "Ấm áp như nhà", en: "A cozy home" },
        body: {
          vi: "Những vật giúp một góc nhỏ trong nhà trở nên thân thuộc hơn.",
          en: "Objects that make a small corner of your home feel more like you.",
        },
      },
    },
  },
  inquiry: {
    title: { vi: "Gửi yêu cầu", en: "Send an inquiry" },
    subtitle: {
      vi: "Để lại lời nhắn, chúng tôi sẽ trả lời sớm nhất có thể.",
      en: "Leave a note and we'll get back to you shortly.",
    },
    name: { vi: "Tên của bạn", en: "Your name" },
    email: { vi: "Email", en: "Email" },
    message: { vi: "Lời nhắn", en: "Message" },
    piece: { vi: "Quan tâm đến", en: "Interested in" },
    send: { vi: "Gửi yêu cầu", en: "Send inquiry" },
    sending: { vi: "Đang gửi…", en: "Sending…" },
    successTitle: { vi: "Cảm ơn bạn", en: "Thank you" },
    successBody: {
      vi: "Email của bạn vừa được mở. Hãy nhấn gửi để hoàn tất.",
      en: "Your email draft just opened. Hit send to finish.",
    },
  },
  footer: {
    rights: { vi: "Đã đăng ký bản quyền", en: "All rights reserved" },
    handle: { vi: "Theo dõi", en: "Follow" },
  },
} as const;

export type TranslationDict = typeof translations;
