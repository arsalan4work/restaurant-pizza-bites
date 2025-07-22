"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../lib/CartContext";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const db = getFirestore(app);

export default function OrderForm() {
  const { cart, clearCart, getTotalPrice } = useCart(); // ✅ Destructure it here
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.address || cart.length === 0) {
      alert("Please fill all fields and make sure your cart is not empty.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "orders"), {
        ...formData,
        createdAt: serverTimestamp(),
        items: cart.map((item) => ({
          name: item.name,
          qty: item.qty,
        })),
        totalPrice: getTotalPrice(), // ✅ Use from context
        status: "pending",
      });

      clearCart();
      setFormData({ name: "", phone: "", address: "" });

      router.push("/order-confirmation");
    } catch (error) {
      console.error("Order Error:", error);
      alert("Failed to place the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl max-w-xl mx-auto space-y-6 mt-4">
      <h2 className="text-2xl font-bold text-center text-orange-600">Complete Your Order</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Full Name
          </label>
          <Input
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Phone Number
          </label>
          <Input
            name="phone"
            placeholder="0300-0000000"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Delivery Address
          </label>
          <Textarea
            name="address"
            placeholder="Street, City, Area, Postal Code"
            rows={4}
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white text-base font-semibold py-2"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Confirm Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}
