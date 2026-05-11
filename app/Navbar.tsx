"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setOpenShop(false);
    };
    window.addEventListener("click", fn);
    return () => window.removeEventListener("click", fn);
  }, []);

  useEffect(() => {
    setOpenShop(false);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(200,223,200,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(26,58,42,0.12)" : "1px solid rgba(255,255,255,0.4)",
        transition: "background 0.3s, border-color 0.3s",
        boxShadow: scrolled ? "0 4px 24px rgba(26,58,42,0.1)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

        {/* LOGO */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image
            src="/me.png"
            alt="FindMe"
            width={40}
            height={40}
            style={{ borderRadius: 10, objectFit: "cover", border: "2px solid rgba(26,58,42,0.15)", boxShadow: "0 2px 8px rgba(26,58,42,0.2)" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 24, color: "#1a3a2a", letterSpacing: -0.5 }}>
            Find<span style={{ color: "#1db954" }}>Me</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 32 }}>
          {[
            { label: "Home", href: "/" },
            { label: "How It Works", href: "/#how" },
            { label: "FAQ", href: "/faq" },
            { label: "About", href: "/#about" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                color: pathname === l.href ? "#1a3a2a" : "#4a6a4a",
                textDecoration: "none", fontSize: 14, fontWeight: 600,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1a3a2a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = pathname === l.href ? "#1a3a2a" : "#4a6a4a")}
            >
              {l.label}
            </Link>
          ))}

          {/* SHOP DROPDOWN */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              onClick={(e) => { e.stopPropagation(); setOpenShop(!openShop); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#4a6a4a", fontSize: 14, fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1a3a2a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4a6a4a")}
            >
              Shop ▾
            </button>
            {openShop && (
              <div
                style={{
                  position: "absolute", top: 44, left: 0, width: 200,
                  background: "#ffffff", border: "1px solid rgba(26,58,42,0.1)",
                  borderRadius: 16, padding: 8,
                  boxShadow: "0 20px 60px rgba(26,58,42,0.15)",
                }}
                onClick={(e) => e.stopPropagation()}
                className="animate-fadeIn"
              >
                {[
                  { name: "All Products", link: "/shop" },
                  { name: "Key Tags", link: "/shop?category=key" },
                  { name: "Pet Tags", link: "/shop?category=pet" },
                  { name: "Stickers", link: "/shop?category=sticker" },
                ].map((item) => (
                  <Link
                    key={item.link}
                    href={item.link}
                    style={{
                      display: "block", padding: "10px 14px", borderRadius: 10,
                      color: "#4a6a4a", textDecoration: "none", fontSize: 14,
                      transition: "background 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#e8f5ee";
                      e.currentTarget.style.color = "#1a3a2a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#4a6a4a";
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 20 }}>
          {/* CART */}
          <Link href="/cart" style={{ position: "relative", color: "#1a3a2a", textDecoration: "none", fontSize: 20 }}>
            🛒
            {itemCount > 0 && (
              <span style={{
                position: "absolute", top: -8, right: -10,
                background: "#1db954", color: "#fff",
                fontSize: 11, fontWeight: 700,
                padding: "1px 6px", borderRadius: 20,
              }}>
                {itemCount}
              </span>
            )}
          </Link>

          <Link
            href="/shop"
            style={{
              background: "#1a3a2a", color: "#fff",
              padding: "10px 22px", borderRadius: 40,
              fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14,
              textDecoration: "none", transition: "all 0.2s",
              boxShadow: "0 2px 12px rgba(26,58,42,0.3)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#2d5a30"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#1a3a2a"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Get Tags
          </Link>
        </div>

        {/* MOBILE */}
        <div className="flex md:hidden" style={{ alignItems: "center", gap: 16 }}>
          <Link href="/cart" style={{ position: "relative", color: "#1a3a2a", textDecoration: "none", fontSize: 20 }}>
            🛒
            {itemCount > 0 && (
              <span style={{
                position: "absolute", top: -8, right: -10,
                background: "#1db954", color: "#fff",
                fontSize: 11, fontWeight: 700, padding: "1px 6px", borderRadius: 20,
              }}>
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#1a3a2a", fontSize: 24 }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="animate-fadeIn md:hidden"
          style={{
            background: "#ffffff", borderTop: "1px solid rgba(26,58,42,0.08)",
            padding: "20px 32px 28px", display: "flex", flexDirection: "column", gap: 16,
          }}
        >
          {[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: "How It Works", href: "/#how" },
            { label: "FAQ", href: "/faq" },
            { label: "About", href: "/#about" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "#4a6a4a", textDecoration: "none", fontSize: 16, fontWeight: 600 }}>
              {l.label}
            </Link>
          ))}
          <Link href="/cart" style={{ color: "#4a6a4a", textDecoration: "none", fontSize: 16, fontWeight: 600 }}>
            🛒 Cart {itemCount > 0 ? `(${itemCount})` : ""}
          </Link>
        </div>
      )}
    </nav>
  );
}
