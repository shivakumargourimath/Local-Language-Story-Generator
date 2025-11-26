/**
 * Story Display Component
 * Displays the generated story with metadata
 */

import React from 'react';

const StoryDisplay = ({ story, metadata, onGenerateAudio, isGeneratingAudio }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Story Header */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📖 {metadata?.name}'s Story
        </h2>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <span className="bg-purple-100 px-3 py-1 rounded-full">
            👶 Age: {metadata?.age}
          </span>
          <span className="bg-blue-100 px-3 py-1 rounded-full">
            🌍 Language: {metadata?.language}
          </span>
          <span className="bg-green-100 px-3 py-1 rounded-full">
            💡 Moral: {metadata?.moral}
          </span>
        </div>
      </div>

      {/* Story Content */}
      <div className="prose max-w-none">
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
          {story}
        </div>
      </div>

      {/* Audio Generation Button */}
      <div className="mt-6 pt-6 border-t">
        <button
          onClick={onGenerateAudio}
          disabled={isGeneratingAudio}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
            isGeneratingAudio
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-secondary hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isGeneratingAudio ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Converting to Audio...
            </span>
          ) : (
            '🔊 Generate Audio'
          )}
        </button>
      </div>
    </div>
  );
};

export default StoryDisplay;
