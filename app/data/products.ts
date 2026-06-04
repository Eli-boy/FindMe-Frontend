export type Review = {
  name: string;
  rating: number;
  comment: string;
};

export type Variant = {
  label: string;
  quantity: number;
  price: number;
  image: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  comingSoon?: boolean;
  image: string;
  images?: string[];
  desc: string;
  shortDesc: string;
  features: string[];
  variants?: Variant[];
  category: string;
  reviews: Review[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "Sticker Pack",
    price: 8000,
    image: "/sticker.png",
    images: ["/sticker.png"],
    shortDesc: "Smart QR sticker for any personal item — if it gets lost, anyone can scan it and contact you instantly via WhatsApp.",
    desc: "A slim QR sticker for phones, laptops and gadgets. Scan if found — you get an instant WhatsApp alert. No app required.",
    features: [
      "Receive instant WhatsApp notification when your tag is scanned",
      "Works on any smartphone — no app needed",
      "No battery required — works forever",
      "Anonymous contact — your number is never shared",
      "Water-resistant and tamper-evident",
    ],
    variants: [
      { label: "One Pack (4 Stickers)", quantity: 5, price: 8000, image: "/sticker.png" },
      { label: "Two Packs (8 Stickers)", quantity: 10, price: 14000, image: "/sticker2.png" },
      { label: "Three Packs (12 Stickers)", quantity: 15, price: 20000, image: "/sticker3.png" },
    ],
    category: "sticker",
    reviews: [
      { name: "Daniel", rating: 5, comment: "Very useful! Got my lost bag back in 2 days." },
      { name: "Ada", rating: 4, comment: "Simple and works perfectly." },
    ],
  },

  {
    id: 2,
    name: "Smart Keychain Tag",
    price: 10000,
    image: "/elo2.png",
    images: ["/elo2.png"],
    shortDesc: "Premium QR keychain tag for your keys and bags — lost items find their way back instantly.",
    desc: "A premium QR keychain for your keys and bags. Lost? The finder scans it and reaches you on WhatsApp instantly.",
    features: [
      "Instant WhatsApp alert when someone finds your item",
      "Durable metal keychain ring — built to last",
      "Works on any smartphone — no app needed",
      "Anonymous relay chat — your number stays private",
      "No battery, no charging — always active",
    ],
    variants: [
      { label: "Single Tag", quantity: 1, price: 10000, image: "/elo1.png" },
      { label: "Two Tags", quantity: 2, price: 18000, image: "/elo3.png" },
      { label: "Three Tags", quantity: 3, price: 25000, image: "/elo4.png" },
    ],
    category: "key",
    reviews: [
      { name: "Tunde", rating: 5, comment: "Solid build quality. Worth the price!" },
      { name: "Blessing", rating: 4, comment: "Works great with WhatsApp connection." },
    ],
  },

  {
    id: 3,
    name: "Pet Tag",
    price: 0,
    comingSoon: true,
    image: "/qr3.png",
    images: ["/qr3.png"],
    shortDesc: "Smart QR tag for your pet's collar — if they wander off, anyone can scan and reach you instantly.",
    desc: "A smart QR tag for your pet's collar. If they get lost, anyone can scan and contact you immediately via WhatsApp.",
    features: [
      "Instant WhatsApp alert when your pet's tag is scanned",
      "Lightweight and comfortable for all pet sizes",
      "Waterproof and durable for outdoor use",
      "Anonymous contact — finder never sees your real number",
      "No app, no battery — just scan and connect",
    ],
    category: "pet",
    reviews: [
      { name: "Chioma", rating: 5, comment: "Helped me find my dog in hours!" },
    ],
  },

  {
    id: 4,
    name: "Luggage Tag",
    price: 10000,
    image: "/lugP.png",
    images: ["/lugP.png"],
    shortDesc: "Travel confidently — smart QR luggage tag that gets your bags back from anywhere in the world.",
    desc: "A smart QR luggage tag for travellers. If your bag goes missing, the finder scans it and you're connected instantly.",
    features: [
      "Instant WhatsApp notification when your bag is found",
      "Works at any airport worldwide — no app needed",
      "Durable, waterproof design built for travel",
      "Anonymous contact — your number is never exposed",
      "No battery required — always ready",
    ],
    variants: [
      { label: "Single Tag", quantity: 1, price: 10000, image: "/lugP.png" },
      { label: "Two Tags", quantity: 2, price: 18000, image: "/lug5.png" },
    ],
    category: "key",
    reviews: [
      { name: "Emeka", rating: 4, comment: "Very helpful for airport travel." },
    ],
  },

  {
    id: 5,
    name: "Kids Wristband",
    price: 0,
    comingSoon: true,
    image: "/qr5.png",
    images: ["/qr5.png"],
    shortDesc: "QR wristband for kids — if separated in a crowd, a quick scan connects the finder to you instantly.",
    desc: "A QR wristband for children. If separated in a crowd, a quick scan connects the finder straight to your WhatsApp.",
    features: [
      "Instant WhatsApp alert if your child's band is scanned",
      "Soft, adjustable band — comfortable for all ages",
      "Works on any smartphone — no app needed",
      "Anonymous relay — strangers never see your number",
      "Waterproof and durable for everyday wear",
    ],
    category: "sticker",
    reviews: [
      { name: "Aisha", rating: 5, comment: "Peace of mind as a parent. Love it!" },
    ],
  },

  {
    id: 6,
    name: "Family Pack",
    price: 40000,
    image: "/fam.png",
    images: ["/fam.png"],
    shortDesc: "The complete FindMe bundle for your whole family — protect everyone and everything you love.",
    desc: "The complete FindMe bundle — sticker tags, keychain tags and luggage tags to protect your whole family.",
    features: [
      "Includes sticker tags, keychain tags and luggage tags",
      "Covers phones, laptops, keys, bags and luggage",
      "Instant WhatsApp alerts for every item in the pack",
      "Best value — save more than buying individually",
      "Anonymous contact on all tags — total privacy",
    ],
    category: "bundle",
    reviews: [
      { name: "Mrs. Okafor", rating: 5, comment: "Perfect for the whole family. Great value!" },
      { name: "Emeka", rating: 5, comment: "Bought for my family. Everyone is protected now." },
    ],
  },

  {
    id: 7,
    name: "Travel Pack",
    price: 25000,
    image: "/travel1.png",
    images: ["/travel1.png"],
    shortDesc: "The ultimate travel companion — luggage and sticker tags for frequent travellers worldwide.",
    desc: "Luggage tags and sticker tags for frequent travellers. Protect your bags and gadgets anywhere in the world.",
    features: [
      "Includes luggage tags and sticker tags for all your gear",
      "Works at every airport and hotel worldwide",
      "Instant WhatsApp notification when any item is found",
      "Anonymous relay chat — your privacy is protected",
      "Durable, waterproof — built for frequent travel",
    ],
    category: "bundle",
    reviews: [
      { name: "Kemi", rating: 5, comment: "Perfect for my trips. Already saved my luggage once!" },
      { name: "Chukwudi", rating: 5, comment: "Great value for travellers. Highly recommend." },
    ],
  },
];