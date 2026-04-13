"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { cart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  /* ================= SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= CLOSE DROPDOWN ================= */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenShop(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  /* ================= CLOSE ON ROUTE CHANGE ================= */
  useEffect(() => {
    setOpenShop(false);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* TOP BAR */}
      <div className="fixed top-0 left-0 w-full z-[60] bg-gradient-to-r from-green-700 to-green-600 text-white text-center text-sm py-2 tracking-wide">
        Never lose your items again 🔍
      </div>

      {/* NAVBAR */}
      <nav
        className={`fixed top-8 left-0 w-full z-[50] backdrop-blur-2xl bg-white/60 border-b border-gray-200/60 transition-all duration-300 ${
          scrolled ? "shadow-lg bg-white/80" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* LEFT */}
          <div className="flex items-center gap-10">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo.JPG"
                alt="FindMe Logo"
                width={44}
                height={44}
                className="object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-xl"
              />

              <span className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 group-hover:tracking-wide transition-all">
                Find<span className="text-green-600">Me</span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">

              <Link
                href="/"
                className={`transition hover:text-black ${
                  pathname === "/" ? "text-black font-semibold" : ""
                }`}
              >
                Home
              </Link>

              {/* SHOP */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenShop(!openShop);
                  }}
                  className="transition hover:text-black"
                >
                  Shop ▾
                </button>

                {openShop && (
                  <div
                    className="absolute top-12 left-0 w-60 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-3 border border-gray-100 animate-fadeIn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {[
                      { name: "All Products", link: "/shop?category=all" },
                      { name: "Key Tags", link: "/shop?category=key" },
                      { name: "Pet Tags", link: "/shop?category=pet" },
                      { name: "Stickers", link: "/shop?category=sticker" },
                    ].map((item, i) => (
                      <Link
                        key={i}
                        href={item.link}
                        className="block px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-green-600 transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/#how" className="hover:text-black transition">
                How It Works
              </Link>

              <Link href="/#about" className="hover:text-black transition">
                About
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">

            <span className="cursor-pointer hover:text-black transition">
              EN
            </span>

            {/* CART */}
            <Link
              href="/cart"
              className="relative cursor-pointer hover:scale-110 transition"
            >
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs px-1.5 rounded-full shadow-md">
                  {cart.length}
                </span>
              )}
            </Link>

            <span className="cursor-pointer hover:text-black transition">
              Log In
            </span>

            <button className="bg-[#4b2e2e] text-white px-5 py-2 rounded-full text-sm hover:scale-105 hover:shadow-lg transition">
              Tags Management
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t px-6 py-6 space-y-4 text-gray-700 animate-fadeIn">

            <Link href="/" className="block">Home</Link>
            <Link href="/shop" className="block">Shop</Link>
            <Link href="/#how" className="block">How It Works</Link>
            <Link href="/#about" className="block">About</Link>

            <Link href="/cart" className="block">
              🛒 Cart ({cart.length})
            </Link>

            <button className="bg-[#4b2e2e] text-white px-4 py-2 rounded-full w-full hover:scale-105 transition">
              Tags Management
            </button>
          </div>
        )}
      </nav>
    </>
  );
}