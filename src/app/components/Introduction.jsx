"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function Introduction() {
  return (
    <section className="w-full h-[700px] bg-cover bg-center flex items-center justify-start text-left px-4"
        style={{
          backgroundImage: `url('/banner-img/vac 2.webp')`,
        }} >
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Video */}
        <div className="w-full md:w-[40%] ">
          <h2 className="text-5xl text-[#DC1515] font-bold leading-12 mb-5">
            Find the Perfect Vacuum for you at Vaccom!
          </h2>
          <p className="text-[17px] text-[#0A0A0A] mb-6 leading-relaxed">
            At Vaccom, we know every home is different. That’s why we offer a
            wide range of top-brand vacuum cleaners — from powerful upright
            models and versatile stick vacuums to handy handheld options.
          </p>
          <p className="text-[17px] text-black-800 mb-6 leading-relaxed">
            Whether it’s pet hair, busy family spaces, or hassle-free cleaning
            you need, we have the perfect vacuum for you.
          </p>
          <p className="text-[17px] text-black-800 mb-6 leading-relaxed">
            Our friendly team is here to offer expert advice and help you find
            the right fit for your lifestyle and budget. Visit one of our
            Melbourne stores for sales, servicing, and repairs. Experience the
            Vaccom difference today!
          </p>
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-[60%] text-left">

     </div>
      </div>
    </section>
  );
}
