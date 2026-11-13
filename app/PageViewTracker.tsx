"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/* Sends a GA4 page_view on every client-side route change.
   The initial page_view is already sent by the gtag config in layout.tsx. */
export default function PageViewTracker() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "page_view", { page_path: pathname });
    }
  }, [pathname]);

  return null;
}
