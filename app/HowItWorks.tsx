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
    desc: "Stick the tag to your item, scan it with your phone camera, and send the auto-filled WhatsApp message to activate it.",
  },
  {
    icon: "🔔",
    num: "03",
    title: "Get notified",
    desc: "If someone finds your item, they scan the QR code and chat with you instantly via WhatsApp —both phone numbers remain completely hidden and private.",
  },
  {
    icon: "💬",
    num: "04",
    title: "Chat & recover",
    desc: "A private  relay chat is created between you and the finder.",
  },
];

/* ── WHATSAPP CHAT MOCKUP — shows the real linking flow ── */
function ChatBubble({ from, text, time, label }: { from: "user" | "findme" | "relay"; text: string; time: string; label?: string }) {
  const isUser = from === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 10, padding: "0 14px" }}>
      <div style={{
        maxWidth: "78%",
        background: isUser ? "#1f6e4f" : "#1f2c24",
        color: "#e9edef",
        padding: "8px 10px 6px 10px",
        borderRadius: 10,
        fontSize: 13.5,
        lineHeight: 1.45,
        whiteSpace: "pre-line",
        boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
      }}>
        {label && (
          <div style={{ fontSize: 12, fontWeight: 700, color: "#7fd3a0", marginBottom: 3 }}>{label}</div>
        )}
        <span>{text}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3, float: "right", marginLeft: 10, marginTop: 4, fontSize: 10.5, color: "rgba(233,237,239,0.55)" }}>
          {time}
          {isUser && <span style={{ color: "#53bdeb", fontSize: 12, marginLeft: 1 }}>✓✓</span>}
        </span>
      </div>
    </div>
  );
}

function EncryptionNotice() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 14, padding: "0 24px" }}>
      <div style={{
        background: "rgba(255,212,84,0.08)", color: "#e8c468", fontSize: 11.5,
        padding: "10px 16px", borderRadius: 8, textAlign: "center", lineHeight: 1.5,
        display: "flex", gap: 6, alignItems: "flex-start",
      }}>
        <span style={{ fontSize: 12, marginTop: 1 }}>🔒</span>
        <span>
          Messages and calls are end-to-end encrypted.
          No one outside of this chat, not even WhatsApp, can read or listen to them.{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Learn more.</span>
        </span>
      </div>
    </div>
  );
}

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%",
      maxWidth: 270,
      margin: "0 auto",
      position: "relative",
    }}>
      {/* Outer frame */}
      <div style={{
        borderRadius: 46,
        background: "linear-gradient(145deg, #3a3a3c, #1c1c1e)",
        padding: 12,
        boxShadow: "0 30px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
        position: "relative",
      }}>
        {/* Side button — left */}
        <div style={{ position: "absolute", left: -2, top: 95, width: 4, height: 50, background: "#1c1c1e", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: -2, top: 155, width: 4, height: 32, background: "#1c1c1e", borderRadius: 2 }} />
        {/* Side button — right */}
        <div style={{ position: "absolute", right: -2, top: 130, width: 4, height: 70, background: "#1c1c1e", borderRadius: 2 }} />

        <div style={{ borderRadius: 36, overflow: "hidden", position: "relative", background: "#0b141a" }}>
          {/* Notch */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: 120, height: 26, background: "#000", borderRadius: "0 0 18px 18px", zIndex: 10,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1c1c1e" }} />
          </div>
          {/* Status bar */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 22px 6px", fontSize: 13, fontWeight: 600, color: "#fff",
          }}>
            <span>9:41</span>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><rect x="0" y="6" width="2.5" height="5" fill="#fff"/><rect x="4.5" y="4" width="2.5" height="7" fill="#fff"/><rect x="9" y="2" width="2.5" height="9" fill="#fff"/><rect x="13.5" y="0" width="2.5" height="11" fill="#fff"/></svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 10.5C3.5 10.5 1 7.8 1 7.8C1 7.8 3.7 3.5 7.5 3.5C11.3 3.5 14 7.8 14 7.8C14 7.8 11.5 10.5 7.5 10.5Z" stroke="#fff" strokeWidth="1.1"/><circle cx="7.5" cy="7.5" r="1.3" fill="#fff"/></svg>
              <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="#fff"/><rect x="2" y="2" width="17" height="7" rx="1.3" fill="#fff"/><rect x="21.5" y="3.5" width="1.5" height="4" rx="0.7" fill="#fff"/></svg>
            </div>
          </div>
          {children}
        </div>
      </div>
      {/* Home indicator */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
        <div style={{ width: 110, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.25)" }} />
      </div>
    </div>
  );
}

function ChatHeader() {
  return (
    <div style={{
      background: "#1a2329", padding: "8px 12px 10px", display: "flex", alignItems: "center", gap: 8,
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <span style={{ color: "#8696a0", fontSize: 20, marginRight: 0 }}>‹</span>
      <div style={{
        width: 34, height: 34, borderRadius: "50%", background: "#0d1f15",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden",
        border: "1px solid rgba(29,185,84,0.4)",
      }}>
        <span style={{ fontSize: 9, fontWeight: 800 }}><span style={{ color: "#1db954" }}>F</span><span style={{ color: "#fff" }}>M</span></span>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ color: "#e9edef", fontSize: 15, fontWeight: 700, margin: 0 }}>FindMe</p>
        <p style={{ color: "#8696a0", fontSize: 11, margin: 0 }}>Business Account</p>
      </div>
      <div style={{ display: "flex", gap: 16, color: "#8696a0", fontSize: 16 }}>
        <span>📹</span><span>📞</span>
      </div>
    </div>
  );
}

function ChatInputBar() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
      background: "#1a2329", borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <span style={{ color: "#8696a0", fontSize: 20 }}>+</span>
      <div style={{ flex: 1, background: "#202c33", borderRadius: 20, padding: "7px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }} />
        <span style={{ color: "#8696a0", fontSize: 15 }}>😊</span>
      </div>
      <span style={{ color: "#8696a0", fontSize: 17 }}>📷</span>
      <span style={{ color: "#8696a0", fontSize: 17 }}>🎤</span>
    </div>
  );
}

function ChatBg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: "14px 0 16px",
      minHeight: 360,
      backgroundColor: "#0b141a",
      backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
      backgroundSize: "18px 18px",
    }}>
      {children}
    </div>
  );
}

function TodayPill() {
  return (
    <div style={{ textAlign: "center", marginBottom: 12 }}>
      <span style={{ background: "#182229", color: "#8696a0", fontSize: 11, padding: "4px 14px", borderRadius: 8, fontWeight: 500 }}>Today</span>
    </div>
  );
}

function WhatsAppMockup() {
  return (
    <PhoneShell>
      <ChatHeader />
      <ChatBg>
        <TodayPill />
        <EncryptionNotice />
        <ChatBubble from="user" text="LINK_1a28bf834fa8" time="3:39 PM" />
        <ChatBubble from="findme" text={"\uD83D\uDC4B Hi! Thanks for choosing FindMe.\nLet's link your tag to get started."} time="3:39 PM" />
        <ChatBubble from="findme" text={'What is the name of the item you are linking?\nFor example: "Headphones"'} time="3:40 PM" />
        <ChatBubble from="user" text="My iPhone 14 Pro" time="3:40 PM" />
        <ChatBubble from="findme" text={'✅ The item is now successfully linked as "My iPhone 14 Pro"!'} time="3:40 PM" />
        <ChatBubble from="findme" text={"If someone finds it, they can scan the tag and chat with you anonymously via WhatsApp."} time="3:40 PM" />
      </ChatBg>
      <ChatInputBar />
    </PhoneShell>
  );
}

/* ── BROWSER MOCKUP — the scan page that opens before WhatsApp ── */
function ScanPageMockup() {
  return (
    <div style={{
      width: "100%",
      maxWidth: 270,
      margin: "0 auto",
      borderRadius: 38,
      background: "linear-gradient(145deg, #3a3a3c, #1c1c1e)",
      padding: 12,
      boxShadow: "0 30px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
      position: "relative",
    }}>
      <div style={{ position: "absolute", left: -2, top: 95, width: 4, height: 50, background: "#1c1c1e", borderRadius: 2 }} />
      <div style={{ position: "absolute", left: -2, top: 155, width: 4, height: 32, background: "#1c1c1e", borderRadius: 2 }} />
      <div style={{ position: "absolute", right: -2, top: 130, width: 4, height: 70, background: "#1c1c1e", borderRadius: 2 }} />

      <div style={{ borderRadius: 28, overflow: "hidden", position: "relative", background: "linear-gradient(180deg, #1a2440 0%, #0d1326 100%)" }}>
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 120, height: 26, background: "#000", borderRadius: "0 0 18px 18px", zIndex: 10,
        }} />
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 22px 6px", fontSize: 13, fontWeight: 600, color: "#fff",
        }}>
          <span>9:44</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><rect x="0" y="6" width="2.5" height="5" fill="#fff"/><rect x="4.5" y="4" width="2.5" height="7" fill="#fff"/><rect x="9" y="2" width="2.5" height="9" fill="#fff"/><rect x="13.5" y="0" width="2.5" height="11" fill="#fff"/></svg>
            <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="#fff"/><rect x="2" y="2" width="17" height="7" rx="1.3" fill="#fff"/><rect x="21.5" y="3.5" width="1.5" height="4" rx="0.7" fill="#fff"/></svg>
          </div>
        </div>

        <div style={{ padding: "44px 24px 36px", minHeight: 360, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          }}>
            <svg viewBox="0 0 24 24" width="34" height="34">
              <path d="M12 2a7 7 0 0 0-7 7c0 1.6.5 3 1.5 4.2L5 18l5-1.3c.6.2 1.3.3 2 .3a7 7 0 0 0 0-14z" fill="none" stroke="#1db954" strokeWidth="1.8"/>
            </svg>
          </div>
          <p style={{ color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "Syne, sans-serif", margin: "0 0 8px", textAlign: "center" }}>
            Thanks for scanning!
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13.5, margin: "0 0 28px", textAlign: "center", lineHeight: 1.5 }}>
            Tap below to protect your item via WhatsApp
          </p>
          <div style={{
            width: "100%", background: "rgba(255,255,255,0.08)", borderRadius: 40,
            padding: "14px 0", textAlign: "center", marginBottom: 18,
          }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, fontWeight: 700 }}>Link on WhatsApp</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid rgba(255,255,255,0.4)", flexShrink: 0, marginTop: 1 }} />
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, margin: 0, lineHeight: 1.5 }}>
              I agree to the <span style={{ color: "#5b9bf5" }}>terms</span> & <span style={{ color: "#5b9bf5" }}>privacy policy</span>
            </p>
          </div>
        </div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        padding: "10px 14px", background: "#d8e0f0", borderRadius: "0 0 28px 28px", marginTop: -1,
      }}>
        <span style={{ color: "#444", fontSize: 12 }}>🖥️ app.findme.com.ng</span>
        <span style={{ color: "#666", fontSize: 12 }}>↻</span>
      </div>
    </div>
  );
}

/* ── BROWSER MOCKUP — scan page shown to the FINDER ── */
function FoundScanPageMockup() {
  return (
    <div style={{
      width: "100%",
      maxWidth: 270,
      margin: "0 auto",
      borderRadius: 38,
      background: "linear-gradient(145deg, #3a3a3c, #1c1c1e)",
      padding: 12,
      boxShadow: "0 30px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
      position: "relative",
    }}>
      <div style={{ position: "absolute", left: -2, top: 95, width: 4, height: 50, background: "#1c1c1e", borderRadius: 2 }} />
      <div style={{ position: "absolute", left: -2, top: 155, width: 4, height: 32, background: "#1c1c1e", borderRadius: 2 }} />
      <div style={{ position: "absolute", right: -2, top: 130, width: 4, height: 70, background: "#1c1c1e", borderRadius: 2 }} />

      <div style={{ borderRadius: 28, overflow: "hidden", position: "relative", background: "linear-gradient(180deg, #1a2440 0%, #0d1326 100%)" }}>
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 120, height: 26, background: "#000", borderRadius: "0 0 18px 18px", zIndex: 10,
        }} />
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 22px 6px", fontSize: 13, fontWeight: 600, color: "#fff",
        }}>
          <span>10:05</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><rect x="0" y="6" width="2.5" height="5" fill="#fff"/><rect x="4.5" y="4" width="2.5" height="7" fill="#fff"/><rect x="9" y="2" width="2.5" height="9" fill="#fff"/><rect x="13.5" y="0" width="2.5" height="11" fill="#fff"/></svg>
            <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="#fff"/><rect x="2" y="2" width="17" height="7" rx="1.3" fill="#fff"/><rect x="21.5" y="3.5" width="1.5" height="4" rx="0.7" fill="#fff"/></svg>
          </div>
        </div>

        <div style={{ padding: "40px 22px 36px", minHeight: 360, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: 60, height: 60, borderRadius: 16, background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          }}>
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path d="M12 2a7 7 0 0 0-7 7c0 1.6.5 3 1.5 4.2L5 18l5-1.3c.6.2 1.3.3 2 .3a7 7 0 0 0 0-14z" fill="none" stroke="#1db954" strokeWidth="1.8"/>
            </svg>
          </div>
          <p style={{ color: "#fff", fontSize: 20, fontWeight: 800, fontFamily: "Syne, sans-serif", margin: "0 0 10px", textAlign: "center" }}>
            Someone is looking for that!
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: "0 0 16px", textAlign: "center", lineHeight: 1.5 }}>
            Start an anonymous chat with the owner on WhatsApp
          </p>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13.5, margin: "0 0 20px", textAlign: "center" }}>
            Item: <strong style={{ color: "#fff" }}>My iPhone 14 Pro</strong>
          </p>
          <div style={{
            width: "100%", background: "rgba(255,255,255,0.08)", borderRadius: 40,
            padding: "13px 0", textAlign: "center", marginBottom: 18,
          }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 700 }}>Start an anonymous chat</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid rgba(255,255,255,0.4)", flexShrink: 0, marginTop: 1 }} />
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, margin: 0, lineHeight: 1.5 }}>
              I agree to the <span style={{ color: "#5b9bf5" }}>terms</span> & <span style={{ color: "#5b9bf5" }}>privacy policy</span>
            </p>
          </div>
        </div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        padding: "10px 14px", background: "#d8e0f0", borderRadius: "0 0 28px 28px", marginTop: -1,
      }}>
        <span style={{ color: "#444", fontSize: 12 }}>🖥️ app.findme.com.ng</span>
        <span style={{ color: "#666", fontSize: 12 }}>↻</span>
      </div>
    </div>
  );
}

/* ── WHATSAPP MOCKUP 2 — the "Found It" recovery flow ── */
function FoundItMockup() {
  return (
    <PhoneShell>
      <ChatHeader />
      <ChatBg>
        <TodayPill />
        <EncryptionNotice />
        <ChatBubble from="user" text="FOUND_9bf345aceb06" time="4:15 PM" />
        <ChatBubble from="findme" text={"✅ Owner notified!\n\n📦 Item: My iPhone 14 Pro\n\nThe owner will reply here shortly."} time="4:15 PM" />
        <ChatBubble from="user" text="Hi, I found your phone." time="4:15 PM" />
        <ChatBubble from="relay" text="Hi! Thank you so much 😭" time="4:16 PM" label="Anonymous Owner" />
        <ChatBubble from="relay" text={"Where are you located?\nWe can meet to return it."} time="4:16 PM" label="Anonymous Owner" />
        <ChatBubble from="user" text="I'm near Zenith Bank, Victoria Island." time="4:17 PM" />
      </ChatBg>
      <ChatInputBar />
    </PhoneShell>
  );
}

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

        {/* ── DETAILED WALKTHROUGH — Linking a tag, step by step ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginTop: 96, textAlign: "center", maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}
        >
          <p style={{
            fontSize: 12, fontWeight: 700, letterSpacing: 3,
            textTransform: "uppercase", color: "#1db954", marginBottom: 14,
          }}>
            Step-by-step walkthrough
          </p>
          <h3 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(26px, 3vw, 36px)",
            fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 18,
          }}>
            Exactly what happens when you link a tag
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
            No app to download, no account to create. Just three quick taps and your item is protected for good.
          </p>
        </motion.div>

        <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 64 }}>
          {/* SUB-STEP 1 — Scan the tag */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 40,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%", background: "#1db954", color: "#000",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0,
                }}>1</span>
                <h4 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>
                  Scan the tag
                </h4>
              </div>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                Stick the tag to your item, then open your phone's camera and point it at the QR code. A link pops up — tap it.
              </p>
            </div>
            <ScanPageMockup />
          </motion.div>

          {/* SUB-STEP 2 — WhatsApp opens */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            style={{ maxWidth: 680, marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 18 }}>
              <span style={{
                width: 28, height: 28, borderRadius: "50%", background: "#1db954", color: "#000",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0,
              }}>2</span>
              <h4 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>
                Agree & open WhatsApp
              </h4>
            </div>
            <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 20 }}>
              Tick the box to agree to our terms and privacy policy, then tap <strong style={{ color: "#fff" }}>"Link on WhatsApp."</strong> A message gets typed out for you automatically — just hit send.
            </p>
            <div style={{
              background: "rgba(29,185,84,0.08)", border: "1px solid rgba(29,185,84,0.25)",
              borderRadius: 14, padding: "16px 18px", display: "flex", gap: 10, alignItems: "flex-start",
              textAlign: "left", maxWidth: 480, margin: "0 auto",
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>⏱️</span>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: "#1db954" }}>Heads up:</strong> our WhatsApp assistant can take a few seconds to reply. Wait for its message before typing your item's name.
              </p>
            </div>
          </motion.div>

          {/* SUB-STEP 3 — Name your item */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 40,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%", background: "#1db954", color: "#000",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0,
                }}>3</span>
                <h4 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>
                  Name your item & you're done
                </h4>
              </div>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                FindMe will ask what you're protecting — reply with something simple like "My iPhone 14 Pro." That's it. Your tag is now linked and ready.
              </p>
            </div>
            <WhatsAppMockup />
          </motion.div>
        </div>

        {/* ── SEE IT IN ACTION 2 — Found It flow ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", maxWidth: 680, marginLeft: "auto", marginRight: "auto", marginTop: 96 }}
        >
          <p style={{
            fontSize: 12, fontWeight: 700, letterSpacing: 3,
            textTransform: "uppercase", color: "#1db954", marginBottom: 14,
          }}>
            When it's found
          </p>
          <h3 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(26px, 3vw, 36px)",
            fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 18,
          }}>
            The finder connects with you instantly
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
            Anyone who finds your item — a stranger, a driver, a security guard — just needs to scan the tag with their phone camera, same as you did. No FindMe account, no app download required on their end either.
          </p>
        </motion.div>

        <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 64 }}>
          {/* SUB-STEP 1 — Finder scans the tag */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 40,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%", background: "#1db954", color: "#000",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0,
                }}>1</span>
                <h4 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>
                  Finder scans the tag
                </h4>
              </div>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                They point their phone camera at the QR code on your item and tap the link that pops up — no app or account needed.
              </p>
            </div>
            <FoundScanPageMockup />
          </motion.div>

          {/* SUB-STEP 2 — Chat opens */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 40,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%", background: "#1db954", color: "#000",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0,
                }}>2</span>
                <h4 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>
                  You chat, completely anonymously
                </h4>
              </div>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                After they tick the box and tap "Start an anonymous chat," you'll get a WhatsApp message — wait a few seconds for it. Reply directly to arrange the return. Your real number stays hidden the whole time.
              </p>
            </div>
            <FoundItMockup />
          </motion.div>
        </div>

        {/* TRUST LINE */}
        <div style={{
          marginTop: 64, textAlign: "center",
          fontSize: 14, color: "rgba(255,255,255,0.6)",
          fontWeight: 500, letterSpacing: 0.5,
        }}>
          <span style={{ color: "#1db954", fontWeight: 700 }}>✔</span> No app required
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <span style={{ color: "#1db954", fontWeight: 700 }}>✔</span> Works worldwide
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <span style={{ color: "#1db954", fontWeight: 700 }}>✔</span> No battery
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <span style={{ color: "#1db954", fontWeight: 700 }}>✔</span> Instant WhatsApp chat
        </div>
      </div>
    </section>
  );
}
