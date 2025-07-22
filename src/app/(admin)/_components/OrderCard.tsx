"use client";

import { Order } from "@/lib/TypesOrder";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import moment from "moment";

interface Props {
  order: Order;
  onStatusUpdate?: () => void;
}

export default function OrderCard({ order, onStatusUpdate }: Props) {
  const markAsDone = async () => {
    try {
      const orderRef = doc(db, "orders", order.id);
      await updateDoc(orderRef, { status: "done" });
      onStatusUpdate?.();
    } catch (error) {
      console.error("Failed to mark order as done:", error);
    }
  };

  return (
    <div className="relative bg-gray-100/80 dark:bg-gray-800/70 backdrop-blur-md border border-gray-300/50 dark:border-white/10 shadow-xl rounded-2xl p-6 mb-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
      {/* Status Badge */}
      <div
        className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-md font-medium ${
          order.status === "done"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {order.status === "done" ? "✅ Done" : "🕒 Pending"}
      </div>

      {/* Customer Info */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{order.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">📧 {order.email}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">📞 {order.phone}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">📍 {order.address}</p>

      <div className="my-4 border-t border-gray-300/30 dark:border-white/10" />

      {/* Created At */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        🗓️ Placed on:{" "}
        {order.createdAt?.seconds
          ? moment(order.createdAt.seconds * 1000).format("LLL")
          : "Unknown"}
      </p>

      {/* Items Ordered */}
      <div className="mb-2">
        <p className="font-medium text-gray-800 dark:text-gray-200">🛒 Items Ordered:</p>
        <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300 mt-1">
          {order.items?.map((item, i) => (
            <li key={i}>
              {item.name} × {item.qty}
            </li>
          ))}
        </ul>
      </div>

      {/* Total Price */}
      <p className="text-right text-lg font-bold text-green-600 dark:text-green-400 mt-3">
        Total: ${order.totalPrice?.toFixed(2)}
      </p>

      {/* Mark as Done Button */}
      {order.status !== "done" && (
        <button
          onClick={markAsDone}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-xl shadow-md transition-all"
        >
          ✅ Mark as Done
        </button>
      )}
    </div>
  );
}
