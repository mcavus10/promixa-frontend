'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  loginWithEmail, 
  registerUser, 
  storeAuthToken, 
  storeUserData,
  getGoogleLoginUrl 
} from '@/lib/api/auth';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setAuthData, isAuthenticated, loading, refreshUserData } = useAuth();

  // Redirect authenticated users away from login page
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    
    try {
      const response = await loginWithEmail({
        email,
        password
      });
      
      // Store token and user data
      storeAuthToken(response.token);
      storeUserData(response);
      
      // Update auth context
      setAuthData(response);
      
      // Refresh user data
      await refreshUserData();
      
      // Redirect to transcribe page instead of dashboard
      router.push('/transcribe');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error instanceof Error ? error.message : 'Failed to login. Please check your credentials.');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Redirect to Google OAuth URL
    window.location.href = getGoogleLoginUrl();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (registerPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    setRegisterError('');
    setIsLoading(true);
    
    try {
      await registerUser({
        name,
        email: registerEmail,
        password: registerPassword
      });
      
      // After successful registration, automatically log in the user
      try {
        const loginResponse = await loginWithEmail({
          email: registerEmail,
          password: registerPassword
        });
        
        // Store token and user data
        storeAuthToken(loginResponse.token);
        storeUserData(loginResponse);
        
        // Update auth context
        setAuthData(loginResponse);
        
        // Refresh user data
        await refreshUserData();
        
        // Redirect to transcribe page
        router.push('/transcribe');
        
        return; // Exit early since we're redirecting
      } catch (loginError) {
        console.error('Auto-login after registration failed:', loginError);
        // Fall back to the original behavior if auto-login fails
      }
      
      // Original fallback behavior if auto-login fails
      setActiveTab('login');
      setEmail(registerEmail); // Auto-fill email field
      
      // Reset register form
      setName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // If user is already authenticated or still checking auth status, don't render the login form
    loading || isAuthenticated ? null : (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center p-4 pb-16">
      <Link href="/" className="absolute top-8 left-8 text-xl font-bold text-primary flex items-center">
        <div className="relative w-6 h-6 mr-2">
          <Image src="/favicon.ico" alt="Promixa Logo" width={24} height={24} className="object-contain" />
        </div>
        Promixa
      </Link>
      
      <div className="w-full max-w-md mb-16">
        <div className="bg-white shadow-xl rounded-2xl">
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
                
                {loginError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    {loginError}
                  </div>
                )}
                
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
                
                {registerError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    {registerError}
                  </div>
                )}
                
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
                    <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="registerEmail"
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      id="registerPassword"
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border focus:outline-none transition-all ${passwordError ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'}`}
                      placeholder="••••••••"
                      required
                    />
                    {passwordError && (
                      <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full py-2 md:py-4 font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 md:h-5 md:w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    ) : null}
                    Create Account
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    )
  );
}
