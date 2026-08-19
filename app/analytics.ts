/* ─────────────────────────────────────────────────────────────
   FindMe Analytics — Central tracking helper
   Usage: import { track } from "@/app/analytics";
   ───────────────────────────────────────────────────────────── */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/* ── Core event tracker ── */
export function track(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

/* ════════════════════════════════════════════
   WEBSITE EVENTS
   ════════════════════════════════════════════ */

/** Called automatically by GA4 on every page load */
export const trackPageView = (path: string) =>
  track("page_view", { page_path: path });

/** Fire when user scrolls 50%+ down a page */
export const trackScroll = (page: string, depth: number) =>
  track("scroll", { page, scroll_depth: depth });

/** Fire when user clicks any contact method */
export const trackContactClick = (method: "whatsapp" | "phone" | "email") =>
  track("contact_click", { method });

export const trackWhatsAppClick = (location: string) =>
  track("whatsapp_click", { location });

export const trackPhoneClick = (location: string) =>
  track("phone_click", { location });

/* ════════════════════════════════════════════
   PRODUCT EVENTS
   ════════════════════════════════════════════ */

/** Generic product view */
export const trackProductView = (
  productName: string,
  productId: string | number,
  price: number,
  category: string
) =>
  track("product_view", {
    product_name: productName,
    product_id: String(productId),
    price,
    category,
  });

/** Specific product views */
export const trackLuggageTagView   = (variant?: string) => track("luggage_tag_view",   { variant: variant || "default" });
export const trackKeychainView     = (variant?: string) => track("keychain_view",       { variant: variant || "default" });
export const trackStickerPackView  = (variant?: string) => track("sticker_pack_view",  { variant: variant || "default" });

/* ════════════════════════════════════════════
   SALES / CONVERSION EVENTS
   ════════════════════════════════════════════ */

/** User clicks "Add to Cart" */
export const trackAddToCart = (
  productName: string,
  price: number,
  quantity: number,
  category: string
) =>
  track("add_to_cart", {
    currency: "NGN",
    value: price * quantity,
    items: [{ item_name: productName, price, quantity, item_category: category }],
  });

/** User clicks "Buy Now" / "Pay Now" button */
export const trackBuyNow = (
  productName: string,
  price: number,
  quantity: number
) =>
  track("buy_now", {
    currency: "NGN",
    value: price * quantity,
    item_name: productName,
    quantity,
  });

/** User reaches the cart/checkout page */
export const trackBeginCheckout = (
  total: number,
  items: { name: string; price: number; quantity: number }[]
) =>
  track("begin_checkout", {
    currency: "NGN",
    value: total,
    items: items.map((i) => ({
      item_name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
  });

/** Payment confirmed — the most important event */
export const trackPurchase = (
  orderNumber: number,
  total: number,
  items: { name: string; price: number; quantity: number }[],
  couponCode?: string
) =>
  track("purchase", {
    transaction_id: String(orderNumber),
    currency: "NGN",
    value: total,
    coupon: couponCode || "",
    items: items.map((i) => ({
      item_name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
  });

/* ════════════════════════════════════════════
   MARKETING / UTM SOURCE TRACKING
   GA4 reads UTM params automatically from the URL.
   These helpers make it easy to build campaign links.

   Usage — append to any link you share:
   ?utm_source=instagram&utm_medium=social&utm_campaign=launch

   Sources to use:
   ════════════════════════════════════════════
   Instagram:       utm_source=instagram&utm_medium=social
   TikTok:          utm_source=tiktok&utm_medium=social
   Facebook:        utm_source=facebook&utm_medium=social
   Google Ads:      utm_source=google&utm_medium=cpc
   WhatsApp:        utm_source=whatsapp&utm_medium=messaging
   Influencer:      utm_source=influencer&utm_medium=social&utm_campaign=INFLUENCER_NAME
   Travel Agency:   utm_source=travel_agency&utm_medium=referral&utm_campaign=AGENCY_NAME
   Airline:         utm_source=AIRLINE_NAME&utm_medium=partnership
   ════════════════════════════════════════════ */

export type UTMSource =
  | "instagram"
  | "tiktok"
  | "facebook"
  | "google"
  | "whatsapp"
  | "influencer"
  | "travel_agency"
  | "airline";

export function buildUTMLink(
  baseUrl: string,
  source: UTMSource,
  campaign?: string,
  content?: string
): string {
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium:
      source === "google" ? "cpc" :
      source === "whatsapp" ? "messaging" :
      ["travel_agency", "airline"].includes(source) ? "referral" : "social",
    utm_campaign: campaign || "findme_general",
    ...(content ? { utm_content: content } : {}),
  });
  return `${baseUrl}?${params.toString()}`;
}

/*
  ════════════════════════════════════════════
  EXAMPLE CAMPAIGN LINKS TO SHARE:
  ════════════════════════════════════════════

  Instagram bio link:
  https://findme.com.ng?utm_source=instagram&utm_medium=social&utm_campaign=bio_link

  TikTok video:
  https://findme.com.ng?utm_source=tiktok&utm_medium=social&utm_campaign=product_demo

  WhatsApp broadcast:
  https://findme.com.ng?utm_source=whatsapp&utm_medium=messaging&utm_campaign=broadcast_june

  Influencer (replace NAME):
  https://findme.com.ng?utm_source=influencer&utm_medium=social&utm_campaign=NAME

  Travel agency referral:
  https://findme.com.ng?utm_source=travel_agency&utm_medium=referral&utm_campaign=AGENCY_NAME

  In GA4, go to Reports → Acquisition → Traffic Acquisition
  to see how many visitors came from each source.
  ════════════════════════════════════════════
*/