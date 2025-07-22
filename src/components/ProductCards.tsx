"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";
import { Product } from "../lib/Types";
import { motion } from "framer-motion";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useState, useMemo } from "react";
import { useCart } from "../lib/CartContext";
import { toast } from "react-toastify";

type Props = {
  product: Product;
};

const pizzaSizes = [
  {
    id: "small",
    name: 'Small (8")',
    description: "Perfect for one person. Light and tasty.",
    priceMultiplier: 1,
  },
  {
    id: "medium",
    name: 'Medium (12")',
    description: "Best for sharing between 2-3 people.",
    priceMultiplier: 1,
  },
  {
    id: "large",
    name: 'Large (16")',
    description: "Ideal for family or group hangouts.",
    priceMultiplier: 1,
  },
];

export default function ProductCards({ product }: Props) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("medium");

  const handleAddToCart = () => {
    const selected = pizzaSizes.find((size) => size.id === selectedSize);
    addToCart({
      id: product.id,
      name: product.name,
      qty: 1,
      price: Number(
        (product.price * (selected?.priceMultiplier || 1)).toFixed(2)
      ),
      image: product.image,
      size: selectedSize,
    });
    toast.success("Added to cart!");
  };

  const dynamicPrice = useMemo(() => {
    const selected = pizzaSizes.find((size) => size.id === selectedSize);
    return (product.price * (selected?.priceMultiplier || 1)).toFixed(2);
  }, [product.price, selectedSize]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Card className="border-none rounded-xl max-w-[400px] mx-auto shadow-md bg-white">
        <CardHeader className="flex items-center justify-center">
          <Image
            src={product.image}
            alt={`Delicious ${product.name} Pizza`}
            width={150}
            height={150}
            className="rounded-lg"
          />
        </CardHeader>

        <CardContent>
          <h2 className="text-xl font-bold text-center">{product.name}</h2>
          <p className="mt-2 text-gray-600 text-center">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between mt-4 px-6 pb-4">
          <p>
            <span className="text-gray-500">Starting at </span>
            <span className="font-bold text-lg">${dynamicPrice}</span>
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-orange-400 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
                Add to Cart
              </Button>
            </DialogTrigger>

            <DialogContent
              aria-describedby="order-dialog-desc"
              className="max-w-[95vw] md:max-w-3xl p-0 bg-white rounded-lg overflow-hidden"
              style={{ maxHeight: "90vh" }}
            >
              {/* ✅ Accessibility: Add DialogTitle and DialogDescription */}
              <DialogTitle className="sr-only">{product.name}</DialogTitle>
              <DialogDescription id="order-dialog-desc" className="sr-only">
                Choose a size and add to cart
              </DialogDescription>

              <div className="flex flex-col md:flex-row h-full">
                {/* Left Image Section */}
                <div className="md:w-1/3 p-6 flex justify-center items-center bg-orange-50">
                  <Image
                    src={product.image}
                    alt={`Order ${product.name}`}
                    width={300}
                    height={300}
                    className="rounded-md"
                  />
                </div>

                {/* Right Scrollable Content */}
                <div className="md:w-2/3 p-6 overflow-y-auto max-h-[80vh]">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="mb-4 text-gray-600">{product.description}</p>

                  <RadioGroup
                    defaultValue={selectedSize}
                    className="grid gap-3"
                    onValueChange={(value) => setSelectedSize(value)}
                  >
                    {pizzaSizes.map((size) => (
                      <Label
                        key={size.id}
                        className="has-[[data-state=checked]]:border-red-500 has-[[data-state=checked]]:bg-red-50 flex items-start gap-3 rounded-lg border p-3 cursor-pointer"
                      >
                        <RadioGroupItem
                          value={size.id}
                          id={size.name}
                          className="data-[state=checked]:border-red-500 mt-1"
                        />
                        <div className="grid gap-1 font-normal">
                          <div className="font-semibold">{size.name}</div>
                          <div className="text-sm text-gray-500">
                            {size.description}
                          </div>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>

                  <div className="mt-4">
                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-primary text-white mt-4"
                    >
                      Add to Cart ${dynamicPrice}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
