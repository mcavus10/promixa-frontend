'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useEffect } from 'react';

export function Navbar() {
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
          <Button variant="default" size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
            Get Started
          </Button>
        </div>
        
        <button className="block md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
