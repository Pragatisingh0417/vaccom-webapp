"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaEnvelope,  } from "react-icons/fa";
import {  FiPhone } from 'react-icons/fi';


export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-300 leading-relaxed text-[16px]">
            For 15 years, we’ve led the way in providing top-tier vacuum and steam cleaners. Our focus is on reliable performance, modern designs, and exceptional customer service.
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-1">Santhanam Engineering Pty. Ltd.</h3>
            <p className="text-gray-400 text-[15px]">ABN: 15154670532</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-1">Head Office</h3>
            <p className="text-gray-400 text-[15px]">158 Centre Dandenong Rd. Victoria 3192 </p>
          </div>
          <div className="flex mt-5 items-center gap-2 text-[15px] text-gray-400">
  <FaEnvelope className="text-lg" />
  support@vaccom.com.au
</div>
<div className="flex mt-5 items-center gap-2 text-[15px] text-gray-400">
  <FiPhone className="text-lg" />
  0397 409 390
</div>
           <div className="flex space-x-4 text-xl mt-4">
            <Link href="#" className="hover:text-red-500 transition">
              <FaFacebookF />
            </Link>
            <Link href="#" className="hover:text-red-500 transition">
              <FaInstagram />
            </Link>
             <Link href="#" className="hover:text-red-500 transition">
              <FaYoutube />
            </Link>
            <Link href="#" className="hover:text-red-500 transition">
              <FaTwitter />
            </Link>
          </div>
        </div>

        {/* Locations */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Locations</h2>
          <div className="space-y-3 text-[15px] text-gray-300">
            <div>
              <h4 className="font-medium text-white">Cheltenham</h4>
              <p>Shop 1020 Westfield Shopping Centre, 1156 Nepean Hwy, VIC 3192</p>
            </div>
            <div>
              <h4 className="font-medium text-white">Sunbury</h4>
              <p>93 Evans St, Sunbury VIC 3429</p>
            </div>
            <div>
              <h4 className="font-medium text-white">Geelong</h4>
              <p>162 Malop St, Geelong VIC 3220</p>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="text-white font-medium mb-1">Open Hours</h4>
            <p className="text-gray-400 text-[15px] leading-relaxed">
              Mon – Sun: 9:00 AM – 5:30 PM <br />
              (All Locations)
            </p>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-300 text-[15px]">
            <li>
              <Link href="/" className="hover:text-red-500 transition">Home</Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-red-500 transition">About Us</Link>
            </li>
            <li>
              <Link href="/repair-and-services" className="hover:text-red-500 transition">Repair and Services</Link>
            </li>
            <li>
              <Link href="/product-category/today-deals" className="hover:text-red-500 transition">Today’s Deals</Link>
            </li>
             
             <li>
              <Link href="/privacy-policy" className="hover:text-red-500 transition">Privacy Policy</Link>
            </li>
             <li>
              <Link href="/refund_returns" className="hover:text-red-500 transition">Refund & Returns</Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:text-red-500 transition">Terms of service</Link>
            </li>
             <li>
              <Link href="/contact-us" className="hover:text-red-500 transition">
Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Sign Up for Our Newsletter</h2>
          <p className="text-gray-300 text-[15px] mb-2">Leave your email to get all hot deals & news</p>
          <p className="text-gray-300 text-[15px] mb-4">which benefit you most!</p>
         
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Vaccom. All Rights Reserved.
      </div>
    </footer>
  );
}
