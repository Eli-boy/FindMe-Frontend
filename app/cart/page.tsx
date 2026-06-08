"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../CartContext";
import { useState } from "react";

const BG = "#c8dfc8";
const DARK = "#1a3a2a";
const GREEN = "#1db954";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [orderNum, setOrderNum] = useState<number | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "",
  });
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [isFirstOrder, setIsFirstOrder] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const applyCoupon = async (overrideCode?: string) => {
    const code = (overrideCode || couponInput).trim().toUpperCase();
    if (!code) return;
    if (appliedCoupon === code) {
      setCouponMsg({ text: "Coupon already applied!", ok: false });
      return;
    }
    try {
      const res = await fetch("/api/check-first-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ validateCoupon: true, couponCode: code }),
      });
      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon(data.code);
        setCouponDiscount(data.discount);
        setCouponMsg({ text: `✓ ${data.code} applied — ${data.discount}% off!`, ok: true });
      } else {
        setCouponMsg({ text: data.message || "Invalid coupon code.", ok: false });
        setTimeout(() => setCouponMsg(null), 3000);
      }
    } catch {
      setCouponMsg({ text: "Could not validate coupon. Try again.", ok: false });
      setTimeout(() => setCouponMsg(null), 3000);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponInput("");
    setCouponMsg(null);
  };

  const checkFirstOrder = async (email: string) => {
    if (!email || !email.includes("@")) return;
    setCheckingEmail(true);
    try {
      const res = await fetch("/api/check-first-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setIsFirstOrder(data.isFirstOrder);
    } catch {
      setIsFirstOrder(null);
    }
    setCheckingEmail(false);
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const discountAmount = appliedCoupon ? Math.round(subtotal * couponDiscount / 100) : 0;
  const total = subtotal - discountAmount; // No fixed shipping — fee shared via WhatsApp

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill in all fields.");
      return;
    }
    if (deliveryMethod === "delivery" && !form.address) {
      alert("Please enter your delivery address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cart, subtotal, shipping: 0, total, deliveryMethod, couponCode: appliedCoupon, discountAmount }),
      });

      const data = await res.json();
      console.log("Order response:", data);

      if (data.orderNumber) {
        // Build WhatsApp message
        const lines = cart.map((i) => `• ${i.name} x${i.quantity} — ₦${(i.price * i.quantity).toLocaleString()}`).join("\n");
        const deliveryLine = deliveryMethod === "pickup"
          ? "Pickup: I will pick up from your location"
          : `Delivery to: ${form.address}`;
        const discountLine = appliedCoupon ? `\nDiscount (${appliedCoupon}): −₦${discountAmount.toLocaleString()}` : "";
        const msg = `Hello! I just placed an order on FindMe.\n\nOrder #${data.orderNumber}\n\n${lines}\n\nSubtotal: ₦${subtotal.toLocaleString()}${discountLine}\nTotal: ₦${total.toLocaleString()}\n\n${deliveryLine}`;
        const waUrl = `https://wa.me/2348073238118?text=${encodeURIComponent(msg)}`;

        // Use window.location for guaranteed redirect (not blocked by browsers)
        setOrderNum(data.orderNumber);
        setDone(true);
        clearCart();

        // Small delay so state updates render, then redirect
        setTimeout(() => {
          window.location.href = waUrl;
        }, 1500);
      } else {
        alert(`Order failed: ${data.error || "Unknown error. Check console."}`);
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      alert(`Error: ${err.message}`);
    }

    setLoading(false);
  };

  /* ── ORDER SUCCESS ── */
  if (done) {
    return (
      <div style={{ background: BG, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: "56px 40px", maxWidth: 480, width: "100%", textAlign: "center", boxShadow: "0 8px 40px rgba(26,58,42,0.12)" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(29,185,84,0.12)", border: "2px solid #1db954", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 24px" }}>✓</div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28, color: DARK, marginBottom: 12 }}>Order Placed!</h1>
          <p style={{ color: "#4a7a5a", fontSize: 15, lineHeight: 1.7, marginBottom: 8 }}>
            Thank you, <strong>{form.name}</strong>! Your order <strong>#{orderNum}</strong> has been received.
          </p>
          <p style={{ color: "#4a7a5a", fontSize: 14, lineHeight: 1.7, marginBottom: 8 }}>
            A confirmation email has been sent to <strong>{form.email}</strong>.
          </p>
          <p style={{ color: "#1db954", fontSize: 14, fontWeight: 600, marginBottom: 32 }}>
            Redirecting you to WhatsApp to complete your order...
          </p>
          <Link href="/shop" style={{ display: "inline-block", background: DARK, color: "#fff", padding: "14px 32px", borderRadius: 40, textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15 }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: BG, minHeight: "100vh", width: "100%", padding: "100px 24px 60px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>

        {/* HEADER */}
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", color: DARK, marginBottom: 8, letterSpacing: -1 }}>Your Cart</h1>
        <p style={{ color: "#4a7a5a", fontSize: 15, marginBottom: 48 }}>{cart.length} {cart.length === 1 ? "item" : "items"}</p>

        {/* EMPTY */}
        {cart.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: 80 }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🛒</div>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 22, color: DARK, marginBottom: 24 }}>Your cart is empty</h2>
            <Link href="/shop" style={{ background: DARK, color: "#fff", padding: "14px 36px", borderRadius: 40, textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
              Start Shopping
            </Link>
          </div>
        )}

        {cart.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, alignItems: "start" }}>

            {/* LEFT — ITEMS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {cart.map((item) => (
                <div key={item.id} style={{ background: "rgba(255,255,255,0.8)", borderRadius: 20, padding: "20px 24px", display: "flex", gap: 20, alignItems: "center", border: "1px solid rgba(26,58,42,0.1)", boxShadow: "0 2px 12px rgba(26,58,42,0.06)" }}>
                  <div style={{ background: DARK, borderRadius: 14, padding: 10, flexShrink: 0 }}>
                    <Image src={item.image} alt={item.name} width={80} height={70} style={{ objectFit: "contain", width: 80, height: 70 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: DARK, margin: 0, marginBottom: 4 }}>{item.name}</h3>
                    <p style={{ color: "#4a7a5a", fontSize: 13, marginBottom: 8 }}>Smart QR recovery tag</p>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: GREEN, fontSize: 17 }}>₦{item.price.toLocaleString()}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(26,58,42,0.06)", borderRadius: 40, padding: "6px 14px" }}>
                      <button onClick={() => decreaseQty(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: DARK, fontSize: 18, fontWeight: 700, lineHeight: 1 }}>−</button>
                      <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: DARK, fontSize: 15, minWidth: 20, textAlign: "center" }}>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: DARK, fontSize: 18, fontWeight: 700, lineHeight: 1 }}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#e57373", fontSize: 12, fontWeight: 600 }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — SUMMARY + FORM */}
            <div style={{ background: "rgba(255,255,255,0.85)", borderRadius: 24, padding: 28, border: "1px solid rgba(26,58,42,0.1)", boxShadow: "0 4px 24px rgba(26,58,42,0.08)" }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, color: DARK, marginBottom: 20, marginTop: 0 }}>Order Summary</h2>

              {/* PRICE BREAKDOWN */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {cart.map((i) => (
                  <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#4a7a5a" }}>
                    <span>{i.name} x{i.quantity}</span>
                    <span>₦{(i.price * i.quantity).toLocaleString()}</span>
                  </div>
                ))}

                {/* Discount row */}
                {appliedCoupon && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: GREEN, fontWeight: 600 }}>🎟️ {appliedCoupon} ({couponDiscount}% off)</span>
                    <span style={{ color: GREEN, fontWeight: 700 }}>−₦{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div style={{ borderTop: "1.5px solid rgba(26,58,42,0.15)", paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 16, color: DARK }}>Total</span>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: GREEN }}>₦{total.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: 12, color: "#4a7a5a", textAlign: "right" }}>
                  {deliveryMethod === "delivery" ? "🚚 Delivery fee confirmed via WhatsApp" : "🏪 Self pickup — no delivery fee"}
                </div>
              </div>

              {/* COUPON CODE — show first order promo only if first time */}
              {!appliedCoupon && isFirstOrder === true && (
                <div style={{
                  marginBottom: 12, padding: "10px 14px",
                  background: "rgba(29,185,84,0.08)",
                  border: "1px dashed rgba(29,185,84,0.4)",
                  borderRadius: 10, display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: 8, flexWrap: "wrap",
                }}>
                  <p style={{ margin: 0, fontSize: 13, color: "#2a4a2a", fontFamily: "Syne, sans-serif" }}>
                    🎉 Welcome! Use code{" "}
                    <strong
                      onClick={() => setCouponInput("FINDME10")}
                      style={{ color: GREEN, cursor: "pointer", letterSpacing: 1, textDecoration: "underline dotted" }}
                      title="Click to fill"
                    >
                      FINDME10
                    </strong>
                    {" "}for 10% off your first order
                  </p>
                  <button
                    onClick={() => {
                      setCouponInput("FINDME10");
                      applyCoupon("FINDME10");
                    }}
                    style={{
                      background: GREEN, color: "#000", border: "none",
                      padding: "5px 12px", borderRadius: 20,
                      fontFamily: "Syne, sans-serif", fontWeight: 700,
                      fontSize: 12, cursor: "pointer", flexShrink: 0,
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
              {!appliedCoupon && isFirstOrder === false && (
                <div style={{ marginBottom: 12, padding: "8px 12px", background: "rgba(26,58,42,0.05)", borderRadius: 10, fontSize: 12, color: "#4a7a5a" }}>
                  Welcome back! 👋 Enter a coupon code below if you have one.
                </div>
              )}
              {!appliedCoupon ? (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 12, color: "#4a7a5a", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 8px" }}>Have a coupon?</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      placeholder="Enter code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                      style={{
                        flex: 1, padding: "10px 14px",
                        background: "rgba(26,58,42,0.05)",
                        border: "1.5px solid rgba(26,58,42,0.15)",
                        borderRadius: 10, fontSize: 13, color: DARK,
                        outline: "none", fontFamily: "Syne, sans-serif",
                        letterSpacing: 1, textTransform: "uppercase" as const,
                        boxSizing: "border-box" as const,
                      }}
                    />
                    <button
                      onClick={() => applyCoupon()}
                      style={{
                        padding: "10px 16px", background: DARK, color: "#fff",
                        border: "none", borderRadius: 10, fontFamily: "Syne, sans-serif",
                        fontWeight: 700, fontSize: 13, cursor: "pointer", flexShrink: 0,
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p style={{ fontSize: 12, marginTop: 6, fontWeight: 600, margin: "6px 0 0", color: couponMsg.ok ? GREEN : "#e57373" }}>
                      {couponMsg.text}
                    </p>
                  )}
                </div>
              ) : (
                <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(29,185,84,0.08)", borderRadius: 10, padding: "10px 14px", border: "1px solid rgba(29,185,84,0.2)" }}>
                  <span style={{ fontSize: 13, color: GREEN, fontWeight: 700 }}>🎟️ {appliedCoupon} applied</span>
                  <button onClick={removeCoupon} style={{ background: "none", border: "none", color: "#e57373", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Remove</button>
                </div>
              )}

              {/* CHECKOUT FORM */}
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  style={{ width: "100%", background: DARK, color: "#fff", border: "none", padding: "15px", borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
                >
                  Proceed to Checkout →
                </button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, color: DARK, margin: 0 }}>Your Details</p>

                  {/* DELIVERY METHOD */}
                  <div>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 12, color: "#4a7a5a", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>Fulfilment Method</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {[
                        { value: "delivery", label: "Home Delivery", icon: "🚚", note: "+₦5,000" },
                        { value: "pickup", label: "Self Pickup", icon: "🏪", note: "Free" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setDeliveryMethod(opt.value as "delivery" | "pickup")}
                          style={{
                            padding: "14px 10px", borderRadius: 14, cursor: "pointer",
                            transition: "all 0.2s", textAlign: "center",
                            background: deliveryMethod === opt.value ? "rgba(26,58,42,0.08)" : "rgba(26,58,42,0.03)",
                            border: deliveryMethod === opt.value ? `2px solid ${DARK}` : "1.5px solid rgba(26,58,42,0.15)",
                          }}
                        >
                          <div style={{ fontSize: 22, marginBottom: 6 }}>{opt.icon}</div>
                          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: DARK }}>{opt.label}</div>
                          <div style={{
                            fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, marginTop: 4,
                            color: opt.value === "pickup" ? GREEN : "#4a7a5a",
                          }}>{opt.note}</div>
                        </button>
                      ))}
                    </div>

                    {/* PICKUP NOTE */}
                    {deliveryMethod === "pickup" && (
                      <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(29,185,84,0.08)", borderRadius: 10, border: "1px solid rgba(29,185,84,0.2)" }}>
                        <p style={{ margin: 0, fontSize: 12, color: "#2a5a3a", lineHeight: 1.6 }}>
                          📍 <strong>Pickup location</strong> will be shared via WhatsApp after your order is confirmed.
                        </p>
                      </div>
                    )}
                  </div>

                  {[
                    { name: "name", placeholder: "Full Name", type: "text" },
                    { name: "email", placeholder: "Email Address", type: "email" },
                    { name: "phone", placeholder: "Phone Number", type: "tel" },
                  ].map((f) => (
                    <input
                      key={f.name}
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={(form as any)[f.name]}
                      onChange={handleChange}
                      onBlur={f.name === "email" ? (e) => checkFirstOrder(e.target.value) : undefined}
                      style={{
                        width: "100%", padding: "12px 16px",
                        background: "rgba(26,58,42,0.05)",
                        border: "1.5px solid rgba(26,58,42,0.15)",
                        borderRadius: 12, fontSize: 14, color: DARK,
                        outline: "none", boxSizing: "border-box",
                        fontFamily: "Syne, sans-serif",
                      }}
                    />
                  ))}

                  {deliveryMethod === "delivery" && (
                  <textarea
                    name="address"
                    placeholder="Delivery Address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    style={{
                      width: "100%", padding: "12px 16px",
                      background: "rgba(26,58,42,0.05)",
                      border: "1.5px solid rgba(26,58,42,0.15)",
                      borderRadius: 12, fontSize: 14, color: DARK,
                      outline: "none", resize: "none", boxSizing: "border-box",
                      fontFamily: "Syne, sans-serif",
                    }}
                  />
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    style={{
                      width: "100%", background: loading ? "#aaa" : GREEN,
                      color: "#000", border: "none", padding: "15px",
                      borderRadius: 40, fontFamily: "Syne, sans-serif",
                      fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Placing Order..." : "Place Order & Chat on WhatsApp →"}
                  </button>

                  <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: "#aaa", fontSize: 13, cursor: "pointer" }}>
                    ← Back
                  </button>
                </div>
              )}

              <button onClick={clearCart} style={{ background: "none", border: "none", color: "#e57373", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", marginTop: 12 }}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
