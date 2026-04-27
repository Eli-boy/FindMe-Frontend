"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      title: "Attach Your Tag",
      desc: "Place your FindMe QR tag on your keys, bag, pet, or any valuable item.",
      image: "/phone-setup.png",
    },
    {
      title: "Link with FindMe ",
      desc: "After attaching FindMe tag to your item, Next you link the item with FindMe on whatsApp.",
      image: "/phone-scan.png",
    },
    {
      title: "Scan & Connect",
      desc: "The finder scans the code and contact you instantly.",
      image: "/phone-contact.png",
    },
    {
      title: "Get It Back",
      desc: "Chat with the finder via WhatsApp and recover your item quickly.",
      image: "/phone-contact.png",
    },
  ];

  return (
    <section
      id="how"
      className="py-28 px-6 md:px-12 bg-white text-center relative overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-transparent to-green-100 blur-3xl opacity-40"></div>

      {/* TITLE */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          How FindMe Works
        </h2>

        <p className="text-gray-600 mb-16 max-w-xl mx-auto">
          A simple 4-step system that helps you recover lost items quickly and securely.
        </p>
      </motion.div>

      {/* STEPS */}
      <div className="grid md:grid-cols-4 gap-10 relative z-10">

        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.15,
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
                delay: i * 0.3,
              }}
            >
              <Image
                src={step.image}
                alt={step.title}
                width={220}
                height={420}
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

      {/* EXTRA TRUST LINE */}
      <div className="mt-20 text-center text-gray-600 relative z-10">
        <p className="text-sm">
          ✔ No app required &nbsp; • &nbsp; ✔ Works worldwide &nbsp; • &nbsp; ✔ Instant WhatsApp chat
        </p>
      </div>
    </section>
  );
}