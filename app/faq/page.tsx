"use client";

import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";
import { useState } from "react";

const BG = "#c8dfc8";

const faqs = [
  {
    q: "What is FindMe?",
    a: "FindMe offers a range of smart QR tags designed to help you securely and easily recover lost items. From luggage and keys to pets and kids, FindMe tags allow anyone who finds your lost item to contact you instantly via WhatsApp — without the need for any app.",
  },
  {
    q: "How does a FindMe tag work?",
    a: "Each FindMe tag comes with a unique QR code. When someone finds your item, they simply scan the QR code using any smartphone camera. They are then connected to you instantly and anonymously through WhatsApp — no app download required for either party.",
  },
  {
    q: "Do I need an app to use or scan the tags?",
    a: "No. You don't need any app to use or scan FindMe tags. Anyone with a smartphone and WhatsApp can scan the QR code and reach you instantly. It's simple, frictionless, and works out of the box.",
  },
  {
    q: "Can I control which contact information is shown when the tag is scanned?",
    a: "Yes. You have full control over what information is displayed. Your real phone number is never shared — all communication happens through our anonymous WhatsApp relay, so your privacy is always protected.",
  },
  {
    q: "How can someone contact me after scanning the tag?",
    a: "When a finder scans the tag, a private anonymous relay chat is created between you and the finder on WhatsApp. You can coordinate pickup safely without either party seeing the other's real phone number.",
  },
  {
    q: "What notifications do I get when someone scans my tag?",
    a: "You receive an instant WhatsApp notification the moment your tag is scanned — usually within 10 seconds. The finder can also optionally share their location to help you recover your item faster.",
  },
  {
    q: "Can I track the location of my FindMe tag?",
    a: "FindMe doesn't provide constant GPS tracking. However, you receive the approximate location when your tag is scanned. If the finder chooses to share their exact location, you will receive that information as well.",
  },
  {
    q: "Does FindMe work worldwide?",
    a: "Yes. FindMe works anywhere in the world. As long as the finder has a smartphone with WhatsApp and internet access, they can scan your tag and reach you — no matter where you or your item are located.",
  },
  {
    q: "Do FindMe tags need a battery?",
    a: "No. FindMe tags are completely battery-free. They work using QR code technology, so there's nothing to charge or replace. Once activated, your tag is always ready.",
  },
  {
    q: "Are FindMe tags durable?",
    a: "Yes. FindMe tags are made from high-quality, water-resistant materials built to withstand daily wear and tear — whether attached to luggage, keys, a pet collar, or a kid's wristband.",
  },
  {
    q: "Are FindMe tags compatible with all smartphones?",
    a: "Yes. Any smartphone with a camera and internet access can scan a FindMe QR tag. Both iPhone and Android devices are fully supported — no special hardware needed.",
  },
  {
    q: "Why choose FindMe over AirTag?",
    a: "While AirTag tracks location, FindMe focuses on connecting the finder directly to the owner. Anyone who finds your item can contact you instantly — no special app, no Apple device required. FindMe is also more versatile, covering luggage, pets, kids, keys, and more, with zero battery concerns.",
  },
  {
    q: "Is there a subscription fee?",
    a: "No subscription is required to use FindMe. Each tag is activated once with your WhatsApp and works indefinitely. We believe protection should be simple and affordable for every Nigerian.",
  },
  {
    q: "What are the delivery options?",
    a: "We deliver across Nigeria. Delivery timelines and costs are shown at checkout based on your location. For enquiries, contact us via WhatsApp at +234 803 624 4441.",
  },
];

const perks = [
  { icon: "📵", title: "No App Required", desc: "Anyone with a smartphone can scan your tag and reach you instantly — no app download needed." },
  { icon: "🔒", title: "100% Anonymous", desc: "Your phone number is never exposed. All contact goes through our secure anonymous WhatsApp relay." },
  { icon: "🔋", title: "Battery-Free", desc: "QR technology means your tags work forever — no charging, no replacing, no maintenance." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#1a3a2a" }}>

      {/* ── HEADER ── */}
      <div style={{
        textAlign: "center",
        padding: "110px 24px 72px",
        position: "relative", overflow: "hidden",
        background: BG,
      }}>
        {/* Hex pattern */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.3 }}
          xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hc-faq" x="0" y="0" width="104" height="180" patternUnits="userSpaceOnUse">
              <polygon points="52,4 88,24 88,64 52,84 16,64 16,24" fill="rgba(255,255,255,0.18)" stroke="#3a6b3a" strokeWidth="1.2"/>
              <polygon points="104,94 140,114 140,154 104,174 68,154 68,114" fill="rgba(255,255,255,0.18)" stroke="#3a6b3a" strokeWidth="1.2"/>
              <polygon points="0,94 36,114 36,154 0,174 -36,154 -36,114" fill="rgba(255,255,255,0.18)" stroke="#3a6b3a" strokeWidth="1.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hc-faq)"/>
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 32, fontSize: 13, color: "#2a4a2a" }}>
            <Link href="/" style={{ color: "#2a4a2a", textDecoration: "none", opacity: 0.7 }}>Home</Link>
            <span style={{ opacity: 0.4 }}>›</span>
            <span style={{ fontWeight: 600 }}>FAQ</span>
          </div>

          <h1 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 800, letterSpacing: -2,
            color: "#1a3a2a", marginBottom: 20, lineHeight: 1.1,
          }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: "#2a4a2a", fontSize: 17, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Find everything you need to know about FindMe — from how it works to delivery, privacy, and more.
          </p>
        </div>
      </div>

      {/* ── FAQ ACCORDION ── */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 96px" }}>
        {faqs.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            viewport={{ once: true }}
            style={{
              borderBottom: "1px solid rgba(26,58,42,0.15)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => toggle(i)}
              style={{
                width: "100%", textAlign: "left",
                background: "none", border: "none",
                padding: "24px 0",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                cursor: "pointer",
              }}
            >
              <span style={{
                fontFamily: "Syne, sans-serif",
                fontSize: 17, fontWeight: 700,
                color: openIndex === i ? "#1db954" : "#1a3a2a",
                lineHeight: 1.3, transition: "color 0.2s",
              }}>
                {item.q}
              </span>
              <span style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: openIndex === i ? "#1a3a2a" : "rgba(26,58,42,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 700,
                color: openIndex === i ? "#fff" : "#1a3a2a",
                transition: "all 0.25s",
                transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
              }}>
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{
                    color: "#2a4a2a", fontSize: 15, lineHeight: 1.85,
                    paddingBottom: 24, margin: 0, maxWidth: 680,
                  }}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* CTA after accordion */}
        <div style={{ textAlign: "center", marginTop: 64 }}>
          <p style={{ color: "#2a4a2a", fontSize: 16, marginBottom: 24 }}>
            Still have questions? We&apos;re happy to help.
          </p>
          <a
            href="https://wa.me/2348073238118?text=Hi%20I%20have%20a%20question%20about%20FindMe"
            target="_blank" rel="noreferrer"
            style={{
              display: "inline-block",
              background: "#1a3a2a", color: "#fff",
              padding: "14px 36px", borderRadius: 40,
              textDecoration: "none", fontWeight: 700,
              fontFamily: "Syne, sans-serif", fontSize: 15,
              boxShadow: "0 4px 20px rgba(26,58,42,0.3)",
            }}
          >
            Chat with us on WhatsApp →
          </a>
        </div>
      </div>

      {/* ── WHAT SETS US APART ── */}
      <section style={{ background: "#1a3a2a", padding: "96px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800, color: "#fff",
            textAlign: "center", marginBottom: 56,
          }}>
            What Sets Us Apart
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {perks.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 20, padding: "40px 32px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 20 }}>{p.icon}</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 14, marginTop: 0 }}>
                  {p.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.75, margin: 0 }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 56 }}>
            <Link href="/shop" style={{
              display: "inline-block",
              background: "#1db954", color: "#000",
              padding: "16px 40px", borderRadius: 50,
              textDecoration: "none", fontWeight: 800,
              fontFamily: "Syne, sans-serif", fontSize: 15,
              boxShadow: "0 0 32px rgba(29,185,84,0.35)",
            }}>
              Shop now →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
