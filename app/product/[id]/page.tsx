"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "../../data/products";
import toast from "react-hot-toast";
import { useCart } from "../../CartContext";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductPage() {
  const { addToCart } = useCart();
  const params = useParams();

  const id = Number(params?.id);
  const product = products.find((p) => p.id === id);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const activeImage = product?.variants?.[selectedVariant]?.image || product?.image || "";

  if (!product) {
    return (
      <div style={{
        textAlign: "center", padding: "80px 24px",
        background: "#2c3d30", minHeight: "100vh", color: "#dff0e2",
      }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 16 }}>
          Product not found
        </h1>
        <Link href="/shop" style={{ color: "#1db954", textDecoration: "underline" }}>
          Go back to shop
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#2c3d30", minHeight: "100vh", padding: "96px 48px", color: "#dff0e2" }}>

      {/* ================= PRODUCT ================= */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 64, alignItems: "center",
        maxWidth: 1100, margin: "0 auto",
      }}>

        {/* IMAGE */}
        <div style={{
          background: "#3a4e3d",
          padding: 40,
          borderRadius: 28,
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
          transition: "box-shadow 0.3s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 32px 80px rgba(0,0,0,0.45)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.3)"; }}
        >
          <Image
            src={activeImage}
            alt={product.name}
            width={450}
            height={450}
            style={{ margin: "0 auto", objectFit: "contain", display: "block", transition: "all 0.35s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
          />
        </div>

        {/* DETAILS */}
        <div>
          {/* BADGE */}
          <span style={{
            background: "rgba(29,185,84,0.12)", color: "#1db954",
            padding: "4px 14px", borderRadius: 40,
            fontSize: 13, fontWeight: 600,
            border: "1.5px solid rgba(29,185,84,0.35)",
          }}>
            Best Seller
          </span>

          <h1 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 800, letterSpacing: -1,
            color: "#dff0e2",
            margin: "16px 0 12px",
          }}>
            {product.name}
          </h1>

          <p style={{ color: "#9dbfa0", marginBottom: 24, lineHeight: 1.8, fontSize: 16 }}>
            {product.desc}
          </p>

          {/* PRICE */}
          <p style={{
            fontSize: 36, fontWeight: 700,
            color: "#1db954", marginBottom: 24,
            fontFamily: "Syne, sans-serif",
          }}>
            ₦{(product.variants ? product.variants[selectedVariant].price : product.price).toLocaleString()}
          </p>

          {/* FEATURES */}
          {product.features && product.features.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
              {product.features.map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#9dbfa0", lineHeight: 1.6 }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                    background: "rgba(29,185,84,0.12)", border: "1px solid rgba(29,185,84,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#1db954", fontSize: 10, fontWeight: 800,
                  }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* VARIANTS */}
          {product.variants && product.variants.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#9dbfa0", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>
                Select Pack
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariant(i)}
                    style={{
                      width: 130,
                      padding: "14px 10px",
                      borderRadius: 16,
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background: selectedVariant === i ? "rgba(29,185,84,0.15)" : "rgba(255,255,255,0.04)",
                      color: selectedVariant === i ? "#1db954" : "#9dbfa0",
                      border: selectedVariant === i ? "2px solid #1db954" : "1.5px solid rgba(255,255,255,0.1)",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", gap: 10,
                      boxShadow: selectedVariant === i ? "0 4px 16px rgba(29,185,84,0.2)" : "none",
                    }}
                  >
                    <Image
                      src={v.image}
                      alt={v.label}
                      width={70}
                      height={60}
                      style={{ objectFit: "contain", width: 70, height: 60 }}
                    />
                    <span style={{ textAlign: "center", lineHeight: 1.4 }}>{v.label}</span>
                    <span style={{
                      fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 13,
                      color: selectedVariant === i ? "#1db954" : "#dff0e2",
                    }}>
                      ₦{v.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <button
              onClick={() => {
                const cartProduct = product.variants
                  ? { ...product, price: product.variants[selectedVariant].price, name: `${product.name} (${product.variants[selectedVariant].label})` }
                  : product;
                addToCart(cartProduct);
                toast.success(`${cartProduct.name} added to cart 🛒`);
              }}
              style={{
                background: "#1db954", color: "#000",
                padding: "14px 32px", borderRadius: 40,
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15,
                border: "none", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(29,185,84,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#25e668"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#1db954"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                const variantLabel = product.variants ? ` — ${product.variants[selectedVariant].label}` : "";
                const price = product.variants ? product.variants[selectedVariant].price : product.price;
                const msg = `Hello, I want to buy ${product.name}${variantLabel} (₦${price.toLocaleString()})`;
                window.open(`https://wa.me/2348073238118?text=${encodeURIComponent(msg)}`, "_blank");
              }}
              style={{
                background: "transparent", color: "#1db954",
                padding: "14px 32px", borderRadius: 40,
                border: "1.5px solid rgba(29,185,84,0.5)",
                fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 15,
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(29,185,84,0.1)"; e.currentTarget.style.borderColor = "#1db954"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(29,185,84,0.5)"; }}
            >
              Buy Now via WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <div style={{ marginTop: 96, maxWidth: 1100, margin: "96px auto 0" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#1db954", marginBottom: 12 }}>
          Reviews
        </p>
        <h2 style={{
          fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 3vw, 36px)",
          fontWeight: 800, letterSpacing: -0.5, color: "#dff0e2", marginBottom: 32,
        }}>
          Customer Reviews
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, i) => (
              <div
                key={i}
                style={{
                  background: "#3a4e3d",
                  padding: "20px 24px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: "#dff0e2" }}>
                    {review.name}
                  </p>
                  <div style={{ color: "#f59e0b", letterSpacing: 2, fontSize: 15 }}>
                    {"★".repeat(review.rating)}
                    <span style={{ color: "#334538" }}>{"★".repeat(5 - review.rating)}</span>
                  </div>
                </div>
                <p style={{ color: "#9dbfa0", fontSize: 14, lineHeight: 1.7 }}>
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <p style={{ color: "#9dbfa0" }}>No reviews yet.</p>
          )}
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      <div style={{ marginTop: 96, maxWidth: 1100, margin: "96px auto 0" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#1db954", marginBottom: 12 }}>
          Explore More
        </p>
        <h2 style={{
          fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 3vw, 36px)",
          fontWeight: 800, letterSpacing: -0.5, color: "#dff0e2", marginBottom: 32,
        }}>
          You may also like
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 20,
        }}>
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "#3a4e3d",
                    padding: 16,
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.07)",
                    cursor: "pointer",
                    transition: "transform 0.25s, border-color 0.25s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(29,185,84,0.35)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={200}
                    height={150}
                    style={{ objectFit: "contain", width: "100%", height: "auto" }}
                  />
                  <p style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: "#dff0e2", fontFamily: "Syne, sans-serif" }}>
                    {p.name}
                  </p>
                  <p style={{ color: "#1db954", fontSize: 13, fontWeight: 600, marginTop: 4 }}>
                    ₦{p.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>

    </div>
  );
}
