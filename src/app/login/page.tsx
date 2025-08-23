"use client";

import React from 'react';
import Link from 'next/link';
import { Navigation, Footer } from '@/components/layout';
import { Button } from '@/components/ui';

const LoginSelectionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🔒 Welcome to CityPulse</h1>
          <p className="text-xl text-gray-600">Choose your login type to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Citizen Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Citizen Login</h2>
              <p className="text-gray-600">Access your citizen dashboard and contribute to city development</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Submit suggestions and feedback
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Track city projects and updates
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                View maps and location data
              </div>
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              href="/login/user" 
              className="w-full"
            >
              Login as Citizen
            </Button>
          </div>

          {/* Authority Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍💼</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Authority Login</h2>
              <p className="text-gray-600">Access your authority dashboard and manage city operations</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Review citizen suggestions
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Manage city projects
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                Send alerts and updates
              </div>
            </div>

            <Button 
              variant="secondary" 
              size="lg" 
              href="/login/authority" 
              className="w-full"
            >
              Login as Authority
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Don't have an account?</p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="md" href="/signup?type=user">
              Sign up as Citizen
            </Button>
            <Button variant="outline" size="md" href="/signup?type=authority">
              Sign up as Authority
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginSelectionPage;