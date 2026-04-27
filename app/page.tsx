"use client";

import HowItWorks from "./HowItWorks";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "./data/products";
import toast from "react-hot-toast";
import { useCart } from "./CartContext";

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div className="bg-[#f7f5f2] text-gray-900 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="px-6 md:px-12 py-28 flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-transparent to-green-100 blur-3xl opacity-40"></div>

        {/* TEXT */}
        <motion.div
          className="max-w-xl relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Lost it? <br /> Consider it Found.
          </h1>

          <p className="text-gray-600 mb-8 text-lg md:text-2xl">
            Attach a FindMe tag to anything.  
            If it gets lost, anyone can scan and contact you instantly via WhatsApp.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/shop"
              className="bg-green-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition"
            >
              Get Your Tag
            </Link>

            <a
              href="#how"
              className="border border-gray-300 px-8 py-4 rounded-full hover:bg-gray-100 transition"
            >
              How It Works
            </a>
          </div>
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
              alt="FindMe Preview"
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

        <div className="flex gap-6 overflow-x-auto pb-4">

          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`}>
              <div className="group min-w-[260px] bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">

                <Image
                  src={p.image}
                  alt={p.name}
                  width={220}
                  height={160}
                  className="w-full object-contain group-hover:scale-105 transition"
                />

                <h3 className="mt-4 font-semibold text-gray-800 group-hover:text-green-700">
                  {p.name}
                </h3>

                <p className="text-gray-600">
                  ₦{p.price.toLocaleString()}
                </p>

                <p className="text-sm text-gray-500">
                  Smart recovery tag
                </p>

                {/* BUTTON */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(p);
                    toast.success(`${p.name} added to cart 🛒`);
                  }}
                  className="bg-green-700 text-white px-4 py-2 mt-4 rounded-full w-full hover:scale-105 hover:shadow-lg transition"
                >
                  Add to Cart
                </button>

              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <div id="how">
        <HowItWorks />
      </div>

      {/* ================= WHY FINDME ================= */}
      <section className="py-24 px-6 md:px-12 bg-white text-center">
        <h2 className="text-4xl font-bold mb-12">
          Why Choose FindMe?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-gray-700">

          <div>
            <h3 className="font-semibold text-lg mb-2">⚡ Instant Chat</h3>
            <p>Chat instantly with the finder via WhatsApp.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">📱 No App Needed</h3>
            <p>No downloads required for the finder.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">🌍 Works Anywhere</h3>
            <p>Global system that works everywhere.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">🔒 Secure</h3>
            <p>Your identity stays protected.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">⏱ Fast Recovery</h3>
            <p>Get lost items back faster.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">🎯 Simple</h3>
            <p>Just scan and connect.</p>
          </div>

        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-24 px-6 md:px-12 bg-[#f7f5f2]">
        <div className="flex flex-col md:flex-row items-center gap-20">

          <div className="max-w-xl">
            <h2 className="text-5xl font-bold mb-6">
              Meet Find<span className="text-green-700">Me</span>
            </h2>

            <p className="text-gray-600 mb-6">
              FindMe connects you instantly with anyone who finds your lost items.
              No apps, no stress — just scan and chat.
            </p>

            <p className="text-gray-600 mb-8">
              Built for everyday life — from keys to pets to luggage.
              Simple. Secure. Instant.
            </p>

            <Link
              href="/shop"
              className="bg-green-700 text-white px-6 py-3 rounded-full hover:scale-105 transition"
            >
              Get Started
            </Link>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Image
              src="/phone.png"
              alt="Preview"
              width={420}
              height={650}
              className="drop-shadow-2xl"
            />
          </motion.div>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 text-center bg-green-700 text-white">
        <h2 className="text-4xl font-bold mb-4">
          Never lose your items again
        </h2>

        <p className="mb-6">
          Get your FindMe tag today and stay protected.
        </p>

        <Link
          href="/shop"
          className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Shop Now
        </Link>
      </section>

    </div>
  );
}