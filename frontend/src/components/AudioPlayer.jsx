/**
 * Audio Player Component
 * Custom audio player for story playback
 */

import React from 'react';

const AudioPlayer = ({ audioUrl }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">
          🎧 Listen to Your Story
        </h3>
        <span className="text-white text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
          Audio Ready
        </span>
      </div>

      {/* Audio Element */}
      <audio
        controls
        className="w-full"
        src={audioUrl}
        style={{
          filter: 'invert(1) hue-rotate(180deg)',
          width: '100%',
          borderRadius: '8px'
        }}
      >
        Your browser does not support the audio element.
      </audio>

      {/* Download Button */}
      <div className="mt-4 text-center">
        <a
          href={audioUrl}
          download="bedtime-story.mp3"
          className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          📥 Download Audio
        </a>
      </div>

      {/* Instructions */}
      <p className="text-white text-sm text-center mt-4 opacity-90">
        Play the story for your child at bedtime 🌙
      </p>
    </div>
  );
};

export default AudioPlayer;
