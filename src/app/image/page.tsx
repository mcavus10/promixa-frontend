'use client';

import { useState } from 'react';
import PromptForm from '@/components/PromptForm';
import ImageUploadForm from '@/components/ImageUploadForm';
import ImageResult from '@/components/ImageResult';

export default function ImageGenerationPage() {
  const [activeTab, setActiveTab] = useState<'prompt' | 'upload'>('prompt');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<Array<{ imageUrl: string; prompt: string }>>([]);

  // Mock image generation function
  const generateImage = (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock result with random unsplash image
      const newResult = {
        imageUrl: `https://source.unsplash.com/random/800x800?${encodeURIComponent(prompt)}`,
        prompt: prompt
      };
      
      setResults([newResult, ...results]);
      setIsGenerating(false);
    }, 2000);
  };

  // Mock image transformation function
  const transformImage = (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock result with random unsplash image
      const newResult = {
        imageUrl: `https://source.unsplash.com/random/800x800?${encodeURIComponent(prompt)}`,
        prompt: prompt
      };
      
      setResults([newResult, ...results]);
      setIsGenerating(false);
    }, 2500);
  };

  // Handle prompt-based generation
  const handlePromptGenerate = (prompt: string) => {
    generateImage(prompt);
  };

  // Handle upload-based generation
  const handleUploadGenerate = (prompt: string) => {
    transformImage(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* Decorative blurred gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create Stunning AI-Generated Images
          </h1>
          <p className="text-gray-600 text-lg">
            Transform your ideas into beautiful visuals using our advanced AI image generation tool.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto mb-12">
          <div 
            className={`flex-1 p-8 rounded-2xl shadow-md transition-all cursor-pointer border-2 ${
              activeTab === 'prompt' ? 'border-blue-500 bg-white' : 'border-transparent bg-white/80 hover:bg-white'
            }`}
            onClick={() => setActiveTab('prompt')}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Prompt-Based Generation</h3>
              <p className="text-gray-600 mb-4">
                Simply describe what you want to see and our AI will create it for you.
              </p>
              <span 
                className={`inline-flex items-center text-sm font-medium ${activeTab === 'prompt' ? 'text-blue-600' : 'text-gray-500'}`}
              >
                {activeTab === 'prompt' ? 'Selected' : 'Select'} 
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </div>
          </div>

          <div 
            className={`flex-1 p-8 rounded-2xl shadow-md transition-all cursor-pointer border-2 ${
              activeTab === 'upload' ? 'border-purple-500 bg-white' : 'border-transparent bg-white/80 hover:bg-white'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload + Prompt Generation</h3>
              <p className="text-gray-600 mb-4">
                Upload your own image and transform it with AI-powered editing.
              </p>
              <span 
                className={`inline-flex items-center text-sm font-medium ${activeTab === 'upload' ? 'text-purple-600' : 'text-gray-500'}`}
              >
                {activeTab === 'upload' ? 'Selected' : 'Select'} 
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
              {activeTab === 'prompt' ? 'Describe Your Image' : 'Transform Your Image'}
            </h2>
            <p className="text-gray-600">
              {activeTab === 'prompt' 
                ? 'Be as detailed as possible for the best results.' 
                : 'Upload an image and describe how you want to transform it.'}
            </p>
          </div>

          <div className="py-4">
            {activeTab === 'prompt' ? (
              <PromptForm onGenerate={handlePromptGenerate} isGenerating={isGenerating} />
            ) : (
              <ImageUploadForm onGenerate={handleUploadGenerate} isGenerating={isGenerating} />
            )}
          </div>
        </div>
        
        {/* Results Section */}
        {results.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Generated Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <ImageResult 
                  key={index}
                  imageUrl={result.imageUrl}
                  prompt={result.prompt}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
