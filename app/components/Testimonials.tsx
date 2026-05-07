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
    <section style={{
      padding: "96px 48px",
      background: "#334538",
      textAlign: "center",
      borderTop: "1px solid rgba(255,255,255,0.07)",
    }}>
      <p style={{
        fontSize: 12, fontWeight: 600, letterSpacing: 3,
        textTransform: "uppercase", color: "#1db954", marginBottom: 12,
      }}>
        Testimonials
      </p>
      <h2 style={{
        fontFamily: "Syne, sans-serif",
        fontSize: "clamp(28px, 4vw, 44px)",
        fontWeight: 800,
        letterSpacing: -1,
        color: "#dff0e2",
        marginBottom: 56,
      }}>
        What People Are Saying
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 24,
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            style={{
              background: "#3a4e3d",
              padding: "28px 32px",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.07)",
              textAlign: "left",
              transition: "border-color 0.3s, transform 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(29,185,84,0.35)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Quote mark */}
            <div style={{ fontSize: 36, color: "#1db954", lineHeight: 1, marginBottom: 16, fontFamily: "Georgia, serif" }}>"</div>

            <p style={{ color: "#9dbfa0", marginBottom: 20, fontSize: 15, lineHeight: 1.75, fontStyle: "italic" }}>
              {t.text}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(29,185,84,0.15)",
                border: "1.5px solid rgba(29,185,84,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, color: "#1db954",
              }}>
                {t.name[0]}
              </div>
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, color: "#dff0e2" }}>
                {t.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
