'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type DashboardCardProps = {
  title: string;
  description: string;
  icon: string;
  href: string;
  isDisabled?: boolean;
  comingSoon?: boolean;
};

export function DashboardCard({
  title,
  description,
  icon,
  href,
  isDisabled = false,
  comingSoon = false
}: DashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const gradientStyles = {
    'AI Image Generator': 'from-blue-600 via-indigo-500 to-purple-600',
    'Transcribe Audio/Video': 'from-blue-400 via-cyan-500 to-teal-500',
    'Content Generator': 'from-pink-500 via-rose-400 to-orange-500'
  };

  const gradient = gradientStyles[title as keyof typeof gradientStyles] || 'from-blue-600 to-purple-600';

  const CardContent = () => (
    <div 
      className={cn(
        'relative h-full w-full p-6 rounded-xl transition-all duration-300 shadow-md',
        isDisabled ? 'bg-gray-100 cursor-not-allowed opacity-80' : 'bg-white hover:shadow-lg',
        isHovered && !isDisabled && 'scale-[1.02]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center mb-4">
        <div className={cn(
          'flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br', 
          gradient
        )}>
          <Image src={icon} alt={title} width={24} height={24} className="text-white" />
        </div>
        <h3 className="ml-4 text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      {comingSoon && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md transform rotate-3">
          Coming Soon
        </div>
      )}
      
      <div className={cn(
        'mt-auto text-sm font-medium transition-colors duration-200',
        isDisabled ? 'text-gray-400' : 'text-blue-600'
      )}>
        {isDisabled ? 'Not available yet' : 'Launch'} →
      </div>
      
      {isHovered && !isDisabled && (
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r opacity-20 blur-sm transition-opacity duration-300"></div>
      )}
      
      {/* Dynamic gradient border effect on hover */}
      {isHovered && !isDisabled && (
        <div 
          className={cn(
            'absolute -z-10 -inset-[1px] rounded-xl bg-gradient-to-r animate-gradient-border',
            gradient
          )}
        ></div>
      )}
    </div>
  );

  if (isDisabled) {
    return <div className="h-full"><CardContent /></div>;
  }

  return (
    <Link href={href} className="block h-full transition-all duration-300">
      <CardContent />
    </Link>
  );
}
