'use client';
import React from 'react';
import Image from 'next/image';

const brands = [
  { name: 'Midea', src: '/brand-image/Midea_Logo.png' },
  { name: 'Karcher', src: '/brand-image/karcher-brand.png' },
  { name: 'Cleanstar', src: '/brand-image/brand-cleanstar.png' },
  { name: 'Tineco', src: '/brand-image/brand-tineco.png' },
  { name: 'Miele', src: '/brand-image/brand-miele.png' },
  { name: 'Bissell', src: '/brand-image/brand-bissell.png' },
  { name: 'Kobold', src: '/brand-image/brand-kobold.png' },
  { name: 'Black+Decker', src: '/brand-image/brand-black-decker.png' },
  { name: 'Roborock', src: '/brand-image/brand-roborock.png' },
  { name: 'Dreame', src: '/brand-image/brand-dreame.png' },
  { name: 'Nilfisk', src: '/brand-image/brand-nilfisk.png' },
  { name: 'Electrolux', src: '/brand-image/brand-electrolux.png' },
  { name: 'Pullman', src: '/brand-image/brand-pullman.png' },
  { name: 'Sauber', src: '/brand-image/brand-sauber.png' },
  { name: 'Vax', src: '/brand-image/brand-vax.png' },
  { name: 'Shark', src: '/brand-image/brand-shark.png' },
  { name: 'Ecovacs', src: '/brand-image/brand-ecovacs.png' },
  { name: 'Wertheim', src: '/brand-image/brand-wertheim.png' },
  { name: 'Hoover', src: '/brand-image/brand-hoover.png' },
  { name: 'Enzyme Wizard', src: '/brand-image/brand-enzyme-wizard.png' },
  { name: 'Numatic', src: '/brand-image/brand-numatic.png' },
];

export default function TopCleaningBrands() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] font-extrabold text-red-600 mb-8 sm:mb-10">
          Top Cleaning Brands
        </h2>

        <div
          className="
            grid 
            grid-cols-5
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:grid-cols-6 
            xl:grid-cols-7 
            gap-4 
            sm:gap-6 
            md:gap-8
            items-center 
            justify-center
          "
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-2 sm:p-3 md:p-4 hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-[100px] h-[50px] sm:w-[130px] sm:h-[60px] md:w-[150px] md:h-[70px] lg:w-[160px] lg:h-[80px]">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 640px) 100px, (max-width: 768px) 130px, (max-width: 1024px) 150px, 160px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
