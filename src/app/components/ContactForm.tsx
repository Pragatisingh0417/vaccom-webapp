'use client';
import React from 'react';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

export default function ContactForm() {
  return (
    <main>
 <section
      className="w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/banner-img/contact-bg.png')" }}
    >
      {/* Red overlay */}
      <div className="absolute inset-0 bg-red-600 opacity-70"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <div className="text-white space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Contact Us Today!</h2>
          <p className="text-lg md:text-xl">
            Send us some information and we will follow up to show how we can help.
          </p>
          <h3 className="text-2xl font-semibold">Ready To Get Started</h3>

          <div className="bg-white text-red-600 flex items-center gap-2 py-3 px-5 rounded-md w-fit font-bold shadow-md">
                       <FiPhone />
 0397-409-390
          </div>
        </div>

        {/* Right Side Form */}
        <div className="bg-red-700 rounded-lg p-8 space-y-4 shadow-lg">
          <div>
            <label className="text-white font-semibold">Name *</label>
            <input
              type="text" 
              placeholder="Full Name*"
              className="w-full mt-1 p-3 rounded text-sm focus:outline-none bg-white"
            />
          </div>
          <div>
            <label className="text-white font-semibold">Email *</label>
            <input
              type="email"
              placeholder="Email*"
              className="w-full mt-1 p-3 rounded text-sm focus:outline-none bg-white"
            />
          </div>
          <div>
            <label className="text-white font-semibold">Numbers *</label>
            <input
              type="text"
              placeholder="Phone*"
              className="w-full mt-1 p-3 rounded text-sm focus:outline-none bg-white"
            />
          </div>
          <div>
            <label className="text-white font-semibold">Select Store Location *</label>
            <select className="w-full mt-1 p-3 rounded text-sm focus:outline-none bg-white">
              <option>Select your store*</option>
              <option>Melbourne</option>
              <option>Sydney</option>
              <option>Brisbane</option>
            </select>
          </div>
          <div>
            <label className="text-white font-semibold">Message *</label>
            <textarea
              rows={4}
              placeholder="Message*"
              className="w-full mt-1 p-3 rounded text-sm focus:outline-none bg-white"
            ></textarea>
          </div>
          {/* Submit Button */}
 <div className="flex justify-center">
  <button
    type="submit"
    className="w-1/5 mt-4 bg-black hover:bg-white hover:text-black text-white font-bold py-3 px-6 rounded transition-colors duration-300"
  >
    Submit
  </button>
</div>

        </div>
      </div>
    </section>
    </main>
  );
}
