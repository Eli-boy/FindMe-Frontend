import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

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

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}