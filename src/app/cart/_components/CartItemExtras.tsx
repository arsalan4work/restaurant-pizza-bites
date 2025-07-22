"use client";

import { extras as allExtras } from "@/data/product";
import { useEffect, useState } from "react";

type Props = {
  itemIndex: number;
  item: any;
};

export default function CartItemExtras({ item, itemIndex }: Props) {
  const [selectedExtras, setSelectedExtras] = useState(item.extras || {});

  useEffect(() => {
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    updatedCart[itemIndex].extras = selectedExtras;
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  }, [selectedExtras]);

  const handleChange = (type: string, value: string) => {
    setSelectedExtras((prev: any) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="space-y-2 mt-3">
      {Object.entries(allExtras).map(([type, options]) => (
        <div key={type}>
          <label className="text-sm font-medium capitalize">{type}</label>
          <select
            className="block w-full border p-1 rounded text-sm"
            value={selectedExtras[type] || ""}
            onChange={(e) => handleChange(type, e.target.value)}
          >
            <option value="">None</option>
            {options.map((opt) => (
              <option key={opt.name} value={opt.name}>
                {opt.name} (+${opt.price})
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
