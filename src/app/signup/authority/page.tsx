'use client'
import React, { useState } from 'react';
import { Navigation, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';

export default function AuthoritySignupPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    department: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.department || !formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      login(formData.email, formData.password, 'authority');
      console.log('Authority signup successful, redirecting to dashboard');
      router.push('/authority-dashboard');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Authority Sign Up</h1>
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
            <input 
              type="text" 
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-gray-400 
                         text-black placeholder-gray-400" 
              placeholder="Department" 
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Official Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-gray-400 
                         text-black placeholder-gray-400" 
              placeholder="official@example.gov" 
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-gray-400 
                         text-black placeholder-gray-400" 
              placeholder="••••••••" 
              required
            />
          </div>

          <Button variant="primary" size="md" className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login?type=authority" className="text-gray-800 underline">Login</a>
        </p>
      </main>
      <Footer />
    </div>
  );
}


