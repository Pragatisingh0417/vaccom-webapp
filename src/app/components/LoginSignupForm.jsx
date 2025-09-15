'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginSignupForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', // only for signup
    confirmPassword: '', // only for signup
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      setLoading(false);
      return;
    }

    
    if (!isLogin) {
      if (!formData.name) {
        setError('Name is required for signup.');
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
    }

    try {
      const url = isLogin ? '/api/auth/login' : '/api/auth/signup';

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isLogin
            ? { email: formData.email, password: formData.password }
            : {
                name: formData.name,
                email: formData.email,
                password: formData.password,
              }
        ),
      });

      const data = await res.json();

      if (!res.ok) {
  setError(data.message || 'Something went wrong');
} else {
  setSuccessMsg(
    data.message || (isLogin ? 'Logged in successfully!' : 'Signed up successfully!')
  );
  setFormData({ email: '', password: '', name: '', confirmPassword: '' });

  // ✅ Try to pick user/token from common response shapes
  const user  = data.user  || data.data?.user  || data.payload?.user  || null;
  const token = data.token || data.accessToken || data.data?.token   || null;

  if (user)  localStorage.setItem('user', JSON.stringify(user));
  window.dispatchEvent(new Event("userUpdated")); // 🔔 trigger event

  if (token) localStorage.setItem('token', token);

  // Redirect after success
  router.push('/');
}
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <div className="flex justify-center mb-6 space-x-8 text-lg font-semibold">
        <button
          onClick={() => setIsLogin(true)}
          className={`pb-2 border-b-4 ${isLogin ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500'}`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`pb-2 border-b-4 ${!isLogin ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500'}`}
        >
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Your full name"
              required={!isLogin}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password with show/hide toggle */}
        <div className="relative">
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {!isLogin && (
          <div className="relative">
            <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="••••••••"
              required={!isLogin}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        )}

        {error && <p className="text-red-600 font-medium">{error}</p>}
        {successMsg && <p className="text-green-600 font-medium">{successMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition disabled:opacity-50"
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Signup'}
        </button>
      </form>
    </div>
  );
}
