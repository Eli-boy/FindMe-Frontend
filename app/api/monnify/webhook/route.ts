import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);
const SECRET_KEY = process.env.MONNIFY_SECRET_KEY!;

/* ── Verify Monnify webhook signature ── */
function verifySignature(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac("sha512", SECRET_KEY)
    .update(body)
    .digest("hex");
  return hash.toLowerCase() === signature.toLowerCase();
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("monnify-signature") || "";

    /* ── Verify signature ── */
    if (!verifySignature(rawBody, signature)) {
      console.error("Invalid Monnify webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const { eventType, eventData } = event;

    /* ── Only process successful payments ── */
    if (eventType !== "SUCCESSFUL_TRANSACTION") {
      return NextResponse.json({ received: true });
    }

    const {
      paymentReference,
      amountPaid,
      paidOn,
      customer,
    } = eventData;

    /* ── Find the order by payment reference ── */
    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("payment_reference", paymentReference)
      .single();

    if (error || !order) {
      console.error("Order not found for reference:", paymentReference);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    /* ── Generate pickup code if this is a self-pickup order ── */
    const pickupCode = order.delivery_method === "pickup"
      ? Math.floor(100000 + Math.random() * 900000).toString()
      : null;

    /* ── Update order to paid ── */
    await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        paid_at: paidOn || new Date().toISOString(),
        status: "pending", // now ready to fulfil
        ...(pickupCode ? { pickup_code: pickupCode } : {}),
      })
      .eq("payment_reference", paymentReference);

    /* ── Increment coupon usage if applicable ── */
    if (order.coupon_code) {
      try {
        await supabase.rpc("increment_coupon_usage", { coupon_code: order.coupon_code });
      } catch (_) {}
    }

    /* ── Fetch next-order coupon for email ── */
    const { data: couponData } = await supabase
      .from("coupons")
      .select("code, discount")
      .eq("active", true)
      .neq("code", order.coupon_code || "")
      .order("discount", { ascending: false })
      .limit(1)
      .single();

    const nextCoupon = couponData || { code: "FINDME10", discount: 10 };

    /* ── Build email item rows ── */
    const items = order.items || [];
    const itemRows = items.map((item: any) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #e8f0e8;font-size:14px;color:#2a4a2a;">${item.name}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e8f0e8;font-size:14px;color:#2a4a2a;text-align:center;">x${item.quantity}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e8f0e8;font-size:14px;font-weight:700;text-align:right;color:#1a3a2a;">&#8358;${(item.price * item.quantity).toLocaleString()}</td>
      </tr>`).join("");

    /* ── Send confirmation email ── */
    await resend.emails.send({
      from: "FindMe <orders@findme.com.ng>",
      to: order.customer_email,
      subject: `Payment Confirmed — FindMe Order #${order.order_number}`,
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
          <h2 style="margin:0 0 8px;color:#1a3a2a;font-size:22px;font-weight:700;">Hey ${order.customer_name}! 🎉</h2>
          <p style="margin:0 0 24px;color:#4a7a5a;font-size:15px;line-height:1.7;">Your payment of <strong>&#8358;${Number(amountPaid).toLocaleString()}</strong> has been confirmed. We will be in touch via WhatsApp to arrange ${order.delivery_method === "pickup" ? "pickup" : "delivery"}.</p>

          <div style="background:#f0f7f0;border-radius:12px;padding:14px 20px;margin-bottom:24px;">
            <table width="100%">
              <tr>
                <td style="color:#4a7a5a;font-size:13px;">Order Number</td>
                <td style="text-align:right;color:#1a3a2a;font-weight:800;font-size:15px;">#${order.order_number}</td>
              </tr>
              <tr>
                <td style="color:#4a7a5a;font-size:13px;padding-top:6px;">Payment Status</td>
                <td style="text-align:right;color:#1db954;font-weight:800;font-size:14px;padding-top:6px;">PAID ✅</td>
              </tr>
            </table>
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            <thead><tr>
              <th style="text-align:left;font-size:11px;color:#4a7a5a;text-transform:uppercase;letter-spacing:1px;padding-bottom:10px;border-bottom:2px solid #e8f0e8;">Item</th>
              <th style="text-align:center;font-size:11px;color:#4a7a5a;text-transform:uppercase;letter-spacing:1px;padding-bottom:10px;border-bottom:2px solid #e8f0e8;">Qty</th>
              <th style="text-align:right;font-size:11px;color:#4a7a5a;text-transform:uppercase;letter-spacing:1px;padding-bottom:10px;border-bottom:2px solid #e8f0e8;">Price</th>
            </tr></thead>
            <tbody>${itemRows}</tbody>
          </table>

          ${order.discount_amount > 0 ? `
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">
            <tr>
              <td style="color:#4a7a5a;font-size:13px;">Subtotal</td>
              <td style="text-align:right;color:#2a4a2a;font-size:13px;">&#8358;${Number(order.subtotal).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="color:#1db954;font-size:13px;">Discount (${order.coupon_code})</td>
              <td style="text-align:right;color:#1db954;font-size:13px;font-weight:700;">-&#8358;${Number(order.discount_amount).toLocaleString()}</td>
            </tr>
          </table>` : ""}

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
              <td style="padding:12px 0 6px;border-top:1.5px solid #e8f0e8;color:#1a3a2a;font-size:17px;font-weight:800;">Total Paid</td>
              <td style="padding:12px 0 6px;border-top:1.5px solid #e8f0e8;text-align:right;color:#1db954;font-size:19px;font-weight:800;">&#8358;${Number(order.total).toLocaleString()}</td>
            </tr>
          </table>

          <div style="background:#f0f7f0;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
            <p style="margin:0 0 6px;font-size:11px;color:#4a7a5a;text-transform:uppercase;letter-spacing:1px;font-weight:700;">${order.delivery_method === "pickup" ? "Pickup" : "Delivery Address"}</p>
            <p style="margin:0;color:#1a3a2a;font-size:14px;">${order.delivery_method === "pickup" ? "&#x1F3EA; Self Pickup — we will share location via WhatsApp" : "&#x1F69A; " + order.delivery_address}</p>
          </div>

          <div style="border:2px dashed #1db954;border-radius:16px;padding:20px;text-align:center;margin-bottom:28px;background:#f8fff8;">
            <p style="margin:0 0 4px;font-size:11px;color:#4a7a5a;text-transform:uppercase;letter-spacing:2px;font-weight:700;">&#x1F389; ${nextCoupon.discount}% Off Your Next Order</p>
            <p style="margin:0 0 12px;font-size:13px;color:#4a7a5a;">Use this code at checkout:</p>
            <div style="background:#1a3a2a;color:#ffffff;padding:10px 24px;border-radius:8px;display:inline-block;font-size:18px;font-weight:800;letter-spacing:3px;">${nextCoupon.code}</div>
          </div>

          <div style="text-align:center;">
            <a href="https://findme.com.ng/shop" style="display:inline-block;background:#1a3a2a;color:#ffffff;padding:14px 36px;border-radius:40px;text-decoration:none;font-weight:700;font-size:15px;">Shop More →</a>
          </div>
        </td></tr>

        <tr><td style="background:#f0f7f0;padding:20px 40px;text-align:center;border-top:1px solid #e0ede0;">
          <p style="margin:0 0 4px;font-size:13px;color:#4a7a5a;">Questions? Chat with us on WhatsApp</p>
          <a href="https://wa.me/2348073238118" style="color:#1db954;font-weight:700;font-size:13px;text-decoration:none;">+234 807 323 8118</a>
          <p style="margin:10px 0 0;font-size:11px;color:#aaa;">© 2026 FindMe Nigeria · findme.com.ng</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}