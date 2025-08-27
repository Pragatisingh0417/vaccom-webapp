'use client';
import React from 'react';
import Link from 'next/link'; // ✅ import Link

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
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-[30px] md:text-[40px] font-extrabold text-red-600 mb-10">
          Top Cleaning Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
          {brands.map((brand, index) => (
            <Link
              key={index}
              href={`/brands/${brand.name.toLowerCase().replace(/\+/g, '').replace(/\s/g, '-')}`} // ✅ dynamic link
              className="flex items-center justify-center"
            >
              <img
                src={brand.src}
                alt={brand.name}
                className="max-h-22 object-contain hover:scale-105 transition-transform"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
