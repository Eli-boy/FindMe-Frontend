"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Daniel",
      text: "I lost my bag and got it back the same day. This is actually amazing.",
    },
    {
      name: "Chioma",
      text: "My dog got lost and someone contacted me within hours. Lifesaver!",
    },
    {
      name: "Tunde",
      text: "Simple idea but very powerful. Everyone needs this.",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-white text-center">
      <h2 className="text-4xl font-bold mb-12">
        What People Are Saying
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="bg-[#f7f5f2] p-6 rounded-2xl shadow-sm hover:shadow-lg transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <p className="text-gray-600 mb-4 italic">
              “{t.text}”
            </p>

            <h4 className="font-semibold text-gray-900">
              — {t.name}
            </h4>
          </motion.div>
        ))}

      </div>
    </section>
  );
}