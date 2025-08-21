import React from 'react';
import Button from '@/components/ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-gray-600">CityPulse</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Your comprehensive platform for city management, citizen engagement, and official authority coordination. 
          Connect, collaborate, and build better cities together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            size="lg" 
            href="/signup?type=user"
          >
            Get Started as Citizen
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            href="/signup?type=authority"
          >
            Join as Authority
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
