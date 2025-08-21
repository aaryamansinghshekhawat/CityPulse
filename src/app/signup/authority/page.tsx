import React from 'react';
import { Navigation, Footer } from '@/components/layout';
import { Button } from '@/components/ui';

export default function AuthoritySignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Authority Sign Up</h1>
        <form className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
            <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Department" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Official Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="official@example.gov" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="••••••••" />
          </div>
          <Button variant="primary" size="md" className="w-full">Create Account</Button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login?type=authority" className="text-gray-800 underline">Login</a>
        </p>
      </main>
      <Footer />
    </div>
  );
}
