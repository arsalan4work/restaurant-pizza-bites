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
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useCart } from "../lib/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const isAdmin = user?.id === process.env.NEXT_PUBLIC_ADMIN_ID;

  return (
    <header className="bg-white shadow relative z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-5">
        {/* Logo + Select */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>
          <Select>
            <SelectTrigger className="w-[150px] text-sm lg:w-[180px] lg:text-base">
              <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Restaurants</SelectLabel>
                <SelectItem value="pizza-run">Pizza Bites</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center font-medium gap-4 text-sm lg:text-base">
            {isAdmin && (
              <li>
                <Link
                  className="hover:text-primary transition"
                  href="/admin-dashboard"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>

          <div className="relative">
            <Link
              className="hover:scale-110 hover:text-primary transition"
              href="/cart"
            >
              <ShoppingBasket />
            </Link>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
                {cart.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="font-medium text-sm text-gray-700">
              +1 561-555-7689
            </span>
          </div>

          {/* Clerk Auth */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="text-sm rounded-md px-4 py-2 cursor-pointer">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSwitchSessionUrl="/" />
          </SignedIn>
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

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar Panel */}
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

              {/* Sidebar Content */}
              <ul className="mt-6 space-y-5 font-medium text-sm">
                {isAdmin && (
                  <li>
                    <Link
                      href="/admin-dashboard"
                      className="block hover:text-primary transition"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/cart"
                    className="block hover:text-primary transition"
                  >
                    <span className="ml-2 inline-block bg-orange-500 text-white px-2 py-1 text-xs rounded-full">
                      {cart.length}
                    </span>
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-gray-700">+1 561-555-7689</span>
                </li>
                <li>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button className="w-full text-sm rounded-md cursor-pointer">
                        Login
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton afterSwitchSessionUrl="/" />
                  </SignedIn>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
