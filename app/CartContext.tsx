"use client";

import { createContext, useContext, useEffect, useState } from "react";

/* ================= TYPES ================= */
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  total: number;
  itemCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
};

/* ================= CONTEXT ================= */
const CartContext = createContext<CartContextType | null>(null);

/* ================= PROVIDER ================= */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  /* ================= LOAD FROM STORAGE ================= */
  useEffect(() => {
    const savedCart = localStorage.getItem("findme-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  /* ================= SAVE TO STORAGE ================= */
  useEffect(() => {
    localStorage.setItem("findme-cart", JSON.stringify(cart));
  }, [cart]);

  /* ================= ADD ================= */
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /* ================= REMOVE ================= */
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  /* ================= INCREASE ================= */
  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /* ================= DECREASE ================= */
  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* ================= CLEAR ================= */
  const clearCart = () => setCart([]);

  /* ================= DERIVED VALUES ================= */
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        itemCount,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ================= HOOK ================= */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}