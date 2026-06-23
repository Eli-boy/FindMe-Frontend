"use client";

import { motion } from "framer-motion";

const steps = [
  {
    icon: "📦",
    num: "01",
    title: "Get your tags",
    desc: "Order your FindMe QR tags. Each one has its own unique code that only connects to your WhatsApp number — nothing else.",
  },
  {
    icon: "🔗",
    num: "02",
    title: "Stick it & set it up",
    desc: "Stick the tag on your item. Scan it with your phone's camera, then send the WhatsApp message it shows you. Takes less than a minute.",
  },
  {
    icon: "🔔",
    num: "03",
    title: "Get notified if it's lost",
    desc: "If your item goes missing and someone finds it, they scan the tag and you get a message on WhatsApp right away. Neither of you sees the other's phone number.",
  },
  {
    icon: "💬",
    num: "04",
    title: "Chat and get it back",
    desc: "You and the finder chat directly inside WhatsApp to arrange how to get your item back — safely and privately.",
  },
];

/* ── WHATSAPP CHAT COMPONENTS ── */
function ChatBubble({ from, text, time, label }: { from: "user" | "findme" | "relay"; text: string; time: string; label?: string }) {
  const isUser = from === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 10, padding: "0 14px" }}>
      <div
        style={{
          maxWidth: "82%",
          background: isUser ? "#005c4b" : "#202c33",
          color: "#e9edef",
          padding: "9px 12px 7px",
          borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
          fontSize: 13,
          lineHeight: 1.55,
          whiteSpace: "pre-line",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        {label && (
          <div style={{ fontSize: 12, fontWeight: 700, color: "#7fd3a0", marginBottom: 3 }}>{label}</div>
        )}
        <span>{text}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3, float: "right", marginLeft: 10, marginTop: 4, fontSize: 10.5, color: "rgba(233,237,239,0.55)" }}>
          {time}
          {isUser && <span style={{ color: "#53bdeb", fontSize: 12, marginLeft: 1 }}>✓✓</span>}
        </span>
        <div style={{ clear: "both" }} />
      </div>
    </div>
  );
}

// Rest of the components remain clean and fully responsive...
function EncryptionNotice() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 14, padding: "0 16px" }}>
      <div style={{
        background: "rgba(255,212,84,0.06)", color: "#e8c468", fontSize: 11,
        padding: "10px 14px", borderRadius: 8, textAlign: "center", lineHeight: 1.5,
        display: "flex", gap: 6, alignItems: "flex-start", maxWidth: "90%"
      }}>
        <span style={{ fontSize: 12, marginTop: 1 }}>🔒</span>
        <span>
          Messages and calls are end-to-end encrypted. No one outside of this chat can read them.{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Learn more.</span>
        </span>
      </div>
    </div>
  );
}

function ChatHeader() {
  return (
    <div
      style={{
        background: "#202c33",
        padding: "36px 14px 12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span style={{ color: "#8696a0", fontSize: 22, cursor: "pointer" }}>‹</span>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#0d1f15",
          border: "2px solid rgba(29,185,84,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          color: "#1db954",
          fontSize: 13,
        }}
      >
        FM
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>FindMe</div>
        <div style={{ color: "#1db954", fontSize: 11, fontWeight: 500 }}>online</div>
      </div>
      <span style={{ color: "#8696a0", cursor: "pointer", fontSize: 18 }}>📞</span>
      <span style={{ color: "#8696a0", cursor: "pointer", fontSize: 18 }}>⋮</span>
    </div>
  );
}

function ChatInputBar() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "12px",
      background: "#1a2329", borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <span style={{ color: "#8696a0", fontSize: 20 }}>+</span>
      <div style={{ flex: 1, background: "#202c33", borderRadius: 20, padding: "6px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>Type a message...</span>
        <span style={{ color: "#8696a0", fontSize: 16 }}>😊</span>
      </div>
      <span style={{ color: "#8696a0", fontSize: 18 }}>📷</span>
      <span style={{ color: "#8696a0", fontSize: 18 }}>🎤</span>
    </div>
  );
}

function ChatBg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: "14px 0",
      height: 420,
      overflowY: "auto",
      backgroundColor: "#0b141a",
      backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
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

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: "100%", maxWidth: 310, margin: "0 auto", position: "relative" }}>
      <div style={{ position: "absolute", inset: "-10px", background: "rgba(29,185,84,0.1)", filter: "blur(40px)", borderRadius: "40px" }} />
      <div style={{
        position: "relative",
        borderRadius: 44,
        padding: "10px",
        background: "linear-gradient(145deg, #3a3a3e, #151517)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 2px rgba(255,255,255,0.2)",
      }}>
        <div style={{ borderRadius: 36, overflow: "hidden", background: "#0b141a", position: "relative", border: "3px solid #000" }}>
          <div style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 90,
            height: 25,
            borderRadius: 20,
            background: "#000",
            zIndex: 100,
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)"
          }} />
          {children}
          <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 110, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.4)", zIndex: 100 }} />
        </div>
      </div>
    </div>
  );
}

function DeviceStatusBar({ isDark }: { isDark: boolean }) {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 34,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0 24px", fontSize: 11, fontWeight: 600, color: isDark ? "#fff" : "#000", zIndex: 90,
    }}>
      <span>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span style={{ fontSize: 10 }}>📶</span>
        <span style={{ fontSize: 10 }}>🔋</span>
      </div>
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
        <ChatBubble from="findme" text={"👋 Hi! Thanks for choosing FindMe.\nLet's link your tag to get started."} time="3:39 PM" />
        <ChatBubble from="findme" text={'What is the name of the item you are linking?\nFor example: "Headphones"'} time="3:40 PM" />
        <ChatBubble from="user" text="My iPhone 14 Pro" time="3:40 PM" />
        <ChatBubble from="findme" text={'✅ The item is now successfully linked as "My iPhone 14 Pro"!'} time="3:40 PM" />
      </ChatBg>
      <ChatInputBar />
    </PhoneShell>
  );
}

function ScanPageMockup() {
  return (
    <PhoneShell>
      <div style={{ position: "relative", background: "linear-gradient(180deg, #1a2440 0%, #0d1326 100%)", height: "488px", paddingTop: "34px", display: "flex", flexDirection: "column" }}>
        <DeviceStatusBar opacity-={true} isDark={true} />
        
        <div style={{ flex: 1, padding: "24px 20px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 54, height: 54, borderRadius: 14, background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          }}>
            <span style={{ fontSize: 28 }}>🟢</span>
          </div>
          <p style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 0 6px", textAlign: "center" }}>
            Thanks for scanning!
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: "0 0 20px", textAlign: "center", lineHeight: 1.4 }}>
            Tap below to protect your item via WhatsApp
          </p>
          <div style={{
            width: "100%", background: "#1db954", borderRadius: 40,
            padding: "12px 0", textAlign: "center", marginBottom: 16, cursor: "pointer"
          }}>
            <span style={{ color: "#000", fontSize: 14, fontWeight: 700 }}>Link on WhatsApp</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "0 8px" }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, border: "1.5px solid rgba(255,255,255,0.4)", flexShrink: 0, marginTop: 2, background: "rgba(255,255,255,0.1)" }} />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, margin: 0, lineHeight: 1.4, textAlign: "left" }}>
              I agree to the <span style={{ color: "#5b9bf5" }}>terms</span> & <span style={{ color: "#5b9bf5" }}>privacy policy</span>
            </p>
          </div>
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "8px 14px 18px 14px", background: "#141b2e", borderTop: "1px solid rgba(255,255,255,0.08)"
        }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>🔒 app.findme.com.ng</span>
        </div>
      </div>
    </PhoneShell>
  );
}

function FoundScanPageMockup() {
  return (
    <PhoneShell>
      <div style={{ position: "relative", background: "linear-gradient(180deg, #1e1e24 0%, #111115 100%)", height: "488px", paddingTop: "34px", display: "flex", flexDirection: "column" }}>
        <DeviceStatusBar isDark={true} />
        
        <div style={{ flex: 1, padding: "24px 20px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 54, height: 54, borderRadius: 14, background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          }}>
            <span style={{ fontSize: 26 }}>🔍</span>
          </div>
          <p style={{ color: "#fff", fontSize: 19, fontWeight: 800, margin: "0 0 6px", textAlign: "center" }}>
            Found an Item!
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: "0 0 14px", textAlign: "center", lineHeight: 1.4 }}>
            Start an anonymous chat with the owner safely over WhatsApp.
          </p>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, margin: "0 0 20px", textAlign: "center", background: "rgba(255,255,255,0.05)", padding: "6px 14px", borderRadius: 20 }}>
            Protected: <strong style={{ color: "#1db954" }}>My iPhone 14 Pro</strong>
          </p>
          <div style={{
            width: "100%", background: "#1db954", borderRadius: 40,
            padding: "12px 0", textAlign: "center", marginBottom: 16, cursor: "pointer"
          }}>
            <span style={{ color: "#000", fontSize: 14, fontWeight: 700 }}>Contact Owner</span>
          </div>
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "8px 14px 18px 14px", background: "#16161c", borderTop: "1px solid rgba(255,255,255,0.08)"
        }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>🔒 app.findme.com.ng</span>
        </div>
      </div>
    </PhoneShell>
  );
}

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
        <ChatBubble from="relay" text="Where are you located?\nWe can meet to return it." time="4:16 PM" label="Anonymous Owner" />
        <ChatBubble from="user" text="I'm near Zenith Bank, Victoria Island." time="4:17 PM" />
      </ChatBg>
      <ChatInputBar />
    </PhoneShell>
  );
}

export default function HowItWorks() {
  return (
    <section id="how" style={{ padding: "100px 24px", background: "#0b1a13", color: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#1db954", marginBottom: 12 }}>
            How it works
          </p>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: -1, margin: 0 }}>
            How FindMe works, step by step
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 20,
          marginBottom: 100,
        }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "30px 24px",
                borderRadius: 16,
                position: "relative",
              }}
            >
              <div style={{ fontSize: 54, fontWeight: 800, color: "rgba(255,255,255,0.03)", position: "absolute", top: 10, right: 16, userSelect: "none" }}>
                {step.num}
              </div>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(29,185,84,0.12)", border: "1px solid rgba(29,185,84,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>
                {step.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, margin: 0 }}>{step.title}</h3>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
          
          {/* FLOW 1: LINKING AN ITEM */}
          <div>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <h3 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: "0 0 10px 0" }}>How to Set Up Your Tag</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 auto" }}>Three simple steps. No app to download, no account to create.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
              {/* MERGED STEP 1: Scan & Activate */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40, alignItems: "center" }}>
                <div style={{ paddingRight: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#1db954", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>1</span>
                    <h4 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Scan the Tag & Open WhatsApp</h4>
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: "0 0 16px" }}>
                    Stick the tag on your item, scan the code, and you'll land on WhatsApp ready to activate it. Here's exactly what to do:
                  </p>
                  <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      "Stick the tag on your phone, keys, bag, or anything else you don't want to lose.",
                      "Open your phone's camera and point it at the QR code on the tag.",
                      "A link will pop up on your screen — tap it to open the page.",
                      "Tick the box to agree to our terms and privacy policy.",
                      "Tap the \"Link on WhatsApp\" button — this opens WhatsApp with a message already typed out for you.",
                      "Hit send. Our WhatsApp assistant can take a few seconds to reply, so wait for its message before moving to the next step.",
                    ].map((t, idx) => (
                      <li key={idx} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{
                          width: 20, height: 20, borderRadius: "50%", background: "rgba(29,185,84,0.15)", color: "#1db954",
                          border: "1px solid rgba(29,185,84,0.4)", display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                        }}>{idx + 1}</span>
                        <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{t}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div><ScanPageMockup /></div>
              </div>

              {/* STEP 2: Name your item */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40, alignItems: "center" }}>
                <div style={{ order: typeof window !== "undefined" && window.innerWidth > 768 ? 2 : 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#1db954", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>2</span>
                    <h4 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Name Your Item & You're Done</h4>
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: "0 0 16px" }}>
                    Last step — tell FindMe what you're protecting and your tag is fully active. Here's how:
                  </p>
                  <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      "FindMe will ask what item you're linking, right inside the WhatsApp chat.",
                      "Reply with a simple name, like \"My iPhone 14 Pro\" or \"My house keys.\"",
                      "You'll get a message confirming the item is now linked and protected.",
                      "That's it — no further setup needed. Your tag is ready to go.",
                    ].map((t, idx) => (
                      <li key={idx} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{
                          width: 20, height: 20, borderRadius: "50%", background: "rgba(29,185,84,0.15)", color: "#1db954",
                          border: "1px solid rgba(29,185,84,0.4)", display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                        }}>{idx + 1}</span>
                        <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{t}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div style={{ order: typeof window !== "undefined" && window.innerWidth > 768 ? 1 : 2 }}><WhatsAppMockup /></div>
              </div>
            </div>
          </div>

          {/* FLOW 2: RECOVERING AN ITEM */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 60 }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <h3 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: "0 0 10px 0" }}>If You Ever Lose It</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 auto" }}>Here's exactly what happens when someone finds your item and scans the tag.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40, alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#1db954", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>1</span>
                    <h4 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Someone Finds Your Item</h4>
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: "0 0 16px" }}>
                    Whoever picks it up scans the tag and sees a simple page asking if they'd like to help return it. Here's what happens on their end:
                  </p>
                  <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      "They scan the QR code on the tag with their phone's camera — no app needed on their side either.",
                      "A page opens letting them know someone is looking for this item.",
                      "They see the item's name, but never your phone number or any personal details.",
                      "They tick a box to agree to the terms, then tap one button to reach you.",
                    ].map((t, idx) => (
                      <li key={idx} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{
                          width: 20, height: 20, borderRadius: "50%", background: "rgba(29,185,84,0.15)", color: "#1db954",
                          border: "1px solid rgba(29,185,84,0.4)", display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                        }}>{idx + 1}</span>
                        <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{t}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div><FoundScanPageMockup /></div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40, alignItems: "center" }}>
                <div style={{ order: typeof window !== "undefined" && window.innerWidth > 768 ? 2 : 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#1db954", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>2</span>
                    <h4 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>You Chat on WhatsApp, Safely</h4>
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: "0 0 16px" }}>
                    You and the finder get connected to arrange the return — without either of you seeing the other's real number. Here's how it plays out:
                  </p>
                  <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      "You get a WhatsApp message letting you know your item has been found — wait a few seconds for it to arrive.",
                      "The finder sends their first message, and you can reply right there in the same chat.",
                      "Agree on a time and place to meet, or how they can send it back to you.",
                      "Your real phone numbers stay hidden from each other the entire time.",
                    ].map((t, idx) => (
                      <li key={idx} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{
                          width: 20, height: 20, borderRadius: "50%", background: "rgba(29,185,84,0.15)", color: "#1db954",
                          border: "1px solid rgba(29,185,84,0.4)", display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                        }}>{idx + 1}</span>
                        <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{t}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div style={{ order: typeof window !== "undefined" && window.innerWidth > 768 ? 1 : 2 }}><FoundItMockup /></div>
              </div>
            </div>
          </div>

        </div>

        <div style={{ marginTop: 80, paddingTop: 30, borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.5)", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          <span><strong style={{ color: "#1db954" }}>✓</strong> No app to download</span>
          <span><strong style={{ color: "#1db954" }}>✓</strong> Your number stays private</span>
          <span><strong style={{ color: "#1db954" }}>✓</strong> No battery needed</span>
          <span><strong style={{ color: "#1db954" }}>✓</strong> Set up in under a minute</span>
        </div>

      </div>
    </section>
  );
}