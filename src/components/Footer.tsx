// components/Footer.tsx
import {
    Instagram,
    Facebook,
    Twitter,
    Youtube,
    Phone,
    Mail,
  } from "lucide-react";
  
  export default function Footer() {
    return (
      <footer className="bg-zinc-900 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Pizza Bites</h2>
            <p className="text-sm text-gray-400">Hot. Fresh. Fast. Delivered to your doorstep.</p>
          </div>
  
          {/* Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/menu" className="hover:text-white">Menu</a></li>
              <li><a href="/order" className="hover:text-white">Order Now</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
  
          {/* Social & Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Connect with Us</h3>
            <div className="flex gap-4 text-lg">
              <a href="#" className="hover:text-pink-500"><Instagram size={20} /></a>
              <a href="#" className="hover:text-blue-500"><Facebook size={20} /></a>
              <a href="#" className="hover:text-sky-400"><Twitter size={20} /></a>
              <a href="#" className="hover:text-red-500"><Youtube size={20} /></a>
            </div>
            <p className="mt-4 text-sm text-gray-400 flex items-center gap-1">
              <Phone size={14} /> +1 561-555-7689
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              <Mail size={14} /> support@pizzabites.com
            </p>
          </div>
  
        </div>
  
        <div className="mt-8 border-t border-zinc-700 pt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Pizza Bites. All rights reserved.
        </div>
      </footer>
    );
  }
  