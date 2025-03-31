import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="py-20 pb-8 bg-gradient-to-b from-white to-gray-50">
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
        <Button size="lg" className="rounded-full py-6 px-8 text-lg mb-6">
          <Link href="#features">Try the Image Generator</Link>
        </Button>
      </div>
    </section>
  );
}
