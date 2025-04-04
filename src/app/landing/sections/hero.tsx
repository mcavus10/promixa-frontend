'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export function HeroSection() {
  const { isAuthenticated, loading } = useAuth();

  return (
    <section id="top" className="py-20 pb-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            AI-Powered Tools
          </span>
          {' '}
          <span className="block">for Your Creative Journey</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl">
          Unlock your creative potential with Promixa&apos;s suite of AI tools. Generate stunning images, 
          transcribe audio, and more - all in one platform.
        </p>
        
        {loading ? (
          <Button 
            size="lg" 
            className="rounded-full py-6 px-8 text-lg mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg shadow-md"
            disabled
          >
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            LOADING
          </Button>
        ) : isAuthenticated ? (
          <Link href="/dashboard">
            <Button 
              size="lg" 
              className="rounded-full py-6 px-8 text-lg mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] shadow-md"
            >
              GO TO DASHBOARD
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button 
              size="lg" 
              className="rounded-full py-6 px-8 text-lg mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] shadow-md"
            >
              GET STARTED
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
