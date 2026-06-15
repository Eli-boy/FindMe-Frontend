"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const BG = "#c8dfc8";
const DARK = "#1a3a2a";
const GREEN = "#1db954";

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const ref = params?.get("ref");
  const orderNumber = params?.get("order");
  const [status, setStatus] = useState<"loading" | "paid" | "pending">("loading");

  useEffect(() => {
    if (!ref) { setStatus("pending"); return; }
    // Poll for payment status
    const check = async () => {
      try {
        const res = await fetch(`/api/monnify/verify?ref=${ref}`);
        const data = await res.json();
        setStatus(data.paid ? "paid" : "pending");
      } catch {
        setStatus("pending");
      }
    };
    check();
    const interval = setInterval(check, 4000);
    return () => clearInterval(interval);
  }, [ref]);

  return (
    <div style={{ background: BG, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "48px 40px", maxWidth: 480, width: "100%", textAlign: "center", boxShadow: "0 8px 40px rgba(26,58,42,0.12)" }}>

        {status === "loading" && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 26, color: DARK, marginBottom: 12 }}>Verifying Payment...</h1>
            <p style={{ color: "#4a7a5a", fontSize: 15, lineHeight: 1.7 }}>Please wait while we confirm your payment.</p>
          </>
        )}

        {status === "paid" && (
          <>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(29,185,84,0.12)", border: "2px solid #1db954", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 20px" }}>✅</div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28, color: DARK, marginBottom: 12 }}>Payment Confirmed!</h1>
            {orderNumber && (
              <p style={{ color: "#4a7a5a", fontSize: 15, marginBottom: 8 }}>
                Order <strong style={{ color: DARK }}>#{orderNumber}</strong> is confirmed and paid.
              </p>
            )}
            <p style={{ color: "#4a7a5a", fontSize: 14, lineHeight: 1.7, marginBottom: 8 }}>
              A confirmation email has been sent to you with your order details.
            </p>
            <p style={{ color: GREEN, fontSize: 14, fontWeight: 600, marginBottom: 32 }}>
              We will contact you via WhatsApp to arrange {" "}
              delivery / pickup.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://wa.me/2348073238118"
                target="_blank"
                rel="noreferrer"
                style={{ background: "#25D366", color: "#000", padding: "12px 24px", borderRadius: 40, textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14 }}
              >
                💬 Chat on WhatsApp
              </a>
              <Link href="/shop" style={{ background: DARK, color: "#fff", padding: "12px 24px", borderRadius: 40, textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14 }}>
                Continue Shopping
              </Link>
            </div>
          </>
        )}

        {status === "pending" && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🕐</div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 26, color: DARK, marginBottom: 12 }}>Payment Pending</h1>
            {orderNumber && (
              <p style={{ color: "#4a7a5a", fontSize: 15, marginBottom: 8 }}>Order <strong style={{ color: DARK }}>#{orderNumber}</strong> has been created.</p>
            )}
            <p style={{ color: "#4a7a5a", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
              If you completed payment, it may take a few minutes to reflect. Check your email for confirmation or contact us on WhatsApp.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://wa.me/2348073238118"
                target="_blank"
                rel="noreferrer"
                style={{ background: "#25D366", color: "#000", padding: "12px 24px", borderRadius: 40, textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14 }}
              >
                💬 Contact Us
              </a>
              <Link href="/shop" style={{ background: DARK, color: "#fff", padding: "12px 24px", borderRadius: 40, textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14 }}>
                Back to Shop
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
