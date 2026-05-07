"use client";

import { motion } from "framer-motion";

const steps = [
  {
    icon: "📦",
    num: "01",
    title: "Order your tags",
    desc: "Get your FindMe QR tags delivered. Each tag has a unique code tied only to your WhatsApp — nothing else.",
  },
  {
    icon: "🔗",
    num: "02",
    title: "Link & attach",
    desc: "Scan the tag with your phone, send a quick WhatsApp message to activate it, and stick it on your item. Done in under a minute.",
  },
  {
    icon: "🚨",
    num: "03",
    title: "Get notified",
    desc: "When someone finds your item and scans the tag, you get an instant WhatsApp message — and can chat anonymously with the finder.",
  },
  {
    icon: "💬",
    num: "04",
    title: "Chat & recover",
    desc: "A private 2-hour relay chat is created between you and the finder. Coordinate pickup safely — your number stays hidden.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      style={{ padding: "120px 48px", maxWidth: 1200, margin: "0 auto" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#1db954", marginBottom: 16 }}>
          How it works
        </p>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, maxWidth: 560 }}>
          Four steps to peace of mind
        </h2>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 2,
          marginTop: 64,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            viewport={{ once: true }}
            style={{
              background: "#1e1e1e",
              padding: "48px 36px",
              position: "relative",
              transition: "background 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2e2e2e")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1e1e1e")}
          >
            {/* BIG GHOST NUMBER */}
            <div style={{
              fontFamily: "Syne, sans-serif", fontSize: 72, fontWeight: 800,
              color: "rgba(255,255,255,0.04)", lineHeight: 1,
              position: "absolute", top: 24, right: 24,
            }}>
              {step.num}
            </div>

            {/* ICON */}
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: "rgba(29,185,84,0.12)",
              border: "1px solid rgba(29,185,84,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, marginBottom: 24,
            }}>
              {step.icon}
            </div>

            <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#f5f4f0" }}>
              {step.title}
            </h3>
            <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7 }}>
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* TRUST LINE */}
      <div style={{ marginTop: 40, textAlign: "center", fontSize: 13, color: "#888" }}>
        ✔ No app required &nbsp;•&nbsp; ✔ Works worldwide &nbsp;•&nbsp; ✔ Instant WhatsApp chat
      </div>
    </section>
  );
}
