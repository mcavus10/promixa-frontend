'use client';

import { useState } from 'react';

interface PromptFormProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export default function PromptForm({ onGenerate, isGenerating }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Describe the image you want to create
          </label>
          <textarea
            id="prompt"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm resize-none transition-all"
            placeholder="A surreal landscape with floating islands and waterfalls, digital art style..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPrompt(prompt + " digital art")}
              className="text-xs px-3 py-1.5 bg-gradient-to-r from-violet-100 to-indigo-100 text-indigo-700 rounded-full hover:shadow-md transition-shadow"
            >
              Digital Art
            </button>
            <button
              type="button"
              onClick={() => setPrompt(prompt + " photorealistic")}
              className="text-xs px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-teal-700 rounded-full hover:shadow-md transition-shadow"
            >
              Photorealistic
            </button>
            <button
              type="button"
              onClick={() => setPrompt(prompt + " anime style")}
              className="text-xs px-3 py-1.5 bg-gradient-to-r from-rose-100 to-pink-100 text-pink-700 rounded-full hover:shadow-md transition-shadow"
            >
              Anime Style
            </button>
          </div>
          
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </div>
            ) : (
              'Generate Image'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
