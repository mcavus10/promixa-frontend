'use client';

import { PageTransition } from '@/components/PageTransition';
import { AuthProvider } from '@/lib/contexts/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PageTransition>
        {children}
      </PageTransition>
    </AuthProvider>
  );
}
