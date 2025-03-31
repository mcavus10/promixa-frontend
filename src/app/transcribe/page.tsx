'use client';

import { useState } from 'react';
import TranscribeForm from '@/components/TranscribeForm';

export default function TranscribePage() {
  const [activeTab, setActiveTab] = useState<'audio' | 'video'>('audio');

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* Decorative blurred gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Convert Speech to Text with AI
          </h1>
          <p className="text-gray-600 text-lg">
            Transform any audio or video content into accurate text transcriptions with our advanced AI technology.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto mb-12">
          <div 
            className={`flex-1 p-8 rounded-2xl shadow-md transition-all cursor-pointer border-2 ${
              activeTab === 'audio' ? 'border-blue-500 bg-white' : 'border-transparent bg-white/80 hover:bg-white'
            }`}
            onClick={() => setActiveTab('audio')}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Audio to Text</h3>
              <p className="text-gray-600 mb-4">
                Convert audio recordings, podcasts, or voice memos into accurate text.
              </p>
              <span 
                className={`inline-flex items-center text-sm font-medium ${activeTab === 'audio' ? 'text-blue-600' : 'text-gray-500'}`}
              >
                {activeTab === 'audio' ? 'Selected' : 'Select'} 
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </div>
          </div>

          <div 
            className={`flex-1 p-8 rounded-2xl shadow-md transition-all cursor-pointer border-2 ${
              activeTab === 'video' ? 'border-teal-500 bg-white' : 'border-transparent bg-white/80 hover:bg-white'
            }`}
            onClick={() => setActiveTab('video')}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Video to Text</h3>
              <p className="text-gray-600 mb-4">
                Extract audio from videos and convert speech into accurate transcriptions.
              </p>
              <span 
                className={`inline-flex items-center text-sm font-medium ${activeTab === 'video' ? 'text-teal-600' : 'text-gray-500'}`}
              >
                {activeTab === 'video' ? 'Selected' : 'Select'} 
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto mb-16 transition-all">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'audio' ? 'Audio Transcription' : 'Video Transcription'}
            </h2>
            <p className="text-gray-600">
              {activeTab === 'audio' 
                ? 'Upload your audio file and we\'ll convert it to text.' 
                : 'Upload your video file and we\'ll extract the audio and convert it to text.'}
            </p>
          </div>

          <div className="py-4">
            <TranscribeForm fileType={activeTab} />
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Why Use Our Transcription Service?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast & Efficient</h3>
              <p className="text-gray-600">
                Our AI transcribes content within minutes, saving you hours of manual work.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-purple-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Multilingual Support</h3>
              <p className="text-gray-600">
                Supports multiple languages with high accuracy across various accents.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-green-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Private & Secure</h3>
              <p className="text-gray-600">
                Your files are encrypted and automatically deleted after processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
