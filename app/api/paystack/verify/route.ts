import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import { fulfillPaidOrder } from "../fulfillment";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref");
  if (!ref) return NextResponse.json({ paid: false });

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_reference", ref)
    .single();

  if (!order) return NextResponse.json({ paid: false });

  let paid = order.payment_status === "paid";

  // Fallback: if the webhook hasn't fired (or failed), verify directly
  // with Paystack and fulfill the order ourselves.
  if (!paid) {
    try {
      const psRes = await fetch(
        `https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`,
        { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } }
      );
      const psData = await psRes.json();
      const tx = psData?.data;

      const amountMatches =
        tx?.amount == null ||
        order.total == null ||
        Math.round(order.total * 100) === tx.amount;

      if (tx?.status === "success" && amountMatches) {
        console.log(`Verify: Paystack confirms ${ref} paid — fulfilling order ${order.id}`);
        paid = await fulfillPaidOrder(order);
        if (!paid) {
          // Another caller (webhook/poll) already fulfilled it
          const { data: fresh } = await supabase
            .from("orders")
            .select("payment_status")
            .eq("id", order.id)
            .single();
          paid = fresh?.payment_status === "paid";
        }
      } else if (tx?.status === "success" && !amountMatches) {
        console.error(
          `Verify: amount mismatch for ${ref} — paid ${tx.amount} kobo vs order total ${order.total}`
        );
      }
    } catch (e) {
      console.error("Verify: Paystack check failed", e);
    }
  }

  return NextResponse.json({
    paid,
    total: order.total ?? 0,
    items: order.items ?? [],
    coupon_code: order.coupon_code ?? null,
    order_number: order.order_number ?? null,
  });
}
