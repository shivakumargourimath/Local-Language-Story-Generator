/**
 * Story Generator Component
 * Main component that handles story generation and audio playback
 */

import React, { useState } from 'react';
import StoryForm from './StoryForm';
import StoryDisplay from './StoryDisplay';
import AudioPlayer from './AudioPlayer';
import LoadingSpinner from './LoadingSpinner';
import { generateStory, generateAudio } from '../services/api';

const StoryGenerator = () => {
  // State management
  const [story, setStory] = useState('');
  const [storyMetadata, setStoryMetadata] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle story generation
   * @param {Object} formData - Child's details (name, age, language, moral)
   */
  const handleGenerateStory = async (formData) => {
    try {
      setError('');
      setStory('');
      setAudioUrl('');
      setIsGeneratingStory(true);

      // Call API to generate story
      const response = await generateStory(formData);

      if (response.success) {
        setStory(response.story);
        setStoryMetadata(response.metadata);
      } else {
        setError(response.error || 'Failed to generate story');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while generating the story');
      console.error('Story generation error:', err);
    } finally {
      setIsGeneratingStory(false);
    }
  };

  /**
   * Handle audio generation
   */
  const handleGenerateAudio = async () => {
    if (!story || !storyMetadata) {
      setError('Please generate a story first');
      return;
    }

    try {
      setError('');
      setAudioUrl('');
      setIsGeneratingAudio(true);

      // Call API to generate audio
      const audioBlob = await generateAudio(story, storyMetadata.language);

      // Create blob URL for audio playback
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (err) {
      setError(err.message || 'An error occurred while generating audio');
      console.error('Audio generation error:', err);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Story Input Form */}
      <StoryForm 
        onSubmit={handleGenerateStory} 
        isLoading={isGeneratingStory} 
      />

      {/* Loading Spinner */}
      {isGeneratingStory && (
        <div className="mt-8">
          <LoadingSpinner message="Creating your magical story..." />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Story Display */}
      {story && (
        <div className="mt-8">
          <StoryDisplay 
            story={story} 
            metadata={storyMetadata}
            onGenerateAudio={handleGenerateAudio}
            isGeneratingAudio={isGeneratingAudio}
          />
        </div>
      )}

      {/* Audio Loading */}
      {isGeneratingAudio && (
        <div className="mt-8">
          <LoadingSpinner message="Converting story to audio..." />
        </div>
      )}

      {/* Audio Player */}
      {audioUrl && (
        <div className="mt-8">
          <AudioPlayer audioUrl={audioUrl} />
        </div>
      )}
    </div>
  );
};

export default StoryGenerator;
