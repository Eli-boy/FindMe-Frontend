import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, address, cart, subtotal, shipping, total, deliveryMethod, couponCode, discountAmount } = await req.json();

    /* ── 1. Save order to Supabase ── */
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
      })
      .select("order_number")
      .single();

    if (error) {
      console.error("Supabase error:", JSON.stringify(error));
      return NextResponse.json({ error: `Supabase: ${error.message} (code: ${error.code})` }, { status: 500 });
    }

    const orderNumber = order.order_number;

    /* ── 2. Fetch a next-order coupon to include in email ── */
    const { data: couponData } = await supabase
      .from("coupons")
      .select("code, discount")
      .eq("active", true)
      .neq("code", couponCode || "")   // don't repeat the same code they just used
      .order("discount", { ascending: false })
      .limit(1)
      .single();

    const nextCoupon = couponData || { code: "FINDME10", discount: 10 };

    /* ── 3. Build item rows for email ── */
    const itemRows = cart.map((item: any) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e8f0e8;font-size:14px;color:#2a4a2a;">${item.name}</td>
        <td style="padding:12px 0;border-bottom:1px solid #e8f0e8;font-size:14px;color:#2a4a2a;text-align:center;">x${item.quantity}</td>
        <td style="padding:12px 0;border-bottom:1px solid #e8f0e8;font-size:14px;color:#1a3a2a;font-weight:700;text-align:right;">&#8358;${(item.price * item.quantity).toLocaleString()}</td>
      </tr>`).join("");

    /* ── 4. Send confirmation email ── */
    await resend.emails.send({
      from: "FindMe <orders@findme.com.ng>",
      to: email,
      subject: `Order Confirmed — FindMe #${orderNumber}`,
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
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:13px;letter-spacing:2px;text-transform:uppercase;">Order Confirmation</p>
        </td></tr>

        <tr><td style="padding:40px;">
          <h2 style="margin:0 0 8px;color:#1a3a2a;font-size:22px;font-weight:700;">Hey ${name}! 👋</h2>
          <p style="margin:0 0 32px;color:#4a7a5a;font-size:15px;line-height:1.7;">Thank you for your order! We will be in touch via WhatsApp shortly.</p>

          <div style="background:#f0f7f0;border-radius:12px;padding:16px 20px;margin-bottom:32px;">
            <table width="100%"><tr>
              <td style="color:#4a7a5a;font-size:13px;">Order ID</td>
              <td style="text-align:right;color:#1a3a2a;font-weight:800;font-size:15px;">#${orderNumber}</td>
            </tr></table>
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
              <td style="padding:14px 0 6px;border-top:1.5px solid #e8f0e8;color:#1a3a2a;font-size:17px;font-weight:800;">Total</td>
              <td style="padding:14px 0 6px;border-top:1.5px solid #e8f0e8;text-align:right;color:#1db954;font-size:19px;font-weight:800;">&#8358;${total.toLocaleString()}</td>
            </tr>
          </table>

          <div style="background:#f0f7f0;border-radius:12px;padding:20px;margin-bottom:32px;">
            <p style="margin:0 0 8px;font-size:12px;color:#4a7a5a;text-transform:uppercase;letter-spacing:1px;font-weight:700;">${deliveryMethod === "pickup" ? "Fulfilment" : "Delivery Address"}</p>
            ${deliveryMethod === "pickup"
              ? `<p style="margin:0;color:#1a3a2a;font-size:14px;font-weight:700;">&#x1F3EA; Self Pickup — location shared via WhatsApp</p>`
              : `<p style="margin:0;color:#1a3a2a;font-size:14px;line-height:1.6;">&#x1F69A; ${address}</p>`
            }
          </div>

          <div style="border:2px dashed #1db954;border-radius:16px;padding:24px;text-align:center;margin-bottom:32px;background:#f8fff8;">
            <p style="margin:0 0 6px;font-size:12px;color:#4a7a5a;text-transform:uppercase;letter-spacing:2px;font-weight:700;">&#x1F389; ${nextCoupon.discount}% Off Your Next Order</p>
            <p style="margin:0 0 16px;font-size:13px;color:#4a7a5a;">Use this code on your next purchase:</p>
            <div style="background:#1a3a2a;color:#ffffff;padding:12px 28px;border-radius:8px;display:inline-block;font-size:18px;font-weight:800;letter-spacing:3px;">${nextCoupon.code}</div>
            <p style="margin:12px 0 0;font-size:12px;color:#4a7a5a;">Valid on all FindMe products at findme.com.ng</p>
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

    /* ── 5. Increment coupon used_count if a coupon was applied ── */
    if (couponCode) {
      try {
        await supabase.rpc("increment_coupon_usage", { coupon_code: couponCode });
      } catch (_) {}
    }

    return NextResponse.json({ orderNumber });

  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}