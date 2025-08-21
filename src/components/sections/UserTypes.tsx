import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface UserType {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
}

const userTypes: UserType[] = [
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Citizens',
    description: 'Report issues, track city projects, and stay informed',
    features: [
      'Report city issues and concerns',
      'Track progress of reported issues',
      'Receive real-time updates'
    ],
    buttonText: 'Join as Citizen',
    buttonHref: '/signup?type=user'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Official Authorities',
    description: 'Manage city operations, respond to issues, and coordinate projects',
    features: [
      'Manage and respond to citizen reports',
      'Coordinate city projects and initiatives',
      'Access comprehensive analytics and reports'
    ],
    buttonText: 'Join as Authority',
    buttonHref: '/signup?type=authority'
  }
];

const UserTypes: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Role
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're a citizen wanting to contribute or an authority managing city operations, 
            we have the right tools for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {userTypes.map((userType, index) => (
            <Card key={index} className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  {userType.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{userType.title}</h3>
                <p className="text-gray-600">{userType.description}</p>
              </div>
              <ul className="space-y-3 mb-6">
                {userType.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <Button 
                  variant="primary" 
                  href={userType.buttonHref}
                >
                  {userType.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypes;
