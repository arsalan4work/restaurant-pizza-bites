"use server";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const markOrderAsDone = async (orderId: string) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: "done" });
    return { success: true };
  } catch (error) {
    console.error("Error marking order as done:", error);
    return { success: false, error };
  }
};