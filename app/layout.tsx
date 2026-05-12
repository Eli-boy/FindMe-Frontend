import "./globals.css";

import { CartProvider } from "./CartContext";
import Footer from "./Footer";
import type { Metadata } from "next";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "FindMe — Never Lose Your Things Again",
    template: "%s | FindMe",
  },
  description:
    "Attach a FindMe QR tag to anything you own. If it's ever lost, the finder scans it and you're connected instantly — anonymously via WhatsApp.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ background: "#0a0a0a", color: "#f5f4f0" }}
        className="min-h-screen flex flex-col antialiased"
      >
        <CartProvider>
          <Navbar />
          <main className="pt-[72px] flex-grow">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a3a2a",
                color: "#fff",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.15)",
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
