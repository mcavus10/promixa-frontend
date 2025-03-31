import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export function Navbar() {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-primary">Promixa</Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:block">
          <Button variant="default" size="sm">
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
