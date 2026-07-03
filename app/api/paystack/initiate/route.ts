import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

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

    const reference = `FINDME-${order.order_number}-${Date.now()}`;

    /* ── 2. Initiate Paystack payment ── */
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(total * 100), // Paystack uses kobo (smallest unit)
        reference,
        currency: "NGN",
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-success?ref=${reference}&order=${order.order_number}`,
        metadata: {
          order_id: order.id,
          order_number: order.order_number,
          customer_name: name,
          customer_phone: phone,
          cancel_action: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
        },
        channels: ["card", "bank", "ussd", "bank_transfer"],
      }),
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status || !paystackData.data?.authorization_url) {
      console.error("Paystack error:", paystackData);
      return NextResponse.json({
        error: "Payment initiation failed",
        message: paystackData.message || "Unknown error",
      }, { status: 500 });
    }

    /* ── 3. Save reference to order ── */
    await supabase
      .from("orders")
      .update({ payment_reference: reference })
      .eq("id", order.id);

    return NextResponse.json({
      checkoutUrl: paystackData.data.authorization_url,
      reference,
      orderNumber: order.order_number,
    });

  } catch (err: any) {
    console.error("Paystack initiate error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}