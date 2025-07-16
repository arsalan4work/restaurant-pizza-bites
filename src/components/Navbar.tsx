"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, ShoppingBasket, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow relative z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-5">
        {/* Logo + Select */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain"
          />
          <Select>
            <SelectTrigger className="w-[150px] text-sm lg:w-[180px] lg:text-base">
              <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Restaurants</SelectLabel>
                <SelectItem value="cheesy-delight">Cheesy Delight</SelectItem>
                <SelectItem value="pizza-run">Pizza Run</SelectItem>
                <SelectItem value="kids-corner">Kids Corner</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center font-medium gap-4 text-sm lg:text-base">
            <li><Link className="hover:text-primary transition" href="/">Menu</Link></li>
            <li><Link className="hover:text-primary transition" href="/">Orders</Link></li>
          </ul>
          <div className="relative">
            <Link className="hover:scale-110 hover:text-primary transition" href="/cart">
              <ShoppingBasket />
            </Link>
            <span className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
              3
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="font-medium text-sm text-gray-700">+1 561-555-7689</span>
          </div>
          <Link href="/logout"><Button className="text-sm rounded-md px-4 py-2 cursor-pointer">Logout</Button></Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden cursor-pointer">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar + Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 h-full w-72 bg-white z-50 px-6 py-6 shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-primary transition cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Menu Items */}
              <ul className="mt-6 space-y-5 font-medium text-sm">
                <li>
                  <Link href="/" className="block hover:text-primary transition">Menu</Link>
                </li>
                <li>
                  <Link href="/" className="block hover:text-primary transition">Orders</Link>
                </li>
                <li>
                  <Link href="/cart" className="block hover:text-primary transition">
                    Cart <span className="ml-2 inline-block bg-orange-500 text-white px-2 py-1 text-xs rounded-full">3</span>
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-gray-700">+1 561-555-7689</span>
                </li>
                <li>
                  <Link href="/logout"><Button className="w-full text-sm rounded-md cursor-pointer">Logout</Button></Link>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
