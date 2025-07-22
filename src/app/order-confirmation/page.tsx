"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Order = {
  name: string;
  phone: string;
  address: string;
  items: { name: string; qty: number }[];
  totalPrice: number;
};

export default function OrderConfirm() {
  const [order, setOrder] = useState<Order | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, orderBy("createdAt", "desc"), limit(1));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data() as Order;
          setOrder(data);
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
    };

    fetchLatestOrder();
  }, []);

  useEffect(() => {
    // Hide confetti after 5 seconds
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);

    // Redirect to home after 3 seconds
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 6000);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700">
        Loading your order...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-orange-100 to-yellow-50 relative">
      {showConfetti && (
        <Confetti width={typeof window !== "undefined" ? window.innerWidth : 300} height={typeof window !== "undefined" ? window.innerHeight : 300} />
      )}

      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6 text-center relative z-10">
        <Image
          src="/logo.svg"
          alt="Brand Logo"
          width={80}
          height={80}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-orange-600 mb-2">Thank You for Your Order!</h1>
        <p className="text-gray-700 mb-6 italic">Your delicious meal is on the way 🍕</p>

        <div className="bg-orange-50 rounded-xl p-4 shadow-inner text-left text-sm text-gray-800 space-y-2">
          <p><span className="font-semibold">👤 Name:</span> {order.name}</p>
          <p><span className="font-semibold">📞 Phone:</span> {order.phone}</p>
          <p><span className="font-semibold">📍 Address:</span> {order.address}</p>
          <div>
            <p className="font-semibold">🛒 Ordered Items:</p>
            <ul className="list-disc ml-5 mt-1">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.qty}
                </li>
              ))}
            </ul>
          </div>
          <p><span className="font-semibold">💰 Total:</span> $ {order.totalPrice}</p>
        </div>

        <p className="mt-6 font-medium text-green-600 text-md">
          🚚 Your order will arrive in <span className="font-bold">45 minutes</span>!
        </p>
      </div>

      <p className="mt-8 text-xs text-gray-500">© 2025 PizzaBites — Hot & Fresh Delivered Fast</p>
    </div>
  );
}
