"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const toppings = [
  { name: "Chicken", price: 50, image: "chicken.png" },
  { name: "Jalapeno", price: 50, image: "jelapeno.png" },
  { name: "Cheese", price: 50, image: "cheese.png" },
];

export default function ToppingList() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleTopping = (name: string) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  return (
    <div>
      <h4 className="font-semibold mb-2 mt-4">Extra toppings</h4>
      <div className="grid grid-cols-3 gap-4">
        {toppings.map((topping) => (
          <button
            key={topping.name}
            onClick={() => toggleTopping(topping.name)}
            className={cn(
              "rounded-md border-2 p-2 flex flex-col items-center justify-center text-sm transition-all",
              selected.includes(topping.name)
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-300 text-gray-600"
            )}
          >
            <Image
              src={topping.image}
              alt={topping.name}
              width={40}
              height={40}
              className="mb-2"
            />
            <span>{topping.name}</span>
            <span className="text-xs font-medium">₹{topping.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
