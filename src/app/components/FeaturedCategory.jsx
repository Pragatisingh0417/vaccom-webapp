'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';

const categories = [
  { title: 'Steamers (1)', image: '/images/Steamers.jpg' },
  { title: 'Robots (4)', image: '/images/Robots.jpg' },
  { title: 'Hard Floor Cleaners (3)', image: '/images/Hard-Floor-Cleaners.jpg' },
];

export default function FeaturedCategory() {
  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-5xl text-[#DC1515] font-bold leading-12">Featured Category</h2>
        <p className="text-black text-xl mt-4 mb-4">
          Top picks from our most popular category.
        </p>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
          }}
          className="group"
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-md overflow-hidden shadow-sm hover:shadow-lg transition">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-[320px] object-cover"
                />
                {/* Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-transparent bg-opacity-50 px-4 py-3 text-white">
                  <p className="text-[20px] font-semibold">{cat.title}</p>
                  <p className="text-[17px] underline">Shop Now</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="bg-[#d60000] hover:bg-[#b80000] text-white px-8 py-3 text-[15px] font-medium"
          >
            View Our Product Range
          </Link>
        </div>
      </div>
    </section>
  );
}
