'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, Loader2, LogOut, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { isAuthenticated, loading, logout, user } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Enhanced smooth scrolling function with easing
  useEffect(() => {
    const handleNavLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Get the current position
          const startPosition = window.pageYOffset;
          // Calculate target position with offset
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
          // Duration of the scroll animation in milliseconds
          const duration = 800;
          // Start time of the animation
          let startTime: number | null = null;
          
          // Animation function with easeInOutQuad easing
          function animation(currentTime: number) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function: acceleration until halfway, then deceleration
            const easeInOutQuad = (t: number) => {
              return t < 0.5
                ? 2 * t * t
                : 1 - Math.pow(-2 * t + 2, 2) / 2;
            };
            
            window.scrollTo(0, startPosition + (targetPosition - startPosition) * easeInOutQuad(progress));
            
            if (timeElapsed < duration) {
              requestAnimationFrame(animation);
            }
          }
          
          requestAnimationFrame(animation);
        }
      }
    };

    document.addEventListener('click', handleNavLinkClick);
    return () => document.removeEventListener('click', handleNavLinkClick);
  }, []);

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-primary flex items-center">
            <div className="relative w-6 h-6 mr-2">
              <Image src="/favicon.ico" alt="Promixa Logo" width={24} height={24} className="object-contain" />
            </div>
            Promixa
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#top" className="text-sm font-medium hover:text-primary transition-colors duration-300">
            Home
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors duration-300">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors duration-300">
            Pricing
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors duration-300">
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:block">
          {loading ? (
            <Button 
              variant="default" 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              disabled
            >
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Loading
            </Button>
          ) : isAuthenticated ? (
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-4 hidden md:inline-block truncate max-w-[150px]">
                {user?.email}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  logout();
                  // Logout yaptıktan sonra anasayfaya yönlendir
                  router.push('/');
                }}
                className="flex items-center transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button 
                variant="default" 
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Get Started
              </Button>
            </Link>
          )}
        </div>
        
        <button 
          className="block md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6 absolute w-full z-50 border-t border-gray-100">
          <nav className="flex flex-col space-y-4 mb-6">
            <Link 
              href="#top" 
              className="text-sm font-medium hover:text-primary transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="#features" 
              className="text-sm font-medium hover:text-primary transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#pricing" 
              className="text-sm font-medium hover:text-primary transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="#contact" 
              className="text-sm font-medium hover:text-primary transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
          
          {loading ? (
            <Button 
              variant="default" 
              size="sm" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              disabled
            >
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Loading
            </Button>
          ) : isAuthenticated ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-sm text-gray-600 truncate">
                  {user?.email}
                </span>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    variant="link" 
                    size="sm"
                    className="text-blue-600 p-0"
                  >
                    Dashboard
                  </Button>
                </Link>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                  router.push('/');
                }}
                className="w-full flex items-center justify-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="w-full block" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Get Started
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
