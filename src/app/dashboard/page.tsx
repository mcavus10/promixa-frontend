'use client';

import { useEffect } from 'react';
import withAuth from '@/lib/auth/withAuth';
import { useAuth } from '@/lib/contexts/AuthContext';
import { WelcomeHeader } from './components/WelcomeHeader';
import { ProfileUpdateForm } from './components/ProfileUpdateForm';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileAudio, Zap } from 'lucide-react';

function DashboardPage() {
  const { user, isAuthenticated, loading, refreshUserData } = useAuth();

  // Dashboard'a her girişte refreshUserData çağrısı kaldırıldı
  // useEffect(() => {
  //   if (isAuthenticated && !loading) {
  //     refreshUserData();
  //   }
  // }, [isAuthenticated, loading, refreshUserData]);

  // Format date to DD.MM.YYYY
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Calculate trial end date (30 days from trial start)
  const calculateTrialEndDate = (startDateString: string) => {
    try {
      // Girdideki tarihi parçala
      const startDate = new Date(startDateString);
      
      // Geçerli bir tarih değilse hata mesajı döndür
      if (isNaN(startDate.getTime())) {
        return 'Invalid date';
      }
      
      // UTC tarih oluşturarak timezone sorunlarından kaçın
      const startTimestamp = startDate.getTime();
      // 30 gün (milisaniye cinsinden) ekle
      const endTimestamp = startTimestamp + (30 * 24 * 60 * 60 * 1000);
      const endDate = new Date(endTimestamp);
      
      return formatDate(endDate.toISOString());
    } catch (error) {
      console.error('Error calculating trial end date:', error);
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // withAuth should handle this, but just in case
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigasyon Butonları */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
          <div>
            <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Ana Sayfa
            </Link>
          </div>
          
          <div>
            <Link href="/transcribe" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              <FileAudio className="h-4 w-4 mr-1" />
              Transkripsiyon
            </Link>
          </div>
        </div>
        
        <WelcomeHeader userName={user.name || 'User'} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Information</h2>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Trial Status</span>
                <span className="font-medium">
                  {user.isTrialActive ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Expired</span>
                  )}
                </span>
              </div>
              
              {/* Sadece trial aktifse trial sonu tarihini göster */}
              {user.isTrialActive && user.trialStartDate && (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Trial End Date</span>
                  <span className="font-medium">{calculateTrialEndDate(user.trialStartDate)}</span>
                </div>
              )}
            </div>
          </Card>
          
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Usage Statistics</h2>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Transcription Minutes Used</span>
                <span className="font-medium">{user.transcriptionMinutesUsed || 0} minutes</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Image Generation Count</span>
                <span className="font-medium">{user.imageGenerationCount || 0} images</span>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Quick Actions Card */}
        <Card className="p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <h3 className="text-base font-medium text-gray-700">Transcribe Audio</h3>
              <p className="text-sm text-gray-500">Convert speech to text with our AI-powered transcription service.</p>
              <Button asChild size="lg" className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md">
                <Link href="/transcribe" className="flex items-center">
                  <FileAudio className="h-5 w-5 mr-2" />
                  Start New Transcription
                </Link>
              </Button>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-base font-medium text-gray-700">Image Generation</h3>
              <p className="text-sm text-gray-500">Create stunning AI-generated images from text descriptions.</p>
              <Button disabled size="lg" className="mt-2 bg-gray-200 text-gray-500 cursor-not-allowed shadow-sm">
                <span className="flex items-center">
                  Coming Soon
                </span>
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Profile Update Forms */}
        <ProfileUpdateForm />
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);
