import React from 'react';
import { redirect } from 'next/navigation';
import { Navigation, Footer } from '@/components/layout';
import { Button } from '@/components/ui';


export default function LoginIndexPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const type = (Array.isArray(searchParams?.type) ? searchParams?.type[0] : searchParams?.type) as
    | 'user'
    | 'authority'
    | undefined;

  if (type === 'user') redirect('/login/user');
  if (type === 'authority') redirect('/login/authority');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Login</h1>
        <p className="text-gray-600 mb-8">Choose your role to continue.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button href="/login/user" variant="primary" size="lg">
            Login as Citizen
          </Button>
          <Button href="/login/authority" variant="outline" size="lg">
            Login as Authority
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
