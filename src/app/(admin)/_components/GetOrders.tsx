import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order } from "@/lib/TypesOrder";

export const getAllOrders = async (): Promise<Order[]> => {
  const snapshot = await getDocs(collection(db, "orders"));
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];

  // Add default status if missing
  const normalized = data.map((order) => ({
    ...order,
    status: order.status ?? "pending",
  })) as Order[];

  return normalized;
};
