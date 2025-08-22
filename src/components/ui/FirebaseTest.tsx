'use client'
import React, { useState, useEffect } from 'react';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

const FirebaseTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing...');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setStatus('Logged in');
      } else {
        setUser(null);
        setStatus('Not logged in');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-2">Firebase Status Test</h3>
      <p className="text-sm text-gray-600 mb-2">Status: {status}</p>
      {user && <p className="text-sm text-gray-700">Welcome, {user.email}</p>}
      <div className="text-xs text-gray-500">
        <p>Auth initialized: {auth ? 'Yes' : 'No'}</p>
        <p>Current user: {auth?.currentUser ? auth.currentUser.email : 'None'}</p>
      </div>
    </div>
  );
};

export default FirebaseTest;
