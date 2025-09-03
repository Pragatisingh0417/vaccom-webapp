'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaSearch, FaAngleDown } from 'react-icons/fa';

const brandLinks = [
  { img: '/brand-logo/akitas-logo.webp', slug: 'akitas' },
  { img: '/brand-logo/bissell-logo.webp', slug: 'bissell' },
  { img: '/brand-logo/black-decker.png', slug: 'black-decker' },
  { img: '/brand-logo/Bosch-logo.webp', slug: 'Bosch' },
  { img: '/brand-image/brand-dreame.png', slug: 'Dreame' },
  { img: '/brand-image/Dyson.webp', slug: 'Dyson' },
  { img: '/brand-image/brand-ecovacs.png', slug: 'Ecovacs' },
  { img: '/brand-image/brand-enzyme-wizard.png', slug: 'Enzyme Wizard' },
  { img: '/brand-image/brand-hoover.png', slug: 'Hoover' },
  { img: '/brand-image/i-Vac.webp', slug: 'i-Vac' },
  { img: '/brand-image/brand-kobold.png', slug: 'Kobold' },
  { img: '/brand-image/brand-nilfisk.png', slug: 'Nilfisk' },
  { img: '/brand-image/brand-numatic.png', slug: 'Numatic' },
  { img: '/brand-image/Midea_Logo.png', slug: 'Midea' },
  { img: '/brand-image/brand-miele.png', slug: 'Miele' },
  { img: '/brand-image/panasonic.webp', slug: 'Panasonic' },
  { img: '/brand-image/brand-pullman.png', slug: 'Pullman' },
  { img: '/brand-image/brand-roborock.png', slug: 'Roborock' },
  { img: '/brand-image/brand-sauber.png', slug: 'Sauber' },
  { img: '/brand-image/sebo.webp', slug: 'Sebo' },
  { img: '/brand-image/brand-shark.png', slug: 'Shark' },
  { img: '/brand-image/brand-tineco.png', slug: 'Tineco' },
  { img: '/brand-image/brand-vax.png', slug: 'Vax' },
  { img: '/brand-image/brand-wertheim.png', slug: 'Wertheim' },
];

const productLinks = [
  { name: 'Corded Vacuums', img: '/category-image/Corded Vacuums.webp', slug: 'corded vacuums' },
  { name: 'Cordless Vacuums', img: '/category-image/Cordless-Vacuums.webp', slug: 'cordless-vacuums' },
  { name: 'Robots', img: '/category-image/robots.webp', slug: 'robots' },
  { name: 'Carpet Washers', img: '/category-image/Carpet Washers.webp', slug: 'carpet-washers' },
  { name: 'Hard Floor Cleaners', img: '/category-image/Hard Floor Cleaners.webp', slug: 'hard-floor-cleaners' },
    { name: 'Steamers', img: '/category-image/steamers.webp', slug: 'steamers' },

  { name: 'Commercial', img: '/category-image/commercial.webp', slug: 'commercial' },
  { name: 'Cleaning Chemicals', img: '/category-image/Cleaning-Chemicals.webp', slug: 'cleaning-chemicals' },
  { name: 'Accessories & Parts', img: '/category-image/Accessories.webp', slug: 'accessories-parts' },
  { name: 'Vacuum Bags & Filters', img: '/category-image/Vacuum-Bags.webp', slug: 'vacuum-bags-filters' },
];

const storeLinks = ['Cheltenham', 'Geelong', 'Sunbury'];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'brands', 'products', 'stores'

  const handleDropdown = (name) => {
    setOpenDropdown(name);
  };

  return (
    <header className="w-full font-sans text-[15px]">
      <nav className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Hamburger + Desktop Nav */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-2xl"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            <ul className="hidden md:flex gap-6 items-center text-[18px] relative">
              <li className="hover:text-white px-3 py-4 hover:bg-black">
                <Link href="/">Home</Link>
              </li>

              {/* Brands */}
              <li
                onMouseEnter={() => handleDropdown('brands')}
                onMouseLeave={() => handleDropdown(null)}
                className="relative cursor-pointer hover:text-white px-3 py-4 hover:bg-black"
              >
                <div className="flex items-center gap-1">
                  Brands <FaAngleDown className="text-xs" />
                </div>

                {openDropdown === 'brands' && (
                  <div className="absolute left-0 top-14 rounded-b-lg bg-white text-black shadow-lg z-10 w-[700px] px-4 py-4 flex gap-2 flex-wrap transition-all duration-200">
                    {brandLinks.map((brand, index) => (
                      <Link key={index} href={`/product-brand/${brand.slug}`}>
                        <img
                          src={brand.img}
                          alt={brand.slug}
                          className="w-30 h-15 object-contain cursor-pointer hover:scale-105 transition"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Products */}
              <li
                onMouseEnter={() => handleDropdown('products')}
                onMouseLeave={() => handleDropdown(null)}
                className="relative cursor-pointer hover:text-white px-3 py-4 hover:bg-black"
              >
                <div className="flex items-center gap-1">
                  Products <FaAngleDown className="text-xs" />
                </div>

                {openDropdown === 'products' && (
                  <div className="absolute top-full left-0 bg-white text-black shadow-lg z-10 w-[300px] px-4 py-4 flex flex-col gap-2 transition-all duration-200">
                    {productLinks.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/product-category/${product.slug}`}
                        className="flex items-center gap-2 hover:text-red-600 transition duration-200"
                      >
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-10 h-6 object-contain"
                        />
                        <span>{product.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li className="hover:text-white px-3 py-4 hover:bg-black">
                <Link href="/product-category/today-deals">Today's Deals</Link>
              </li>
              <li className="hover:text-white px-3 py-4 hover:bg-black">
                <Link href="/repair-and-services">Repair and Services</Link>
              </li>

              {/* Stores */}
              <li
                onMouseEnter={() => handleDropdown('stores')}
                onMouseLeave={() => handleDropdown(null)}
                className="relative cursor-pointer hover:text-white px-3 py-4 hover:bg-black"
              >
                <div className="flex items-center gap-1">
                  Stores <FaAngleDown className="text-xs" />
                </div>
                {openDropdown === 'stores' && (
                  <div className="absolute top-full left-0 bg-white text-black shadow-xl z-10 py-2 px-4 w-48 space-y-2">
                    {storeLinks.map((city) => (
                      <Link
                        key={city}
                        href={`/our-stores/${city.toLowerCase()}-store`}
                        className="block hover:text-red-600 transition"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li className="hover:text-white px-3 py-4 hover:bg-black">
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center rounded overflow-hidden bg-white text-black w-[280px] border border-gray-300">
            <input
              type="text"
              placeholder="Search Products"
              className="px-3 py-2 text-sm w-full outline-none"
            />
            <button className="bg-black px-4 py-2 text-white">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white px-4 py-2 space-y-3 text-[15px] text-black">
            <Link href="/">Home</Link>

            <div>
              <p className="font-semibold">Brands</p>
              <ul className="ml-4 mt-1 flex flex-wrap gap-3">
                {brandLinks.map((brand, index) => (
                  <li key={index}>
                    <Link href={`/product-brand/${brand.slug}`}>
                      <img
                        src={brand.img}
                        alt={brand.slug}
                        className="w-16 h-16 object-contain cursor-pointer hover:scale-105 transition"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold">Products</p>
              <ul className="ml-4 mt-1 space-y-2">
                {productLinks.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/product-category/${product.slug}`}
                      className="flex items-center gap-2 hover:text-red-600 transition duration-200"
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-10 h-6 object-contain"
                      />
                      <span>{product.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/product-category/today-deals">Today's Deals</Link>
            <Link href="/repair-and-services">Repair and Services</Link>

            <div>
              <p className="font-semibold">Stores</p>
              <ul className="ml-4 mt-1 space-y-1">
                {storeLinks.map((city) => (
                  <li key={city}>
                    <Link href={`/our-stores/${city.toLowerCase()}-store`}>{city}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/contact-us">Contact Us</Link>

            {/* Mobile Search */}
            <div className="flex items-center border rounded overflow-hidden bg-white text-black mt-2">
              <input
                type="text"
                placeholder="Search Products"
                className="px-3 py-2 text-[15px] w-full outline-none"
              />
              <button className="bg-black px-4 py-2 text-white">
                <FaSearch />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
