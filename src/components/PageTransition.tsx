'use client';

import { useState, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show loading on initial page load
    if (isLoading) {
      // Hide loading after a short delay
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1200); // Adjust timing as needed
      
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {children}
    </>
  );
}
