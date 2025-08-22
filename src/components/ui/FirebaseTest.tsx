'use client'
import React, { useState, useEffect } from 'react';
import { auth } from '@/firebase/firebase';

const FirebaseTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testFirebase = async () => {
      try {
        if (!auth) {
          throw new Error('Firebase auth is not initialized');
        }

        const currentUser = auth.currentUser;
        console.log('Current user:', currentUser);
        
        if (typeof auth.onAuthStateChanged === 'function') {
          const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log('Auth state changed in test:', user);
            setStatus('Firebase is working correctly!');
          });
          setTimeout(() => {
            unsubscribe();
            setStatus('Firebase test completed successfully');
          }, 1000);
        } else {
          setStatus('Auth object is available');
        }

      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('Firebase test failed:', err);
        setError(message);
        setStatus('Firebase test failed');
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-2">Firebase Status Test</h3>
      <p className="text-sm text-gray-600 mb-2">Status: {status}</p>
      {error && (
        <p className="text-sm text-red-600">Error: {error}</p>
      )}
      <div className="text-xs text-gray-500">
        <p>Auth initialized: {auth ? 'Yes' : 'No'}</p>
        <p>Current user: {auth?.currentUser ? auth.currentUser.email : 'None'}</p>
      </div>
    </div>
  );
};

export default FirebaseTest;
