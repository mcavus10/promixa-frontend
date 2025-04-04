'use client';

import { useState, useEffect } from 'react';

type WelcomeHeaderProps = {
  userName?: string;
};

export function WelcomeHeader({ userName = 'John' }: WelcomeHeaderProps) {
  return (
    <div className="mb-8 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{userName}</span> 👋
      </h1>
      <p className="mt-2 text-gray-600">
        Welcome back to your Promixa dashboard. Image Genearation features coming soon..
      </p>
    </div>
  );
}
