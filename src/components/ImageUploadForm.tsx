'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadFormProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export default function ImageUploadForm({ onGenerate, isGenerating }: ImageUploadFormProps) {
  const [prompt, setPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating && imageFile) {
      onGenerate(prompt);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          className="relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center h-64 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={!uploadedImage ? triggerFileInput : undefined}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden"
          />
          
          {!uploadedImage ? (
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm mb-1">Drag & drop an image here, or click to select</p>
              <p className="text-gray-400 text-xs">Supported formats: JPG, PNG, WebP</p>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Image 
                src={uploadedImage} 
                alt="Uploaded image"
                fill
                className="object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
                className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="upload-prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Describe how you want to transform the image
          </label>
          <textarea
            id="upload-prompt"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm resize-none transition-all"
            placeholder="Convert this image to anime style with vibrant colors..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating || !uploadedImage}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating || !uploadedImage}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Transforming...
              </div>
            ) : (
              'Transform Image'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
