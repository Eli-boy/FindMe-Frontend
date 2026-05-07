"use client";

import HowItWorks from "./HowItWorks";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "./data/products";
import toast from "react-hot-toast";
import { useCart } from "./CartContext";

/* ================= PALETTE ================= */
// bg:        #2c3d30  (deep forest, not pitch black)
// bg-alt:    #334538  (slightly lighter for alternating sections)
// card:      #3a4e3d  (card surfaces)
// border:    rgba(255,255,255,0.07)
// text:      #e8ede8  (warm off-white)
// muted:     #8aa88d  (muted sage)
// accent:    #1db954  (brand green — unchanged)

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
    <div style={{ background: "#2c3d30", color: "#dff0e2", minHeight: "100vh" }}>

      {/* ===================== HERO ===================== */}
      <section style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "100px 64px 80px",
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #2c3d30 0%, #2e4030 50%, #2c3d30 100%)",
        gap: 48,
      }}>
        {/* Subtle radial glow */}
        <div style={{
          position: "absolute", width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,185,84,0.07), transparent 65%)",
          top: "50%", right: "10%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }} />

        {/* LEFT COLUMN — Text */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", position: "relative" }}>
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(29,185,84,0.1)", border: "1.5px solid rgba(29,185,84,0.35)",
              borderRadius: 40, padding: "6px 16px", fontSize: 13, fontWeight: 500,
              color: "#1db954", marginBottom: 32,
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
              color: "#dff0e2",
              margin: 0,
            }}
          >
            Lost it?{" "}
            <em style={{ fontStyle: "italic", color: "#1db954", display: "block" }}>Consider it</em>
            Found.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ marginTop: 24, fontSize: "clamp(15px, 1.5vw, 18px)", color: "#9dbfa0", maxWidth: 480, fontWeight: 400, lineHeight: 1.75 }}
          >
            Attach a FindMe QR tag to anything. If it gets lost, anyone can scan and contact you instantly via WhatsApp — anonymously.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ marginTop: 44, display: "flex", gap: 14, flexWrap: "wrap" }}
          >
            <Link
              href="/shop"
              style={{
                background: "#1db954", color: "#000",
                padding: "16px 36px", borderRadius: 12,
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15,
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                boxShadow: "0 4px 24px rgba(29,185,84,0.3)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#19a348"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(29,185,84,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#1db954"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(29,185,84,0.3)"; }}
            >
              Get Your Tags →
            </Link>
            <a
              href="#how"
              style={{
                background: "rgba(255,255,255,0.06)", color: "#dff0e2",
                padding: "16px 36px", borderRadius: 12,
                border: "1.5px solid rgba(255,255,255,0.12)",
                fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 15,
                textDecoration: "none", transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(29,185,84,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            >
              How It Works
            </a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 290,
              background: "#3a4e3d",
              borderRadius: 44,
              border: "2px solid rgba(255,255,255,0.09)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            {/* Phone Top Bar */}
            <div style={{
              background: "#1db954",
              padding: "20px 20px 18px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            }}>
              <div style={{ width: 60, height: 8, background: "rgba(0,0,0,0.25)", borderRadius: 8 }} />
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", marginTop: 4 }}>FindMe</span>
            </div>

            {/* Phone Content */}
            <div style={{ padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10, background: "#334438" }}>
              {/* QR Card */}
              <div style={{
                background: "#425850", borderRadius: 16, padding: "20px 16px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {[
                    [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],
                    [0,1],[6,1],
                    [0,2],[2,2],[3,2],[4,2],[6,2],
                    [0,3],[2,3],[4,3],[6,3],
                    [0,4],[2,4],[3,4],[4,4],[6,4],
                    [0,5],[6,5],
                    [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],
                    [8,0],[10,0],[11,0],
                    [8,1],[9,1],[11,1],[12,1],
                    [9,2],[11,2],
                    [8,3],[10,3],[12,3],
                    [8,4],[9,4],[11,4],[12,4],
                    [0,8],[1,8],[3,8],[5,8],[6,8],
                    [0,9],[2,9],[4,9],[6,9],
                    [1,10],[2,10],[3,10],[5,10],[6,10],
                    [0,11],[1,11],[3,11],[4,11],[6,11],
                    [0,12],[2,12],[3,12],[5,12],[6,12],
                    [8,8],[9,8],[10,8],[12,8],
                    [8,9],[11,9],[12,9],
                    [9,10],[10,10],[12,10],
                    [8,11],[9,11],[11,11],
                    [8,12],[10,12],[11,12],[12,12],
                  ].map(([col, row], i) => (
                    <rect key={i} x={col * 7 + 2} y={row * 7 + 2} width="6" height="6"
                      fill={[8,9,10,11,12].some(c => [c].includes(col)) && row < 7 ? "#1db954" : "#e8ede8"} rx="1" />
                  ))}
                </svg>
                <span style={{ fontSize: 12, color: "#9dbfa0", fontWeight: 500 }}>Scan to recover item</span>
              </div>

              {/* Notification Card */}
              <div style={{
                background: "#425850", borderRadius: 14, padding: "12px 14px",
                display: "flex", alignItems: "flex-start", gap: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, flexShrink: 0,
                }}>🔍</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#dff0e2", lineHeight: 1.3 }}>Someone found your Laptop!</div>
                  <div style={{ fontSize: 11, color: "#9dbfa0", marginTop: 2 }}>Reply here to chat anonymously</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div style={{ display: "flex", flexDirection: "column", gap: 7, padding: "4px 2px" }}>
                {[
                  { text: "Hi! I found your bag at the airport lounge", type: "in" },
                  { text: "Thank you! Which terminal? 🙏", type: "out" },
                  { text: "Terminal 2, near charging stations", type: "in" },
                ].map((m, i) => (
                  <div key={i} style={{
                    alignSelf: m.type === "out" ? "flex-end" : "flex-start",
                    background: m.type === "out" ? "#1db954" : "#425850",
                    color: m.type === "out" ? "#fff" : "#e8ede8",
                    padding: "8px 12px", borderRadius: 14,
                    borderBottomRightRadius: m.type === "out" ? 4 : 14,
                    borderBottomLeftRadius: m.type === "in" ? 4 : 14,
                    fontSize: 11.5, maxWidth: "82%", lineHeight: 1.45,
                    fontWeight: 500,
                  }}>{m.text}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== STATS ===================== */}
      <div style={{ display: "flex", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: 1, background: "rgba(255,255,255,0.03)" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: "1 1 180px", padding: "48px 32px", textAlign: "center", background: "#2c3d30" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 48, fontWeight: 800, lineHeight: 1, color: "#dff0e2" }}>
              {s.num.replace(/\d+/, (n) => `${n}`).split('').map((c, j) =>
                /\d/.test(c) ? <span key={j} style={{ color: "#dff0e2" }}>{c}</span> : <span key={j} style={{ color: "#1db954" }}>{c}</span>
              )}
            </div>
            <div style={{ marginTop: 8, fontSize: 14, color: "#9dbfa0" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ===================== SHOP TAGS ===================== */}
      <section style={{ padding: "120px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#1db954", marginBottom: 16 }}>
          Products
        </p>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 64, color: "#dff0e2" }}>
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
                background: "#3a4e3d",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, overflow: "hidden",
                transition: "transform 0.3s, border-color 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(29,185,84,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <Link href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ padding: "28px 28px 0", background: "#334538", borderRadius: "16px 16px 0 0" }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={220}
                    height={160}
                    style={{ width: "100%", objectFit: "contain", display: "block" }}
                  />
                </div>
                <div style={{ padding: "20px 24px 8px" }}>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, color: "#dff0e2", marginBottom: 6 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: 20, fontWeight: 700, color: "#1db954", marginBottom: 4 }}>
                    ₦{p.price.toLocaleString()}
                  </p>
                  <p style={{ fontSize: 13, color: "#9dbfa0" }}>Smart QR recovery tag</p>
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
              border: "1.5px solid rgba(255,255,255,0.15)", color: "#dff0e2",
              padding: "14px 36px", borderRadius: 40,
              fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14,
              textDecoration: "none", transition: "all 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1db954"; e.currentTarget.style.color = "#1db954"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#e8ede8"; }}
          >
            View all products →
          </Link>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <HowItWorks />

      {/* ===================== PHONE DEMO ===================== */}
      <div style={{ background: "#334538", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
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
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 20, color: "#dff0e2" }}>
              From scan to connected in seconds
            </h2>
            <p style={{ color: "#9dbfa0", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
              Someone finds your bag, scans the QR tag, and you get a WhatsApp ping instantly. No friction for the finder — just a scan and tap.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Finder scans → you're notified in under 10 seconds",
                "Anonymous 2-hour chat session created automatically",
                "Works even if finder has never heard of FindMe",
                "No app download required for anyone",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#9dbfa0" }}>
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
              width: 260, background: "#3a4e3d",
              borderRadius: 40, border: "2px solid rgba(255,255,255,0.08)",
              padding: "20px 16px",
              boxShadow: "0 32px 70px rgba(0,0,0,0.4)",
            }}>
              <div style={{ width: 80, height: 20, background: "#324035", borderRadius: 20, margin: "0 auto 16px", border: "2px solid rgba(255,255,255,0.05)" }} />
              <div style={{ background: "#334238", borderRadius: 24, padding: 20, minHeight: 380, display: "flex", flexDirection: "column", gap: 12 }}>
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
                      background: m.type === "out" ? "#1db954" : m.type === "sys" ? "rgba(29,185,84,0.1)" : "#425850",
                      color: m.type === "out" ? "#fff" : m.type === "sys" ? "#1db954" : "#e8ede8",
                      border: m.type === "sys" ? "1px solid rgba(29,185,84,0.3)" : "none",
                      borderBottomRightRadius: m.type === "out" ? 4 : 16,
                      borderBottomLeftRadius: m.type === "in" ? 4 : 16,
                      fontWeight: m.type === "out" ? 500 : 400,
                      textAlign: m.type === "sys" ? "center" : "left",
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
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 64, color: "#dff0e2" }}>
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
                background: "#3a4e3d", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, padding: 36,
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
              <div style={{ fontSize: 32, marginBottom: 20 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 10, color: "#dff0e2" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: "#9dbfa0", lineHeight: 1.7 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section id="about" style={{ background: "#334538", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "120px 48px" }}>
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
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 24, color: "#dff0e2" }}>
              Meet Find<span style={{ color: "#1db954" }}>Me</span>
            </h2>
            <p style={{ color: "#9dbfa0", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
              FindMe connects you instantly with anyone who finds your lost items. No apps, no stress — just scan and chat.
            </p>
            <p style={{ color: "#9dbfa0", fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
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
              style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.5))" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section style={{
        background: "linear-gradient(135deg, #304535, #2c3d30)",
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
            color: "#dff0e2",
          }}>
            Your things deserve to<br />find their way <span style={{ color: "#1db954" }}>home</span>
          </h2>
          <p style={{ color: "#9dbfa0", fontSize: 18, maxWidth: 480, margin: "0 auto 40px" }}>
            Join thousands of Nigerians who never stress about losing their valuables again.
          </p>
          <Link
            href="/shop"
            style={{
              background: "#1db954", color: "#000",
              padding: "18px 44px", borderRadius: 50,
              fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16,
              textDecoration: "none", display: "inline-block",
              boxShadow: "0 0 40px rgba(29,185,84,0.35)",
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
