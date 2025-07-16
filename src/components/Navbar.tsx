import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Phone, ShoppingBasket } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="bg-white">
        {/* Navbar */}
      <nav className="container mx-auto py-5 flex items-center justify-between">
        {/* Logo + select Box */}
        <div className="flex items-center space-x-4">
        <Image src="/logo.svg" alt="Not Found!" width={120} height={40} className="object-contain" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Restuarant" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="cheesy-delight">Cheesy Delight</SelectItem>
                <SelectItem value="pizza-run">Pizza Run</SelectItem>
                <SelectItem value="kids-corner">Kids Corner</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Menu Main Div */}
        <div className="flex items-center space-x-4">
            {/* Menu + Order*/}
            <ul className="flex items-center font-medium space-x-4">
                <li> <Link className="hover:text-lg hover:text-primary transition-all duration-200" href="/">Menu</Link> </li>
                <li> <Link className="hover:text-lg hover:text-primary transition-all duration-200" href="/">Orders</Link> </li>
            </ul>
            {/* Cart */}
            <div className="relative">
                <Link className="hover:scale-110 hover:text-primary transition-all duration-200" href="/cart"><ShoppingBasket /></Link>
                <span className="absolute -top-3 -right-4 h-5 w-5 flex items-center justify-center rounded-full bg-orange-600 font-bold text-white">3</span>
            </div>
            {/* Phone Number */}
            <div className="flex items-center gap-x-2 ml-12">
                <Phone/>
                <span className="font-medium text-gray-700">+1 561-555-7689</span>
            </div>
            {/* Button */}
            <Button>Logout</Button>
        </div>
      </nav>
    </header>
  );
}
