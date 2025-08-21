import React from 'react';
import { Navigation, Footer } from '@/components/layout';
import { Hero, Features, UserTypes, CTA } from '@/components/sections';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <Hero />
      <Features />
      <UserTypes />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;
