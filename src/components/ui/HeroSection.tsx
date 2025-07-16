"use client";

import Image from "next/image";
import { Button } from "./button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-24 px-4 gap-10">
        
        {/* Image: slides in from right */}
        <motion.div
          className="order-1 lg:order-2 flex justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/pizza-main.png"
            alt="Pizza"
            width={400}
            height={400}
            className="object-contain"
          />
        </motion.div>

        {/* Text: fades in from left + moves up */}
        <motion.div
          className="order-2 lg:order-1 text-center lg:text-left"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-6xl font-black font-sans leading-tight">
            Super Delicious Pizza in <br />
            <span className="text-primary">Only 30 Minutes!</span>
          </h1>
          <p className="text-lg md:text-xl mt-4 md:mt-8 max-w-lg mx-auto lg:mx-0 leading-snug">
            Enjoy a Free Meal if Your Order Takes More Than 30 Minutes!
          </p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button className="mt-6 md:mt-8 text-md md:text-lg rounded-full py-6 px-8 font-bold">
              Get Your Pizza Now
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
