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

  /* ================= SCROLL EFFECT ================= */
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

  /* ================= CLOSE MENU ON ROUTE CHANGE ================= */
  useEffect(() => {
    setOpenShop(false);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* TOP BAR */}
      <div className="fixed top-0 left-0 w-full z-[60] bg-green-700 text-white text-center text-sm py-2">
        Never lose your items again 🔍
      </div>

      {/* NAVBAR */}
      <nav
        className={`fixed top-8 left-0 w-full z-[50] backdrop-blur-md bg-white/100 border-b transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* LEFT */}
          <div className="flex items-center gap-10">

            {/* 🔥 PREMIUM LOGO */}
            <Link href="/" className="flex items-center gap-3 group">

              <Image
                src="/logo.JPG"
                alt="FindMe Logo"
                width={48}
                height={48}
                className="object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
              />

              <span className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800 group-hover:tracking-wide transition-all">
                Find<span className="text-green-700">Me</span>
              </span>

            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">

              <Link
                href="/"
                className={`hover:text-black transition ${
                  pathname === "/" ? "text-black font-medium" : ""
                }`}
              >
                Home
              </Link>

              {/* SHOP DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenShop(!openShop);
                  }}
                  className="hover:text-black transition"
                >
                  Shop ▾
                </button>

                {openShop && (
                  <div
                    className="absolute top-10 left-0 w-56 bg-white shadow-xl rounded-xl p-4 z-[999]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href="/shop?category=all" className="block py-2 px-2 rounded hover:bg-gray-100 hover:text-green-700 transition">
                      All Products
                    </Link>
                    <Link href="/shop?category=key" className="block py-2 px-2 rounded hover:bg-gray-100 hover:text-green-700 transition">
                      Key Tags
                    </Link>
                    <Link href="/shop?category=pet" className="block py-2 px-2 rounded hover:bg-gray-100 hover:text-green-700 transition">
                      Pet Tags
                    </Link>
                    <Link href="/shop?category=sticker" className="block py-2 px-2 rounded hover:bg-gray-100 hover:text-green-700 transition">
                      Stickers
                    </Link>
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
            <Link href="/cart" className="relative cursor-pointer hover:scale-105 transition">
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-green-700 text-white text-xs px-1.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            <span className="cursor-pointer hover:text-black transition">
              Log In
            </span>

            <button className="bg-[#4b2e2e] text-white px-5 py-2 rounded-full text-sm hover:opacity-90 transition">
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
          <div className="md:hidden bg-white border-t px-6 py-6 space-y-4 text-gray-700">

            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/#how">How It Works</Link>
            <Link href="/#about">About</Link>

            <Link href="/cart">🛒 Cart ({cart.length})</Link>

            <button className="bg-[#4b2e2e] text-white px-4 py-2 rounded-full w-full">
              Tags Management
            </button>
          </div>
        )}
      </nav>
    </>
  );
}