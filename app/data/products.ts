export type Review = {
  name: string;
  rating: number;
  comment: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
  category: string;
  reviews: Review[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "FindMe Sticker",
    price: 5500,
    image: "/elo1.png",
    desc: "Perfect for phones, laptops, and personal items.",
    category: "sticker",
    reviews: [
      {
        name: "Daniel",
        rating: 5,
        comment: "Very useful! Got my lost bag back in 2 days.",
      },
      {
        name: "Ada",
        rating: 4,
        comment: "Simple and works perfectly.",
      },
    ],
  },

  {
    id: 2,
    name: "Premium Key Tag",
    price: 10000,
    image: "/elo2.png",
    desc: "Attach to your keys and never lose them again.",
    category: "key",
    reviews: [
      {
        name: "Tunde",
        rating: 5,
        comment: "Solid build quality. Worth the price!",
      },
      {
        name: "Blessing",
        rating: 4,
        comment: "Works great with WhatsApp connection.",
      },
    ],
  },

  {
    id: 3,
    name: "Pet Tag",
    price: 8000,
    image: "/qr3.png",
    desc: "Keep your pets safe and easy to return.",
    category: "pet",
    reviews: [
      {
        name: "Chioma",
        rating: 5,
        comment: "Helped me find my dog in hours!",
      },
    ],
  },

  {
    id: 4,
    name: "Luggage Tag",
    price: 7500,
    image: "/qr4.png",
    desc: "Travel worry-free with smart luggage tags.",
    category: "key",
    reviews: [
      {
        name: "Emeka",
        rating: 4,
        comment: "Very helpful for airport travel.",
      },
    ],
  },

  {
    id: 5,
    name: "Kids Wristband",
    price: 10000,
    image: "/qr5.png",
    desc: "Protect kids with instant contact QR bands.",
    category: "sticker",
    reviews: [
      {
        name: "Aisha",
        rating: 5,
        comment: "Peace of mind as a parent. Love it!",
      },
    ],
  },
];