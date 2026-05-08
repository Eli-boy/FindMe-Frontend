"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "../data/products";
import toast from "react-hot-toast";
import { useCart } from "../CartContext";

/* ================= FILTER CATEGORIES ================= */
const categories = [
  { value: "all", label: "All Tags" },
  { value: "sticker", label: "Stickers" },
  { value: "key", label: "Keychains" },
  { value: "pet", label: "Pet Tags" },
];

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const { addToCart } = useCart();
  const category = searchParams?.category;

  const filteredProducts =
    category && category !== "all"
      ? products.filter((p) => p.category === category)
      : products;

  const formattedCategory =
    category && category !== "all"
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : null;

  return (
    <div style={{ background: "#c8dfc8", minHeight: "100vh", color: "#1a3a2a" }}>

      {/* ================= HEADER ================= */}
      <div style={{
        textAlign: "center",
        padding: "96px 48px 64px",
        borderBottom: "1px solid rgba(26,58,42,0.12)",
        background: "#c8dfc8",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle hex pattern behind header */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.3 }}
          xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hc-shop" x="0" y="0" width="104" height="180" patternUnits="userSpaceOnUse">
              <polygon points="52,4 88,24 88,64 52,84 16,64 16,24" fill="rgba(255,255,255,0.18)" stroke="#3a6b3a" strokeWidth="1.2"/>
              <polygon points="104,94 140,114 140,154 104,174 68,154 68,114" fill="rgba(255,255,255,0.18)" stroke="#3a6b3a" strokeWidth="1.2"/>
              <polygon points="0,94 36,114 36,154 0,174 -36,154 -36,114" fill="rgba(255,255,255,0.18)" stroke="#3a6b3a" strokeWidth="1.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hc-shop)"/>
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontSize: 12, fontWeight: 600, letterSpacing: 3,
            textTransform: "uppercase", color: "#1a3a2a", marginBottom: 12, opacity: 0.7,
          }}>
            Shop
          </p>
          <h1 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 800, letterSpacing: -2,
            color: "#1a3a2a",
            marginBottom: 16,
          }}>
            Shop Find<span style={{ color: "#1db954" }}>Me</span> Tags
          </h1>
          <p style={{ color: "#2a4a2a", fontSize: 17, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 40px" }}>
            {formattedCategory
              ? `Showing ${formattedCategory} products`
              : "Choose the perfect tag to protect what matters most."}
          </p>

          {/* FILTER PILLS */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {categories.map((c) => {
              const isActive = (category ?? "all") === c.value;
              return (
                <Link
                  key={c.value}
                  href={c.value === "all" ? "/shop" : `/shop?category=${c.value}`}
                  style={{
                    padding: "8px 20px", borderRadius: 40, fontSize: 14, fontWeight: 600,
                    textDecoration: "none", transition: "all 0.2s",
                    background: isActive ? "#1a3a2a" : "rgba(255,255,255,0.5)",
                    color: isActive ? "#fff" : "#1a3a2a",
                    border: isActive ? "1.5px solid #1a3a2a" : "1.5px solid rgba(26,58,42,0.25)",
                  }}
                >
                  {c.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div style={{ padding: "64px 48px 96px", maxWidth: 1200, margin: "0 auto" }}>

        {filteredProducts.length === 0 && (
          <p style={{ textAlign: "center", color: "#2a4a2a", fontSize: 16 }}>
            No products found.
          </p>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 24,
        }}>
          {filteredProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              viewport={{ once: true }}
              style={{
                background: "rgba(255,255,255,0.7)",
                borderRadius: 20,
                border: "1px solid rgba(26,58,42,0.12)",
                overflow: "hidden",
                transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "rgba(26,58,42,0.35)";
                e.currentTarget.style.boxShadow = "0 20px 48px rgba(26,58,42,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(26,58,42,0.12)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* IMAGE */}
              <Link href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
                <div style={{
                  background: "#1a3a2a",
                  padding: "24px 24px 0",
                  overflow: "hidden",
                }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={260}
                    height={180}
                    style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
                  />
                </div>

                {/* TEXT */}
                <div style={{ padding: "18px 20px 6px" }}>
                  <h3 style={{
                    fontFamily: "Syne, sans-serif", fontWeight: 700,
                    fontSize: 16, color: "#1a3a2a", marginBottom: 4,
                  }}>
                    {p.name}
                  </h3>
                  <p style={{ color: "#4a6a4a", fontSize: 13, marginBottom: 6 }}>
                    Smart recovery tag
                  </p>
                  <p style={{ color: "#1db954", fontWeight: 700, fontSize: 18, fontFamily: "Syne, sans-serif" }}>
                    ₦{p.price.toLocaleString()}
                  </p>
                </div>
              </Link>

              {/* BUTTON */}
              <div style={{ padding: "0 20px 20px" }}>
                <button
                  onClick={() => {
                    addToCart(p);
                    toast.success(`${p.name} added to cart 🛒`);
                  }}
                  style={{
                    width: "100%", padding: "11px",
                    background: "#1a3a2a", color: "#fff",
                    border: "none", borderRadius: 40,
                    fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#2d5a30"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#1a3a2a"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
