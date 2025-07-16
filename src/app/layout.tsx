import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const manrope = Manrope({subsets:['latin'], variable: "--font-manrope"})

export const metadata: Metadata = {
  title: "Pizza Bites",
  description: "Welcome to Pizza Bites your go-to destination for having a treat from friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen bg-background font-manrope antialiased", manrope.variable)}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
