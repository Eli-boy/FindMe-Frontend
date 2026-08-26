import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";
import { webcrypto as crypto } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, password } = body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  /* ── ORDERS ── */
  if (action === "get_orders") {
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ orders: data });
  }

  if (action === "update_status") {
    const { error } = await supabase.from("orders").update({ status: body.status }).eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  /* ── MANUAL ORDER (admin-created, e.g. walk-in / WhatsApp orders) ── */
  if (action === "create_manual_order") {
    const o = body.order || {};

    if (!o.customer_name || !o.customer_email) {
      return NextResponse.json({ error: "Missing customer name or email" }, { status: 400 });
    }
    if (!Array.isArray(o.items) || o.items.length === 0) {
      return NextResponse.json({ error: "Order has no items" }, { status: 400 });
    }

    const base = {
      customer_name: String(o.customer_name),
      customer_email: String(o.customer_email),
      customer_phone: String(o.customer_phone || ""),
      delivery_address: String(o.delivery_address || ""),
      delivery_method: o.delivery_method === "pickup" ? "pickup" : "delivery",
      payment_method: String(o.payment_method || "bank_transfer"),
      payment_status: o.payment_status === "unpaid" ? "unpaid" : "paid",
      paid_at: o.payment_status === "paid" ? new Date().toISOString() : null,
      items: o.items,
      subtotal: Number(o.subtotal) || 0,
      total: Number(o.total) || 0,
      status: String(o.status || "packed"),
      order_type: "manual",
      created_at: new Date().toISOString(),
    };

    // Attempt 1: let the DB generate order_number (default/trigger) if it can
    let result = await supabase.from("orders").insert(base).select().single();

    // Attempt 2: table requires an explicit order_number → use max + 1
    if (result.error) {
      const { data: last } = await supabase
        .from("orders")
        .select("order_number")
        .order("order_number", { ascending: false })
        .limit(1);
      const nextNumber = (Number(last?.[0]?.order_number) || 0) + 1;

      const retry = await supabase
        .from("orders")
        .insert({ ...base, order_number: nextNumber })
        .select()
        .single();

      // Attempt 3: minimal columns (table may not have order_type / paid_at / created_at)
      if (retry.error) {
        const minimal = await supabase
          .from("orders")
          .insert({
            customer_name: base.customer_name,
            customer_email: base.customer_email,
            customer_phone: base.customer_phone,
            delivery_address: base.delivery_address,
            delivery_method: base.delivery_method,
            payment_method: base.payment_method,
            payment_status: base.payment_status,
            items: base.items,
            subtotal: base.subtotal,
            total: base.total,
            status: base.status,
            order_number: nextNumber,
          })
          .select()
          .single();

        if (minimal.error) {
          console.error("create_manual_order error:", minimal.error);
          return NextResponse.json({ error: minimal.error.message }, { status: 500 });
        }
        return NextResponse.json({ order: minimal.data });
      }
      return NextResponse.json({ order: retry.data });
    }

    return NextResponse.json({ order: result.data });
  }

  /* ── CMS ── */
  if (action === "get_cms") {
    const { data, error } = await supabase.from("cms").select("*");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ cms: data });
  }

  if (action === "save_cms") {
    const { error } = await supabase.from("cms").upsert({ key: body.key, value: body.value, updated_at: new Date().toISOString() }, { onConflict: "key" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  /* ── PRODUCTS ── */
  if (action === "get_products") {
    const { data, error } = await supabase.from("products").select("*").order("sort_order");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ products: data });
  }

  if (action === "save_product") {
    const { id, ...fields } = body.product;
    const { error } = await supabase.from("products").update(fields).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  /* ── TESTIMONIALS ── */
  if (action === "get_testimonials") {
    const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ testimonials: data });
  }

  if (action === "save_testimonial") {
    const { id, ...fields } = body.testimonial;
    const { error } = await supabase.from("testimonials").update(fields).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  /* ── FAQs ── */
  if (action === "get_faqs") {
    const { data, error } = await supabase.from("faqs").select("*").order("sort_order");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ faqs: data });
  }

  if (action === "save_faq") {
    const { id, ...fields } = body.faq;
    const { error } = await supabase.from("faqs").update(fields).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  /* ── COUPONS ── */
  if (action === "get_coupons") {
    const { data, error } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ coupons: data });
  }

  if (action === "save_coupon") {
    const { id, ...fields } = body.coupon;
    const { error } = await supabase.from("coupons").update(fields).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (action === "create_coupon") {
    const { data, error } = await supabase
      .from("coupons")
      .insert({ code: body.coupon.code, discount: body.coupon.discount, active: true, used_count: 0 })
      .select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ coupon: data });
  }

  if (action === "delete_coupon") {
    const { error } = await supabase.from("coupons").delete().eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  /* ── GENERATE QR BATCH ── */
  if (action === "generate_qr_batch") {
    const count = Math.min(Number(body.count) || 100, 300); // max 300 per call

    // Generate all codes at once
    const now = new Date().toISOString();
    const rows = Array.from({ length: count }, () => {
      const code = Array.from(crypto.getRandomValues(new Uint8Array(6)))
        .map((b: number) => b.toString(16).padStart(2, "0"))
        .join("");
      return { code, is_linked: false, created_at: now };
    });

    // Bulk insert in one Supabase call — much faster than one by one
    const { data, error } = await supabase
      .from("qr_codes")
      .insert(rows)
      .select("code");

    if (error) {
      console.error("Bulk insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const codes = (data || []).map((r: any) => r.code);
    return NextResponse.json({ codes, count: codes.length });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
