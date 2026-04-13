"use client";

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-6 md:px-12 py-16 mt- relative">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Find<span className="text-green-400">Me</span>
          </h2>

          <p className="mb-4 text-sm">Sign up to our newsletter!</p>

          <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-transparent outline-none text-sm flex-1 placeholder:text-gray-300"
            />
            <button className="ml-2 bg-white text-black rounded-full px-3 py-1 hover:scale-105 transition">
              →
            </button>
          </div>
        </div>

        {/* PAGES */}
        <div>
          <h3 className="font-semibold mb-4 border-b border-white/30 pb-2">
            Pages
          </h3>

          <div className="space-y-5 text-sm">
            <Link href="/" className="hover:text-green-400 transition">Home</Link>
            <Link href="/shop" className="hover:text-green-400 transition">Shop</Link>
            <Link href="/#about" className="hover:text-green-400 transition">About Us</Link>
            <Link href="/#how" className="hover:text-green-400 transition">How It Works</Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4 border-b border-white/30 pb-2">
            Contact Us
          </h3>

          <div className="space-y-2 text-sm">
            <p>Email: support@findme.com.ng</p>
            <p>WhatsApp: +234 800 000 0000</p>
            <p>Address: Abuja, Nigeria</p>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="font-semibold mb-4 border-b border-white/30 pb-2">
            Follow Us
          </h3>

          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-green-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-green-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-green-400 transition"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-green-400 transition"><FaTiktok /></a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-10 border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-300">
        <p>© 2026 FindMe. All rights reserved.</p>

        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Use</span>
        </div>
      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/2348151171029?text=Hello%20👋%20I’m%20interested%20in%20FindMe%20tags.%20Can%20you%20help%20me?"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition z-[100]"
      >
        <FaWhatsapp size={22} />
      </a>

    </footer>
  );
}