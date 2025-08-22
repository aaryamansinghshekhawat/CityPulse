import React, {useState} from 'react';
import { Navigation, Footer } from '@/components/layout';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext'

const Login = () => {
  const { userLoggedIn} = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!isSigningIn) {
      setIsSigningIn(true)
      await doSignInWithEmailAndPassword(email, password)
    }

  const onGoogleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!isSigningIn) {
      setIsSigningIn(true)
      doSignInWithGoogle().catch(err => {
        setIsSigningIn(false)
      })
    }
}



export default function AuthorityLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {userLoggedIn && (<Navigate to={'/home'} replace={true}/>)}
      <Navigation />
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">🔒👤Authority Login</h1>
        <form className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Official Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="official@example.gov" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="••••••••" />
          </div>
          <Button variant="primary" size="md" className="w-full">Login</Button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Don&apos;t have an authority account? <a href="/signup?type=authority" className="text-gray-800 underline">Sign up</a>
        </p>
      </main>
      <Footer />
    </div>
  );
}
}
}