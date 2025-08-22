import React from 'react';
import { Button } from '@/components/ui/Button';

const CTA: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of citizens and authorities already using CityPulse to build better cities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="secondary" 
            size="lg" 
            href="/login"
          >
            Login to Your Account
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            href="/signup"
          >
            Create New Account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
