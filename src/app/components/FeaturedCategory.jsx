'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';

const categories = [
  { title: 'Steamers (1)', image: '/images/Steamers.jpg', slug: 'steamers' },
  { title: 'Robots (4)', image: '/images/Robots.jpg', slug: 'robots' },
  { title: 'Hard Floor Cleaners (3)', image: '/images/Hard-Floor-Cleaners.jpg', slug: 'hard-floor-cleaners' },
  { title: 'Vacuum Bags & Filters (98)', image: '/images/Vacuum-Bags-Filters.webp', slug: 'vacuum-bags-filters' },
  { title: 'Today’s Deals (6)', image: '/images/today-deals.webp', slug: 'today-deals' },
];

const extendedCategories = [...categories, ...categories];

export default function FeaturedCategory() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#DC1515] font-bold leading-tight">
            Featured Category
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg mt-2">
            Top picks from our most popular categories.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 18 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 22 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 26 },
            1536: { slidesPerView: 4.5, spaceBetween: 28 },
          }}
          className="group"
        >
          {extendedCategories.map((cat, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full object-cover h-[200px] xs:h-[240px] sm:h-[260px] md:h-[300px] lg:h-[330px] xl:h-[360px] transition-transform duration-500 hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 w-full px-3 sm:px-4 py-3 sm:py-4 text-white">
                  <Link href={`/product-category/${cat.slug || 'today-deals'}`}>
                    <p className="text-base sm:text-lg font-semibold truncate">{cat.title}</p>
                    <p className="text-xs sm:text-sm underline">Shop Now</p>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA Button */}
        {/* <div className="text-center mt-10">
          <Link
            href="/product-category/today-deals"
            className="bg-[#d60000] hover:bg-[#b80000] text-white px-5 sm:px-8 py-3 text-sm sm:text-base font-medium rounded-md transition"
          >
            View All Products 
          </Link>
        </div> */}
      </div>
    </section>
  );
}
