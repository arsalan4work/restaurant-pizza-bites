export type Order = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  createdAt: { seconds: number; nanoseconds?: number };
  userId: string;
  totalPrice: number;
  items: { name: string; qty: number }[];
  status?: "pending" | "done"; // Restrict values to avoid type issues
};
