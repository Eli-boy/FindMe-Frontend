import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { email, validateCoupon, couponCode } = await req.json();

  // Validate a coupon code
  if (validateCoupon && couponCode) {
    const { data } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", couponCode.trim().toUpperCase())
      .eq("active", true)
      .single();

    if (!data) return NextResponse.json({ valid: false, message: "Invalid or expired coupon code." });
    return NextResponse.json({ valid: true, discount: data.discount, code: data.code });
  }

  // Check if first order
  if (!email) return NextResponse.json({ isFirstOrder: true });
  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("customer_email", email.toLowerCase().trim());

  return NextResponse.json({ isFirstOrder: count === 0 });
}