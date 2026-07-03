import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref");
  if (!ref) return NextResponse.json({ paid: false });

  const { data } = await supabase
    .from("orders")
    .select("payment_status")
    .eq("payment_reference", ref)
    .single();

  return NextResponse.json({ paid: data?.payment_status === "paid" });
}