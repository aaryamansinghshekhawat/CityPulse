import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
                CityPulse
              </Link>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" href="/login">
              Login
            </Button>
            <Button variant="primary" size="sm" href="/signup">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
