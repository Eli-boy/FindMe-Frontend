import { Suspense } from "react";
import OrderSuccessClient from "./OrderSuccessClient";

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            background: "#c8dfc8",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Syne, sans-serif",
              color: "#1a3a2a",
              fontSize: 18,
            }}
          >
            Loading...
          </p>
        </div>
      }
    >
      <OrderSuccessClient />
    </Suspense>
  );
}
