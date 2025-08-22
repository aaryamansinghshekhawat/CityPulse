import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/help', label: 'Help Center' }
  ];

  const accountLinks = [
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Sign Up' },
    { href: '/support', label: 'Support' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
                🏙️
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                CityPulse
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              Empowering cities through technology, citizen engagement, and efficient governance. 
              Building smarter communities together.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                <span className="text-sm">📱</span>
              </div>
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-colors cursor-pointer">
                <span className="text-sm">💻</span>
              </div>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors cursor-pointer">
                <span className="text-sm">📧</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white flex items-center">
              <span className="mr-2">🔗</span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white flex items-center">
              <span className="mr-2">👤</span>
              Account
            </h4>
            <ul className="space-y-3">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} CityPulse. All rights reserved. 
            <span className="text-blue-400 ml-2">Building the future, one city at a time.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
