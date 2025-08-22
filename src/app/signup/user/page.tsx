'use client'
import React, { useState } from 'react';
import { Navigation, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';

export default function UserSignupPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simple signup - just call the auth context login function
      login(formData.email, formData.password, 'citizen');
      console.log('Citizen signup successful, redirecting to dashboard');
      router.push('/citizen-dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.idownloadblog.com%2F2022%2F07%2F27%2Fgoogle-maps-location-sharing-aerial-views-cycling-route-improvements%2F&psig=AOvVaw3MDjZpWVemYVBpYrKV6QXr&ust=1755941984941000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCODNq82Qno8DFQAAAAAdAAAAABAL.jpg')",
      }}
    >
      <div className="bg-white/70 min-h-screen">
        <Navigation />
        <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Citizen Sign Up</h1>

          {/* Login Box with Blur + Solid Black Text */}
          <form onSubmit={handleSubmit} className="bg-white/30 backdrop-blur-md border border-gray-200 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="••••••••"
                required
              />
            </div>
            <Button variant="primary" size="md" className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/login?type=user" className="text-gray-800 underline">
              Login
            </a>
          </p>
        </main>
        <Footer />
      </div>
    </div>
  );
}

