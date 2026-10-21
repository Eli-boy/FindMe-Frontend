import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

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
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7f0;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(26,58,42,0.08);">

        <tr><td style="background:#1a3a2a;padding:36px 40px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;">Find<span style="color:#1db954;">Me</span></h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:13px;letter-spacing:2px;text-transform:uppercase;">Payment Confirmed ✅</p>
        </td></tr>

        <tr><td style="padding:40px;">
          <h2 style="margin:0 0 8px;color:#1a3a2a;font-size:22px;font-weight:700;">Hey ${customerName}! 🎉</h2>
          <p style="margin:0 0 32px;color:#4a7a5a;font-size:15px;line-height:1.7;">Your payment has been received! We're preparing your order and will be in touch via WhatsApp shortly.</p>

          <div style="background:#f0f7f0;border-radius:12px;padding:16px 20px;margin-bottom:32px;">
            <table width="100%">
              <tr>
                <td style="color:#4a7a5a;font-size:13px;">Order ID</td>
                <td style="text-align:right;color:#1a3a2a;font-weight:800;font-size:15px;">#${orderNumber}</td>
              </tr>
              <tr>
                <td style="color:#4a7a5a;font-size:13px;padding-top:8px;">Pickup Code</td>
                <td style="text-align:right;color:#1db954;font-weight:800;font-size:18px;letter-spacing:2px;">${pickupCode}</td>
              </tr>
            </table>
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <thead><tr>
              <th style="text-align:left;font-size:12px;color:#4a7a5a;text-transform:uppercase;letter-spacing:1px;padding-bottom:12px;border-bottom:2px solid #e8f0e8;">Item</th>
              <th style="text-align:center;font-size:12px;color:#4a7a5a;text-transform:uppercase;letter-spacing:1px;padding-bottom:12px;border-bottom:2px solid #e8f0e8;">Qty</th>
              <th style="text-align:right;font-size:12px;color:#4a7a5a;text-transform:uppercase;letter-spacing:1px;padding-bottom:12px;border-bottom:2px solid #e8f0e8;">Price</th>
            </tr></thead>
            <tbody>${itemRows}</tbody>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr>
              <td style="padding:14px 0 6px;border-top:1.5px solid #e8f0e8;color:#1a3a2a;font-size:17px;font-weight:800;">Total Paid</td>
              <td style="padding:14px 0 6px;border-top:1.5px solid #e8f0e8;text-align:right;color:#1db954;font-size:19px;font-weight:800;">&#8358;${total?.toLocaleString()}</td>
            </tr>
          </table>

          <div style="background:#f0f7f0;border-radius:12px;padding:20px;margin-bottom:32px;">
            <p style="margin:0 0 8px;font-size:12px;color:#4a7a5a;text-transform:uppercase;letter-spacing:1px;font-weight:700;">${deliveryMethod === "pickup" ? "Fulfilment" : "Delivery Address"}</p>
            ${
              deliveryMethod === "pickup"
                ? `<p style="margin:0;color:#1a3a2a;font-size:14px;font-weight:700;">🏪 Self Pickup — location shared via WhatsApp</p>`
                : `<p style="margin:0;color:#1a3a2a;font-size:14px;line-height:1.6;">🚚 ${deliveryAddress}</p>`
            }
          </div>

          <div style="text-align:center;">
            <a href="https://findme.com.ng/shop" style="display:inline-block;background:#1a3a2a;color:#ffffff;padding:14px 36px;border-radius:40px;text-decoration:none;font-weight:700;font-size:15px;">Shop More →</a>
          </div>
        </td></tr>

        <tr><td style="background:#f0f7f0;padding:24px 40px;text-align:center;border-top:1px solid #e0ede0;">
          <p style="margin:0 0 6px;font-size:13px;color:#4a7a5a;">Questions? Chat with us on WhatsApp</p>
          <a href="https://wa.me/2348073238118" style="color:#1db954;font-weight:700;font-size:13px;text-decoration:none;">+234 807 323 8118</a>
          <p style="margin:12px 0 0;font-size:12px;color:#aaa;">© 2026 FindMe Nigeria · findme.com.ng</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
      });
    } catch (emailErr) {
      console.error("Webhook: failed to send customer email", emailErr);
    }
  }

  // ── 9. Send admin notification email ──
  const adminEmail = process.env.ADMIN_EMAIL || "support@findme.com.ng";
  try {
    await resend.emails.send({
      from: "FindMe Orders <orders@findme.com.ng>",
      to: adminEmail,
      subject: `💰 New Paid Order #${orderNumber} — ₦${total?.toLocaleString()}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f0f7f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7f0;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(26,58,42,0.08);">

        <tr><td style="background:#1a3a2a;padding:28px 40px;text-align:center;">
          <h1 style="margin:0;color:#1db954;font-size:22px;font-weight:800;">💰 New Paid Order!</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">FindMe Admin Alert</p>
        </td></tr>

        <tr><td style="padding:32px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td style="padding:8px 0;border-bottom:1px solid #e8f0e8;color:#4a7a5a;font-size:14px;">Order #</td>
                <td style="padding:8px 0;border-bottom:1px solid #e8f0e8;text-align:right;color:#1a3a2a;font-weight:700;">#${orderNumber}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e8f0e8;color:#4a7a5a;font-size:14px;">Customer</td>
                <td style="padding:8px 0;border-bottom:1px solid #e8f0e8;text-align:right;color:#1a3a2a;font-weight:700;">${customerName}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e8f0e8;color:#4a7a5a;font-size:14px;">Email</td>
                <td style="padding:8px 0;border-bottom:1px solid #e8f0e8;text-align:right;color:#1a3a2a;">${customerEmail || "—"}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e8f0e8;color:#4a7a5a;font-size:14px;">Phone</td>
                <td style="padding:8px 0;border-bottom:1px solid #e8f0e8;text-align:right;color:#1a3a2a;">${customerPhone || "—"}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e8f0e8;color:#4a7a5a;font-size:14px;">Delivery</td>
                <td style="padding:8px 0;border-bottom:1px solid #e8f0e8;text-align:right;color:#1a3a2a;">${deliveryMethod === "pickup" ? "Self Pickup" : deliveryAddress}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e8f0e8;color:#4a7a5a;font-size:14px;">Pickup Code</td>
                <td style="padding:8px 0;border-bottom:1px solid #e8f0e8;text-align:right;color:#1db954;font-weight:800;font-size:16px;letter-spacing:2px;">${pickupCode}</td></tr>
            <tr><td style="padding:12px 0 0;color:#1a3a2a;font-size:16px;font-weight:800;">TOTAL PAID</td>
                <td style="padding:12px 0 0;text-align:right;color:#1db954;font-size:20px;font-weight:800;">₦${total?.toLocaleString()}</td></tr>
          </table>

          <h3 style="color:#1a3a2a;font-size:14px;margin:0 0 12px;">Items Ordered:</h3>
          <table width="100%">${itemRows}</table>

          <div style="margin-top:28px;text-align:center;">
            <a href="https://www.findme.com.ng/admin" style="display:inline-block;background:#1a3a2a;color:#ffffff;padding:12px 32px;border-radius:40px;text-decoration:none;font-weight:700;font-size:14px;">Open Admin Dashboard →</a>
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });
  } catch (adminEmailErr) {
    console.error("Webhook: failed to send admin email", adminEmailErr);
  }

  // ── 10. Send admin WhatsApp notification ──
  const adminWhatsApp = process.env.ADMIN_WHATSAPP_NUMBER;
  if (adminWhatsApp) {
    try {
      const Twilio = require("twilio");
      const twilioClient = Twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      const fromNumber = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";

      const itemSummary = items
        .map((i: any) => `• ${i.name} x${i.quantity}`)
        .join("\n");

      await twilioClient.messages.create({
        from: fromNumber,
        to: `whatsapp:${adminWhatsApp}`,
        body: `💰 *New Paid Order!*\n\n*Order #${orderNumber}*\n*Customer:* ${customerName}\n*Phone:* ${customerPhone || "—"}\n*Delivery:* ${deliveryMethod === "pickup" ? "Self Pickup" : deliveryAddress}\n*Pickup Code:* ${pickupCode}\n\n*Items:*\n${itemSummary}\n\n*Total:* ₦${total?.toLocaleString()}\n\nView: https://www.findme.com.ng/admin`,
      });
    } catch (waErr) {
      console.error("Webhook: failed to send admin WhatsApp", waErr);
    }
  }

  console.log(`Webhook: order #${orderNumber} marked paid, pickup code ${pickupCode}`);
  return NextResponse.json({ received: true });
}