"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Demo() {
  return (
    <section style={{
      padding: "96px 48px",
      background: "#2c3d30",
      textAlign: "center",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
    }}>
      <h2 style={{
        fontFamily: "Syne, sans-serif",
        fontSize: "clamp(28px, 4vw, 44px)",
        fontWeight: 800,
        letterSpacing: -1,
        color: "#dff0e2",
        marginBottom: 16,
      }}>
        See FindMe in Action
      </h2>

      <p style={{ color: "#9dbfa0", marginBottom: 48, maxWidth: 480, margin: "0 auto 48px", fontSize: 16, lineHeight: 1.7 }}>
        Watch how someone finds your item, scans the QR code, and connects with you instantly.
      </p>

      <motion.div
        style={{ display: "flex", justifyContent: "center" }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div style={{
          background: "#3a4e3d",
          padding: 24,
          borderRadius: 32,
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        }}>
          <Image
            src="/phone.png"
            alt="FindMe Demo"
            width={300}
            height={600}
            style={{ borderRadius: 16, display: "block" }}
          />
        </div>
      </motion.div>

      <p style={{ fontSize: 13, color: "#9dbfa0", marginTop: 24 }}>
        No app needed. Just scan and chat.
      </p>
    </section>
  );
}
