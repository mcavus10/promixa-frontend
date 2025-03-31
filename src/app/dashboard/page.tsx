'use client';

import { useState, useEffect } from 'react';
import { WelcomeHeader } from './components/WelcomeHeader';
import { DashboardCard } from './components/DashboardCard';
import { RecentActivity } from './components/RecentActivity';
import { QuickActions } from './components/QuickActions';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  // Make sure animations fire after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-12">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <WelcomeHeader userName="Alex" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className={`transform transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <DashboardCard
              title="AI Image Generator"
              description="Create beautiful AI-generated images from text descriptions or prompts."
              icon="/icons/image.svg"
              href="/image"
            />
          </div>
          
          <div className={`transform transition-all duration-500 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <DashboardCard
              title="Transcribe Audio/Video"
              description="Convert speech from audio or video files into accurate text transcriptions."
              icon="/icons/audio.svg"
              href="/transcribe"
            />
          </div>
          
          <div className={`transform transition-all duration-500 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <DashboardCard
              title="Content Generator"
              description="Generate blog posts, marketing copy, and other creative content with AI."
              icon="/icons/document.svg"
              href="#"
              isDisabled={true}
              comingSoon={true}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
