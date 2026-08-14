import "./globals.css";

import { CartProvider } from "./CartContext";
import Footer from "./Footer";
import type { Metadata } from "next";
import Navbar from "./Navbar";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  title: {
    default: "FindMe — Never Lose Your Things Again",
    template: "%s | FindMe",
  },
  description:
    "Attach a FindMe QR tag to anything you own. If it's ever lost, the finder scans it and you're connected instantly — anonymously via WhatsApp.",
  metadataBase: new URL("https://findme.com.ng"),
  icons: {
    icon: "/iconL.png",
    apple: "/iconL.png",
    shortcut: "/iconL.png",
  },
  openGraph: {
    title: "FindMe — Never Lose Your Things Again",
    description:
      "Attach a FindMe QR tag to anything you own. If it's ever lost, the finder scans it and you're connected instantly — anonymously via WhatsApp.",
    url: "https://findme.com.ng",
    siteName: "FindMe Nigeria",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FindMe Nigeria — Never Lose Your Things Again",
      },
    ],
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "FindMe — Never Lose Your Things Again",
    description:
      "Attach a FindMe QR tag to anything you own. If it's ever lost, the finder scans it and you're connected instantly — anonymously via WhatsApp.",
    images: ["/og-image.png"],
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
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
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
