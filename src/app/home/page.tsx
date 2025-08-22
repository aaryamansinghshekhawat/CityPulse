import React from 'react';
import { Navigation, Footer } from '@/components/layout';
import { Button } from '@/components/ui';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to CityPulse Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            You are now logged in. This is your personalized dashboard where you can manage city operations, 
            report issues, and stay updated on city projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/signup">
              Explore More Features
            </Button>
            <Button variant="outline" size="lg" href="/login">
              Back to Login
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
