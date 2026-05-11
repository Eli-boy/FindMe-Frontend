"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";

import Image from "next/image";

/* ================= TYPES ================= */
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
};

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  total: number;
  itemCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("findme-cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("findme-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const increaseQty = (id: number) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );

  const decreaseQty = (id: number) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );

  const clearCart = () => setCart([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, total, itemCount, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, isOpen, openCart, closeCart }}
    >
      {children}

      {/* ===================== CART DRAWER ===================== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeCart}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(4px)",
                zIndex: 998,
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(420px, 100vw)",
                background: "#2c3d30",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                zIndex: 999,
                display: "flex", flexDirection: "column",
                boxShadow: "-16px 0 60px rgba(0,0,0,0.4)",
              }}
            >
              {/* Header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "24px 24px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div>
                  <h2 style={{
                    fontFamily: "Syne, sans-serif", fontWeight: 800,
                    fontSize: 20, color: "#dff0e2", margin: 0,
                  }}>
                    Your Cart
                  </h2>
                  <p style={{ color: "#9dbfa0", fontSize: 13, marginTop: 2 }}>
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  style={{
                    background: "rgba(255,255,255,0.07)", border: "none",
                    borderRadius: "50%", width: 36, height: 36,
                    color: "#9dbfa0", fontSize: 18, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; e.currentTarget.style.color = "#dff0e2"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#9dbfa0"; }}
                >
                  ✕
                </button>
              </div>

              {/* Items */}
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
                {cart.length === 0 ? (
                  <div style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    height: "100%", gap: 16, paddingBottom: 60,
                  }}>
                    <div style={{ fontSize: 48 }}>🛒</div>
                    <p style={{ color: "#9dbfa0", fontSize: 15, textAlign: "center" }}>
                      Your cart is empty.<br />Add some tags to get started.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            background: "#3a4e3d",
                            borderRadius: 16,
                            border: "1px solid rgba(255,255,255,0.07)",
                            padding: "14px 16px",
                            display: "flex", alignItems: "center", gap: 14,
                          }}
                        >
                          {/* Image */}
                          <div style={{
                            width: 60, height: 60, flexShrink: 0,
                            background: "#334538", borderRadius: 10,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            overflow: "hidden",
                          }}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={56}
                              height={56}
                              style={{ objectFit: "contain" }}
                            />
                          </div>

                          {/* Info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                              fontFamily: "Syne, sans-serif", fontWeight: 700,
                              fontSize: 14, color: "#dff0e2",
                              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                            }}>
                              {item.name}
                            </p>
                            <p style={{ color: "#1db954", fontWeight: 700, fontSize: 14, marginTop: 2 }}>
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>

                          {/* Qty controls */}
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                            <button
                              onClick={() => decreaseQty(item.id)}
                              style={{
                                width: 28, height: 28, borderRadius: "50%",
                                background: "rgba(255,255,255,0.07)", border: "none",
                                color: "#dff0e2", fontSize: 16, cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "background 0.2s",
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                            >−</button>

                            <span style={{
                              fontFamily: "Syne, sans-serif", fontWeight: 700,
                              fontSize: 14, color: "#dff0e2", minWidth: 20, textAlign: "center",
                            }}>
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => increaseQty(item.id)}
                              style={{
                                width: 28, height: 28, borderRadius: "50%",
                                background: "rgba(29,185,84,0.15)", border: "none",
                                color: "#1db954", fontSize: 16, cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "background 0.2s",
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(29,185,84,0.28)"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(29,185,84,0.15)"; }}
                            >+</button>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{
                                width: 28, height: 28, borderRadius: "50%",
                                background: "rgba(239,68,68,0.1)", border: "none",
                                color: "#f87171", fontSize: 13, cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                marginLeft: 4, transition: "background 0.2s",
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.22)"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
                            >✕</button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div style={{
                  padding: "20px 24px 28px",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  background: "#2c3d30",
                }}>
                  {/* Total */}
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginBottom: 16,
                  }}>
                    <span style={{ color: "#9dbfa0", fontSize: 15 }}>Total</span>
                    <span style={{
                      fontFamily: "Syne, sans-serif", fontWeight: 800,
                      fontSize: 22, color: "#dff0e2",
                    }}>
                      ₦{total.toLocaleString()}
                    </span>
                  </div>

                  {/* Checkout via WhatsApp */}
                  <button
                    onClick={() => {
                      const lines = cart.map(
                        (i) => `• ${i.name} x${i.quantity} — ₦${(i.price * i.quantity).toLocaleString()}`
                      );
                      const msg = `Hello! I'd like to order:\n${lines.join("\n")}\n\nTotal: ₦${total.toLocaleString()}`;
                      window.open(`https://wa.me/2348073238118?text=${encodeURIComponent(msg)}`, "_blank");
                    }}
                    style={{
                      width: "100%", padding: "15px",
                      background: "#1db954", color: "#000",
                      border: "none", borderRadius: 40,
                      fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15,
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(29,185,84,0.3)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#25e668"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#1db954"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    Checkout via WhatsApp →
                  </button>

                  {/* Clear cart */}
                  <button
                    onClick={clearCart}
                    style={{
                      width: "100%", padding: "11px",
                      background: "transparent", color: "#9dbfa0",
                      border: "none", borderRadius: 40,
                      fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13,
                      cursor: "pointer", marginTop: 8,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#9dbfa0"; }}
                  >
                    Clear cart
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
