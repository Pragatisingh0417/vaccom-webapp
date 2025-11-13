"use client";
import React from "react";
import Link from "next/link";

export default function Aboutus() {
  return (
    <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-16">
        {/* Left: Video */}
        <div className="w-full md:w-[55%] rounded-xl overflow-hidden shadow-lg">
            <img
              src="/banner-img/vac 1.webp" // 👉 replace with your actual image path
              alt="PURE ONE STATION 5"
              className="w-full h-auto object-cover"
            />
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-[45%] text-left md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#DC1515] font-bold leading-snug sm:leading-tight md:leading-[1.2] mb-4 sm:mb-6">
            About Us{" "}
          </h2>

          <p className="text-sm sm:text-base md:text-[17px] text-gray-800 mb-6 leading-relaxed">
            Vaccom was built on experience — not just in selling vacuums, but in
            understanding them inside and out. Our journey began on the workshop
            floor of Godfreys, where we started as technicians learning the
            trade hands-on. That passion and technical knowledge led us to take
            the next step: owning and operating two successful stores under the
            Godfreys banner, including our first at Southland Shopping Centre in
            2012, followed by a second location in Sunbury. Today, Vaccom is an
            independent business with the same dedication to quality and service
            we’ve always had — only now, we do it on our terms. We offer a
            carefully selected range of powerful vacuum and steam cleaners,
            backed by in-house servicing and expert advice. With over 15 years
            in the industry, we’ve seen it all — and we know what works. Whether
            you’re after something lightweight and cordless or built for
            heavy-duty cleaning, our team is here to help you find the right
            cleaning solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
