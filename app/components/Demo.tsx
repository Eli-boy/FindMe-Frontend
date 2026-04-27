"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Demo() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#f7f5f2] text-center">

      <h2 className="text-4xl font-bold mb-6">
        See FindMe in Action
      </h2>

      <p className="text-gray-600 mb-12 max-w-xl mx-auto">
        Watch how someone finds your item, scans the QR code, and connects with you instantly.
      </p>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <div className="bg-white p-6 rounded-3xl shadow-xl">

          {/* Replace this with real demo later */}
          <Image
            src="/phone.png"
            alt="FindMe Demo"
            width={300}
            height={600}
            className="rounded-xl"
          />

        </div>
      </motion.div>

      <p className="text-sm text-gray-500 mt-6">
        No app needed. Just scan and chat.
      </p>

    </section>
  );
}