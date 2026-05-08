"use client";

import HowItWorks from "./HowItWorks";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "./data/products";
import toast from "react-hot-toast";
import { useCart } from "./CartContext";

/* ================= PALETTE ================= */
// bg:        #ffffff  (clean white — Tagiz style)
// bg-alt:    #f7f9f7  (very light green-grey for alternating sections)
// card:      #ffffff  (white cards)
// border:    #e5e5e5  (light grey borders)
// text:      #1a1a1a  (near-black)
// muted:     #555555  (medium grey)
// accent:    #1db954  (brand green — unchanged)
// dark-green:#1a3a2a  (deep forest — used as touch on stats bar, CTA, phone bar)

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
    <div style={{ background: "#ffffff", color: "#1a1a1a", minHeight: "100vh" }}>

      {/* ===================== HERO ===================== */}
      <section style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "100px 64px 80px",
        position: "relative", overflow: "hidden",
        background: "#faf9f7",
        gap: 48,
      }}>

        {/* ══════════ GEOMETRIC SHAPES BEHIND PHONE ══════════ */}
        {/* Large cream/beige background blob — fills right half */}
        <div style={{
          position: "absolute", right: 0, top: 0,
          width: "55%", height: "100%",
          background: "#f5f0e8",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* RED circle — top centre-right */}
        <div style={{
          position: "absolute", right: "34%", top: "-4%",
          width: 110, height: 110, borderRadius: "50%",
          background: "#e8445a",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* BLUE large circle — right edge mid */}
        <div style={{
          position: "absolute", right: "-3%", top: "18%",
          width: 170, height: 170, borderRadius: "50%",
          background: "#4a7fd4",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* BLUE half-circle — right side lower */}
        <div style={{
          position: "absolute", right: "-2%", top: "42%",
          width: 130, height: 130, borderRadius: "50%",
          background: "#5b8ee6",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* YELLOW large half-shape — bottom right */}
        <div style={{
          position: "absolute", right: "0%", bottom: "8%",
          width: 200, height: 160,
          borderRadius: "50% 0 0 50%",
          background: "#f5c842",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* DARK NAVY circle — bottom left of right column */}
        <div style={{
          position: "absolute", right: "44%", bottom: "-6%",
          width: 150, height: 150, borderRadius: "50%",
          background: "#1a2744",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* PINK/RED circle — bottom right */}
        <div style={{
          position: "absolute", right: "10%", bottom: "-3%",
          width: 100, height: 100, borderRadius: "50%",
          background: "#e8445a",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* PINK rectangle — far right edge */}
        <div style={{
          position: "absolute", right: 0, top: "30%",
          width: 18, height: 120,
          borderRadius: "4px 0 0 4px",
          background: "#e8445a",
          pointerEvents: "none", zIndex: 2,
        }} />

        {/* TEAL/CYAN small semicircle — mid left of right section */}
        <div style={{
          position: "absolute", right: "44%", top: "55%",
          width: 60, height: 60, borderRadius: "50%",
          background: "#2abfbf",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* Dark green left-edge bar (brand accent) */}
        <div style={{
          position: "absolute", bottom: 0, left: 0,
          width: 6, height: "40%",
          background: "linear-gradient(to top, #1a3a2a, transparent)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* LEFT COLUMN — Text */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", position: "relative", zIndex: 2 }}>
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
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            Lost it?{" "}
            <em style={{ fontStyle: "italic", color: "#1db954", display: "block" }}>Consider it</em>
            Found.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ marginTop: 24, fontSize: "clamp(15px, 1.5vw, 18px)", color: "#555555", maxWidth: 480, fontWeight: 400, lineHeight: 1.75 }}
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
                background: "#f5f5f5", color: "#1a1a1a",
                padding: "16px 36px", borderRadius: 12,
                border: "1.5px solid #d0d0d0",
                fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 15,
                textDecoration: "none", transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#eeeeee"; e.currentTarget.style.borderColor = "rgba(29,185,84,0.6)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#f5f5f5"; e.currentTarget.style.borderColor = "#d0d0d0"; }}
            >
              How It Works
            </a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — Tilted Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 2 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 270,
              background: "#ffffff",
              borderRadius: 48,
              border: "8px solid #1a1a1a",
              boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.15), inset 0 0 0 2px rgba(255,255,255,0.9)",
              overflow: "hidden",
              transform: "rotate(6deg)",
              position: "relative",
            }}
          >
            {/* Phone notch */}
            <div style={{
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
              width: 100, height: 28, background: "#1a1a1a",
              borderRadius: "0 0 20px 20px", zIndex: 10,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2a2a2a" }} />
              <div style={{ width: 40, height: 4, borderRadius: 4, background: "#2a2a2a" }} />
            </div>

            {/* Phone screen content — FindMe recovery page */}
            <div style={{ background: "#ffffff", paddingTop: 32, minHeight: 560, display: "flex", flexDirection: "column" }}>

              {/* App bar */}
              <div style={{ padding: "10px 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 10, color: "#888" }}>☰</span>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 15, color: "#1a3a2a", letterSpacing: -0.3 }}>FindMe</span>
                <span style={{ fontSize: 9, background: "#1a3a2a", color: "#fff", borderRadius: 10, padding: "2px 7px", fontWeight: 600 }}>🇳🇬 NG</span>
              </div>

              {/* Main content */}
              <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flex: 1 }}>

                {/* Lost item header */}
                <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", margin: 0, textAlign: "center" }}>This item is lost</p>

                {/* Item icon */}
                <div style={{
                  width: 56, height: 56, borderRadius: 14, background: "#f5f5f5",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
                }}>🎒</div>

                <p style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>My Backpack</p>

                <p style={{ fontSize: 9.5, color: "#777", textAlign: "center", lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>
                  Hi there!{"\n"}If you&apos;ve found this item, please contact me using the options below
                </p>

                <p style={{ fontSize: 9, color: "#555", margin: 0, alignSelf: "flex-start" }}>Tag Owner: <strong>Chidi Okafor</strong></p>

                {/* Contact buttons — matching Tagiz style */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, width: "100%" }}>
                  <button style={{ background: "#4a90d9", color: "#fff", border: "none", borderRadius: 8, padding: "9px 6px", fontSize: 10, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    📞 <span>WhatsApp</span>
                  </button>
                  <button style={{ background: "#6c757d", color: "#fff", border: "none", borderRadius: 8, padding: "9px 6px", fontSize: 10, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    ✉️ <span>Email</span>
                  </button>
                </div>
                <button style={{ background: "#1db954", color: "#fff", border: "none", borderRadius: 8, padding: "9px 6px", fontSize: 10, fontWeight: 600, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                  💬 Chat Anonymously
                </button>
                <button style={{ background: "#e8445a", color: "#fff", border: "none", borderRadius: 8, padding: "9px 6px", fontSize: 10, fontWeight: 600, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                  📍 Send My Location
                </button>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: 4 }}>
                  <span style={{ fontSize: 8.5, color: "#888" }}>ℹ Learn More</span>
                  <span style={{ fontSize: 8.5, color: "#888" }}>↗ Share</span>
                </div>
                <p style={{ fontSize: 7.5, color: "#bbb", margin: 0, textAlign: "center", wordBreak: "break-all" }}>
                  Tag Id: fm-ng-a4c2-8f1e-3b92-d047
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== STATS ===================== */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 0, background: "#1a3a2a" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: "1 1 180px", padding: "48px 32px", textAlign: "center", background: "transparent", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 48, fontWeight: 800, lineHeight: 1, color: "#ffffff" }}>
              {s.num.replace(/\d+/, (n) => `${n}`).split('').map((c, j) =>
                /\d/.test(c) ? <span key={j} style={{ color: "#ffffff" }}>{c}</span> : <span key={j} style={{ color: "#1db954" }}>{c}</span>
              )}
            </div>
            <div style={{ marginTop: 8, fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ===================== SHOP TAGS ===================== */}
      <section style={{ padding: "120px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#1db954", marginBottom: 16 }}>
          Products
        </p>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 64, color: "#1a1a1a" }}>
          Shop Tags
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
          {products.slice(0, 3).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e5e5",
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
                e.currentTarget.style.borderColor = "#e5e5e5";
              }}
            >
              <Link href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ padding: "28px 28px 0", background: "#1a3a2a", borderRadius: "16px 16px 0 0" }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={220}
                    height={160}
                    style={{ width: "100%", objectFit: "contain", display: "block" }}
                  />
                </div>
                <div style={{ padding: "20px 24px 8px" }}>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, color: "#1a1a1a", marginBottom: 6 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: 20, fontWeight: 700, color: "#1db954", marginBottom: 4 }}>
                    ₦{p.price.toLocaleString()}
                  </p>
                  <p style={{ fontSize: 13, color: "#555555" }}>Smart QR recovery tag</p>
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
              border: "1.5px solid #cccccc", color: "#1a1a1a",
              padding: "14px 36px", borderRadius: 40,
              fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14,
              textDecoration: "none", transition: "all 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1db954"; e.currentTarget.style.color = "#1db954"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#c0c0c0"; e.currentTarget.style.color = "#1a1a1a"; }}
          >
            View all products →
          </Link>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <HowItWorks />

      {/* ===================== PHONE DEMO ===================== */}
      <div style={{ background: "#f7f9f7", borderTop: "1px solid #e8e8e8", borderBottom: "1px solid #e8e8e8" }}>
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
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 20, color: "#1a1a1a" }}>
              From scan to connected in seconds
            </h2>
            <p style={{ color: "#555555", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
              Someone finds your bag, scans the QR tag, and you get a WhatsApp ping instantly. No friction for the finder — just a scan and tap.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Finder scans → you're notified in under 10 seconds",
                "Anonymous 2-hour chat session created automatically",
                "Works even if finder has never heard of FindMe",
                "No app download required for anyone",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#555555" }}>
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
              width: 260, background: "#ffffff",
              borderRadius: 40, border: "2px solid #e5e5e5",
              padding: "20px 16px",
              boxShadow: "0 32px 70px rgba(0,0,0,0.4)",
            }}>
              <div style={{ width: 80, height: 20, background: "#e0e8e0", borderRadius: 20, margin: "0 auto 16px", border: "2px solid #d8e8d8" }} />
              <div style={{ background: "#f0f5f0", borderRadius: 24, padding: 20, minHeight: 380, display: "flex", flexDirection: "column", gap: 12 }}>
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
                      background: m.type === "out" ? "#1db954" : m.type === "sys" ? "rgba(29,185,84,0.1)" : "#e8e8e8",
                      color: m.type === "out" ? "#fff" : m.type === "sys" ? "#1db954" : "#1a1a1a",
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
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 64, color: "#1a1a1a" }}>
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
                background: "#ffffff", border: "1px solid #e5e5e5",
                borderRadius: 16, padding: 36,
                borderLeft: "3px solid #1a3a2a",
                transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#1db954";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(26,58,42,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e5e5";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 20, width: 56, height: 56, borderRadius: 14, background: "rgba(26,58,42,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>{f.icon}</div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 10, color: "#1a1a1a" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: "#555555", lineHeight: 1.7 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section id="about" style={{ background: "#f7f9f7", borderTop: "1px solid #e8e8e8", padding: "120px 48px" }}>
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
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 24, color: "#1a1a1a" }}>
              Meet Find<span style={{ color: "#1db954" }}>Me</span>
            </h2>
            <p style={{ color: "#555555", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
              FindMe connects you instantly with anyone who finds your lost items. No apps, no stress — just scan and chat.
            </p>
            <p style={{ color: "#555555", fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
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
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 260, background: "#ffffff",
                borderRadius: 40, border: "2px solid #e5e5e5",
                padding: "20px 16px",
                boxShadow: "0 32px 70px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ width: 80, height: 20, background: "#e0e8e0", borderRadius: 20, margin: "0 auto 16px", border: "2px solid #d8e8d8" }} />
              <div style={{ background: "#f0f5f0", borderRadius: 24, padding: 20, minHeight: 380, display: "flex", flexDirection: "column", gap: 12 }}>
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
                      background: m.type === "out" ? "#1db954" : m.type === "sys" ? "rgba(29,185,84,0.1)" : "#e8e8e8",
                      color: m.type === "out" ? "#fff" : m.type === "sys" ? "#1db954" : "#1a1a1a",
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section style={{
        background: "#1a3a2a",
        borderTop: "none",
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
            color: "#ffffff",
          }}>
            Your things deserve to<br />find their way <span style={{ color: "#1db954" }}>home</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 18, maxWidth: 480, margin: "0 auto 40px" }}>
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
