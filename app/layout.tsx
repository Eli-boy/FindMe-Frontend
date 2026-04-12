import "./globals.css";

import { CartProvider } from "./CartContext";
import Footer from "./Footer";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "./Navbar";

const inter = Inter({
  subsets: ["latin"],
});

<html lang="en" className={inter.className}></html>

/*import { Geist, Geist_Mono } from "next/font/google";*/


/* ================= FONTS ================= */
/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

/* ================= METADATA ================= */
export const metadata: Metadata = {
  title: "FindMe",
  description: "Never lose your items again",
};

/* ================= ROOT LAYOUT ================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={inter.className}
      /*className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}*/
    >
      <body className="bg-[#f7f5f2] text-black min-h-full flex flex-col">

        <CartProvider>

          {/* NAVBAR */}
          <Navbar />

          {/* PAGE CONTENT */}
          <main className="pt-24 flex-grow">
            {children}
          </main>

          {/* FOOTER ✅ */}
          <Footer />

        </CartProvider>

      </body>
    </html>
  );
}