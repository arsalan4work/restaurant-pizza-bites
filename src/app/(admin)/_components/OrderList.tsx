"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "../_components/GetOrders";
import OrderCard from "./OrderCard";
import OrderAnalytics from "./OrderAnalytics";
import moment from "moment";
import { Order } from "@/lib/TypesOrder";

interface Props {
  searchQuery: string;
  dateFilter: string;
}

export default function OrderList({ searchQuery, dateFilter }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone?.includes(searchQuery);

    const orderDate = moment(order.createdAt.seconds * 1000);
    const now = moment();

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && orderDate.isSame(now, "day")) ||
      (dateFilter === "week" && orderDate.isAfter(now.clone().subtract(7, "days")));

    return matchesSearch && matchesDate;
  });

  const doneOrders = filteredOrders.filter((order) => order.status === "done");

  if (loading) return <div>Loading orders...</div>;
  if (filteredOrders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="space-y-6">
      <OrderAnalytics doneOrders={doneOrders} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} onStatusUpdate={fetchOrders} />
        ))}
      </div>
    </div>
  );
}
