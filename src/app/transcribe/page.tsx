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
                className={`inline-flex items-center text-sm font-medium ${activeTab === 'audio' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                {activeTab === 'audio' ? 'Selected' : 'Select'}
                {activeTab === 'audio' && (
                  <svg className="ml-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
            </div>
          </div>

          <div 
            className={`flex-1 p-8 rounded-2xl shadow-md transition-all cursor-pointer border-2 ${
              activeTab === 'video' ? 'border-blue-500 bg-white' : 'border-transparent bg-white/80 hover:bg-white'
            }`}
            onClick={() => setActiveTab('video')}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Video to Text</h3>
              <p className="text-gray-600 mb-4">
                Extract text from videos, interviews, presentations, and more.
              </p>
              <span 
                className={`inline-flex items-center text-sm font-medium ${activeTab === 'video' ? 'text-purple-600' : 'text-gray-600'}`}
              >
                {activeTab === 'video' ? 'Selected' : 'Select'}
                {activeTab === 'video' && (
                  <svg className="ml-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Main Transcription Form */}
        <TranscribeForm activeTab={activeTab} />
      </div>
    </div>
  );
}
