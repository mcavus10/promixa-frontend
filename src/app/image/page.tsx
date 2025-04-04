'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ImageGenerationPlaceholder() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white flex items-center justify-center px-4">
      {/* Decorative blurred gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 bg-white/90 p-8 sm:p-12 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-100">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
          <Construction className="w-8 h-8 text-blue-600" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          AI Image Generation
        </h1>
        
        <div className="relative inline-block mb-6">
          <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Coming Soon!
          </span>
          <Sparkles className="absolute -right-6 -top-2 w-5 h-5 text-amber-500" />
        </div>
        
        <p className="text-lg text-gray-600 mb-8 mx-auto max-w-2xl">
          We&apos;re working hard to bring you an amazing AI image generation experience. This feature will allow you to create stunning visuals from simple text prompts using powerful diffusion models.
        </p>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
