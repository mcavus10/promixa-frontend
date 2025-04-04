"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

/**
 * Higher-Order Component that protects routes requiring authentication
 * Redirects to login page if user is not authenticated
 */
export default function withAuth(Component: React.ComponentType<any>) {
  return function AuthenticatedComponent(props: any) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      // Only redirect after auth state is loaded
      if (!loading && !isAuthenticated) {
        console.log("withAuth: Redirecting to /login because !loading && !isAuthenticated"); // For debugging
        router.replace('/login');
      }
    }, [isAuthenticated, loading, router]);
    
    // ABSOLUTELY show spinner until loading is complete
    if (loading) {
      console.log("withAuth: Showing spinner because loading=true"); // For debugging
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      );
    }
    
    // Loading is complete BUT user is not logged in (and useEffect redirect has not yet completed)
    // return null, which will show a blank space until the redirect occurs
    if (!isAuthenticated) {
      console.log("withAuth: Returning null because !isAuthenticated after loading"); // For debugging
      return null;
    }
    
    // Loading is complete AND user is logged in, render the actual Component.
    console.log("withAuth: Rendering Component because loading=false and isAuthenticated=true"); // For debugging
    return <Component {...props} />;
  };
}
