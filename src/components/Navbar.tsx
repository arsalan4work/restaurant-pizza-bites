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

export default function Navbar() {
  return (
    <header className="bg-white">
      <nav className="container py-5">
        <div className="flex items-center justify-center space-x-4">
          <Image src="/logo.svg" alt="Not Found!" width={100} height={100} />
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
      </nav>
    </header>
  );
}
