import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

function generatePickupCode(): string {
  return "FM-" + Math.random().toString(36).substring(2, 7).toUpperCase();
}

export async function POST(req: NextRequest) {
  // ── 1. Read raw body for signature verification ──
  const rawBody = await req.text();

  // ── 2. Verify Paystack signature ──
  const paystackSecret = process.env.PAYSTACK_SECRET_KEY!;
  const hash = crypto
    .createHmac("sha512", paystackSecret)
    .update(rawBody)
    .digest("hex");

  const signature = req.headers.get("x-paystack-signature") || "";

  if (hash !== signature) {
    console.error("Paystack webhook: invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  console.log("Paystack webhook event:", event.event, event.data?.reference);

  // ── 3. Only handle successful charge ──
  if (event.event !== "charge.success") {
    return NextResponse.json({ received: true });
  }

  const { reference, amount, customer, metadata } = event.data;
  const amountPaid = amount / 100; // Paystack sends in kobo

  // ── 4. Find the order by payment_reference ──
  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_reference", reference)
    .single();

  if (fetchError || !order) {
    console.error("Webhook: order not found for reference", reference, fetchError);
    // Still return 200 so Paystack doesn't retry
    return NextResponse.json({ received: true });
  }

  // ── 5. Skip if already marked paid (idempotency) ──
  if (order.payment_status === "paid") {
    console.log("Webhook: order already paid, skipping", order.id);
    return NextResponse.json({ received: true });
  }

  const pickupCode = generatePickupCode();
  const now = new Date().toISOString();

  // ── 6. Mark order as paid ──
  const { error: updateError } = await supabase
    .from("orders")
    .update({
      payment_status: "paid",
      status: "pending",
      pickup_code: pickupCode,
      paid_at: now,
    })
    .eq("id", order.id);

  if (updateError) {
    console.error("Webhook: failed to update order", updateError);
    return NextResponse.json({ error: "DB update failed" }, { status: 500 });
  }

  const customerName = order.customer_name || customer?.first_name || "Customer";
  const customerEmail = order.customer_email || customer?.email;
  const customerPhone = order.customer_phone;
  const deliveryMethod = order.delivery_method;
  const deliveryAddress = order.delivery_address;
  const items = order.items || [];
  const total = order.total;
  const orderNumber = order.order_number;

  // ── 7. Build item rows for email ──
  const itemRows = items
    .map(
      (item: any) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e8f0e8;font-size:14px;color:#2a4a2a;">${item.name}</td>
        <td style="padding:12px 0;border-bottom:1px solid #e8f0e8;font-size:14px;color:#2a4a2a;text-align:center;">x${item.quantity}</td>
        <td style="padding:12px 0;border-bottom:1px solid #e8f0e8;font-size:14px;color:#1a3a2a;font-weight:700;text-align:right;">&#8358;${(item.price * item.quantity).toLocaleString()}</td>
      </tr>`
    )
    .join("");

  // ── 8. Send customer confirmation email ──
  if (customerEmail) {
    try {
      await resend.emails.send({
        from: "FindMe <orders@findme.com.ng>",
        to: customerEmail,
        subject: `Payment Confirmed — FindMe #${orderNumber}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f0f7f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellp