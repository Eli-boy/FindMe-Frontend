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
    <section id="how" className="py-24 px-6 md:px-10 bg-white text-center">
      
      {/* TITLE */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-16 text-gray-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How FindMe Works
      </motion.h2>

      {/* STEPS */}
      <div className="flex flex-wrap justify-center gap-12">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="w-72 group"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.2, // 🔥 stagger effect
            }}
            viewport={{ once: true }}
          >
            {/* IMAGE WITH FLOAT */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Image
                src={step.image}
                alt={step.title}
                width={260}
                height={460}
                className="mx-auto transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            {/* TEXT */}
            <h3 className="mt-6 text-gray-700 font-semibold text-lg group-hover:text-green-700 transition">
              {step.title}
            </h3>

            <p className="text-gray-700 text-sm mt-2">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}