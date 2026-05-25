"use client";

import { useEffect, useState } from "react";

import HowItWorks from "./HowItWorks";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "./data/products";
import toast from "react-hot-toast";
import { useCart } from "./CartContext";

const BG = "#c8dfc8";

const stats = [
  { num: "10K+", label: "Tags activated" },
  { num: "94%",  label: "Recovery rate" },
  { num: "2min", label: "Avg. response time" },
  { num: "100%", label: "Anonymous & private" },
];

const features = [
  { icon: "🔒", title: "100% Anonymous",   desc: "Your phone number is never shared. Finders chat through our relay — they never see your real contact." },
  { icon: "⚡", title: "Instant WhatsApp", desc: "No app to download. No account to create. Everything happens on WhatsApp — already on everyone's phone." },
  { icon: "🌍", title: "Works Anywhere",   desc: "Any smartphone can scan a FindMe tag. No app, no login — just a camera and WhatsApp." },
  { icon: "🏷️", title: "Tag Anything",     desc: "Laptops, keys, wallets, bags, AirPods, passports — if you can stick a tag on it, you can protect it." },
  { icon: "🔋", title: "Battery-Free",   desc: "Relax knowing your tags work day and night—no batteries to worry about, no maintenance stress, just solid peace of mind." },
  { icon: "🛡️", title: "Tamper-Evident",  desc: "Durable, water-resistant tags designed to stay put. Built for keys, bags, and everyday wear." },
];

export default function Home() {
  const { addToCart } = useCart();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{ background: BG, color: "#1a3a2a", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ===================== HERO ===================== */}
      <section style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        alignItems: "center",
        padding: isMobile ? "120px 24px 80px" : "100px 64px 80px",
        position: "relative",
        overflow: "hidden",
        background: BG,
        gap: 48,
      }}>

        {/* Full-page honeycomb SVG */}
        <svg style={{ position: "absolute", top: 0, right: 0, width: "30%", height: "100%", pointerEvents: "none", opacity: 0.45 }}
          xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hc" x="0" y="0" width="104" height="180" patternUnits="userSpaceOnUse">
              <polygon points="52,4 88,24 88,64 52,84 16,64 16,24"
                fill="rgba(255,255,255,0.18)" stroke="#3a6b3a" strokeWidth="1.2"/>
              <polygon points="104,94 140,114 140,154 104,174 68,154 68,114"
                fill="rgba(255,255,255,0.18)" stroke="#3a6b3a" strokeWidth="1.2"/>
              <polygon points="0,94 36,114 36,154 0,174 -36,154 -36,114"
                fill="rgba(255,255,255,0.18)" stroke="#3a6b3a" strokeWidth="1.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hc)"/>
        </svg>

        {/* LEFT */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.38)", borderRadius: 40,
              padding: "8px 18px", marginBottom: 28, border: "1px solid rgba(255,255,255,0.6)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1db954" }}/>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1a3a2a" }}>Now available in Nigeria</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "Syne, sans-serif",
              fontSize: isMobile ? "52px" : "78px",
              lineHeight: 1.02, letterSpacing: -2,
              margin: 0, color: "#1a3a2a", fontWeight: 750 }}>
            Lost it?<br/>
            <em style={{ color: "#2d5a30", fontStyle: "italic" }}>Consider it</em><br/>
            Found.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: 28, maxWidth: 480, fontSize: 20, lineHeight: 1.85, color: "#2a4a2a" }}>
            Attach a FindMe QR tag to anything. If it gets lost, anyone can scan and contact you instantly via WhatsApp — anonymously.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: 42, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/shop" style={{
              background: "#1a3a2a", color: "#fff",
              padding: "16px 34px", borderRadius: 14,
              textDecoration: "none", fontWeight: 700,
              fontFamily: "Syne, sans-serif", fontSize: 15,
              boxShadow: "0 4px 20px rgba(26,58,42,0.4)" }}>
              Get Your Tags →
            </Link>
            <a href="#how" style={{
              background: "rgba(255,255,255,0.5)", color: "#1a3a2a",
              padding: "16px 34px", borderRadius: 14,
              textDecoration: "none", fontWeight: 700, fontSize: 15,
              border: "1.5px solid rgba(255,255,255,0.75)" }}>
              How It Works
            </a>
          </motion.div>
        </div>


        {/* RIGHT — Product image */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center",
            position: "relative", zIndex: 2 }}>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "relative" }}
          >
            <Image
              src="/eli2.png"
              alt="FindMe Smart ID Tag"
              width={isMobile ? 300 : 640}
              height={isMobile ? 300 : 640}
              style={{
                width: isMobile ? 300 : 640,
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 40px 80px rgba(26,58,42,0.55)) drop-shadow(0 16px 32px rgba(0,0,0,0.35)) drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
              }}
              priority
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== STATS ===================== */}
      <section style={{ background: "#1a3a2a", display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: "48px 24px", textAlign: "center",
            borderRight: !isMobile && i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: "#fff", fontFamily: "Syne, sans-serif" }}>{s.num}</div>
            <div style={{ marginTop: 10, color: "rgba(255,255,255,0.65)", fontSize: 14 }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ===================== PRODUCTS ===================== */}
      <section style={{ padding: isMobile ? "80px 0" : "120px 0", background: BG, overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px" }}>
          <p style={{ fontFamily: "Syne, sans-serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#1a3a2a", fontWeight: 700, marginBottom: 12 }}>Products</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "38px" : "54px", fontWeight: 800, letterSpacing: -1, lineHeight: 1.05, margin: 0, color: "#1a3a2a" }}>Shop Tags</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => { const el = document.getElementById("product-scroll"); if (el) el.scrollBy({ left: -320, behavior: "smooth" }); }}
                style={{ width: 44, height: 44, borderRadius: "50%", border: "1.5px solid rgba(26,58,42,0.25)",
                  background: "rgba(255,255,255,0.8)", color: "#1a3a2a", fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#1a3a2a"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; e.currentTarget.style.color = "#1a3a2a"; }}
              >←</button>
              <button
                onClick={() => { const el = document.getElementById("product-scroll"); if (el) el.scrollBy({ left: 320, behavior: "smooth" }); }}
                style={{ width: 44, height: 44, borderRadius: "50%", border: "none",
                  background: "#1a3a2a", color: "#fff", fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#2d5a30"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#1a3a2a"; }}
              >→</button>
            </div>
          </div>
        </div>

        <div
          id="product-scroll"
          style={{
            display: "flex", gap: 20,
            overflowX: "auto", overflowY: "visible",
            paddingLeft: isMobile ? 24 : 48,
            paddingRight: isMobile ? 24 : 48,
            paddingBottom: 16,
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
          }}
        >
          <style>{`#product-scroll::-webkit-scrollbar { display: none; }`}</style>

          {products.filter((p) => [1, 2, 4, 6].includes(p.id)).map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -4 }}
              style={{
                minWidth: isMobile ? "80vw" : 290,
                maxWidth: isMobile ? "80vw" : 290,
                border: "1px solid rgba(26,58,42,0.15)", borderRadius: 20, overflow: "hidden",
                background: "rgba(255,255,255,0.7)", boxShadow: "0 4px 24px rgba(26,58,42,0.08)",
                scrollSnapAlign: "start", flexShrink: 0, position: "relative",
              }}
            >
              {p.comingSoon && (
                <div style={{ position: "absolute", top: 14, right: 14, zIndex: 10,
                  background: "#1a3a2a", color: "#fff", fontSize: 10, fontWeight: 700,
                  letterSpacing: 1, padding: "4px 10px", borderRadius: 20, fontFamily: "Syne, sans-serif" }}>
                  COMING SOON
                </div>
              )}
              {p.id === 6 && (
                <div style={{ position: "absolute", top: 14, right: 14, zIndex: 10,
                  background: "#1db954", color: "#000", fontSize: 10, fontWeight: 700,
                  letterSpacing: 1, padding: "4px 10px", borderRadius: 20, fontFamily: "Syne, sans-serif" }}>
                  BEST VALUE
                </div>
              )}
              <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "#1a3a2a", padding: 24 }}>
                  <Image src={p.image} alt={p.name} width={400} height={200}
                    style={{ width: "100%", height: "200px", objectFit: "contain" }}/>
                </div>
                <div style={{ padding: "20px 22px 10px" }}>
                  <h3 style={{ margin: 0, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: -0.3, color: "#1a3a2a" }}>{p.name}</h3>
                  <p style={{ fontFamily: "Syne, sans-serif", color: "#4a7a5a", fontSize: 13, fontWeight: 500, lineHeight: 1.7, marginTop: 8, marginBottom: 6 }}>
                    {p.id === 1 && "A slim QR sticker for phones, laptops & gadgets. Scan to contact you via WhatsApp instantly."}
                    {p.id === 2 && "Premium QR keychain for keys & bags. Lost it? Finder scans and reaches you in seconds."}
                    {p.id === 3 && "Smart QR tag for your pet. If they wander off, anyone can scan and call you right away."}
                    {p.id === 4 && "Travel-ready QR tag for your luggage. Misplaced bag? Get reunited at any airport worldwide."}
                    {p.id === 5 && "QR wristband designed for kids. A quick scan connects the finder to you instantly."}
                    {p.id === 6 && "The complete FindMe bundle for the whole family. Stickers, keychain & luggage tags in one pack."}
                    {p.id === 7 && "Tag your bags before you fly. If anything goes missing, a quick scan connects the finder straight to your WhatsApp."}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4, flexWrap: "wrap" }}>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, margin: 0,
                      color: p.comingSoon ? "#aaa" : "#1db954" }}>
                      {p.comingSoon ? "Coming Soon" : `₦${p.price.toLocaleString()}`}
                    </p>
                    {p.id === 6 && (
                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14, margin: 0,
                        color: "#aaa", textDecoration: "line-through" }}>
                        ₦45,000
                      </p>
                    )}
                    {p.id === 7 && (
                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14, margin: 0,
                        color: "#aaa", textDecoration: "line-through" }}>
                        ₦28,000
                      </p>
                    )}
                  </div>
                </div>
              </Link>
              <div style={{ padding: "8px 22px 22px" }}>
                <button
                  onClick={() => { if (!p.comingSoon) { addToCart(p); toast.success(p.name + " added to cart"); } }}
                  disabled={!!p.comingSoon}
                  style={{ width: "100%", border: "none", padding: "13px", borderRadius: 40,
                    background: p.comingSoon ? "rgba(26,58,42,0.15)" : "#1a3a2a",
                    color: p.comingSoon ? "#888" : "#fff", fontWeight: 700, fontSize: 14,
                    letterSpacing: 0.3, cursor: p.comingSoon ? "not-allowed" : "pointer",
                    fontFamily: "Syne, sans-serif", transition: "background 0.2s" }}>
                  {p.comingSoon ? "Coming Soon" : "Add to Cart"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40, padding: "0 48px" }}>
          <Link href="/shop" style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14,
            border: "1.5px solid #1a3a2a", color: "#1a3a2a", letterSpacing: 0.3,
            padding: "14px 36px", borderRadius: 40, textDecoration: "none" }}>
            View all products →
          </Link>
        </div>
      </section>

      

      {/* ===================== HOW IT WORKS ===================== */}
      <div id="how"><HowItWorks /></div>

      {/* ===================== FEATURES ===================== */}
      <section style={{ padding: isMobile ? "80px 24px" : "120px 48px", background: BG }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: "Syne, sans-serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#1a3a2a", fontWeight: 700, marginBottom: 12 }}>Features</p>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "38px" : "52px", fontWeight: 800, letterSpacing: -1, lineHeight: 1.05, marginBottom: 64, color: "#1a3a2a" }}>Built for real life</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {features.map((f, i) => (
              <motion.div key={i} whileHover={{ y: -4 }}
                style={{ border: "1px solid rgba(26,58,42,0.15)", borderLeft: "3px solid #1a3a2a",
                  borderRadius: 20, padding: 34, background: "rgba(255,255,255,0.7)",
                  boxShadow: "0 4px 24px rgba(26,58,42,0.08)", transition: "box-shadow 0.3s" }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(26,58,42,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: -0.2,
                  marginBottom: 10, marginTop: 0, color: "#1a3a2a" }}>{f.title}</h3>
                <p style={{ fontFamily: "Syne, sans-serif", color: "#4a7a5a", lineHeight: 1.85, fontSize: 14, fontWeight: 400 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section id="about" style={{ padding: isMobile ? "80px 24px" : "120px 48px", background: BG }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "Syne, sans-serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#1a3a2a", fontWeight: 700, marginBottom: 12 }}>About</p>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "42px" : "58px", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.02, color: "#1a3a2a" }}>
              Meet Find<span style={{ color: "#1db954" }}>Me</span>
            </h2>
            <p style={{ fontFamily: "Syne, sans-serif", color: "#4a7a5a", lineHeight: 1.9, marginTop: 24, fontSize: 16, fontWeight: 400 }}>
              FindMe connects you instantly with anyone who finds your lost items. No apps, no stress — just scan and chat. Built for everyday Nigerian life — from keys to pets to luggage.
            </p>
            <Link href="/shop" style={{ display: "inline-block", marginTop: 32,
              background: "#1a3a2a", color: "#fff", padding: "14px 32px",
              borderRadius: 40, textDecoration: "none", fontWeight: 700,
              fontFamily: "Syne, sans-serif", fontSize: 15, letterSpacing: 0.2 }}>
              Get Started →
            </Link>
          </div>
          <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 24, padding: 40,
            boxShadow: "0 4px 24px rgba(26,58,42,0.08)", border: "1px solid rgba(26,58,42,0.12)" }}>
            <h3 style={{ marginTop: 0, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 20,
              letterSpacing: -0.3, color: "#1a3a2a", marginBottom: 24 }}>Why Nigerians love FindMe</h3>
            <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              {["No app download required", "Anonymous WhatsApp recovery", "Works anywhere instantly", "Affordable smart protection"].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#1a3a2a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 12, flexShrink: 0, fontWeight: 700 }}>✓</span>
                  <span style={{ fontFamily: "Syne, sans-serif", color: "#4a7a5a", fontSize: 15, fontWeight: 500 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section style={{ background: "#1a3a2a", padding: isMobile ? "90px 24px" : "120px 48px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontFamily: "Syne, sans-serif",
          fontSize: isMobile ? "42px" : "64px", lineHeight: 1.1, marginBottom: 24 }}>
          Your things deserve<br/>to find their way{" "}
          <span style={{ color: "#1db954" }}>home</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 520, margin: "0 auto 40px", fontSize: 17, lineHeight: 1.8 }}>
          Join thousands of Nigerians protecting their valuables with FindMe.
        </p>
        <Link href="/shop" style={{ display: "inline-block", background: "#1db954",
          color: "#000", padding: "18px 42px", borderRadius: 50, textDecoration: "none",
          fontWeight: 800, fontFamily: "Syne, sans-serif",
          boxShadow: "0 0 40px rgba(29,185,84,0.35)" }}>
          Get your FindMe tags →
        </Link>
      </section>

    </div>
  );
}
