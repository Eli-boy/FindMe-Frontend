"use client";

import HowItWorks from "./HowItWorks";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "./data/products";
import { useCart } from "./CartContext";

/* ================= TYPES ================= */
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

/* ================= DATA ================= */


export default function Home() {
  const { addToCart } = useCart();

  return (
    <div className="bg-[#f7f5f2] text-gray-900 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="px-6 md:px-12 py-28 flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden">

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-transparent to-green-100 blur-3xl opacity-40"></div>

        {/* TEXT */}
        <motion.div
          className="max-w-xl relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Never Lose What Matters Again
          </h1>

          <p className="text-gray-600 mb-8 text-lg md:text-2xl">
            Whether it's your luggage, pet, keys, or personal items — FindMe connects you instantly to the person who finds them.
          </p>

          <motion.a
            href="/shop"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-green-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition"
          >
            Shop Now
          </motion.a>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Image
              src="/phone.png"
              alt="Preview"
              width={420}
              height={650}
              className="drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Shop Tags
        </h2>

        <div className="flex gap-6 overflow-x-auto scroll-smooth pb-4">

          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`}>
              <div className="group min-w-[260px] bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">

                <Image
                  src={p.image}
                  alt={p.name}
                  width={220}
                  height={160}
                  className="w-full h-auto object-contain group-hover:scale-105 transition duration-300"
                />

                <h3 className="mt-4 font-semibold text-gray-800 group-hover:text-green-700 transition">
                  {p.name}
                </h3>

                <p className="text-gray-600">
                  ₦{p.price.toLocaleString()}
                </p>

                {/* BUTTON */}
                <button
                  onClick={(e) => {
                    e.preventDefault(); // 🔥 prevents navigation
                    addToCart(p);
                  }}
                  className="bg-green-700 text-white px-4 py-2 mt-4 rounded-full w-full hover:scale-105 hover:shadow-lg transition duration-200"
                >
                  Add to Cart
                </button>

              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <HowItWorks />

      {/* ================= ABOUT ================= */}
      <section className="py-24 px-6 md:px-12 bg-[#f7f5f2]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-20">

          {/* TEXT */}
          <div className="max-w-xl">
            <h2 className="text-5xl font-bold mb-6">
              Meet Find<span className="text-green-700">Me</span>
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              FindMe helps you recover lost items faster by connecting you directly with the finder through WhatsApp.
              At FindMe, we are dedicated to bringing peace of mind to everyday life. Founded on the principles of <span className="text-green-700 font-bold text-xl"> Reliability, Quality, and Innovation</span>.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Our journey began with a simple idea: to make it easier for people to protect their belongings and loved ones in a busy, ever-connected world. From luggage tags to wristbands for kids, our products are designed with one goal in mind—to provide a seamless, worry-free experience for our customers.
              Simple. Secure. Instant. No apps required for the finder — just scan and connect.
            </p>

            <button className="bg-green-700 text-white px-6 py-3 rounded-full hover:scale-105 hover:shadow-lg transition">
              Learn More
            </button>
          </div>

          {/* IMAGE */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Image
              src="/phone.png"
              alt="FindMe preview"
              width={420}
              height={650}
              className="drop-shadow-2xl"
            />
          </motion.div>

        </div>
      </section>

    </div>
  );
}