"use client";

import Image from "next/image";
import { useCart } from "../CartContext";

/* ================= TYPES ================= */
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

/* ================= DATA ================= */
const products: Product[] = [
  { id: 1, name: "FindMe Sticker", price: 2000, image: "/elo1.PNG", category: "sticker" },
  { id: 2, name: "Premium Key Tag", price: 3500, image: "/elo2.PNG", category: "key" },
  { id: 3, name: "Pet Tag", price: 2500, image: "/qr3.PNG", category: "pet" },
  { id: 4, name: "Luggage Tag", price: 3000, image: "/qr4.PNG", category: "key" },
  { id: 5, name: "Kids Wristband", price: 2800, image: "/qr5.PNG", category: "sticker" },
];

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const { addToCart } = useCart();

  const category = searchParams?.category;

  /* ================= FILTER ================= */
  const filteredProducts =
    category && category !== "all"
      ? products.filter((p) => p.category === category)
      : products;

  const formattedCategory =
    category && category !== "all"
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : null;

  return (
    <div className="bg-[#f7f5f2] min-h-screen px-6 md:px-10 py-20">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Shop Find<span className="text-green-700">Me</span> Tags
        </h1>

        <p className="text-gray-600">
          {formattedCategory
            ? `Showing ${formattedCategory} Products`
            : "Choose the perfect tag to protect what matters most."}
        </p>
      </div>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500">
          No products found.
        </p>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <Image
              src={p.image}
              alt={p.name}
              width={250}
              height={180}
              className="w-full h-auto object-contain"
            />

            <h3 className="mt-4 font-semibold text-gray-800">
              {p.name}
            </h3>

            <p className="text-gray-600">
              ₦{p.price.toLocaleString()}
            </p>

            <button
              onClick={() => addToCart(p)}
              className="bg-green-700 text-white px-4 py-2 mt-4 rounded-full w-full hover:scale-105 hover:shadow-lg transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}