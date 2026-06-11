"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "../../data/products";
import toast from "react-hot-toast";
import { useCart } from "../../CartContext";
import { useParams } from "next/navigation";
import { useState } from "react";

const BG = "#c8dfc8";
const DARK = "#1a3a2a";
const GREEN = "#1db954";

/* ── use-case images shown per product category ── */
const useCases: Record<string, { image: string; label: string }[]> = {
  sticker: [
    { image: "/use-gaddget.png", label: "gadget" },
    { image: "/use-nig.png", label: "passport" },
    { image: "/use-book.png", label: "book" },
    { image: "/use-wallet.png", label: "Wallet" },
  ],
  key: [
    { image: "/use-keys.png", label: "Keys" },
    { image: "/use-benz.png", label: "car" },
    { image: "/use-purse.png", label: "purse" },
    { image: "/use-carKey.png", label: "car key" },
    
  ],
  bundle: [
    { image: "/use-luggage.png", label: "Luggage" },
    { image: "/use-nig.png", label: "passport" },
    { image: "/use-keys.png", label: "Keys" },
    { image: "/use-bag.png", label: "Bag" },
    { image: "/use-gad.png", label: "" },
  ],
  luggage: [
    { image: "/use-bag.png", label: "bag" },
    { image: "/use-luggage.png", label: "luggage" },
    { image: "/lug2.png", label: "luggage" },
  ],
};

export default function ProductPage() {
  const { addToCart } = useCart();
  const params = useParams();

  const id = Number(params?.id);
  const product = products.find((p) => p.id === id);

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [useCaseImg, setUseCaseImg] = useState<string | null>(null);

  if (!product) {
    return (
      <div style={{ background: BG, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, color: DARK, marginBottom: 16 }}>Product not found</h1>
          <Link href="/shop" style={{ color: GREEN, textDecoration: "underline", fontFamily: "Syne, sans-serif" }}>Go back to shop</Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 1 ? product.images : [product.image];
  // variantClicked tracks if user last clicked a variant (vs a use-case thumb)
  const currentImage = useCaseImg
    ? useCaseImg
    : (product.variants?.[selectedVariant]?.image || images[activeImg] || product.image);
  const currentPrice = product.variants ? product.variants[selectedVariant].price : product.price;
  const currentOldPrice = product.variants
    ? product.variants[selectedVariant].oldPrice
    : product.oldPrice;
  const cat = product.id === 4 ? "luggage" : product.category;
  const cases = useCases[cat] || useCases.sticker;

  return (
    <div style={{ background: BG, minHeight: "100vh", color: DARK }}>

      {/* ── BREADCRUMB ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 32px 0" }}>
        <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#4a7a5a", marginBottom: 32, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#4a7a5a", textDecoration: "none" }}>Home</Link>
          <span style={{ opacity: 0.5 }}>/</span>
          <Link href="/shop" style={{ color: "#4a7a5a", textDecoration: "none" }}>Shop</Link>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ color: DARK, fontWeight: 600 }}>{product.name}</span>
        </nav>
      </div>

      {/* ── MAIN PRODUCT ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 64, alignItems: "start" }}>

        {/* LEFT — IMAGE GALLERY + USE CASES */}
        <div>
          {/* Main image */}
          <div style={{
            background: "rgba(255,255,255,0.7)", borderRadius: 24,
            border: "1px solid rgba(26,58,42,0.1)",
            padding: 32, marginBottom: 12,
            boxShadow: "0 4px 24px rgba(26,58,42,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: 380,
          }}>
            <Image
              src={currentImage}
              alt={product.name}
              width={500}
              height={420}
              style={{ objectFit: "contain", width: "100%", height: "auto", maxHeight: 420, transition: "all 0.3s ease" }}
            />
          </div>

          {/* USE CASE THUMBNAILS — scrollable below large image, click to swap */}
          <style>{`.use-scroll::-webkit-scrollbar{display:none}`}</style>
          <div className="use-scroll" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none", marginBottom: 12 }}>
            {/* Product image thumbnails first */}
            {images.map((img, i) => (
              <button
                key={"img-" + i}
                onClick={() => { setActiveImg(i); setUseCaseImg(null); }}
                style={{
                  flexShrink: 0, width: 80, height: 80, borderRadius: 12, overflow: "hidden",
                  border: (!useCaseImg && activeImg === i) ? `2px solid ${DARK}` : "2px solid rgba(26,58,42,0.15)",
                  background: "rgba(255,255,255,0.8)", cursor: "pointer", padding: 4, transition: "border-color 0.2s",
                }}
              >
                <Image src={img} alt="" width={72} height={72} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
              </button>
            ))}
            {/* Use-case thumbnails */}
            {cases.map((c, i) => {
              const isActive = useCaseImg === c.image;
              return (
                <button
                  key={"uc-" + i}
                  onClick={() => setUseCaseImg(isActive ? null : c.image)}
                  style={{
                    flexShrink: 0, width: 80, height: 80, borderRadius: 12, overflow: "hidden",
                    border: isActive ? `2px solid ${GREEN}` : "2px solid rgba(26,58,42,0.12)",
                    background: "rgba(255,255,255,0.7)", cursor: "pointer", padding: 0,
                    transition: "all 0.2s", position: "relative",
                  }}
                >
                  <Image src={c.image} alt={c.label} width={80} height={80} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "rgba(26,58,42,0.75)", padding: "3px 4px",
                    fontSize: 9, color: "#fff", fontWeight: 600, textAlign: "center",
                    fontFamily: "Syne, sans-serif",
                  }}>{c.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <div>
          {/* Badge */}
          <span style={{
            background: "rgba(29,185,84,0.12)", color: GREEN,
            padding: "5px 14px", borderRadius: 40, fontSize: 12,
            fontWeight: 700, border: "1.5px solid rgba(29,185,84,0.35)",
            fontFamily: "Syne, sans-serif", letterSpacing: 0.5,
          }}>
            {product.category === "bundle" ? "🔥 Best Value" : "⭐ Best Seller"}
          </span>

          {/* Title */}
          <h1 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: -1,
            color: DARK, margin: "14px 0 12px", lineHeight: 1.1,
          }}>
            {product.name}
          </h1>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "0 0 16px", flexWrap: "wrap" }}>
            {currentOldPrice && (
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 22, color: "#9dbfa0", textDecoration: "line-through" }}>
                ₦{(currentOldPrice * qty).toLocaleString()}
              </span>
            )}
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 32, color: GREEN }}>
              ₦{(currentPrice * qty).toLocaleString()}
            </span>
            {currentOldPrice && (
              <span style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, border: "1px solid rgba(239,68,68,0.2)" }}>
                Save ₦{((currentOldPrice - currentPrice) * qty).toLocaleString()}
              </span>
            )}
          </div>

          {/* Short desc — bold like Tagiz */}
          {product.shortDesc && (
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: DARK, lineHeight: 1.65, marginBottom: 20, borderLeft: `3px solid ${GREEN}`, paddingLeft: 14 }}>
              {product.shortDesc}
            </p>
          )}

          {/* Features — green checkmarks like Tagiz */}
          {product.features && (
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
              {product.features.map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#2a4a2a", lineHeight: 1.6 }}>
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>✅</span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* VARIANTS — like Tagiz image cards */}
          {product.variants && product.variants.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#4a7a5a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                Sets: <span style={{ color: DARK }}>{product.variants[selectedVariant].label}</span>
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedVariant(i); setUseCaseImg(null); }}
                    style={{
                      width: 120, padding: "12px 8px", borderRadius: 16,
                      border: selectedVariant === i ? `2px solid ${DARK}` : "1.5px solid rgba(26,58,42,0.2)",
                      background: selectedVariant === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                      cursor: "pointer", transition: "all 0.2s",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                      boxShadow: selectedVariant === i ? "0 4px 16px rgba(26,58,42,0.15)" : "none",
                    }}
                  >
                    <Image src={v.image} alt={v.label} width={70} height={60} style={{ objectFit: "contain", width: 70, height: 60 }} />
                    <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 11, color: DARK, textAlign: "center", lineHeight: 1.3 }}>{v.label}</span>
                    <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 12, color: GREEN }}>₦{v.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
              {/* Clear selection */}
              <button
                onClick={() => { setSelectedVariant(0); setUseCaseImg(null); }}
                style={{ background: "none", border: "none", color: GREEN, fontSize: 13, cursor: "pointer", marginTop: 8, fontFamily: "Syne, sans-serif" }}
              >
                Clear
              </button>
            </div>
          )}

          {/* QUANTITY — like Tagiz */}
          {!product.comingSoon && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#4a7a5a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Quantity</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 0, border: `1.5px solid rgba(26,58,42,0.2)`, borderRadius: 40, overflow: "hidden", background: "rgba(255,255,255,0.6)" }}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ width: 44, height: 44, background: "none", border: "none", cursor: "pointer", fontSize: 20, color: DARK, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}
                >−</button>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: DARK, minWidth: 40, textAlign: "center" }}>{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{ width: 44, height: 44, background: "none", border: "none", cursor: "pointer", fontSize: 20, color: DARK, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}
                >+</button>
              </div>
            </div>
          )}

          {/* BUTTONS */}
          {product.comingSoon ? (
            <div style={{ background: "rgba(26,58,42,0.08)", borderRadius: 16, padding: "16px 20px", textAlign: "center" }}>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: DARK, margin: 0 }}>🚀 Coming Soon</p>
              <p style={{ color: "#4a7a5a", fontSize: 13, margin: "6px 0 0" }}>We&apos;ll notify you when this is available</p>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  const cartProduct = product.variants
                    ? { ...product, price: product.variants[selectedVariant].price * qty, name: `${product.name} (${product.variants[selectedVariant].label})` }
                    : { ...product, price: product.price * qty };
                  addToCart(cartProduct);
                  toast.success(`${product.name} added to cart 🛒`);
                }}
                style={{
                  flex: 1, minWidth: 160, padding: "15px 24px",
                  background: DARK, color: "#fff", border: "none",
                  borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15,
                  cursor: "pointer", transition: "all 0.2s",
                  boxShadow: "0 4px 20px rgba(26,58,42,0.25)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#2d5a30"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = DARK; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  const variantLabel = product.variants ? ` — ${product.variants[selectedVariant].label}` : "";
                  const price = (product.variants ? product.variants[selectedVariant].price : product.price) * qty;
                  const msg = `Hello, I want to buy ${product.name}${variantLabel} x${qty} (₦${price.toLocaleString()})`;
                  window.open(`https://wa.me/2348073238118?text=${encodeURIComponent(msg)}`, "_blank");
                }}
                style={{
                  flex: 1, minWidth: 160, padding: "15px 24px",
                  background: GREEN, color: "#000", border: "none",
                  borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15,
                  cursor: "pointer", transition: "all 0.2s",
                  boxShadow: "0 4px 20px rgba(29,185,84,0.3)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#25e668"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = GREEN; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Buy via WhatsApp →
              </button>
            </div>
          )}
        </div>
      </div>



      {/* ── REVIEWS ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
        <p style={{ fontFamily: "Syne, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: GREEN, marginBottom: 8 }}>Reviews</p>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", color: DARK, marginBottom: 32, letterSpacing: -0.5 }}>
          Customer Reviews
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {product.reviews && product.reviews.length > 0 ? product.reviews.map((r, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.7)", borderRadius: 16, padding: "20px 24px", border: "1px solid rgba(26,58,42,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: DARK, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 14 }}>
                    {r.name[0]}
                  </div>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: DARK, margin: 0 }}>{r.name}</p>
                </div>
                <div style={{ color: "#f59e0b", fontSize: 15, letterSpacing: 2 }}>
                  {"★".repeat(r.rating)}<span style={{ color: "rgba(26,58,42,0.2)" }}>{"★".repeat(5 - r.rating)}</span>
                </div>
              </div>
              <p style={{ color: "#4a7a5a", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{r.comment}</p>
            </div>
          )) : <p style={{ color: "#4a7a5a" }}>No reviews yet.</p>}
        </div>
      </div>

      {/* ── YOU MAY ALSO LIKE ── */}
      <div style={{ background: "rgba(255,255,255,0.3)", borderTop: "1px solid rgba(26,58,42,0.08)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: "Syne, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: GREEN, marginBottom: 8 }}>Explore More</p>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", color: DARK, marginBottom: 32, letterSpacing: -0.5 }}>
            You may also like
          </h2>
          <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
            {products.filter((p) => p.id !== product.id).slice(0, 5).map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: "none", flexShrink: 0 }}>
                <div style={{
                  width: 200, background: "rgba(255,255,255,0.7)", borderRadius: 20,
                  border: "1px solid rgba(26,58,42,0.1)", overflow: "hidden",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  boxShadow: "0 2px 12px rgba(26,58,42,0.06)",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,58,42,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(26,58,42,0.06)"; }}
                >
                  <div style={{ background: DARK, padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", height: 140 }}>
                    <Image src={p.image} alt={p.name} width={120} height={100} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: DARK, margin: "0 0 6px" }}>{p.name}</p>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 15, color: GREEN, margin: 0 }}>
                      {p.comingSoon ? "Coming Soon" : `₦${p.price.toLocaleString()}`}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
