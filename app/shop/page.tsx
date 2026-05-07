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
    <div style={{ background: "#2c3d30", minHeight: "100vh", color: "#dff0e2" }}>

      {/* ================= HEADER ================= */}
      <div style={{
        textAlign: "center",
        padding: "96px 48px 64px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "linear-gradient(180deg, #2e4030 0%, #2c3d30 100%)",
      }}>
        <p style={{
          fontSize: 12, fontWeight: 600, letterSpacing: 3,
          textTransform: "uppercase", color: "#1db954", marginBottom: 12,
        }}>
          Shop
        </p>
        <h1 style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 800, letterSpacing: -2,
          color: "#dff0e2",
          marginBottom: 16,
        }}>
          Shop Find<span style={{ color: "#1db954" }}>Me</span> Tags
        </h1>
        <p style={{ color: "#9dbfa0", fontSize: 17, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 40px" }}>
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
                  background: isActive ? "#1db954" : "rgba(255,255,255,0.07)",
                  color: isActive ? "#000" : "#9dbfa0",
                  border: isActive ? "1.5px solid #1db954" : "1.5px solid rgba(255,255,255,0.1)",
                }}
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div style={{ padding: "64px 48px 96px", maxWidth: 1200, margin: "0 auto" }}>

        {filteredProducts.length === 0 && (
          <p style={{ textAlign: "center", color: "#9dbfa0", fontSize: 16 }}>
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
                background: "#3a4e3d",
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden",
                transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "rgba(29,185,84,0.35)";
                e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* IMAGE */}
              <Link href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
                <div style={{
                  background: "#334538",
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
                    fontSize: 16, color: "#dff0e2", marginBottom: 4,
                  }}>
                    {p.name}
                  </h3>
                  <p style={{ color: "#9dbfa0", fontSize: 13, marginBottom: 6 }}>
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
                    background: "#1db954", color: "#000",
                    border: "none", borderRadius: 40,
                    fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#25e668"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#1db954"; e.currentTarget.style.transform = "translateY(0)"; }}
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
