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

    const phoneNumber = "2348151171029";

    const message = cart
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} (₦${(
            item.price * item.quantity
          ).toLocaleString()})`
      )
      .join("\n");

    const finalMessage = `Hello, I want to order:\n\n${message}\n\nTotal: ₦${total.toLocaleString()}`;

    const encodedMessage = encodeURIComponent(finalMessage);

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="bg-[#f7f5f2] min-h-screen px-6 md:px-12 py-24">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-12 text-gray-900 text-center">
        Your Cart
      </h1>

      {/* EMPTY STATE */}
      {cart.length === 0 && (
        <div className="text-center mt-20">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            Your cart is empty 🛒
          </h2>

          <Link
            href="/shop"
            className="bg-green-700 text-white px-8 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {/* CART CONTENT */}
      {cart.length > 0 && (
        <div className="grid md:grid-cols-3 gap-12">

          {/* LEFT - ITEMS */}
          <div className="md:col-span-2 space-y-6">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
              >
                {/* IMAGE */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={110}
                  height={90}
                  className="w-28 h-auto object-contain"
                />

                {/* INFO */}
                <div className="flex-1">

                  <h3 className="font-semibold text-gray-900 text-lg">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Smart recovery tag
                  </p>

                  <p className="text-gray-800 font-medium mt-1">
                    ₦{item.price.toLocaleString()}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    >
                      −
                    </button>

                    <span className="font-medium text-gray-800">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition"
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
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit sticky top-28">

            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3 text-gray-600">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mb-6 text-gray-900 text-lg font-semibold">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

            {/* CHECKOUT */}
            <button
              onClick={handleWhatsAppCheckout}
              className="bg-green-700 text-white w-full py-3 rounded-full hover:scale-105 hover:shadow-lg transition duration-200 mb-4"
            >
              Checkout via WhatsApp
            </button>

            {/* CLEAR */}
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