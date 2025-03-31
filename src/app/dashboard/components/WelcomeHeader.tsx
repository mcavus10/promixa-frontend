'use client';

import { useState, useEffect } from 'react';

type WelcomeHeaderProps = {
  userName?: string;
};

export function WelcomeHeader({ userName = 'John' }: WelcomeHeaderProps) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="mb-8 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800">
        {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{userName}</span> 👋
      </h1>
      <p className="mt-2 text-gray-600">
        Welcome back to your Promixa dashboard. What would you like to create today?
      </p>
    </div>
  );
}
