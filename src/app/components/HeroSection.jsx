'use client';
import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Left: Video */}
        <div className="w-full md:w-[55%] rounded-lg overflow-hidden shadow-lg">
          <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/frQCsRwgqj0"
              title="Introducing the PURE ONE STATION 5"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-[45%] text-left">
          <h2 className="text-5xl text-[#DC1515] font-bold leading-12 mb-5">
            Redefine Cleanliness <br />
            with Cutting-Edge <br />
            Technology! – Tineco
          </h2>
          <p className="text-[17px] text-black-800 mb-6 leading-relaxed">
            Think your home is clean? Think again! Meet the PURE ONE STATION 5, the ultimate solution for a spotless home. <br />
            Lightweight and innovative, it makes cleaning effortless and thorough.
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#C80000] text-white text-[16px] font-medium px-6 py-3 rounded-md hover:bg-[#b80000] transition"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </section>
  );
}
