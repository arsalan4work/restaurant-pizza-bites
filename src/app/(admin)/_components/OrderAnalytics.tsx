"use client";

import { Order } from "@/lib/TypesOrder";

interface Props {
  doneOrders: Order[];
}

export default function OrderAnalytics({ doneOrders }: Props) {
  const totalDone = doneOrders.length;
  const totalRevenue = doneOrders.reduce((acc, order) => acc + order.totalPrice, 0);

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">Order Analytics</h2>
      <p>Total Done Orders: {totalDone}</p>
      <p>Total Revenue from Done Orders:  ${totalRevenue}</p>
    </div>
  );
}
