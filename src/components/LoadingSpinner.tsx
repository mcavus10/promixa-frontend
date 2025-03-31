'use client';

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-purple-600 animate-spin"></div>
        <div className="absolute inset-0 h-16 w-16 rounded-full border-r-4 border-l-4 border-blue-500 animate-pulse"></div>
      </div>
    </div>
  );
};
