'use client'
import React, {useState, useEffect} from 'react';
import { Navigation, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';

const AuthorityLogin = () => {
  const { userLoggedIn, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log('Authority login component mounted, auth state:', { userLoggedIn });
  }, [userLoggedIn]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Authority form submitted with email:', email);
    
    if (!isSigningIn && email && password) {
      setIsSigningIn(true);
      setErrorMessage('');
      
      try {
        login(email, password, 'authority');
        console.log('Authority login successful, redirecting to dashboard');
        router.push('/authority-dashboard');
      } catch (error) {
        console.error('Authority login error:', error);
        setErrorMessage('Failed to sign in');
      } finally {
        setIsSigningIn(false);
      }
    } else if (!email || !password) {
      setErrorMessage('Please fill in all fields');
    }
  };

  const onGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Authority Google sign in initiated');
    
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');
      
      try {
        const mockEmail = `authority${Date.now()}@example.gov`;
        login(mockEmail, 'google123', 'authority');
        console.log('Authority Google sign in successful, redirecting to dashboard');
        router.push('/authority-dashboard');
      } catch (error) {
        console.error('Authority Google sign in error:', error);
        setErrorMessage('Failed to sign in with Google');
        setIsSigningIn(false);
      }
    }
  };

  if (userLoggedIn) {
    console.log('Authority user already logged in, redirecting to dashboard');
    router.push('/authority-dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">🔒👤Authority Login</h1>
        <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          {errorMessage && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {errorMessage}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Official Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" 
              placeholder="official@example.gov" 
              required
              disabled={isSigningIn}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" 
              placeholder="••••••••" 
              required
              disabled={isSigningIn}
            />
          </div>
          <Button variant="primary" size="md" className="w-full" type="submit" disabled={isSigningIn}>
            {isSigningIn ? 'Signing In...' : 'Login'}
          </Button>
          <button
            type="button"
            onClick={onGoogleSignIn}
            disabled={isSigningIn}
            className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSigningIn ? 'Signing In...' : 'Sign in with Google'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Don&apos;t have an authority account? <a href="/signup?type=authority" className="text-gray-800 underline">Sign up</a>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default AuthorityLogin;