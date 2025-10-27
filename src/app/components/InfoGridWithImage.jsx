'use client';
import React from 'react';
import Image from 'next/image';
import { FaShippingFast, FaExchangeAlt, FaShieldAlt, FaCommentDots } from 'react-icons/fa';

export default function InfoGridWithImage() {
  return (
    <section className="bg-[#f5f6f6] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        
        {/* Left Image Section */}
        <div className="col-span-2 order-1 lg:order-none">
          <div className="rounded-xl overflow-hidden h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
            <Image
              src="/banner-img/grid-img.jpg" // ✅ update with actual path
              alt="Floor Cleaning"
              width={800}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right Grid Section */}
        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-lg p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-all duration-300">
            <FaShippingFast className="text-red-600 text-5xl sm:text-6xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg sm:text-xl mb-1">Free Shipping</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Free shipping on orders over $149
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-all duration-300">
            <FaExchangeAlt className="text-red-600 text-5xl sm:text-6xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg sm:text-xl mb-1">Return and Exchange</h3>
            <p className="text-sm sm:text-base text-gray-600">
              7-days no-question-asked return policy
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-all duration-300">
            <FaShieldAlt className="text-red-600 text-5xl sm:text-6xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg sm:text-xl mb-1">Warranty</h3>
            <p className="text-sm sm:text-base text-gray-600">
              1 year for DEEBOTs & WINBOTs, 2 years for GOATs
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-all duration-300">
            <FaCommentDots className="text-red-600 text-5xl sm:text-6xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg sm:text-xl mb-1">Contact Us</h3>
            <p className="text-sm sm:text-base text-gray-600">
              support@vaccom.com.au
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
