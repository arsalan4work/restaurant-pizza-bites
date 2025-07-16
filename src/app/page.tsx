import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello from Pizza Bites</h1>
      <Button><Link href="/login">Login</Link></Button>
    </div>
  );
}
