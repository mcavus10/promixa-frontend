"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { storeAuthToken } from '@/lib/api/auth';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/contexts/AuthContext';

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const { refreshUserData, logout } = useAuth();

  useEffect(() => {
    // Only get the token from the URL
    const token = searchParams.get('token');

    if (!token) {
      setError('Authentication failed: Missing token.');
      return;
    }

    const processAuthentication = async () => {
      try {
        // 1. Save the token to localStorage
        storeAuthToken(token);
        
        // 2. Get the updated user information from the backend
        await refreshUserData();
        
        // 3. Redirect to the transcribe page after successful verification
        router.push('/transcribe');
      } catch (err) {
        console.error('Failed to process authentication', err);
        // In case of error, clear the token and log out the user
        logout();
        setError('Authentication failed. Please try logging in again.');
      }
    };

    processAuthentication();
  }, [searchParams, router, refreshUserData, logout]); // Only the necessary dependencies

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Button 
            onClick={() => router.push('/login')}
            className="w-full"
          >
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Successful</h2>
        <p className="text-gray-700 mb-6">You are being redirected to the transcription page...</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback while the suspense boundary is resolving
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Authentication</h2>
        <p className="text-gray-700 mb-6">Please wait while we verify your credentials...</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GoogleCallbackContent />
    </Suspense>
  );
}
