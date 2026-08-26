import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ── Coupon audience rules ──
   FINDME5          → first-time customers only (1st order)
   FINDME10 / 15    → returning customers only (2nd order onward)
   any other code   → no restriction, just must exist & be active  */
const couponAudience = (code: string): "first" | "returning" | "any" => {
  const c = code.toUpperCase();
  if (c === "FINDME5") return "first";
  if (c === "FINDME10" || c === "FINDME15") return "returning";
  return "any";
};

const countOrders = async (email: string): Promise<number> => {
  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("customer_email", email.toLowerCase().trim());
  return count ?? 0;
};

export async function POST(req: NextRequest) {
  const { email, validateCoupon, couponCode } = await req.json();

  // Validate a coupon code
  if (validateCoupon && couponCode) {
    const code = couponCode.trim().replace(/\s+/g, "").toUpperCase();

    // .limit(1) instead of .single() — duplicate rows in the table won't break the lookup
    const { data: matches } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", code)
      .eq("active", true)
      .limit(1);

    const coupon = matches?.[0];
    if (!coupon) {
      return NextResponse.json({ valid: false, message: "Invalid or expired coupon code." });
    }

    const audience = couponAudience(code);

    if (audience !== "any") {
      if (!email || !String(email).includes("@")) {
        return NextResponse.json({
          valid: false,
          needsEmail: true,
          message:
            audience === "first"
              ? "Enter your email first so we can verify you're a new customer."
              : "Enter your email first so we can verify your order history.",
        });
      }

      const orders = await countOrders(email);

      if (audience === "first" && orders > 0) {
        return NextResponse.json({
          valid: false,
          message: `${coupon.code} is for first-time orders only.`,
        });
      }
      if (audience === "returning" && orders === 0) {
        return NextResponse.json({
          valid: false,
          message: `${coupon.code} unlocks after your first order — it's our thank-you for returning customers! 🎉`,
        });
      }
    }

    return NextResponse.json({ valid: true, discount: coupon.discount, code: coupon.code });
  }

  // Check if first order
  if (!email) return NextResponse.json({ isFirstOrder: true });
  const orders = await countOrders(email);
  return NextResponse.json({ isFirstOrder: orders === 0 });
}
