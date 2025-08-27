'use client';
import React from 'react';
import Image from 'next/image';
import { FaShippingFast, FaExchangeAlt, FaShieldAlt, FaCommentDots } from 'react-icons/fa';

export default function InfoGridWithImage() {
  return (
    <section className="bg-[#f5f6f6] py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
        {/* Left Image (Reduced height) */}
        <div className="col-span-2">
          <div className="rounded-xl overflow-hidden h-[500px]">
            <Image
              src="/banner-img/grid-img.jpg" // 🔁 Your actual image path
              alt="Floor Cleaning"
              width={800}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right Grid Cards (Compact design) */}
        <div className="col-span-3 grid grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-lg p-8 text-center shadow-sm py-6">
            <FaShippingFast className="text-red-600 text-6xl mx-auto mb-2" />
            <h3 className="font-semibold text-xl mb-1">Free Shipping</h3>
            <p className="text-lg text-gray-600">Free shipping on orders over $149</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg p-8 text-center shadow-sm py-6" >
            <FaExchangeAlt className="text-red-600 text-6xl mx-auto mb-2" />
            <h3 className="font-semibold text-xl mb-1">Return and Exchange</h3>
            <p className="text-lg text-gray-600">7-days no-question-asked return policy</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg p-4 text-center shadow-sm py-6">
            <FaShieldAlt className="text-red-600 text-6xl mx-auto mb-2" />
            <h3 className="font-semibold text-xl mb-1">Warranty</h3>
            <p className="text-lg text-gray-600">1 year for DEEBOTs and WINBOTs, 2 years for GOATs</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg p-4 text-center shadow-sm py-6">
            <FaCommentDots className="text-red-600 text-6xl mx-auto mb-2" />
            <h3 className="font-semibold text-xl mb-1">Contact US</h3>
            <p className="text-lg text-gray-600">support@vaccom.com.au</p>
          </div>
        </div>
      </div>
    </section>
  );
}
