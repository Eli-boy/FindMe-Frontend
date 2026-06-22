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
function ChatBubble({ from, text, time, ticks = true }: { from: "user" | "findme" | "relay"; text: string; time: string; ticks?: boolean }) {
  const isUser = from === "user";
  const isRelay = from === "relay";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 6, padding: "0 2px" }}>
      <div style={{
        maxWidth: "80%",
        background: isUser ? "#005c4b" : isRelay ? "#202c33" : "#202c33",
        color: "#e9edef",
        padding: "6px 9px 6px 9px",
        borderRadius: isUser ? "8px 8px 2px 8px" : "8px 8px 8px 2px",
        fontSize: 14.5,
        lineHeight: 1.4,
        whiteSpace: "pre-line",
        boxShadow: "0 1px 1px rgba(0,0,0,0.3)",
        position: "relative",
      }}>
        {isRelay && (
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "#53bdeb", marginBottom: 2 }}>Anonymous Owner</div>
        )}
        <span>{text}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3, float: "right", marginLeft: 8, marginTop: 4, fontSize: 11, color: "rgba(233,237,239,0.6)" }}>
          {time}
          {isUser && ticks && <span style={{ color: "#53bdeb", fontSize: 13, marginLeft: 1 }}>✓✓</span>}
        </span>
      </div>
    </div>
  );
}

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%",
      maxWidth: 300,
      margin: "0 auto",
      borderRadius: 38,
      background: "#000",
      padding: 10,
      boxShadow: "0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
    }}>
      <div style={{ borderRadius: 28, overflow: "hidden", position: "relative", background: "#0b141a" }}>
        {/* Notch */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 110, height: 22, background: "#000", borderRadius: "0 0 16px 16px", zIndex: 10,
        }} />
        {/* Status bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 20px 4px", fontSize: 12.5, fontWeight: 600, color: "#fff",
        }}>
          <span>9:41</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 11 }}>●●●●</span>
            <span style={{ fontSize: 11 }}>📶</span>
            <span style={{ fontSize: 11 }}>🔋</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function ChatHeader() {
  return (
    <div style={{
      background: "#202c33", padding: "8px 14px", display: "flex", alignItems: "center", gap: 10,
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <span style={{ color: "#8696a0", fontSize: 20, marginRight: 2 }}>‹</span>
      <div style={{
        width: 36, height: 36, borderRadius: "50%", background: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden",
      }}>
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M12 2a7 7 0 0 0-7 7c0 1.6.5 3 1.5 4.2L5 18l5-1.3c.6.2 1.3.3 2 .3a7 7 0 0 0 0-14z" fill="none" stroke="#1db954" strokeWidth="1.8"/>
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ color: "#e9edef", fontSize: 15.5, fontWeight: 600, margin: 0 }}>FindMe</p>
        <p style={{ color: "#8696a0", fontSize: 11.5, margin: 0 }}>online</p>
      </div>
      <div style={{ display: "flex", gap: 16, color: "#8696a0", fontSize: 16 }}>
        <span>📹</span><span>📞</span>
      </div>
    </div>
  );
}

function ChatBg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: "14px 10px 16px",
      minHeight: 360,
      backgroundColor: "#0b141a",
      backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
      backgroundSize: "16px 16px",
    }}>
      {children}
    </div>
  );
}

function WhatsAppMockup() {
  return (
    <PhoneShell>
      <ChatHeader />
      <ChatBg>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={{ background: "#182229", color: "#8696a0", fontSize: 11, padding: "4px 12px", borderRadius: 8, fontWeight: 500 }}>TODAY</span>
        </div>

        <ChatBubble from="user" text="LINK_1a28bf834fa8" time="3:39 PM" />
        <ChatBubble from="findme" text={'What is the name of the item you are linking?\nFor example: "Headphones"'} time="3:40 PM" />
        <ChatBubble from="user" text="My iPhone 14 Pro" time="3:40 PM" />
        <ChatBubble from="findme" text={'The item is now successfully linked as "My iPhone 14 Pro"! ✅'} time="3:40 PM" />
      </ChatBg>
    </PhoneShell>
  );
}

/* ── WHATSAPP MOCKUP 2 — the "Found It" recovery flow ── */
function FoundItMockup() {
  return (
    <PhoneShell>
      <ChatHeader />
      <ChatBg>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={{ background: "#182229", color: "#8696a0", fontSize: 11, padding: "4px 12px", borderRadius: 8, fontWeight: 500 }}>TODAY</span>
        </div>

        <ChatBubble from="user" text="FOUND_9bf345aceb06" time="4:15 PM" />
        <ChatBubble from="findme" text={"✅ Owner Notified!\n\n📦 Item: My phone\n\nThe owner will reply here shortly."} time="4:15 PM" />
        <ChatBubble from="user" text="Hiii" time="4:15 PM" />
        <ChatBubble from="relay" text="Hii 😌" time="4:15 PM" />
        <ChatBubble from="relay" text={"Please I lost my phone\nCan you kindly tell me your location please"} time="4:16 PM" />
      </ChatBg>
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

        {/* ── SEE IT IN ACTION — WhatsApp mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <p style={{
              fontSize: 12, fontWeight: 700, letterSpacing: 3,
              textTransform: "uppercase", color: "#1db954", marginBottom: 14,
            }}>
              See it in action
            </p>
            <h3 style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(26px, 3vw, 36px)",
              fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 20,
            }}>
              Linking a tag takes 30 seconds
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 16 }}>
              Scan your new tag, send the code that pops up, and tell us what it's protecting. That's it — no app, no account, no setup screens.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Scan the QR code on your tag", "Send the auto-filled WhatsApp message", "Name your item and you're protected"].map((t, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.85)", fontSize: 14.5 }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: "50%", background: "#1db954", color: "#000",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0,
                  }}>{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <WhatsAppMockup />
        </motion.div>

        {/* ── SEE IT IN ACTION 2 — Found It flow ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            marginTop: 64,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <p style={{
              fontSize: 12, fontWeight: 700, letterSpacing: 3,
              textTransform: "uppercase", color: "#1db954", marginBottom: 14,
            }}>
              When it's found
            </p>
            <h3 style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(26px, 3vw, 36px)",
              fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 20,
            }}>
              The finder connects with you instantly
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 16 }}>
              Anyone who finds your item scans the tag, and you're notified immediately. They chat with you directly — but your real number stays completely hidden the whole time.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Finder scans the QR code on your item", "You get an instant WhatsApp alert", "Chat anonymously to arrange the return"].map((t, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.85)", fontSize: 14.5 }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: "50%", background: "#1db954", color: "#000",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0,
                  }}>{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <FoundItMockup />
        </motion.div>

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
