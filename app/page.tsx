"use client";

import HowItWorks from "./HowItWorks";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

/* ================= TYPES ================= */
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

/* ================= DATA ================= */
const products = [
  { id: 1, name: "FindMe Sticker", price: 2000, image: "/elo1.PNG", category: "sticker" },
  { id: 2, name: "Premium Key Tag", price: 3500, image: "/elo2.PNG", category: "key" },
  { id: 3, name: "Pet Tag", price: 2500, image: "/qr3.PNG", category: "pet" },
  { id: 4, name: "Luggage Tag", price: 3000, image: "/qr4.PNG", category: "key" },
  { id: 5, name: "Kids Wristband", price: 2800, image: "/qr5.PNG", category: "sticker" },
];

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="bg-[#f7f5f2] text-black min-h-screen">

      {/* HERO */}
      <section
        id="home"
        className="px-6 md:px-10 py-24 flex flex-col md:flex-row items-center justify-between gap-10"
      >
        {/* TEXT */}
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-800">
            Never Lose What Matters Again
          </h1>

          <p className="text-gray-600 mb-6 md:text-2xl">
            Whether it's your luggage, pet, keys, or personal items — FindMe connects you instantly to the person who finds them.
          </p>

          <motion.a
            href="/shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-green-700 text-white px-6 py-3 rounded-full shadow-md hover:shadow-xl transition"
          >
            Shop Now
          </motion.a>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          className="relative mt-10 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glow background */}
          <div className="absolute inset-0 bg-green-200 blur-3xl opacity-30 rounded-full"></div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Image
              src="/phone.png"
              alt="Preview"
              width={400}
              height={600}
              className="relative drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-20 px-6 md:px-10 bg-white">
        <h2 className="text-3xl text-center mb-10 text-gray-800">Shop Tags</h2>

        <div className="flex gap-6 overflow-x-auto scroll-smooth">
          {products.map((p) => (
            <div
              key={p.id}
              className="min-w-[250px] bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <Image
                src={p.image}
                alt={p.name}
                width={200}
                height={150}
                className="w-full h-auto object-contain"
              />

              <h3 className="mt-4 font-medium text-gray-800">{p.name}</h3>
              <p className="text-gray-600">₦{p.price.toLocaleString()}</p>

              <button
                onClick={() => addToCart(p)}
                className="bg-green-700 text-white px-4 py-2 mt-4 rounded-full w-full hover:scale-105 hover:shadow-lg transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 md:px-10 bg-[#f7f5f2]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">

          <div className="max-w-xl">
            <h2 className="text-5xl font-bold mb-6 leading-tight text-gray-800">
              Meet Find<span className="text-green-700">Me</span>
            </h2>

            <p className="text-gray-600 mb-6">
              FindMe helps you recover lost items faster by connecting you directly with the finder through WhatsApp.
              At FindMe, we are dedicated to bringing peace of mind to everyday life. Founded on the principles of <span className="text-green-700 font-bold text-2xl"> Reliability, Quality, and Innovation</span>.
            </p>

            <p className="text-gray-600 mb-6">
              Our journey began with a simple idea: to make it easier for people to protect their belongings and loved ones in a busy, ever-connected world. From luggage tags to wristbands for kids, our products are designed with one goal in mind—to provide a seamless, worry-free experience for our customers.
              Simple. Secure. Instant. No apps required for the finder — just scan and connect.
            </p>

            <button className="bg-green-700 text-white px-4 py-2 rounded-full hover:scale-105 hover:shadow-lg transition duration-200">
              Learn More
            </button>
          </div>

          <Image
            src="/phone.png"
            alt="FindMe preview"
            width={400}
            height={600}
            className="drop-shadow-2xl"
          />
        </div>
      </section>

    </div>
  );
}