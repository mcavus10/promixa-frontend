'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demonstration, just redirect to home after "login"
      router.push('/image');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demonstration, just redirect to home after "login"
      router.push('/image');
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (registerPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // After registration, switch to login tab
      setActiveTab('login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 text-xl font-bold text-primary flex items-center">
        <div className="relative w-6 h-6 mr-2">
          <Image src="/favicon.ico" alt="Promixa Logo" width={24} height={24} className="object-contain" />
        </div>
        Promixa
      </Link>
      
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-10">
          {/* Tab navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-4 text-center font-medium transition-colors duration-300 ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-4 text-center font-medium transition-colors duration-300 ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Register
            </button>
          </div>
          
          {/* Tab content with conditional rendering based on activeTab */}
          <div className="relative">
            {activeTab === 'login' ? (
              <div className="p-6 md:p-8 animate-fadeIn">
                <div className="text-center mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">
                    Sign in to continue your creative journey
                  </p>
                </div>
                
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Link href="#" className="text-xs md:text-sm text-blue-600 hover:text-blue-800 transition-colors">
                        Forgot password?
                      </Link>
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full py-2 md:py-4 font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 md:h-5 md:w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    ) : null}
                    Sign in with Email
                  </Button>
                </form>
                
                <div className="mt-4 md:mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs md:text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-6">
                    <Button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full py-2 md:py-4 font-medium bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg transition-all duration-300 flex items-center justify-center shadow-sm"
                      disabled={isLoading}
                    >
                      <Image 
                        src="/google-logo.svg" 
                        alt="Google" 
                        width={18} 
                        height={18} 
                        className="mr-2" 
                      />
                      Sign in with Google
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 md:p-8 animate-fadeIn">
                <div className="text-center mb-5">
                  <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Create Account
                  </h1>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">
                    Join Promixa and start creating today
                  </p>
                </div>
                
                <form onSubmit={handleRegister} className="space-y-3 md:space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="register-email"
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        id="register-password"
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-xs md:text-sm -mt-1">{passwordError}</p>
                  )}
                  
                  <Button 
                    type="submit"
                    className="w-full py-2 md:py-4 font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 md:h-5 md:w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    ) : null}
                    Create Free Account
                  </Button>
                </form>
                
                <div className="mt-4 md:mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs md:text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or register with
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full py-2 md:py-4 font-medium bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg transition-all duration-300 flex items-center justify-center shadow-sm"
                      disabled={isLoading}
                    >
                      <Image 
                        src="/google-logo.svg" 
                        alt="Google" 
                        width={18} 
                        height={18}  
                        className="mr-2" 
                      />
                      Sign up with Google
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Promixa. All rights reserved.
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
