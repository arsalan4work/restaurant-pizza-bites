import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, email, phone, address, notes, items, totalPrice } = body;

    const docRef = await addDoc(collection(db, "orders"), {
      userId,
      name,
      email,
      phone,
      address,
      notes,
      items,
      totalPrice,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({
      success: true,
      message: "Order saved successfully",
      orderId: docRef.id,
    });
  } catch (err: any) {
    console.error("❌ Firestore Error:", err.message);
    return NextResponse.json(
      { error: "Failed to save order" },
      { status: 500 }
    );
  }
}
