import "./globals.css";

import { CartProvider } from "./CartContext";
import Footer from "./Footer";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast"; // ✅ ADD THIS

/* ================= FONT ================= */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

/* ================= METADATA ================= */
export const metadata: Metadata = {
  title: {
    default: "FindMe",
    template: "%s | FindMe",
  },
  description:
    "Never lose your items again. Smart QR tags that connect finders to owners instantly.",
  icons: {
    icon: "/icon.png",
  },
};

/* ================= ROOT LAYOUT ================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-[#f7f5f2] text-gray-900 min-h-screen flex flex-col antialiased`}
      >
        <CartProvider>
          {/* NAVBAR */}
          <Navbar />

          {/* MAIN */}
          <main className="pt-24 flex-grow">{children}</main>

          {/* FOOTER */}
          <Footer />

          {/* 🔥 TOAST POPUP (ADD THIS) */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#111",
                color: "#fff",
                borderRadius: "10px",
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}