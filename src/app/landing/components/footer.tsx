import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Promixa</h3>
            <p className="mb-4 max-w-md">
              Empowering creators and professionals with cutting-edge AI tools for image generation, 
              transcription, and more.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" className="hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://x.com" target="_blank" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">Image Generator</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Transcription Tool</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Coming Soon</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Promixa. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
