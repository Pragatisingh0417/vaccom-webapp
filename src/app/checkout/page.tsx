"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/app/components/CheckoutForm"; // updated form with redirect

// Load Stripe using key from .env.local
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Country = { name?: { common?: string } };

export default function CheckoutPage() {
  const { cart } = useCart();

  const [countries, setCountries] = useState<string[]>([]);
  const [countryLoading, setCountryLoading] = useState(true);
  const [countryError, setCountryError] = useState<string | null>(null);
  const [states, setStates] = useState<string[]>([]);
  const [stateLoading, setStateLoading] = useState(false);
  const [stateError, setStateError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const delivery = 0;
  const total = subtotal + shipping + delivery;

  // Fetch countries
  useEffect(() => {
    (async () => {
      setCountryLoading(true);
      setCountryError(null);
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd",
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`Countries HTTP ${res.status}`);
        const data: Country[] = await res.json();
        const names = (Array.isArray(data) ? data : [])
          .map((c) => c?.name?.common)
          .filter((n): n is string => Boolean(n))
          .sort((a, b) => a.localeCompare(b));
        setCountries(names);
      } catch (err: any) {
        setCountryError("Could not load countries. Check network/CORS.");
        setCountries([]);
      } finally {
        setCountryLoading(false);
      }
    })();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    (async () => {
      if (!selectedCountry) {
        setStates([]);
        setSelectedState("");
        return;
      }
      setStateLoading(true);
      setStateError(null);
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: selectedCountry }),
        });
        if (!res.ok) throw new Error(`States HTTP ${res.status}`);
        const data = await res.json();
        const nextStates: string[] =
          data?.data?.states?.map((s: any) => s?.name).filter(Boolean) ?? [];
        setStates(nextStates);
        setSelectedState("");
      } catch (err: any) {
        setStateError("No states found or failed to fetch.");
        setStates([]);
      } finally {
        setStateLoading(false);
      }
    })();
  }, [selectedCountry]);

  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto p-6 grid md:grid-cols-2 gap-8">
        {/* Left: Contact + Payment */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Contact & Payment</h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="border p-3 rounded-md w-full" />
            <input type="text" placeholder="Last Name" className="border p-3 rounded-md w-full" />
            <input type="email" placeholder="Email Address" className="border p-3 rounded-md w-full md:col-span-2" />
            <input type="text" placeholder="Phone Number" className="border p-3 rounded-md w-full md:col-span-2" />

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Country/Region</label>
              <select
                className="border p-3 rounded-md w-full"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedState("");
                }}
                disabled={countryLoading || !!countryError}
              >
                <option value="">{countryLoading ? "Loading countries..." : "Select Country"}</option>
                {!countryLoading &&
                  countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
              </select>
              {countryError && <p className="text-sm text-red-600 mt-1">{countryError}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">State / Province</label>
              {states.length > 0 ? (
                <select
                  className="border p-3 rounded-md w-full"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  disabled={stateLoading}
                >
                  <option value="">{stateLoading ? "Loading states..." : "Select State"}</option>
                  {states.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder={
                    stateLoading
                      ? "Loading states..."
                      : stateError
                      ? "Type your state/region"
                      : selectedCountry
                      ? "No states found – type your state/region"
                      : "Select country first"
                  }
                  className="border p-3 rounded-md w-full"
                  disabled={!selectedCountry || stateLoading}
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                />
              )}
            </div>

            <input type="text" placeholder="Street Address" className="border p-3 rounded-md w-full md:col-span-2" />
            <input type="text" placeholder="City" className="border p-3 rounded-md w-full" />
            <input type="text" placeholder="Zip / PIN Code" className="border p-3 rounded-md w-full" />
          </form>

          {/* Stripe Card Form with redirect */}
          <CheckoutForm />
        </div>

        {/* Right: Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 border-b pb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 bg-white p-3 rounded-md shadow-sm"
              >
                <div className="relative">
                  <img
                    src={item.imageUrl || "/placeholder.png"}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  {item.quantity > 1 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                </div>
                <span className="font-semibold text-sm">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}
