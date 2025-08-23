"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/authContext';

const Navigation: React.FC = () => {
  const { userLoggedIn, currentUser, logout } = useAuth();
  
  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  🏙️
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300">
                  CityPulse
                </span>
              </Link>
            </div>
          </div>
          <div className="flex space-x-3">
            {!userLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" href="/login" className="hover:bg-gray-100">
                  Login
                </Button>
                <Button variant="primary" size="sm" href="/signup" className="shadow-md hover:shadow-lg">
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" href={currentUser?.type === 'citizen' ? '/citizen-dashboard' : '/authority-dashboard'} className="hover:bg-gray-100">
                  Dashboard
                </Button>
                <Button variant="outline" size="sm" onClick={logout} className="hover:bg-gray-100">
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
