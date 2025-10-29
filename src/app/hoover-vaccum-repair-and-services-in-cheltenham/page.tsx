"use client";

import Link from "next/link";
import React from "react";
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';


export default function Hovervaccum() {

    return (
        <main>
            {/* Hero Section */}
            <section
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px] bg-cover bg-center flex items-center text-left px-4 sm:px-6 md:px-10"
                style={{ backgroundImage: "url('/images/imgi_16_hoover.webp')" }}
            >
                <div className="text-white max-w-4xl space-y-4 mx-auto md:mx-0">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center md:text-left px-4 sm:px-6 md:px-10">
                        Hoover Vaccum Repair
                        and Services in Cheltenham    </h1>
                </div>
            </section>



            {/* Dyson Repair Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                {/* Text Content */}
                <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-4 leading-snug text-center md:text-left">
                        Restore Power to Your Hoover  <br /> with Expert Repairs
                    </h2>

                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 text-center md:text-left">
                        Get your Hoover vacuum performing like new with our expert repair and maintenance services in Cheltenham. Whether you’re dealing with reduced suction, motor issues, or worn-out components, we service all Hoover models with care and precision. Our skilled technicians provide quick diagnostics, use genuine Hoover parts, and deliver reliable repairs—so your vacuum stays powerful and your home stays spotless, without the hassle.


                    </p>

                    {/* Buttons in Row */}
                    <div className="flex flex-row flex-wrap justify-center md:justify-start gap-4">
                        <Link
                            href="/contact-us"
                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition text-center"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="https://www.google.com/maps/dir/?api=1&destination=Vaccom+Cheltenham"
                            target="_blank"
                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition text-center"
                        >
                            Get Directions
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div className="flex justify-center mt-8 md:mt-0">
                    <img
                        src="/images/imgi_17_Hoover-CleanSlate-Cordless-01-1024x1024-1.webp"
                        alt="Dyson Vacuum Repair"
                        className="rounded-lg shadow-md w-full sm:w-[85%] md:w-[90%] lg:w-[80%] object-cover"
                    />
                </div>
            </section>



            {/* Dark Section - Vacuum Love */}
            <section className="bg-black text-white py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">

                    {/* Left Content */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug">
                            Your Vacuum Needs Some Love!
                        </h2>

                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                            We’re glad you found us! If your Dyson vacuum isn’t performing like it should,
                            we’re here to help. Whether it needs a quick tune-up, a full repair, or just routine
                            maintenance, our skilled technicians have you covered. Dyson vacuum repairs are our
                            specialty—let us bring back the power and make cleaning effortless again!
                        </p>

                        <Link
                            href="/contact-us"
                            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                        >
                            Shop Now
                        </Link>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center mt-8 md:mt-0">
                        <img
                            src="/images/imgi_5_Hoover-Allergy-Bagged-Vacuum-Cleaner-2-removebg-preview-333x333 (1) (1).webp"
                            alt="Vacuum repair service"
                            className="rounded-lg shadow-lg w-full sm:w-[80%] md:w-[60%] lg:w-[50%] object-cover"
                        />
                    </div>
                </div>
            </section>


            {/* Why Choose Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-10 sm:py-12 md:py-16 bg-blue-10">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                        Why Choose Vaccom for Vacuum Repairs?
                    </h2>
                    <div className="h-1 w-20 bg-red-600 mb-5 mx-auto md:mx-0"></div>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
                        At Vaccom, we repair all vacuum models from top brands like Dyson, Miele, Hoover, Electrolux, Wertheim, and Nilfisk. Our experienced technicians use only high-quality, manufacturer-approved parts to ensure your vacuum performs like new. Every service includes a warranty, and we’re proud to offer honest advice, fast support, and exceptional customer care you can rely on.
                    </p>
                </div>
            </section>

            {/* Dyson Repair Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                {/* Image */}
                <div className="flex justify-center">
                    <img
                        src="/images/imgi_5_Hoover-Allergy-Bagged-Vacuum-Cleaner-2-removebg-preview-333x333 (1) (1).webp"
                        alt="Dyson Vacuum Repair"
                        className="rounded-lg shadow-md w-full sm:w-[85%] md:w-[90%] lg:w-[80%] object-cover"
                    />
                </div>

                {/* Text Content */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 leading-snug">
                        Hoover Vacuum Repair & Service
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
                        You may be surprised how affordable our thorough Hoover vacuum service really is.

                        If your Hoover is losing suction, won’t power on, has a strange smell, or just isn’t cleaning like it used to, it’s time to let the experts take a look. Bring it in for a free, no-obligation estimate. Our certified technicians have the experience and tools to repair all Hoover models. Visit us today or contact us to book your free quote—we’re here to get your vacuum back in top shape!
                    </p>

                    {/* Buttons Row */}
                    <div className="flex flex-row flex-wrap justify-center md:justify-start gap-4">
                        <Link
                            href="/contact-us"
                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition text-center"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href=""
                            target="_blank"
                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition text-center"
                        >
                            Get Directions
                        </Link>
                    </div>
                </div>
            </section>


            <section
                className="w-full bg-cover bg-center relative"
                style={{ backgroundImage: "url('/banner-img/contact-bg.png')" }}
            >
                {/* Red overlay */}
                <div className="absolute inset-0 bg-red-600 opacity-70"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Left Side */}
                    <div className="text-white space-y-5 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                            Contact Us Today!
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl">
                            Send us some information and we will follow up to show how we can help.
                        </p>
                        <h3 className="text-xl sm:text-2xl font-semibold">
                            Ready To Get Started
                        </h3>

                        <div className="mx-auto md:mx-0 bg-white text-red-600 flex items-center justify-center md:justify-start gap-2 py-3 px-5 rounded-md w-fit font-bold shadow-md">
                            <FiPhone />
                            0397-409-390
                        </div>
                    </div>

                    {/* Right Side Form */}
                    <div className="bg-red-700 rounded-lg p-6 sm:p-8 space-y-4 shadow-lg">
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
                                className="w-1/2 sm:w-1/3 md:w-1/4 mt-4 bg-black hover:bg-white hover:text-black text-white font-bold py-3 px-6 rounded transition-colors duration-300"
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
