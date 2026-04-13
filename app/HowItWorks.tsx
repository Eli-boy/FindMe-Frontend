"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      title: "Activate Your Tag",
      desc: "Scan your QR code and link it to your WhatsApp number.",
      image: "/phone-setup.png",
    },
    {
      title: "Item Gets Found",
      desc: "Someone scans your QR code when they find your item.",
      image: "/phone-scan.png",
    },
    {
      title: "Get Contacted",
      desc: "The finder contacts you instantly via WhatsApp.",
      image: "/phone-contact.png",
    },
  ];

  return (
    <section id="how" className="py-28 px-6 md:px-12 bg-white text-center relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-transparent to-green-100 blur-3xl opacity-40"></div>

      {/* TITLE */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-20 text-gray-900 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How FindMe Works
      </motion.h2>

      {/* STEPS */}
      <div className="flex flex-wrap justify-center gap-12 relative z-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="group w-80 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.2,
            }}
            viewport={{ once: true }}
          >

            {/* STEP NUMBER */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-700 text-white font-bold mb-4 mx-auto shadow-md">
              {i + 1}
            </div>

            {/* IMAGE */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              <Image
                src={step.image}
                alt={step.title}
                width={260}
                height={460}
                className="mx-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
              />
            </motion.div>

            {/* TEXT */}
            <h3 className="mt-6 text-gray-900 font-semibold text-lg group-hover:text-green-700 transition">
              {step.title}
            </h3>

            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {step.desc}
            </p>

          </motion.div>
        ))}
      </div>
    </section>
  );
}