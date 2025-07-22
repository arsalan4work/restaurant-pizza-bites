"use client";

import { useCart } from "../../lib/CartContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import OrderForm from "@/components/OrderForm";
import { extras } from "../../data/product";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
    updateQuantity,
    updateCart,
    getTotalPrice,
  } = useCart();

  const [showOrderForm, setShowOrderForm] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>Size: {item.size}</p>
                  {item.extras && item.extras.length > 0 && (
                    <p>
                      Extras:{" "}
                      {item.extras.map((e) => e.name).join(", ")}
                    </p>
                  )}
                  <p>Price: ${item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => updateQuantity(idx, -1)}
                >
                  -
                </Button>
                <span>{item.qty}</span>
                <Button
                  variant="outline"
                  onClick={() => updateQuantity(idx, 1)}
                >
                  +
                </Button>
              </div>
              <div>
                <p className="font-bold">
                  Subtotal: ${item.price * item.qty}
                </p>
                <Button
                  variant="destructive"
                  onClick={() => {
                    const updated = cart.filter((_, i) => i !== idx);
                    updateCart(updated); // ✅ using context method
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold">
              Total: ${getTotalPrice().toFixed(2)}
            </p>
          </div>

          <div className="flex gap-4">
            <Button variant="ghost" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button onClick={() => setShowOrderForm(true)}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}

      {showOrderForm && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Complete Your Order</h2>
          <OrderForm />
        </div>
      )}
    </div>
  );
}
