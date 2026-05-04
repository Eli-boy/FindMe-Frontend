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
        background: scrolled ? "rgba(10,10,10,0.98)" : "rgba(10,10,10,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        transition: "background 0.3s",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

        {/* LOGO */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image
            src="/logo.JPG"
            alt="FindMe"
            width={36}
            height={36}
            style={{ borderRadius: 8, objectFit: "cover" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 22, color: "#f5f4f0" }}>
            Find<span style={{ color: "#1db954" }}>Me</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 32 }}>
          {[
            { label: "Home", href: "/" },
            { label: "How It Works", href: "/#how" },
            { label: "About", href: "/#about" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                color: pathname === l.href ? "#f5f4f0" : "#888",
                textDecoration: "none", fontSize: 14, fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f4f0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = pathname === l.href ? "#f5f4f0" : "#888")}
            >
              {l.label}
            </Link>
          ))}

          {/* SHOP DROPDOWN */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              onClick={(e) => { e.stopPropagation(); setOpenShop(!openShop); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 14, fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f4f0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
            >
              Shop ▾
            </button>
            {openShop && (
              <div
                style={{
                  position: "absolute", top: 40, left: 0, width: 200,
                  background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, padding: 8,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
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
                      color: "#888", textDecoration: "none", fontSize: 14,
                      transition: "background 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#2e2e2e";
                      e.currentTarget.style.color = "#1db954";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#888";
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
          <Link href="/cart" style={{ position: "relative", color: "#f5f4f0", textDecoration: "none", fontSize: 20 }}>
            🛒
            {itemCount > 0 && (
              <span style={{
                position: "absolute", top: -8, right: -10,
                background: "#1db954", color: "#000",
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
              background: "#1db954", color: "#000",
              padding: "10px 22px", borderRadius: 40,
              fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14,
              textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#25e668"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#1db954"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Get Tags
          </Link>
        </div>

        {/* MOBILE */}
        <div className="flex md:hidden" style={{ alignItems: "center", gap: 16 }}>
          <Link href="/cart" style={{ position: "relative", color: "#f5f4f0", textDecoration: "none", fontSize: 20 }}>
            🛒
            {itemCount > 0 && (
              <span style={{
                position: "absolute", top: -8, right: -10,
                background: "#1db954", color: "#000",
                fontSize: 11, fontWeight: 700, padding: "1px 6px", borderRadius: 20,
              }}>
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#f5f4f0", fontSize: 24 }}
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
            background: "#1e1e1e", borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "20px 32px 28px", display: "flex", flexDirection: "column", gap: 16,
          }}
        >
          {[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: "How It Works", href: "/#how" },
            { label: "About", href: "/#about" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "#888", textDecoration: "none", fontSize: 16 }}>
              {l.label}
            </Link>
          ))}
          <Link href="/cart" style={{ color: "#888", textDecoration: "none", fontSize: 16 }}>
            🛒 Cart {itemCount > 0 ? `(${itemCount})` : ""}
          </Link>
        </div>
      )}
    </nav>
  );
}
