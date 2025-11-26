/**
 * Loading Spinner Component
 * Displays an animated loading indicator
 */

import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Spinner */}
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-20 h-20 border-4 border-purple-200 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>

      {/* Message */}
      <p className="mt-6 text-lg font-medium text-gray-700 animate-pulse">
        {message}
      </p>

      {/* Dots animation */}
      <div className="flex space-x-2 mt-4">
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
