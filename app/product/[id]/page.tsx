"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "../../data/products";
import { useCart } from "../../CartContext";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { addToCart } = useCart();
  const params = useParams();

  const id = Number(params?.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/shop" className="text-green-700 underline">
          Go back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f5f2] min-h-screen px-6 md:px-12 py-24">

      {/* ================= PRODUCT ================= */}
      <div className="grid md:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition">
          <Image
            src={product.image}
            alt={product.name}
            width={450}
            height={450}
            className="mx-auto object-contain hover:scale-105 transition duration-300"
          />
        </div>

        {/* DETAILS */}
        <div>

          {/* BADGE */}
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Best Seller
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-gray-900">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Smart QR-powered tag that helps you recover lost items instantly.
            No apps required — just scan and connect via WhatsApp.
          </p>

          <p className="text-3xl font-semibold mb-8 text-gray-900">
            ₦{product.price.toLocaleString()}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4">

            {/* ADD TO CART */}
            <button
              onClick={() => addToCart(product)}
              className="bg-green-700 text-white px-6 py-3 rounded-full hover:scale-105 hover:shadow-lg transition"
            >
              Add to Cart
            </button>

            {/* BUY NOW */}
            <button
              onClick={() => {
                const msg = `Hello, I want to buy ${product.name} (₦${product.price.toLocaleString()})`;
                window.open(
                  `https://wa.me/2348151171029?text=${encodeURIComponent(msg)}`,
                  "_blank"
                );
              }}
              className="border border-green-700 text-green-700 px-6 py-3 rounded-full hover:bg-green-50 transition"
            >
              Buy Now
            </button>

          </div>

        </div>
      </div>

      {/* ================= REVIEWS ================= */}
<div className="mt-24">

  <h2 className="text-2xl font-semibold mb-8 text-gray-900">
    Customer Reviews
  </h2>

  <div className="space-y-6">

    {product.reviews && product.reviews.length > 0 ? (
      product.reviews.map((review, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
        >

          {/* NAME + RATING */}
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-800">
              {review.name}
            </p>

            {/* ⭐ STARS */}
            <div className="text-yellow-500">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
          </div>

          {/* COMMENT */}
          <p className="text-gray-600 text-sm">
            {review.comment}
          </p>

        </div>
      ))
    ) : (
      <p className="text-gray-500">No reviews yet.</p>
    )}

  </div>

</div>

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="mt-24">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900">
          You may also like
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <Link key={p.id} href={`/product/${p.id}`}>
                <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer">

                  <Image
                    src={p.image}
                    alt={p.name}
                    width={200}
                    height={150}
                    className="object-contain"
                  />

                  <p className="mt-2 text-sm font-medium text-gray-800">
                    {p.name}
                  </p>

                  <p className="text-gray-600 text-sm">
                    ₦{p.price.toLocaleString()}
                  </p>

                </div>
              </Link>
            ))}
        </div>
      </div>

    </div>
  );
}