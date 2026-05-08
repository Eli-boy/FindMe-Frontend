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
  { icon: "💬", title: "Anonymous Chat",   desc: "A 2-hour private session is created between you and the finder to coordinate pickup — safely." },
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
              margin: 0, color: "#1a3a2a", fontWeight: 800 }}>
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
      <section style={{ padding: isMobile ? "80px 24px" : "120px 48px", background: BG }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#1a3a2a", fontWeight: 700, marginBottom: 12 }}>Products</p>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "38px" : "54px", marginBottom: 50, color: "#1a3a2a" }}>Shop Tags</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {products
              .filter((p) => !p.category?.toLowerCase().includes("pet") && !p.name?.toLowerCase().includes("pet"))
              .slice(0, 3)
              .map((p) => (
              <motion.div key={p.id} whileHover={{ y: -4 }}
                style={{ border: "1px solid rgba(26,58,42,0.15)", borderRadius: 18, overflow: "hidden", background: "rgba(255,255,255,0.7)" }}>
                <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#1a3a2a", padding: 24 }}>
                    <Image src={p.image} alt={p.name} width={400} height={220}
                      style={{ width: "100%", height: "220px", objectFit: "contain" }}/>
                  </div>
                  <div style={{ padding: 24 }}>
                    <h3 style={{ margin: 0, fontFamily: "Syne, sans-serif", color: "#1a3a2a" }}>{p.name}</h3>
                    <p style={{ color: "#1db954", fontWeight: 800, fontSize: 24, marginTop: 10 }}>₦{p.price.toLocaleString()}</p>
                    <p style={{ color: "#2a4a2a", fontSize: 14 }}>Smart QR recovery tag</p>
                  </div>
                </Link>
                <div style={{ padding: "0 24px 24px" }}>
                  <button onClick={() => { addToCart(p); toast.success(`${p.name} added to cart 🛒`); }}
                    style={{ width: "100%", border: "none", padding: "14px", borderRadius: 40,
                      background: "#1a3a2a", color: "#fff", fontWeight: 800, cursor: "pointer", fontFamily: "Syne, sans-serif" }}>
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/shop" style={{ border: "1.5px solid #1a3a2a", color: "#1a3a2a",
              padding: "14px 36px", borderRadius: 40, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
              View all products →
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <HowItWorks />

      {/* ===================== FEATURES ===================== */}
      <section style={{ padding: isMobile ? "80px 24px" : "120px 48px", background: BG }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#1a3a2a", fontWeight: 700, marginBottom: 12 }}>Features</p>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "38px" : "52px", marginBottom: 64, color: "#1a3a2a" }}>Built for real life</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {features.map((f, i) => (
              <motion.div key={i} whileHover={{ y: -4 }}
                style={{ border: "1px solid rgba(26,58,42,0.15)", borderLeft: "3px solid #1a3a2a",
                  borderRadius: 18, padding: 34, background: "rgba(255,255,255,0.65)" }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(26,58,42,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", marginBottom: 10, color: "#1a3a2a" }}>{f.title}</h3>
                <p style={{ color: "#2a4a2a", lineHeight: 1.8, fontSize: 14 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section style={{ padding: isMobile ? "80px 24px" : "120px 48px", background: BG }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#1a3a2a", fontWeight: 700, marginBottom: 12 }}>About</p>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: isMobile ? "42px" : "58px", lineHeight: 1, color: "#1a3a2a" }}>
              Meet Find<span style={{ color: "#1db954" }}>Me</span>
            </h2>
            <p style={{ color: "#2a4a2a", lineHeight: 1.9, marginTop: 24, fontSize: 16 }}>
              FindMe connects you instantly with anyone who finds your lost items. No apps, no stress — just scan and chat. Built for everyday Nigerian life — from keys to pets to luggage.
            </p>
            <Link href="/shop" style={{ display: "inline-block", marginTop: 32,
              background: "#1a3a2a", color: "#fff", padding: "14px 32px",
              borderRadius: 40, textDecoration: "none", fontWeight: 700, fontFamily: "Syne, sans-serif" }}>
              Get Started →
            </Link>
          </div>
          <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 30, padding: 40,
            boxShadow: "0 20px 50px rgba(26,58,42,0.12)", border: "1px solid rgba(26,58,42,0.1)" }}>
            <h3 style={{ marginTop: 0, fontFamily: "Syne, sans-serif", color: "#1a3a2a" }}>Why Nigerians love FindMe</h3>
            <ul style={{ paddingLeft: 20, color: "#2a4a2a", lineHeight: 2.2 }}>
              <li>No app download required</li>
              <li>Anonymous WhatsApp recovery</li>
              <li>Works anywhere instantly</li>
              <li>Affordable smart protection</li>
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
