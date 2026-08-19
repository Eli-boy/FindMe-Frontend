"use client";

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa";

import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "#0a0a0a",
        padding: "80px 48px 40px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 60 }}>

            {/* BRAND */}
            <div>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 16, color: "#f5f4f0" }}>
                Find<span style={{ color: "#1db954" }}>Me</span>
              </h2>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 20, lineHeight: 1.7 }}>
                Smart QR tags that connect finders to owners instantly via WhatsApp. No app needed.
              </p>
              {/* NEWSLETTER */}
              <p style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>Subscribe to our newsletter</p>
              <div style={{
                display: "flex", alignItems: "center",
                background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 40, padding: "6px 8px 6px 16px",
              }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    background: "transparent", border: "none", outline: "none",
                    color: "#f5f4f0", fontSize: 13, flex: 1,
                  }}
                />
                <button style={{
                  background: "#1db954", color: "#000",
                  border: "none", borderRadius: 30, padding: "6px 14px",
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                }}>
                  →
                </button>
              </div>
            </div>

            {/* PAGES */}
            <div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 20, color: "#f5f4f0", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>
                Pages
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Home", href: "/" },
                  { label: "Shop", href: "/shop" },
                  { label: "How It Works", href: "/how-it-works" },
                  { label: "About Us", href: "/#about" },
                  { label: "FAQ", href: "/faq" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    style={{ color: "#888", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f4f0")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 20, color: "#f5f4f0", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>
                Contact Us
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14, color: "#888" }}>
                <p>📧 support@findme.com.ng</p>
                <p>📱 +234 8073238118</p>
                <p>📍</p>
              </div>
            </div>

            {/* SOCIAL */}
            <div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 20, color: "#f5f4f0", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>
                Follow Us
              </h3>
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { icon: <FaFacebookF />, href: "https://www.facebook.com/share/17dS92Q1K1/?mibextid=wwXIfr" },
                  { icon: <FaInstagram />, href: "https://www.instagram.com/findme_nigeria/" },
                  { icon: <FaLinkedinIn />, href: "#" },
                  { icon: <FaTiktok />, href: "https://www.tiktok.com/@findme_nig?_r=1&_t=ZS-990bXUgzzYe" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#888", fontSize: 16, textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1db954";
                      e.currentTarget.style.color = "#000";
                      e.currentTarget.style.borderColor = "#1db954";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#1e1e1e";
                      e.currentTarget.style.color = "#888";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
            display: "flex", flexWrap: "wrap", justifyContent: "space-between",
            fontSize: 12, color: "#888", gap: 12,
          }}>
            <p>© 2026 FindMe Nigeria. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              <span style={{ cursor: "pointer" }}>Privacy Policy</span>
              <span style={{ cursor: "pointer" }}>Terms of Use</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/2348073238118?text=Hello%20👋%20I'm%20interested%20in%20FindMe%20tags."
        target="_blank"
        rel="noreferrer"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 999,
          background: "#25D366", color: "#fff",
          width: 56, height: 56, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 24px rgba(37,211,102,0.4)",
          fontSize: 24, textDecoration: "none",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <FaWhatsapp />
      </a>
    </>
  );
}
