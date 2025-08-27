'use client';

import LoginSignupForm from '../components/LoginSignupForm'; // adjust the path if needed
import Image from 'next/image';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left branding panel */}
<div className="md:flex-1 bg-red-600 text-white flex-col justify-center items-center p-12 hidden md:flex">
        <h1 className="text-4xl font-extrabold mb-6">Welcome to Vaccom</h1>
        <p className="text-lg max-w-md text-center mb-8">
          Experience the best vacuum and cleaning solutions with us. Please login or signup to continue.
        </p>
        <Image
          src="/vaccom-logo.png"
          alt="Vaccom Logo"
          width={250}
          height={100}
          className="object-contain"
          priority
        />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex justify-center items-center p-8 bg-gray-50">
        <LoginSignupForm />
      </div>
    </div>
  );
}
