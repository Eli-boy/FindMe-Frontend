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

/* ════════════════════════════════════════════
   GA4 ECOMMERCE — standard event schema
   Events: view_item_list, select_item, view_item,
   add_to_cart, remove_from_cart, view_cart,
   begin_checkout, add_payment_info, purchase
   ════════════════════════════════════════════ */

export type AnalyticsItem = {
  id?: number | string;
  name: string;
  price: number;
  quantity?: number;
  category?: string;
  variant?: string;
  index?: number;
};

function ga4Item(i: AnalyticsItem) {
  const item: Record<string, any> = {
    item_name: i.name,
    price: i.price,
    quantity: i.quantity ?? 1,
  };
  if (i.id != null) item.item_id = String(i.id);
  if (i.category) item.item_category = i.category;
  if (i.variant) item.item_variant = i.variant;
  if (i.index != null) item.index = i.index;
  return item;
}

const lineValue = (i: AnalyticsItem) => i.price * (i.quantity ?? 1);

/** Product grid/list shown to the user */
export const trackViewItemList = (
  items: AnalyticsItem[],
  listId: string,
  listName: string
) =>
  track("view_item_list", {
    currency: "NGN",
    item_list_id: listId,
    item_list_name: listName,
    items: items.map(ga4Item),
  });

/** User clicks a product from a list */
export const trackSelectItem = (
  item: AnalyticsItem,
  listId: string,
  listName: string
) =>
  track("select_item", {
    currency: "NGN",
    item_list_id: listId,
    item_list_name: listName,
    items: [ga4Item(item)],
  });

/** User views a product detail page */
export const trackViewItem = (item: AnalyticsItem) =>
  track("view_item", {
    currency: "NGN",
    value: lineValue(item),
    items: [ga4Item(item)],
  });

/** Item added to cart (also fired for quantity increases) */
export const trackAddToCart = (item: AnalyticsItem) =>
  track("add_to_cart", {
    currency: "NGN",
    value: lineValue(item),
    items: [ga4Item(item)],
  });

/** Item removed from cart (also fired for quantity decreases) */
export const trackRemoveFromCart = (item: AnalyticsItem) =>
  track("remove_from_cart", {
    currency: "NGN",
    value: lineValue(item),
    items: [ga4Item(item)],
  });

/** User views the cart page */
export const trackViewCart = (items: AnalyticsItem[], total: number) =>
  track("view_cart", {
    currency: "NGN",
    value: total,
    items: items.map(ga4Item),
  });

/** User clicks "Pay Now" / begins checkout */
export const trackBeginCheckout = (
  items: AnalyticsItem[],
  total: number,
  couponCode?: string | null
) =>
  track("begin_checkout", {
    currency: "NGN",
    value: total,
    coupon: couponCode || undefined,
    items: items.map(ga4Item),
  });

/** User is sent to the payment provider */
export const trackAddPaymentInfo = (
  items: AnalyticsItem[],
  total: number,
  couponCode?: string | null
) =>
  track("add_payment_info", {
    currency: "NGN",
    value: total,
    coupon: couponCode || undefined,
    payment_type: "Paystack",
    items: items.map(ga4Item),
  });

/** Payment confirmed — the most important event */
export const trackPurchase = (
  orderNumber: number | string,
  total: number,
  items: AnalyticsItem[],
  couponCode?: string | null
) =>
  track("purchase", {
    transaction_id: String(orderNumber),
    currency: "NGN",
    value: total,
    coupon: couponCode || undefined,
    items: items.map(ga4Item),
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