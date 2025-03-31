'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function QuickActions() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 animate-fadeIn animation-delay-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Link 
          href="#"
          className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-600">Profile</span>
        </Link>
        
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </div>
          <span className="text-sm font-medium text-gray-600">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        
        <Link 
          href="#"
          className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-600">Settings</span>
        </Link>
        
        <Link 
          href="/login"
          className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-600">Logout</span>
        </Link>
      </div>
    </div>
  );
}
