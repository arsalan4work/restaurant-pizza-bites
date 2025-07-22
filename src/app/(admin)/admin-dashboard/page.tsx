"use client";

import { useUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderList from "../_components/OrderList";
import { useState } from "react";

export default function AdminDashboardPage() {
  const { user } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  if (user?.id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
    return <div className="p-4 text-red-600">Access Denied</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-md"
        />

        {/* Date Filter Dropdown */}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-md"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="last7days">Last 7 Days</option>
        </select>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
            <OrderList searchQuery={searchQuery} dateFilter={dateFilter} />
        </TabsContent>

        <TabsContent value="analytics">
          <div className="text-gray-500">Analytics coming soon 🚧</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
