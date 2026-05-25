export type Review = {
  name: string;
  rating: number;
  comment: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  comingSoon?: boolean;
  image: string;
  desc: string;
  category: string;
  reviews: Review[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "Sticker Pack",
    price: 8000,
    image: "/pack1.png",
    desc: "A slim and durable QR sticker designed for your everyday items like phones, laptops, and gadgets. If lost, anyone can scan the code and instantly contact you via WhatsApp. No app required — just scan and connect. Simple, discreet, and effective protection.",
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
    desc: "A premium QR-powered keychain tag built to keep your keys, bags, and valuables safe. Attach it once and relax — if lost, the finder can scan and contact you instantly through WhatsApp. Fast, secure, and no app needed.",
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
    desc: "Keep your pets safe with a smart QR pet tag. If your pet ever gets lost, anyone who finds them can scan the code and reach you immediately via WhatsApp. Designed for comfort, durability, and peace of mind.",
    category: "pet",
    reviews: [
      { name: "Chioma", rating: 5, comment: "Helped me find my dog in hours!" },
    ],
  },

  {
    id: 4,
    name: "Luggage Tag",
    price: 10000,
    image: "/lug4.png",
    desc: "Travel confidently with a smart luggage tag that protects your bags anywhere in the world. If misplaced, the finder can scan and contact you instantly. Perfect for airports, travel, and everyday use.",
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
    desc: "A secure QR wristband designed to protect children in crowded places. If your child gets separated, anyone can scan and contact you instantly via WhatsApp. Comfortable, reliable, and built for safety.",
    category: "sticker",
    reviews: [
      { name: "Aisha", rating: 5, comment: "Peace of mind as a parent. Love it!" },
    ],
  },

  {
    id: 6,
    name: "Family Pack",
    price: 40000,
    image: "/family.png",
    desc: "The complete FindMe bundle for your whole family. Includes sticker tags, keychain tags, and luggage tags — everything you need to protect everyone and everything you love. One pack, total peace of mind.",
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
    image: "/travel.png",
    desc: "The ultimate travel companion. Includes luggage tags and sticker tags designed for frequent travellers. Protect your bags, gadgets, and valuables anywhere in the world — scan, connect, recover.",
    category: "bundle",
    reviews: [
      { name: "Kemi", rating: 5, comment: "Perfect for my trips. Already saved my luggage once!" },
      { name: "Chukwudi", rating: 5, comment: "Great value for travellers. Highly recommend." },
    ],
  },
];