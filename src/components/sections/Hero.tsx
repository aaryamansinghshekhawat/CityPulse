import React from 'react';
import Button from '@/components/ui/Button';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" 
      style={{ backgroundImage: "url('//media.wired.com/photos/59269cd37034dc5f91bec0f1/3:2/w_1920,c_limit/GoogleMapTA.png')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div> {/* Dark overlay for readability */}

      <div className="relative max-w-7xl mx-auto text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Welcome to <span className="text-gray-200">CityPulse</span>
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
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

