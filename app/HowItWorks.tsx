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
    desc: "Scan the tag with your phone, send a quick WhatsApp message to activate it.",
  },
  {
    icon: "🚨",
    num: "03",
    title: "Get notified",
    desc: "When someone finds your item and scans the tag, you get an instant WhatsApp message.",
  },
  {
    icon: "💬",
    num: "04",
    title: "Chat & recover",
    desc: "A private 2-hour relay chat is created between you and the finder.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      style={{ padding: "120px 48px", background: "#1a3a2a" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p style={{
            fontSize: 12, fontWeight: 700, letterSpacing: 4,
            textTransform: "uppercase", color: "#1db954", marginBottom: 16,
          }}>
            How it works
          </p>
          <h2 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 800, letterSpacing: -1, lineHeight: 1.1,
            maxWidth: 560, color: "#ffffff",
          }}>
            Four steps to peace of mind
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 64,
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "40px 32px",
                borderRadius: 18,
                position: "relative",
                transition: "background 0.3s, border-color 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(29,185,84,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              {/* BIG GHOST NUMBER */}
              <div style={{
                fontFamily: "Syne, sans-serif", fontSize: 80, fontWeight: 800,
                color: "rgba(255,255,255,0.06)", lineHeight: 1,
                position: "absolute", top: 16, right: 20,
                userSelect: "none",
              }}>
                {step.num}
              </div>

              {/* ICON */}
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: "rgba(29,185,84,0.15)",
                border: "1.5px solid rgba(29,185,84,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, marginBottom: 24,
              }}>
                {step.icon}
              </div>

              {/* Step number pill */}
              <div style={{
                display: "inline-block",
                background: "#1db954",
                color: "#000",
                fontSize: 11, fontWeight: 800,
                padding: "3px 10px", borderRadius: 20,
                marginBottom: 12, letterSpacing: 1,
              }}>
                STEP {step.num}
              </div>

              <h3 style={{
                fontFamily: "Syne, sans-serif",
                fontSize: 22, fontWeight: 800,
                marginBottom: 14, marginTop: 0,
                color: "#ffffff",
                lineHeight: 1.2,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: 15, color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8, margin: 0, fontWeight: 400,
              }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* TRUST LINE */}
        <div style={{
          marginTop: 48, textAlign: "center",
          fontSize: 14, color: "rgba(255,255,255,0.6)",
          fontWeight: 500, letterSpacing: 0.5,
        }}>
          <span style={{ color: "#1db954", fontWeight: 700 }}>✔</span> No app required
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <span style={{ color: "#1db954", fontWeight: 700 }}>✔</span> Works worldwide
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <span style={{ color: "#1db954", fontWeight: 700 }}>✔</span> Instant WhatsApp chat
        </div>
      </div>
    </section>
  );
}
