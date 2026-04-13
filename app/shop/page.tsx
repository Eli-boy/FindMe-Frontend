"use client";

import Image from "next/image";
import { products } from "../data/products";
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
    <div className="bg-[#f7f5f2] min-h-screen px-6 md:px-12 py-24">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Shop Find<span className="text-green-600">Me</span> Tags
        </h1>

        <p className="text-gray-600 text-lg">
          {formattedCategory
            ? `Showing ${formattedCategory} Products`
            : "Choose the perfect tag to protect what matters most."}
        </p>
      </div>

      {/* ================= EMPTY ================= */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500">
          No products found.
        </p>
      )}

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >

            {/* IMAGE */}
            <div className="overflow-hidden rounded-lg">
              <Image
                src={p.image}
                alt={p.name}
                width={260}
                height={180}
                className="w-full h-auto object-contain group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* TEXT */}
            <h3 className="mt-5 font-semibold text-gray-800 text-lg">
              {p.name}
            </h3>

            <p className="text-gray-500 text-sm">
              Smart recovery tag
            </p>

            <p className="text-gray-900 font-semibold mt-2">
              ₦{p.price.toLocaleString()}
            </p>

            {/* BUTTON */}
            <button
              onClick={() => addToCart(p)}
              className="mt-5 bg-green-700 text-white px-4 py-2 rounded-full w-full hover:scale-105 hover:shadow-lg transition duration-200"
            >
              Add to Cart
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}