import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { orderId, password } = await req.json();

    if (password !== (process.env.ADMIN_PASSWORD || "findme2026")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    /* ── Get pickup location from CMS ── */
    const { data: cmsRow } = await supabase
      .from("cms")
      .select("value")
      .eq("key", "pickup_location")
      .maybeSingle();

    const pickupLocation = cmsRow?.value || "FindMe Office — location shared via WhatsApp";

    const isPickup = order.delivery_method === "pickup";

    /* ── Build email content based on delivery method ── */
    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f0f7f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7f0;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(26,58,42,0.08);">

        <tr><td style="background:#1a3a2a;padding:36px 40px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;">Find<span style="color:#1db954;">Me</span></h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:13px;letter-spacing:2px;text-transform:uppercase;">${isPickup ? "Order Ready for Pickup 📦" : "Order Out for Delivery 🚚"}</p>
        </td></tr>

        <tr><td style="padding:40px;">
          <h2 style="margin:0 0 8px;color:#1a3a2a;font-size:22px;font-weight:700;">Hey ${order.customer_name}! 🎉</h2>

          ${isPickup ? `
          <p style="margin:0 0 24px;color:#4a7a5a;font-size:15px;line-height:1.7;">Great news — your order <strong>#${order.order_number}</strong> is packed and ready for pickup!</p>

          <div style="border:2px dashed #1db954;border-radius:16px;padding:24px;text-align:center;margin-bottom:24px;background:#f8fff8;">
            <p style="margin:0 0 6px;font-size:12px;color:#4a7a5a;text-transform:uppercase;letter-spacing:2px;font-weight:700;">Your Pickup Code</p>
            <div style="background:#1a3a2a;color:#ffffff;padding:14px 32px;border-radius:8px;display:inline-block;font-size:24px;font-weight:800;letter-spacing:6px;">${order.pickup_code || "N/A"}</div>
            <p style="margin:14px 0 0;font-size:12px;color:#4a7a5a;">Show this code when you arrive</p>
          </div>

          <div style="background:#f0f7f0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0 0 6px;font-size:11px;color:#4a7a5a;text-transform:uppercase;letter-spacing:1px;font-weight:700;">📍 Pickup Location</p>
            <p style="margin:0;color:#1a3a2a;font-size:14px;line-height:1.6;">${pickupLocation}</p>
          </div>
          ` : `
          <p style="margin:0 0 24px;color:#4a7a5a;font-size:15px;line-height:1.7;">Great news — your order <strong>#${order.order_number}</strong> has been packed and is now out for delivery!</p>

          <div style="background:#f0f7f0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0 0 6px;font-size:11px;color:#4a7a5a;text-transform:uppercase;letter-spacing:1px;font-weight:700;">🚚 Delivery Address</p>
            <p style="margin:0;color:#1a3a2a;font-size:14px;line-height:1.6;">${order.delivery_address}</p>
          </div>

          <p style="margin:0 0 24px;color:#4a7a5a;font-size:14px;line-height:1.7;">Our delivery partner will contact you shortly via WhatsApp to confirm timing.</p>
          `}

          <div style="text-align:center;">
            <a href="https://wa.me/2348073238118" style="display:inline-block;background:#1a3a2a;color:#ffffff;padding:14px 36px;border-radius:40px;text-decoration:none;font-weight:700;font-size:15px;">Chat With Us →</a>
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
</html>`;

    await resend.emails.send({
      from: "FindMe <orders@findme.com.ng>",
      to: order.customer_email,
      subject: isPickup
        ? `Your FindMe Order #${order.order_number} is Ready for Pickup!`
        : `Your FindMe Order #${order.order_number} is Out for Delivery!`,
      html,
    });

    await supabase
      .from("orders")
      .update({ ready_notified_at: new Date().toISOString() })
      .eq("id", orderId);

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Order ready email error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}