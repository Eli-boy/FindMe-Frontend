"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../CartContext";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();

  /* ================= TOTAL ================= */
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleWhatsAppCheckout = () => {
  if (cart.length === 0) return;

  const phoneNumber = "2348151171029"; // 🔥 replace with your number

  const message = cart
    .map(
      (item) =>
        `- ${item.name} x${item.quantity} (₦${(
          item.price * item.quantity
        ).toLocaleString()})`
    )
    .join("\n");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const finalMessage = `Hello, I want to order:\n\n${message}\n\nTotal: ₦${total.toLocaleString()}`;

  const encodedMessage = encodeURIComponent(finalMessage);

  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
};

  return (
    <div className="bg-[#f7f5f2] min-h-screen px-6 md:px-10 py-20">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Your Cart</h1>

      {/* EMPTY STATE */}
      {cart.length === 0 && (
        <div className="text-center mt-20">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Your cart is empty 🛒
          </h2>

          <Link
            href="/shop"
            className="bg-green-700 text-white px-6 py-3 rounded-full hover:scale-105 transition"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {/* CART CONTENT */}
      {cart.length > 0 && (
        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT - ITEMS */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 bg-white p-4 rounded-xl shadow hover:shadow-xl transition"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={80}
                  className="w-24 h-auto object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-gray-600">
                    ₦{item.price.toLocaleString()}
                  </p>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition text-gray-800"
                    >
                      −
                    </button>

                    <span className="text-gray-800 font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition text-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-28">

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mb-4 text-gray-800">
              <span>Total</span>
              <span className="font-bold text-lg">
                ₦{total.toLocaleString()}
              </span>
            </div>

            <button
                onClick={handleWhatsAppCheckout}
                className="bg-green-700 text-white w-full py-3 rounded-full hover:scale-105 hover:shadow-lg transition"
                >
                Checkout via WhatsApp
            </button>

            <button
              onClick={clearCart}
              className="text-red-500 text-sm w-full hover:underline"
            >
              Clear Cart
            </button>
          </div>

        </div>
      )}
    </div>
  );
}