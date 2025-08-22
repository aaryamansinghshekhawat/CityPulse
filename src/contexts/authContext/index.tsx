'use client'
import React, { useContext, useState, useEffect, createContext } from "react";

interface User {
  id: string;
  email: string;
  type: 'citizen' | 'authority';
  name: string;
}

interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string, type: 'citizen' | 'authority') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const loading = false;

  const login = (email: string, password: string, type: 'citizen' | 'authority') => {
    const user: User = {
      id: Date.now().toString(),
      email,
      type,
      name: email.split('@')[0]
    };
    setCurrentUser(user);
    setUserLoggedIn(true);
    localStorage.setItem('citypulse_user', JSON.stringify(user));
    console.log('User logged in:', user);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserLoggedIn(false);
    localStorage.removeItem('citypulse_user');
    console.log('User logged out');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('citypulse_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser) as User;
        setCurrentUser(user);
        setUserLoggedIn(true);
        console.log('Restored user from storage:', user);
      } catch (error) {
        console.error('Error restoring user:', error);
        localStorage.removeItem('citypulse_user');
      }
    }
  }, []);

  const value: AuthContextType = {
    currentUser,
    userLoggedIn,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}