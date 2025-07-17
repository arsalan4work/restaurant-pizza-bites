"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Product } from "../lib/Types";
import { motion } from "framer-motion";

type Props = {
  product: Product;
};

export default function ProductCards({ product }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Card className="border-none rounded-xl max-w-[400px] mx-auto shadow-md">
        <CardHeader className="flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={150}
            height={150}
            className="rounded-lg"
          />
        </CardHeader>
        <CardContent>
          <h2 className="text-lg md:text-xl font-bold">{product.name}</h2>
          <p className="mt-4 text-gray-600">{product.description}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between mt-4">
          <p>
            <span className="text-gray-500">From </span>
            <span className="font-bold">${product.price}</span>
          </p>
          <Button className="bg-orange-500 hover:bg-orange-400 text-black px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
            Choose
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
