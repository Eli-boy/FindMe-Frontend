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
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "",
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 3000;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cart, subtotal, shipping, total }),
      });

      const data = await res.json();
      console.log("Order response:", data);

      if (data.orderNumber) {
        // Build WhatsApp message
        const lines = cart.map((i) => `• ${i.name} x${i.quantity} — ₦${(i.price * i.quantity).toLocaleString()}`).join("\n");
        const msg = `Hello! I just placed an order on FindMe.\n\nOrder #${data.orderNumber}\n\n${lines}\n\nSubtotal: ₦${subtotal.toLocaleString()}\nShipping: ₦${shipping.toLocaleString()}\nTotal: ₦${total.toLocaleString()}\n\nDelivery to: ${form.address}`;
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
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {cart.map((i) => (
                  <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#4a7a5a" }}>
                    <span>{i.name} x{i.quantity}</span>
                    <span>₦{(i.price * i.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(26,58,42,0.1)", paddingTop: 10, display: "flex", justifyContent: "space-between", fontSize: 13, color: "#4a7a5a" }}>
                  <span>Subtotal</span><span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#4a7a5a" }}>
                  <span>Shipping</span><span>₦{shipping.toLocaleString()}</span>
                </div>
                <div style={{ borderTop: "1.5px solid rgba(26,58,42,0.15)", paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 16, color: DARK }}>Total</span>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: GREEN }}>₦{total.toLocaleString()}</span>
                </div>
              </div>

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
