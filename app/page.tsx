"use client";

import HowItWorks from "./HowItWorks";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "./data/products";
import toast from "react-hot-toast";
import { useCart } from "./CartContext";

/* ================= STATS ================= */
const stats = [
  { num: "10K+", label: "Tags activated" },
  { num: "94%",  label: "Recovery rate" },
  { num: "2min", label: "Avg. response time" },
  { num: "100%", label: "Anonymous & private" },
];

/* ================= FEATURES ================= */
const features = [
  { icon: "🔒", title: "100% Anonymous",     desc: "Your phone number is never shared. Finders chat through our relay — they never see your real contact." },
  { icon: "⚡", title: "Instant WhatsApp",   desc: "No app to download. No account to create. Everything happens on WhatsApp — already on everyone's phone." },
  { icon: "🌍", title: "Works Anywhere",     desc: "Any smartphone can scan a FindMe tag. No app, no login — just a camera and WhatsApp." },
  { icon: "🏷️", title: "Tag Anything",       desc: "Laptops, keys, wallets, bags, AirPods, passports — if you can stick a tag on it, you can protect it." },
  { icon: "💬", title: "Anonymous Chat",     desc: "A 2-hour private session is created between you and the finder to coordinate pickup — safely." },
  { icon: "🛡️", title: "Tamper-Evident",    desc: "Durable, water-resistant tags designed to stay put. Built for keys, bags, and everyday wear." },
];

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div style={{ background: "#f0f7f2", color: "#0d1f14", minHeight: "100vh" }}>

      {/* ===================== HERO ===================== */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "100px 48px 60px",
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #e8f5ee 0%, #f0f7f2 50%, #e3f5eb 100%)",
      }}>
        {/* Subtle background circles */}
        <div style={{
          position: "absolute", width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,185,84,0.10), transparent 70%)",
          top: "-10%", right: "-5%",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,185,84,0.07), transparent 70%)",
          bottom: "10%", left: "5%",
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: 1200, margin: "0 auto", width: "100%",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 64, alignItems: "center",
        }}>
          {/* LEFT: text content */}
          <div>
            {/* BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(29,185,84,0.12)", border: "1px solid rgba(29,185,84,0.35)",
                borderRadius: 40, padding: "6px 16px", fontSize: 13, fontWeight: 600,
                color: "#128a3d", marginBottom: 32,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1db954", display: "inline-block", animation: "blink 1.5s infinite" }} />
              Now available in Nigeria
            </motion.div>

            {/* HEADLINE */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(42px, 5.5vw, 80px)",
                fontWeight: 800, lineHeight: 1.05, letterSpacing: -2,
                color: "#0d1f14", margin: 0,
              }}
            >
              Lost it?{" "}
              <em style={{ fontStyle: "italic", color: "#1db954", display: "block" }}>Consider it</em>
              Found.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ marginTop: 24, fontSize: "clamp(15px, 1.5vw, 18px)", color: "#4a6b57", maxWidth: 480, fontWeight: 400, lineHeight: 1.75 }}
            >
              Attach a FindMe tag to anything. If it gets lost, anyone can scan and contact you instantly via WhatsApp — anonymously.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}
            >
              <Link
                href="/shop"
                style={{
                  background: "#1db954", color: "#fff",
                  padding: "15px 32px", borderRadius: 12,
                  fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15,
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                  boxShadow: "0 4px 24px rgba(29,185,84,0.35)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#18a349"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(29,185,84,0.45)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#1db954"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(29,185,84,0.35)"; }}
              >
                Get Your Tags →
              </Link>
              <a
                href="#how"
                style={{
                  background: "rgba(255,255,255,0.7)", color: "#0d1f14",
                  padding: "15px 32px", borderRadius: 12,
                  border: "1.5px solid rgba(13,31,20,0.15)",
                  fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 15,
                  textDecoration: "none", transition: "all 0.25s ease",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1db954"; e.currentTarget.style.color = "#128a3d"; e.currentTarget.style.background = "rgba(255,255,255,0.9)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(13,31,20,0.15)"; e.currentTarget.style.color = "#0d1f14"; e.currentTarget.style.background = "rgba(255,255,255,0.7)"; }}
              >
                How It Works
              </a>
            </motion.div>

            {/* STATS ROW */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              style={{
                marginTop: 56,
                paddingTop: 40,
                borderTop: "1px solid rgba(13,31,20,0.10)",
                display: "flex", gap: 40, flexWrap: "wrap",
              }}
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: 32, fontWeight: 800, lineHeight: 1, color: "#0d1f14" }}>
                    {s.num.split('').map((c, j) =>
                      /[+%]/.test(c) || /[a-zA-Z]/.test(c)
                        ? <span key={j} style={{ color: "#1db954" }}>{c}</span>
                        : <span key={j}>{c}</span>
                    )}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 13, color: "#4a6b57", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
          >
            {/* Glow blob behind phone */}
            <div style={{
              position: "absolute", width: 380, height: 380, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(29,185,84,0.20), transparent 70%)",
              pointerEvents: "none",
            }} />
            {/* Phone shell */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 280,
                background: "#fff",
                borderRadius: 44,
                border: "2px solid rgba(13,31,20,0.10)",
                boxShadow: "0 40px 80px rgba(13,31,20,0.18), 0 8px 24px rgba(13,31,20,0.08)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Phone notch */}
              <div style={{ background: "#1db954", padding: "20px 20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: 70, height: 16, background: "rgba(0,0,0,0.25)", borderRadius: 20 }} />
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", marginTop: 4 }}>FindMe</span>
              </div>
              {/* Phone content */}
              <div style={{ background: "#f8fafb", padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
                {/* QR card */}
                <div style={{ background: "#fff", borderRadius: 16, padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                  {/* QR code SVG */}
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Top-left finder */}
                    <rect x="5" y="5" width="30" height="30" rx="4" fill="#0d1f14"/>
                    <rect x="11" y="11" width="18" height="18" rx="2" fill="#f8fafb"/>
                    <rect x="15" y="15" width="10" height="10" rx="1" fill="#0d1f14"/>
                    {/* Top-right finder */}
                    <rect x="65" y="5" width="30" height="30" rx="4" fill="#0d1f14"/>
                    <rect x="71" y="11" width="18" height="18" rx="2" fill="#f8fafb"/>
                    <rect x="75" y="15" width="10" height="10" rx="1" fill="#0d1f14"/>
                    {/* Bottom-left finder */}
                    <rect x="5" y="65" width="30" height="30" rx="4" fill="#0d1f14"/>
                    <rect x="11" y="71" width="18" height="18" rx="2" fill="#f8fafb"/>
                    <rect x="15" y="75" width="10" height="10" rx="1" fill="#0d1f14"/>
                    {/* Data modules */}
                    <rect x="42" y="5" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="52" y="5" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="42" y="15" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="52" y="15" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="42" y="25" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="42" y="42" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="52" y="42" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="42" y="52" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="52" y="52" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="65" y="42" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="75" y="42" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="85" y="42" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="65" y="52" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="75" y="52" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="5" y="42" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="15" y="42" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="25" y="42" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="5" y="52" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="15" y="52" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="65" y="65" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="75" y="65" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="85" y="65" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="65" y="75" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="85" y="75" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="65" y="85" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="75" y="85" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="42" y="65" width="8" height="8" rx="1" fill="#1db954"/>
                    <rect x="52" y="75" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="42" y="85" width="8" height="8" rx="1" fill="#0d1f14"/>
                    <rect x="52" y="85" width="8" height="8" rx="1" fill="#1db954"/>
                  </svg>
                  <p style={{ fontSize: 12, color: "#4a6b57", fontWeight: 500, margin: 0 }}>Scan to recover item</p>
                </div>
                {/* Notification card */}
                <div style={{ background: "#fff", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#1db954", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🔔</div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: "#0d1f14" }}>Someone found your Laptop!</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "#4a6b57" }}>Reply here to chat anonymously</p>
                  </div>
                </div>
                {/* Chat bubbles */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ alignSelf: "flex-start", background: "#fff", borderRadius: "14px 14px 14px 4px", padding: "9px 13px", fontSize: 12, color: "#0d1f14", maxWidth: "80%", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                    Hi! I found your bag at the airport lounge
                  </div>
                  <div style={{ alignSelf: "flex-end", background: "#1db954", borderRadius: "14px 14px 4px 14px", padding: "9px 13px", fontSize: 12, color: "#fff", maxWidth: "80%", fontWeight: 500 }}>
                    Thank you! Which terminal? 🙏
                  </div>
                  <div style={{ alignSelf: "flex-start", background: "#fff", borderRadius: "14px 14px 14px 4px", padding: "9px 13px", fontSize: 12, color: "#0d1f14", maxWidth: "80%", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                    Terminal 2, near charging stations
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===================== SHOP TAGS ===================== */}
      <section style={{ padding: "120px 48px", maxWidth: 1200, margin: "0 auto", background: "#f0f7f2" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#1db954", marginBottom: 16 }}>
          Products
        </p>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 64, color: "#0d1f14" }}>
          Shop Tags
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              style={{
                background: "#fff",
                border: "1px solid rgba(13,31,20,0.08)",
                borderRadius: 16, overflow: "hidden",
                transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(29,185,84,0.4)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,31,20,0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(13,31,20,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Link href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ padding: "28px 28px 0", background: "#f0f7f2", borderRadius: "16px 16px 0 0" }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={220}
                    height={160}
                    style={{ width: "100%", objectFit: "contain", display: "block" }}
                  />
                </div>
                <div style={{ padding: "20px 24px 8px" }}>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, color: "#0d1f14", marginBottom: 6 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: 20, fontWeight: 700, color: "#1db954", marginBottom: 4 }}>
                    ₦{p.price.toLocaleString()}
                  </p>
                  <p style={{ fontSize: 13, color: "#4a6b57" }}>Smart QR recovery tag</p>
                </div>
              </Link>
              <div style={{ padding: "0 24px 24px" }}>
                <button
                  onClick={() => {
                    addToCart(p);
                    toast.success(`${p.name} added to cart 🛒`);
                  }}
                  style={{
                    width: "100%", padding: "12px",
                    background: "#1db954", color: "#000",
                    border: "none", borderRadius: 40,
                    fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#25e668"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#1db954"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link
            href="/shop"
            style={{
              border: "1.5px solid rgba(13,31,20,0.15)", color: "#0d1f14",
              padding: "14px 36px", borderRadius: 40,
              fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14,
              textDecoration: "none", transition: "all 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1db954"; e.currentTarget.style.color = "#128a3d"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(13,31,20,0.15)"; e.currentTarget.style.color = "#0d1f14"; }}
          >
            View all products →
          </Link>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <HowItWorks />

      {/* ===================== PHONE DEMO ===================== */}
      <div style={{ background: "#fff", borderTop: "1px solid rgba(13,31,20,0.07)", borderBottom: "1px solid rgba(13,31,20,0.07)" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "120px 48px",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 80, alignItems: "center",
        }}>
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#1db954", marginBottom: 16 }}>
              See it in action
            </p>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 20, color: "#0d1f14" }}>
              From scan to connected in seconds
            </h2>
            <p style={{ color: "#4a6b57", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
              Someone finds your bag, scans the QR tag, and you get a WhatsApp ping instantly. No friction for the finder — just a scan and tap.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Finder scans → you're notified in under 10 seconds",
                "Anonymous 2-hour chat session created automatically",
                "Works even if finder has never heard of FindMe",
                "No app download required for anyone",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#4a6b57" }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "rgba(29,185,84,0.12)", border: "1px solid #1db954",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#1db954", fontSize: 11, flexShrink: 0, fontWeight: 700,
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* PHONE MOCKUP */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{
              width: 260, background: "#f8fafb",
              borderRadius: 40, border: "2px solid rgba(13,31,20,0.10)",
              padding: "20px 16px",
              boxShadow: "0 40px 80px rgba(13,31,20,0.12)",
            }}>
              <div style={{ width: 80, height: 20, background: "#e8f5ee", borderRadius: 20, margin: "0 auto 16px", border: "2px solid rgba(13,31,20,0.08)" }} />
              <div style={{ background: "#e8f5ee", borderRadius: 24, padding: 20, minHeight: 380, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { text: "🚨 Someone found your Laptop! Reply here to chat.", type: "sys" },
                  { text: "Hi! I found your bag at the airport lounge", type: "in" },
                  { text: "Oh thank you! Which terminal? 🙏", type: "out" },
                  { text: "Terminal 2, near the charging stations", type: "in" },
                  { text: "On my way! Give me 10 minutes", type: "out" },
                  { text: "🔒 Chat is private & anonymous", type: "sys" },
                ].map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    style={{
                      padding: "10px 14px", borderRadius: 16, fontSize: 12, lineHeight: 1.5,
                      maxWidth: "85%",
                      alignSelf: m.type === "out" ? "flex-end" : m.type === "sys" ? "center" : "flex-start",
                      background: m.type === "out" ? "#1db954" : m.type === "sys" ? "rgba(29,185,84,0.12)" : "#fff",
                      color: m.type === "out" ? "#fff" : m.type === "sys" ? "#128a3d" : "#0d1f14",
                      border: m.type === "sys" ? "1px solid rgba(29,185,84,0.3)" : "none",
                      borderBottomRightRadius: m.type === "out" ? 4 : 16,
                      borderBottomLeftRadius: m.type === "in" ? 4 : 16,
                      fontWeight: m.type === "out" ? 500 : 400,
                      textAlign: m.type === "sys" ? "center" : "left",
                      boxShadow: m.type === "in" ? "0 1px 4px rgba(13,31,20,0.07)" : "none",
                    }}
                  >
                    {m.text}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===================== FEATURES ===================== */}
      <section style={{ padding: "120px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#1db954", marginBottom: 16 }}>
          Features
        </p>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 64, color: "#0d1f14" }}>
          Built for real life
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              style={{
                background: "#fff", border: "1px solid rgba(13,31,20,0.08)",
                borderRadius: 16, padding: 36,
                transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(29,185,84,0.35)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,31,20,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(13,31,20,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 20 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 10, color: "#0d1f14" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: "#4a6b57", lineHeight: 1.7 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section id="about" style={{ background: "#1e1e1e", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "120px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 80, alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#1db954", marginBottom: 16 }}>
              About
            </p>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 24 }}>
              Meet Find<span style={{ color: "#1db954" }}>Me</span>
            </h2>
            <p style={{ color: "#888", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
              FindMe connects you instantly with anyone who finds your lost items. No apps, no stress — just scan and chat.
            </p>
            <p style={{ color: "#888", fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
              Built for everyday Nigerian life — from keys to pets to luggage. Simple. Secure. Instant.
            </p>
            <Link
              href="/shop"
              style={{
                background: "#1db954", color: "#000",
                padding: "14px 32px", borderRadius: 40,
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15,
                textDecoration: "none", display: "inline-block",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#25e668"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#1db954"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Get Started →
            </Link>
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Image
              src="/phone.png"
              alt="FindMe App Preview"
              width={360}
              height={560}
              style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section style={{
        background: "linear-gradient(135deg, #0d2818, #0a1f10)",
        borderTop: "1px solid rgba(29,185,84,0.15)",
        padding: "120px 48px",
        textAlign: "center",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 20,
            color: "#f5f4f0",
          }}>
            Your things deserve to<br />find their way <span style={{ color: "#1db954" }}>home</span>
          </h2>
          <p style={{ color: "#888", fontSize: 18, maxWidth: 480, margin: "0 auto 40px" }}>
            Join thousands of Nigerians who never stress about losing their valuables again.
          </p>
          <Link
            href="/shop"
            style={{
              background: "#1db954", color: "#000",
              padding: "18px 44px", borderRadius: 50,
              fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16,
              textDecoration: "none", display: "inline-block",
              boxShadow: "0 0 40px rgba(29,185,84,0.4)",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#25e668"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#1db954"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Get your FindMe tags →
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
