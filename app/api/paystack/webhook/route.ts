import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import { fulfillPaidOrder } from "../fulfillment";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  let event: any;

  try {
    const rawBody = await req.text();
    event = JSON.parse(rawBody);
  } catch (e) {
    console.error("Webhook: failed to parse body", e);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  console.log("Webhook received:", event.event, event.data?.reference);

  // Only handle successful charge
  if (event.event !== "charge.success" || event.data?.status !== "success") {
    return NextResponse.json({ received: true });
  }

  const { reference, amount } = event.data;

  // Find the order by payment_reference
  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_reference", reference)
    .single();

  if (fetchError || !order) {
    console.error("Webhook: order not found for reference", reference, fetchError);
    return NextResponse.json({ received: true });
  }

  // Sanity check: Paystack amounts are in kobo; order.total is in naira
  if (amount != null && order.total != null && Math.round(order.total * 100) !== amount) {
    console.warn(
      `Webhook: amount mismatch for ${reference} — paid ${amount} kobo vs order total ${order.total}`
    );
  }

  await fulfillPaidOrder(order);

  return NextResponse.json({ received: true });
}
