import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const MONNIFY_BASE = process.env.MONNIFY_BASE_URL || "https://sandbox.monnify.com";
const API_KEY      = process.env.MONNIFY_API_KEY!;
const SECRET_KEY   = process.env.MONNIFY_SECRET_KEY!;
const CONTRACT     = process.env.MONNIFY_CONTRACT_CODE!;

/* ── Get Monnify access token ── */
async function getToken(): Promise<string> {
  const credentials = Buffer.from(`${API_KEY}:${SECRET_KEY}`).toString("base64");
  const res = await fetch(`${MONNIFY_BASE}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!data.responseBody?.accessToken) {
    throw new Error("Monnify auth failed: " + JSON.stringify(data));
  }
  return data.responseBody.accessToken;
}

export async function POST(req: NextRequest) {
  try {
    const {
      name, email, phone, address,
      cart, subtotal, total, deliveryMethod,
      couponCode, discountAmount,
    } = await req.json();

    /* ── 1. Save order to Supabase as unpaid ── */
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        delivery_address: deliveryMethod === "pickup" ? "Self Pickup" : address,
        delivery_method: deliveryMethod,
        items: cart,
        subtotal,
        shipping: 0,
        discount_amount: discountAmount || 0,
        coupon_code: couponCode || null,
        total,
        status: "pending",
        payment_status: "unpaid",
      })
      .select("id, order_number")
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    /* ── 2. Get Monnify token ── */
    const token = await getToken();

    /* ── 3. Initiate Monnify payment ── */
    const reference = `FINDME-${order.order_number}-${Date.now()}`;

    const payload = {
      amount: total,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      paymentReference: reference,
      paymentDescription: `FindMe Order #${order.order_number}`,
      currencyCode: "NGN",
      contractCode: CONTRACT,
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://findme.com.ng"}/order-success?ref=${reference}&order=${order.order_number}`,
      paymentMethods: ["CARD", "ACCOUNT_TRANSFER", "USSD"],
    };

    const monnifyRes = await fetch(`${MONNIFY_BASE}/api/v1/merchant/transactions/init-transaction`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const monnifyData = await monnifyRes.json();

    if (!monnifyData.responseBody?.checkoutUrl) {
      console.error("Monnify error:", monnifyData);
      return NextResponse.json({ error: "Payment initiation failed", details: monnifyData }, { status: 500 });
    }

    /* ── 4. Save payment reference to order ── */
    await supabase
      .from("orders")
      .update({ payment_reference: reference })
      .eq("id", order.id);

    return NextResponse.json({
      checkoutUrl: monnifyData.responseBody.checkoutUrl,
      reference,
      orderNumber: order.order_number,
    });

  } catch (err: any) {
    console.error("Monnify initiate error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}