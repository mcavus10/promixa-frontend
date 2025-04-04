'use client';

import { useState, useCallback, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import AudioUpload from './AudioUpload';
import LanguageSelector from './LanguageSelector';
import TranscriptionResult from './TranscriptionResult';
import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/api/auth';
import { Loader2 } from 'lucide-react';

interface TranscribeFormProps {
  activeTab: 'audio' | 'video';
}

export default function TranscribeForm({ activeTab }: TranscribeFormProps) {
  // First let's make all hook calls
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  
  // State hooks
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('en');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to check if user can perform transcription - simplified
  const canTranscribe = useCallback(() => {
    // User must be logged in and trial must be active
    return isAuthenticated && user?.isTrialActive === true;
  }, [isAuthenticated, user]);

  // Helper function to return the current file
  const getCurrentFile = useCallback(() => {
    return activeTab === 'audio' ? audioFile : videoFile;
  }, [activeTab, audioFile, videoFile]);

  // We're updating the file selection function to handle null values
  const handleFileSelect = useCallback((selectedFile: File | null) => {
    if (activeTab === 'audio') {
      setAudioFile(selectedFile);
    } else {
      setVideoFile(selectedFile);
    }
    
    // Only reset results if there is a valid file
    if (selectedFile !== null) {
      // Reset result and error when a new file is selected
      setTranscriptionResult(null);
      setError(null);
    }
  }, [activeTab]);

  const handleLanguageChange = useCallback((languageCode: string) => {
    setLanguage(languageCode);
  }, []);

  const redirectToLogin = useCallback(() => {
    router.push(`/login?redirect=/transcribe`);
  }, [router]);

  const handleTranscribe = useCallback(async () => {
    // Skip if still loading
    if (loading) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      setError("Please log in to use the transcription feature.");
      redirectToLogin();
      return;
    }

    // Check if trial is active
    if (!canTranscribe()) {
      setError("Your trial period has expired. Please upgrade your account to continue.");
      return;
    }

    const file = getCurrentFile();
    if (!file) return;
    
    setIsTranscribing(true);
    setError(null);
    
    // Create FormData for the multipart/form-data request
    const formData = new FormData();
    
    // Ensure correct file naming and type
    // Create a new file object with a definitive MIME type based on extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    let fileType = file.type;
    
    // If the file type is empty or generic, assign a more specific one based on extension
    if (!fileType || fileType === 'application/octet-stream') {
      if (fileExtension === 'mp3') {
        fileType = 'audio/mpeg';
      } else if (fileExtension === 'wav') {
        fileType = 'audio/wav';
      } else if (fileExtension === 'ogg') {
        fileType = 'audio/ogg';
      } else if (fileExtension === 'mp4') {
        fileType = 'video/mp4';
      }
    }
    
    // Create a new file with the correct MIME type
    const renamedFile = new File([file], file.name, { type: fileType });
    
    // Decide whether to use auto-detect endpoint based on language
    // Turkish and some other languages need auto-detect
    const isAutoDetectLanguage = language === 'tr'; // Turkish needs auto-detect
    // Ortam değişkeninden backend API URL'ini al
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const endpoint = isAutoDetectLanguage 
      ? `${API_URL}/api/transcribe/auto-detect`
      : `${API_URL}/api/transcribe`;
    
    // Add the file to the FormData
    formData.append('file', renamedFile);
    
    // Add language parameter only for the standard endpoint
    if (!isAutoDetectLanguage) {
      formData.append('language', language);
    }
    
    try {
      // Only log in development environment
      if (process.env.NODE_ENV === 'development') {
        console.log('Sending file:', renamedFile.name, 'Size:', renamedFile.size, 'Type:', renamedFile.type);
        console.log('Language selected:', language);
        console.log('Using endpoint:', endpoint);
        console.log('Auto-detect mode:', isAutoDetectLanguage);
      }
      
      // Make the API request to the backend
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}` // Add token
        },
      });
      
      // Handle the response and extract the transcript
      if (response.data && response.status === 200) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Transcription response:', response.data);
        }
        setTranscriptionResult(response.data.transcript || response.data.text || JSON.stringify(response.data));
      } else {
        setError('Received an invalid response from the server');
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Transcription failed:', err);
      }
      
      // Check if it's an Axios error
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        
        // Special message for 403 Forbidden
        if (axiosError.response?.status === 403) {
          setError('Your trial period has expired or you have reached your transcription limit. Please upgrade your account.');
        } else if (axiosError.response?.status === 401) {
          // 401 Unauthorized - session may have expired
          setError('Your session has expired. Please log in again.');
          redirectToLogin();
        } else {
          // General error message for other errors
          const errorMessage = axiosError.response?.data && typeof axiosError.response.data === 'object' 
            ? (axiosError.response.data as any).message || 'Unknown error' 
            : axiosError.message || 'Unknown error';
          
          setError(`Transcription failed: ${errorMessage}`);
        }
      } else {
        // Not an Axios error
        setError(
          err instanceof Error 
            ? `Transcription failed: ${err.message}` 
            : 'An error occurred while transcribing the file. Please try again.'
        );
      }
    } finally {
      setIsTranscribing(false);
    }
  }, [activeTab, audioFile, videoFile, language, isAuthenticated, loading, canTranscribe, getCurrentFile, redirectToLogin]);

  const handleDownload = useCallback(() => {
    if (!transcriptionResult) return;
    
    // Create a blob from the transcription text
    const blob = new Blob([transcriptionResult], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor to trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcription-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up
    URL.revokeObjectURL(url);
  }, [transcriptionResult]);

  // Now after all hooks are defined, we can check the loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Home
          </Link>
        </div>
        
        <div>
          {isAuthenticated && (
            <Link href="/dashboard" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Dashboard
            </Link>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {activeTab === 'audio' ? 'Audio File' : 'Video File'} Upload
        </h3>
        <p className="text-sm text-gray-500">
          {activeTab === 'audio' 
            ? 'Upload an audio recording to transcribe to text.' 
            : 'Upload a video file to extract the audio and transcribe to text.'}
        </p>
        
        <AudioUpload 
          fileType={activeTab} 
          onFileSelect={handleFileSelect}
          currentFile={getCurrentFile()} 
        />
      </div>
      
      <div className="mb-8">
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      <div className="mb-8">
        {!isAuthenticated && !loading ? (
          <div className="text-center mb-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <p className="text-blue-700">Please log in to use the transcription feature.</p>
            </div>
            <Link 
              href="/login?redirect=/transcribe"
              className="inline-block py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Log In
            </Link>
          </div>
        ) : !canTranscribe() && !loading ? (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
            <p className="text-yellow-700">Your trial period has expired. Please upgrade your account to continue using the transcription feature.</p>
            <a 
              href="#"
              className="inline-block mt-2 py-2 px-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-medium rounded-lg hover:from-yellow-700 hover:to-yellow-600 transition-colors"
            >
              Upgrade Account
            </a>
          </div>
        ) : (
          <button 
            type="button"
            disabled={!getCurrentFile() || isTranscribing || loading}
            onClick={handleTranscribe}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500"
          >
            {isTranscribing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Transcribing...
              </>
            ) : loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Start Transcription
              </>
            )}
          </button>
        )}
      </div>
      
      {transcriptionResult && (
        <TranscriptionResult 
          text={transcriptionResult} 
          onDownload={handleDownload} 
        />
      )}
    </div>
  );
}
